import { NextResponse } from "next/server";

function unavailable() {
  return NextResponse.json(
    { visitors: null },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET() {
  const token = process.env.VISITOR_ANALYTICS_TOKEN;
  const projectId = process.env.VISITOR_ANALYTICS_PROJECT_ID;
  const teamId = process.env.VISITOR_ANALYTICS_TEAM_ID;
  if (!token || !projectId || !teamId) return unavailable();

  const url = new URL("https://api.vercel.com/v1/query/web-analytics/visits/count");
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("teamId", teamId);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return unavailable();

    const payload: { data?: { visitors?: unknown } } = await response.json();
    const visitors = payload?.data?.visitors;
    if (typeof visitors !== "number" || !Number.isSafeInteger(visitors) || visitors < 0) {
      return unavailable();
    }

    return NextResponse.json(
      { visitors },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } },
    );
  } catch {
    return unavailable();
  }
}
