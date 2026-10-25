import { expect, test } from "@playwright/test";
import { GET } from "../src/app/api/visitors/route";

const keys = ["VISITOR_ANALYTICS_TOKEN", "VISITOR_ANALYTICS_PROJECT_ID", "VISITOR_ANALYTICS_TEAM_ID"] as const;
const originalFetch = globalThis.fetch;
const originalEnv = Object.fromEntries(keys.map((key) => [key, process.env[key]]));

test.beforeEach(() => {
  process.env.VISITOR_ANALYTICS_TOKEN = "test-token-not-a-real-secret";
  process.env.VISITOR_ANALYTICS_PROJECT_ID = "test-project";
  process.env.VISITOR_ANALYTICS_TEAM_ID = "test-team";
  // Fail closed: a missing mock must never make a real analytics request.
  globalThis.fetch = async () => { throw new Error("Unexpected outbound request"); };
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of keys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

for (const key of keys) {
  test(`missing ${key} fails safely without contacting Vercel`, async () => {
    delete process.env[key];
    let called = false;
    globalThis.fetch = async () => { called = true; return Response.json({ data: { visitors: 99 } }); };
    const response = await GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ visitors: null });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(called).toBe(false);
  });
}

for (const visitors of [0, 1234]) {
  test(`returns only the verified visitor count ${visitors}`, async () => {
    globalThis.fetch = async (input, options) => {
      const url = new URL(String(input));
      expect(url.origin).toBe("https://api.vercel.com");
      expect(url.pathname).toBe("/v1/query/web-analytics/visits/count");
      expect(url.searchParams.get("projectId")).toBe("test-project");
      expect(url.searchParams.get("teamId")).toBe("test-team");
      expect(new Headers(options?.headers).get("authorization")).toBe("Bearer test-token-not-a-real-secret");
      expect(options?.signal).toBeInstanceOf(AbortSignal);
      expect((options as RequestInit & { next?: { revalidate: number } }).next?.revalidate).toBe(300);
      return Response.json({ data: { visitors, secret: "must-not-be-returned" } });
    };
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ visitors });
    expect(response.headers.get("cache-control")).toContain("s-maxage=300");
  });
}

const invalidPayloads = [null, {}, { data: null }, { data: {} }, ...[-1, 1.5, "1234", null, true, Number.MAX_SAFE_INTEGER + 1].map((visitors) => ({ data: { visitors } }))];

for (const [index, payload] of invalidPayloads.entries()) {
  test(`invalid upstream payload ${index + 1} is not shown as a visitor count`, async () => {
    globalThis.fetch = async () => Response.json(payload);
    const response = await GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ visitors: null });
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
}

for (const failure of ["http", "network", "json"] as const) {
  test(`upstream ${failure} failure does not expose credentials or errors`, async () => {
    globalThis.fetch = async () => {
      if (failure === "network") throw new Error("test-token-not-a-real-secret");
      if (failure === "json") return new Response("not-json");
      return new Response("test-token-not-a-real-secret", { status: 401 });
    };
    const response = await GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ visitors: null });
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
}
