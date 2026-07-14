"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, PLANS, useNovaOracle } from "../store";

export function NovaHomePage() {
  const { state } = useNovaOracle();
  const totalCredits = state.users.reduce((s, u) => s + u.credits, 0);
  const activePersonas = state.personas.filter((p) => p.enabled).length;
  const published = state.articles.filter((a) => a.status === "published").length;
  const isStaff = state.session.loggedIn && state.session.role === "staff";

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-violet-950 text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/ai/circuit.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-45"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-violet-950/80 to-fuchsia-900/30" />
        </div>
        <div className="relative flex min-h-[24rem] flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-fuchsia-300 uppercase">
              NovaOracle AI · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              ผู้ช่วย AI
              <br />
              <span className="bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                ที่พูดภาษาแบรนด์คุณ
              </span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-violet-100 sm:text-base">
              แอดมินโปรดักต์ AI ครบวงจร — จัดการผู้ใช้และเครดิต ปรับ Persona
              เผยแพร่คอนเทนต์ และดู analytics ในที่เดียว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={isStaff ? `${BASE}/plans` : `${BASE}/login`}
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-violet-800 shadow-lg shadow-violet-900/40 transition hover:-translate-y-0.5"
              >
                ดูแพ็กเกจ
              </Link>
              <Link
                href={isStaff ? `${BASE}/users` : `${BASE}/login`}
                className="rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {isStaff ? "เปิดหลังบ้าน" : "เข้าระบบทีมงาน"}
              </Link>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {[
              { k: "ผู้ใช้ทั้งหมด", v: String(state.users.length) },
              { k: "เครดิตหมุนเวียน", v: totalCredits.toLocaleString() },
              { k: "Persona เปิดใช้", v: `${activePersonas}/${state.personas.length}` },
              { k: "บทความเผยแพร่", v: String(published) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-violet-200 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold text-fuchsia-200 sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-violet-700 uppercase">Personas</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">ทีม AI สำเร็จรูป</h2>
            <p className="mt-1 text-sm text-slate-600">เปิด/ปิดและแก้ system prompt ได้จากหลังบ้าน</p>
          </div>
          <Link
            href={isStaff ? `${BASE}/personas` : `${BASE}/login`}
            className="text-sm font-semibold text-violet-700 hover:underline"
          >
            จัดการ Persona →
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {state.personas.slice(0, 8).map((p) => (
            <Link
              key={p.id}
              href={isStaff ? `${BASE}/personas` : `${BASE}/login`}
              className={`group rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${
                p.enabled ? "border-violet-200 bg-white" : "border-slate-200 bg-slate-50 opacity-70"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-display text-sm font-bold text-white">
                  {p.name.slice(0, 1)}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    p.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {p.enabled ? "เปิดใช้" : "ปิดอยู่"}
                </span>
              </div>
              <p className="mt-3 font-display font-bold text-slate-900">{p.name}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{p.prompt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-700 uppercase">Pricing</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">แพ็กเกจที่ทีมขายใช้ปิดดีล</h2>
          <p className="mt-1 text-sm text-slate-600">แก้ราคา/ฟีเจอร์ได้จากหน้าแพ็กเกจในหลังบ้าน</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PLANS.map((plan) => {
            const hot = plan.id === "Pro";
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border p-6 ${
                  hot
                    ? "border-violet-500 bg-violet-950 text-white shadow-xl shadow-violet-300/40"
                    : "border-slate-200 bg-white"
                }`}
              >
                {hot && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-fuchsia-500 px-3 py-1 text-[10px] font-bold text-white">
                    ยอดนิยม
                  </span>
                )}
                <p className={`font-display text-lg font-bold ${hot ? "text-white" : "text-slate-900"}`}>{plan.id}</p>
                <p className={`mt-2 font-display text-3xl font-bold ${hot ? "text-fuchsia-300" : "text-violet-700"}`}>
                  {plan.price}
                  <span className={`text-sm font-medium ${hot ? "text-violet-200" : "text-slate-400"}`}>/เดือน</span>
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${hot ? "text-violet-100" : "text-slate-600"}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={hot ? "text-fuchsia-300" : "text-violet-600"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={isStaff ? `${BASE}/plans` : `${BASE}/login`}
                  className={`mt-6 block rounded-full py-2.5 text-center text-sm font-bold transition ${
                    hot
                      ? "bg-white text-violet-800 hover:-translate-y-0.5"
                      : "border border-violet-200 text-violet-800 hover:bg-violet-50"
                  }`}
                >
                  เลือกแพ็กเกจนี้
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 text-white sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[200px] sm:min-h-full">
          <Image src="/img/ai/server.jpg" alt="หลังบ้าน NovaOracle" fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/70" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-fuchsia-300 uppercase">Backstage</p>
          <h2 className="font-display text-xl font-bold sm:text-2xl">หลังบ้านที่ทีมโปรดักต์ใช้จริง</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            เติมเครดิตให้ผู้ใช้ ดู ledger การใช้งาน เผยแพร่บทความจาก CMS
            และเช็ค KPI จากหน้า analytics — ลองกดครบ flow ได้เลย
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={isStaff ? `${BASE}/credits` : `${BASE}/login`}
              className="rounded-full bg-fuchsia-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-fuchsia-400"
            >
              เครดิต Ledger
            </Link>
            <Link
              href={isStaff ? `${BASE}/content` : `${BASE}/login`}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              คอนเทนต์ CMS
            </Link>
            <Link
              href={isStaff ? `${BASE}/analytics` : `${BASE}/login`}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Analytics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
