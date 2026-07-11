"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { demoId } from "@/components/demos/_shell/seed";
import { SLOTS, SUBJECTS, TUTORS, useBrightSlot } from "../store";

export function BrightBookPage() {
  const { state, setState } = useBrightSlot();
  const router = useRouter();
  const tutorsForSubject = TUTORS.filter((t) => t.subject === state.subject);
  const selectedTutor = TUTORS.find((t) => t.id === state.tutorId) ?? tutorsForSubject[0];

  function onSubjectChange(s: string) {
    const first = TUTORS.find((t) => t.subject === s);
    setState((prev) => ({
      ...prev,
      subject: s,
      tutorId: first?.id ?? prev.tutorId,
      confirmed: false,
    }));
  }

  function continueToConfirm() {
    const tutor = TUTORS.find((t) => t.id === state.tutorId);
    if (!tutor) return;
    setState((prev) => ({
      ...prev,
      pendingBooking: {
        id: demoId("B", 100 + prev.bookings.length, 3),
        student: prev.newStudent.trim() || prev.session.name,
        subject: prev.subject,
        tutor: tutor.name,
        slot: prev.slot,
        status: "รออนุมัติ",
        memberUsername: prev.session.username,
      },
    }));
    router.push("/demo/tutor-admin/confirm");
  }

  return (
    <RequireAuth session={state.session} basePath="/demo/tutor-admin" mode="member">
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="relative aspect-21/8 min-h-[140px]">
          <Image
            src={selectedTutor?.img ?? "/img/work-1.jpg"}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="900px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#12283F] via-[#12283F]/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-sky-100/80">จองคาบ · BrightSlot</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
              {state.subject}
              {selectedTutor ? ` · ${selectedTutor.name}` : ""}
            </h1>
            <p className="mt-1 text-sm text-white/80">{selectedTutor?.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <section className="space-y-5 rounded-2xl border border-[#D8E2EC] bg-white p-5">
          <div>
            <p className="text-sm font-semibold text-[#1B3A5C]">วิชา</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSubjectChange(s)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                    state.subject === s ? "bg-[#1B3A5C] text-white" : "bg-[#EEF3F8] text-[#1B3A5C]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#1B3A5C]">ติวเตอร์</p>
            <div className="mt-2 grid gap-2">
              {tutorsForSubject.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, tutorId: t.id, confirmed: false }))}
                  className={`flex overflow-hidden rounded-2xl border text-left transition ${
                    state.tutorId === t.id
                      ? "border-[#1B3A5C] bg-[#EEF3F8] ring-2 ring-[#1B3A5C]/20"
                      : "border-slate-200 hover:border-[#1B3A5C]/35"
                  }`}
                >
                  <span className="relative block h-20 w-20 shrink-0">
                    <Image src={t.img} alt="" fill className="object-cover" sizes="80px" />
                  </span>
                  <span className="flex flex-1 flex-col justify-center p-3">
                    <span className="font-display font-bold text-[#12283F]">{t.name}</span>
                    <span className="text-xs text-slate-500">
                      {t.bio} · โหลด {t.load}%
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#D8E2EC] bg-[#F7F9FC] p-5">
          <p className="text-sm font-semibold text-[#1B3A5C]">ช่วงเวลา</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, slot: s, confirmed: false }))}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                  state.slot === s ? "bg-[#E8A87C] text-[#1B3A5C]" : "bg-white text-[#1B3A5C] ring-1 ring-[#D8E2EC]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <input value={state.newStudent} onChange={(event) => setState((prev) => ({ ...prev, newStudent: event.target.value }))} placeholder="ชื่อผู้เรียน (ถ้าว่างใช้ชื่อบัญชี)" className="mt-5 w-full rounded-xl border border-[#D8E2EC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1B3A5C]" />
          <button type="button" onClick={continueToConfirm} className="mt-3 w-full rounded-full bg-[#1B3A5C] py-3 text-sm font-bold text-white hover:bg-[#152E4A]">ไปหน้ายืนยันการจอง</button>
        </section>
      </div>
    </div>
    </RequireAuth>
  );
}
