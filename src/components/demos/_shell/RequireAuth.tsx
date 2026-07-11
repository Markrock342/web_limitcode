"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { DemoSession } from "./demoAuth";
import { canAccessStaff } from "./demoAuth";

/** Redirect guests away from staff-only pages */
export function RequireAuth({
  session,
  basePath,
  children,
  mode = "staff",
}: {
  session: DemoSession;
  basePath: string;
  children: React.ReactNode;
  mode?: "staff" | "member" | "any";
}) {
  const router = useRouter();
  const ok =
    mode === "any"
      ? session.loggedIn
      : mode === "staff"
        ? canAccessStaff(session)
        : session.loggedIn && (session.role === "member" || session.role === "staff");

  useEffect(() => {
    if (!ok) router.replace(`${basePath}/login`);
  }, [ok, router, basePath]);

  if (!ok) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-slate-500">กำลังพาไปหน้าเข้าสู่ระบบ…</p>
        <Link href={`${basePath}/login`} className="mt-3 inline-block text-sm font-semibold text-sky-600">
          ไปหน้า Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
