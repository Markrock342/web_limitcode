"use client";

import Image from "next/image";
import { useBrightSlot } from "../store";

const AVATARS = ["/img/education/tutor-f1.jpg", "/img/education/tutor-m1.jpg", "/img/education/tutor-f2.jpg", "/img/education/tutor-m2.jpg"];

export function BrightStudentsPage() {
  const { state, setState } = useBrightSlot();

  function addStudent() {
    const name = state.newStudent.trim();
    if (!name) return;
    setState((s) => ({
      ...s,
      students: [...s.students, { id: `s${Date.now()}`, name, grade: "ม.1", subject: "คณิตศาสตร์" }],
      newStudent: "",
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/education/class-2.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#12283F]/72" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">นักเรียน</h1>
            <p className="mt-1 text-sm text-white/85">เพิ่มหรือลบรายชื่อใน CMS</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D8E2EC] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <input
            value={state.newStudent}
            onChange={(e) => setState((s) => ({ ...s, newStudent: e.target.value }))}
            placeholder="ชื่อนักเรียนใหม่…"
            className="min-w-[10rem] flex-1 rounded-full border border-[#D8E2EC] px-4 py-2.5 text-sm outline-none focus:border-[#1B3A5C]"
          />
          <button
            type="button"
            onClick={addStudent}
            className="rounded-full bg-[#1B3A5C] px-4 py-2.5 text-xs font-bold text-white"
          >
            เพิ่ม
          </button>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {state.students.map((s, i) => (
            <li key={s.id} className="flex items-center gap-3 rounded-2xl border border-[#EEF3F8] bg-[#F7F9FC] p-3">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
                <Image src={AVATARS[i % AVATARS.length]} alt="" fill className="object-cover" sizes="48px" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display font-bold text-[#12283F]">{s.name}</span>
                <span className="text-xs text-slate-500">
                  {s.grade} · {s.subject}
                </span>
              </span>
              <button
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    students: prev.students.filter((x) => x.id !== s.id),
                  }))
                }
                className="text-xs font-semibold text-rose-500 hover:underline"
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
