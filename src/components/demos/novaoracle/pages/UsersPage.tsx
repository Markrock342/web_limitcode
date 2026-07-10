"use client";

import { useNovaOracle } from "../store";

export function NovaUsersPage() {
  const { state, setState } = useNovaOracle();

  function topUp(id: string) {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === id ? { ...u, credits: u.credits + 50 } : u)),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-violet-800">ผู้ใช้</h1>
        <p className="mt-1 text-sm text-slate-600">เติมเครดิต +50 ต่อครั้ง (เดโม)</p>
      </div>
      <ul className="space-y-3">
        {state.users.map((u) => (
          <li
            key={u.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-slate-800">{u.name}</p>
              <p className="text-xs text-slate-500">เครดิตคงเหลือ {u.credits}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  u.plan === "Free"
                    ? "bg-slate-100 text-slate-600"
                    : u.plan === "Pro"
                      ? "bg-violet-100 text-violet-800"
                      : "bg-indigo-100 text-indigo-800"
                }`}
              >
                {u.plan}
              </span>
              <button
                type="button"
                onClick={() => topUp(u.id)}
                className="rounded-full bg-violet-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-600"
              >
                เติม +50
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
