"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DEMO_ACCOUNTS,
  GUEST_SESSION,
  quickLogin,
  tryDemoLogin,
  type DemoSession,
} from "./demoAuth";

type Props = {
  brandName: string;
  subtitle?: string;
  basePath: string;
  session: DemoSession;
  onSession: (next: DemoSession) => void;
  accentClass?: string;
};

export function DemoLoginPage({
  brandName,
  subtitle = "เข้าสู่ระบบเดโม · staff / member",
  basePath,
  session,
  onSession,
  accentClass = "bg-slate-900",
}: Props) {
  const router = useRouter();
  const [user, setUser] = useState("staff");
  const [pass, setPass] = useState("demo123");
  const [error, setError] = useState("");

  function login(e: React.FormEvent) {
    e.preventDefault();
    const next = tryDemoLogin(user, pass);
    if (!next) {
      setError("ใช้ staff/demo123 หรือ member/demo123");
      return;
    }
    setError("");
    onSession(next);
    router.push(basePath);
  }

  function logout() {
    onSession(GUEST_SESSION);
    setUser("staff");
    setPass("demo123");
  }

  if (session.loggedIn) {
    return (
      <div className="mx-auto max-w-md bg-white p-8 shadow-[0_1px_2px_rgba(15,39,68,0.08)]">
        <div className={`mx-auto grid size-12 place-items-center text-white ${accentClass}`}>
          <span className="font-display text-sm font-bold">OK</span>
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold text-slate-900">เข้าสู่ระบบแล้ว</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          {session.name} · {session.role} · @{session.username}
        </p>
        <button
          type="button"
          onClick={() => router.push(basePath)}
          className={`mt-6 w-full py-3 text-sm font-semibold text-white ${accentClass}`}
        >
          ไปหน้าหลัก
        </button>
        <button
          type="button"
          onClick={logout}
          className="mt-2 w-full border border-slate-200 py-3 text-sm font-semibold text-slate-700"
        >
          ออกจากระบบ
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-4">
      <form
        onSubmit={login}
        className="w-full max-w-md bg-white p-8 shadow-[0_1px_2px_rgba(15,39,68,0.08)]"
      >
        <div className={`mx-auto grid size-12 place-items-center text-white ${accentClass}`}>
          <span className="font-display text-xs font-bold">IN</span>
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold text-slate-900">{brandName}</h1>
        <p className="mt-1 text-center text-sm text-slate-500">{subtitle}</p>

        <label className="mt-6 block text-sm">
          <span className="font-medium text-slate-700">ชื่อผู้ใช้</span>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1 w-full border border-slate-200 px-3 py-2.5 outline-none focus:border-sky-400"
            autoComplete="username"
          />
        </label>
        <label className="mt-3 block text-sm">
          <span className="font-medium text-slate-700">รหัสผ่าน</span>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="mt-1 w-full border border-slate-200 px-3 py-2.5 outline-none focus:border-sky-400"
            autoComplete="current-password"
          />
        </label>
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

        <button type="submit" className={`mt-5 w-full py-3 text-sm font-semibold text-white ${accentClass}`}>
          เข้าสู่ระบบ
        </button>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.username}
              type="button"
              onClick={() => {
                onSession(quickLogin(a.role));
                router.push(basePath);
              }}
              className="border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              เข้าเป็น {a.role}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-400">
          บัญชีเดโม: staff/demo123 · member/demo123
        </p>
      </form>
    </div>
  );
}
