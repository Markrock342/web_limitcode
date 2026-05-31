"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles, Bell, Check } from "lucide-react";

const SERVICES = [
  { id: "facial", n: "ทำความสะอาดผิวหน้า", dur: "60 นาที", p: 1500, img: "/img/spa-2.jpg" },
  { id: "massage", n: "นวดหน้า สปาหน้า", dur: "60 นาที", p: 1200, img: "/img/spa-4.jpg" },
  { id: "treatment", n: "ทรีตเมนต์บำรุงผิว", dur: "90 นาที", p: 1800, img: "/img/spa-1.jpg" },
  { id: "wellness", n: "สปาผ่อนคลายเต็มรูปแบบ", dur: "120 นาที", p: 2500, img: "/img/spa-3.jpg" },
];

const TIMES = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
// May 2567 starts on Wednesday (index 3); 31 days
const FIRST_DAY = 3;
const DAYS = 31;

export function BookingDemo() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<(typeof SERVICES)[number] | null>(SERVICES[0]);
  const [day, setDay] = useState<number | null>(16);
  const [time, setTime] = useState<string | null>("10:00");

  const reset = () => {
    setStep(1);
    setService(SERVICES[0]);
    setDay(16);
    setTime("10:00");
  };

  return (
    <div className="min-h-[88vh] bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 px-4 py-10 font-sans text-slate-700 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-center gap-2 text-center">
          <Sparkles className="size-6 text-violet-500" />
          <h1 className="font-display text-2xl font-bold text-violet-700 sm:text-3xl">Glow Beauty &amp; Wellness</h1>
        </div>
        <p className="mt-1 text-center text-sm text-slate-500">เลือกบริการ วันที่ และเวลาที่สะดวก</p>

        <div className="mt-7 rounded-3xl border border-violet-200 bg-white/90 p-5 shadow-xl shadow-violet-200/40 backdrop-blur sm:p-7">
          <h2 className="font-display text-xl font-bold text-slate-900">Book Your Appointment</h2>

          {/* steps */}
          <ol className="mt-4 flex items-center text-sm">
            {["เลือกบริการ", "เลือกวันเวลา", "ยืนยันการจอง"].map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const activeStep = step === n;
              return (
                <li key={label} className="flex flex-1 items-center last:flex-none">
                  <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    activeStep || done ? "bg-violet-600 text-white" : "bg-violet-100 text-violet-500"
                  }`}>
                    {done ? <Check className="size-3.5" /> : n}
                  </span>
                  <span className={`ml-2 hidden font-medium sm:inline ${activeStep ? "text-violet-700" : "text-slate-400"}`}>{label}</span>
                  {i < 2 && <span className={`mx-2 h-0.5 flex-1 ${done ? "bg-violet-500" : "bg-violet-100"}`} />}
                </li>
              );
            })}
          </ol>

          {step < 3 ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {/* services */}
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">เลือกบริการ</p>
                <div className="space-y-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setService(s)}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                        service?.id === s.id
                          ? "border-violet-400 bg-violet-50 ring-1 ring-violet-300"
                          : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/50"
                      }`}
                    >
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl">
                        <Image src={s.img} alt={s.n} fill sizes="44px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-800">{s.n}</span>
                        <span className="block text-xs text-slate-400">{s.dur}</span>
                      </span>
                      <span className="text-sm font-bold text-violet-600">฿{s.p.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* calendar */}
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">เลือกวันที่</p>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-center text-sm font-semibold text-slate-700">พฤษภาคม 2567</p>
                  <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400">
                    {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {Array.from({ length: FIRST_DAY }).map((_, i) => (
                      <span key={`e${i}`} />
                    ))}
                    {Array.from({ length: DAYS }).map((_, i) => {
                      const d = i + 1;
                      const selected = day === d;
                      const disabled = d < 14;
                      return (
                        <button
                          key={d}
                          disabled={disabled}
                          onClick={() => setDay(d)}
                          className={`grid aspect-square place-items-center rounded-lg text-xs font-medium transition-colors ${
                            disabled
                              ? "text-slate-300"
                              : selected
                              ? "bg-violet-600 text-white"
                              : "text-slate-600 hover:bg-violet-100"
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* time */}
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">เลือกเวลา</p>
                <div className="grid grid-cols-2 gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                        time === t
                          ? "border-violet-400 bg-violet-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-violet-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!service || !day || !time}
                  onClick={() => setStep(3)}
                  className="mt-4 w-full rounded-full bg-violet-600 py-3 font-semibold text-white shadow-lg shadow-violet-300/50 transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                  ถัดไป →
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid items-start gap-5 md:grid-cols-2">
              {/* success */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500 text-white"><Check className="size-7" /></div>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-900">จองสำเร็จ!</h3>
                <p className="text-sm text-slate-500">ขอบคุณสำหรับการจอง</p>
                <div className="mx-auto mt-4 max-w-xs space-y-2 text-left text-sm">
                  <Row k="บริการ" v={service?.n ?? "-"} />
                  <Row k="ราคา" v={`฿${service?.p.toLocaleString() ?? "-"}`} />
                  <Row k="วันที่" v={`${day} พฤษภาคม 2567`} />
                  <Row k="เวลา" v={`${time} น.`} />
                </div>
                <button onClick={reset} className="mt-5 rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50">
                  จองรายการใหม่
                </button>
              </div>

              {/* phone notification */}
              <div className="flex justify-center">
                <div className="w-full max-w-[15rem] rounded-[2rem] border-4 border-slate-900 bg-slate-900 p-2 shadow-2xl">
                  <div className="rounded-[1.5rem] bg-gradient-to-b from-violet-100 to-white p-4">
                    <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300" />
                    <div className="rounded-2xl bg-white p-3 shadow">
                      <div className="flex items-center gap-2">
                        <span className="relative grid size-8 place-items-center rounded-xl bg-violet-100 text-violet-600">
                          <Bell className="size-4" />
                          <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-rose-500" />
                        </span>
                        <span className="text-sm font-bold text-slate-800">แจ้งเตือนนัดหมาย</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        คุณมีนัดหมายวันที่ {day} พ.ค. 2567 เวลา {time} น. ที่ LIMIT CODE STUDIO
                      </p>
                      <button className="mt-3 w-full rounded-lg bg-violet-600 py-2 text-xs font-semibold text-white">
                        ดูรายละเอียด
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-emerald-100 pb-2 last:border-0 last:pb-0">
      <span className="text-slate-500">{k}</span>
      <span className="font-semibold text-slate-800">{v}</span>
    </div>
  );
}
