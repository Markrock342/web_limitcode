export type DemoRole = "guest" | "member" | "staff";

export type DemoSession = {
  loggedIn: boolean;
  role: DemoRole;
  name: string;
  username: string;
};

export const DEMO_ACCOUNTS = [
  {
    username: "staff",
    password: "demo123",
    role: "staff" as const,
    name: "พนักงานเดโม",
  },
  {
    username: "member",
    password: "demo123",
    role: "member" as const,
    name: "สมาชิกเดโม",
  },
] as const;

export const GUEST_SESSION: DemoSession = {
  loggedIn: false,
  role: "guest",
  name: "ผู้เยี่ยมชม",
  username: "",
};

export function tryDemoLogin(username: string, password: string): DemoSession | null {
  const u = username.trim().toLowerCase();
  const p = password.trim();
  const hit = DEMO_ACCOUNTS.find((a) => a.username === u && a.password === p);
  if (!hit) return null;
  return {
    loggedIn: true,
    role: hit.role,
    name: hit.name,
    username: hit.username,
  };
}

export function quickLogin(role: "staff" | "member"): DemoSession {
  const hit = DEMO_ACCOUNTS.find((a) => a.role === role)!;
  return {
    loggedIn: true,
    role: hit.role,
    name: hit.name,
    username: hit.username,
  };
}

export function isStaff(session: DemoSession) {
  return session.loggedIn && session.role === "staff";
}

export function isMember(session: DemoSession) {
  return session.loggedIn && session.role === "member";
}

export function canAccessStaff(session: DemoSession) {
  return isStaff(session);
}
