"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bus } from "lucide-react";
import { BASE, useBlueRoute } from "../store";

export function BlueLoginPage() {
  const { state, setState } = useBlueRoute();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function login(e: React.FormEvent) {
    e.preventDefault();
    setState((s) => ({ ...s, loggedIn: true }));
    router.push(BASE);
  }

  function logout() {
    setState((s) => ({ ...s, loggedIn: false }));
    setUser("");
    setPass("");
  }

  if (state.loggedIn) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-[#E3E7F0] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#16234A] text-white">
          <Bus className="size-7" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-[#16234A]">เข้าสู่ระบบแล้ว</h1>
        <p className="mt-1 text-sm text-[#6B7693]">เซสชันเดโมถูกเก็บในเบราว์เซอร์</p>
        <button
          type="button"
          onClick={logout}
          className="mt-6 w-full rounded-full border border-[#E3E7F0] py-3 text-sm font-semibold text-[#16234A]"
        >
          ออกจากระบบ
        </button>
        <button
          type="button"
          onClick={() => router.push(BASE)}
          className="mt-3 w-full rounded-full bg-[#16234A] py-3 text-sm font-semibold text-white"
        >
          ไป Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-4">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-3xl border border-[#E3E7F0] bg-white p-8 shadow-xl shadow-[#16234A]/10"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#16234A] text-white">
          <Bus className="size-7" />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold text-[#16234A]">
          BlueRoute Fleet
        </h1>
        <p className="mt-1 text-center text-sm text-[#6B7693]">
          โปรแกรมงานซ่อมบำรุง · เดโมหลังบ้าน (ม็อกอัพ)
        </p>
        <label className="mt-6 block text-sm">
          <span className="font-medium text-[#1A2240]">ชื่อผู้ใช้</span>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="demo"
            className="mt-1 w-full rounded-xl border border-[#E3E7F0] px-3 py-2.5 outline-none focus:border-[#2E4A8A]"
          />
        </label>
        <label className="mt-3 block text-sm">
          <span className="font-medium text-[#1A2240]">รหัสผ่าน</span>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-xl border border-[#E3E7F0] px-3 py-2.5 outline-none focus:border-[#2E4A8A]"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-[#16234A] py-3 text-sm font-semibold text-white"
        >
          เข้าสู่ระบบ (เดโม)
        </button>
        <p className="mt-3 text-center text-xs text-[#9AA3B8]">
          กรอกอะไรก็ได้ หรือกดเข้าเลย — เป็นเดโมในเบราว์เซอร์
        </p>
      </form>
    </div>
  );
}
