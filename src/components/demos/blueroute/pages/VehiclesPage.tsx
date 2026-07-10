"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BASE, useBlueRoute } from "../store";

export function BlueVehiclesPage() {
  const { state } = useBlueRoute();
  const search = useSearchParams();
  const initialQ = search.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [expanded, setExpanded] = useState<string | null>(search.get("id"));

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return state.vehicles;
    return state.vehicles.filter(
      (v) =>
        v.name.includes(query) ||
        v.plate.toLowerCase().includes(query) ||
        v.brand.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query),
    );
  }, [state.vehicles, q]);

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-[#16234A]">ค้นหารถ</h1>
      <p className="mt-1 text-sm text-[#6B7693]">
        ค้นด้วยเบอร์รถ / ทะเบียน เช่น 332 หรือ 10-1234
      </p>
      <div className="relative mt-4 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9AA3B8]" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setExpanded(null);
          }}
          placeholder="332 หรือ 10-1234"
          className="w-full rounded-2xl border border-[#E3E7F0] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#2E4A8A]"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {results.map((v) => {
          const open = expanded === v.id;
          const history = state.jobs.filter((j) => j.vehicle === v.name);
          return (
            <div
              key={v.id}
              className={`rounded-2xl border bg-white shadow-sm transition ${
                open ? "border-[#2E4A8A]/50 sm:col-span-2" : "border-[#E3E7F0]"
              }`}
            >
              <button
                type="button"
                onClick={() => setExpanded(open ? null : v.id)}
                className="w-full p-4 text-left"
              >
                <p className="font-display text-lg font-bold text-[#16234A]">เบอร์รถ {v.name}</p>
                <p className="mt-1 text-sm text-[#6B7693]">
                  {v.brand} {v.model} · ทะเบียน {v.plate}
                </p>
                <p className="mt-2 text-xs text-[#9AA3B8]">{v.route}</p>
                <p className="mt-2 text-xs font-semibold text-[#2E4A8A]">
                  {open ? "ย่อรายละเอียด ▲" : "ดูโปรไฟล์ + ประวัติ ›"}
                </p>
              </button>

              {open && (
                <div className="grid gap-4 border-t border-[#E3E7F0] p-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <dl className="space-y-3 text-sm">
                    {(
                      [
                        ["ทะเบียน", v.plate],
                        ["เลขตัวถัง", v.chassis],
                        ["ยี่ห้อ / รุ่น", `${v.brand} ${v.model}`],
                        ["เส้นทาง", v.route],
                        ["ผู้ประกอบการ", v.company],
                      ] as const
                    ).map(([k, val]) => (
                      <div
                        key={k}
                        className="flex justify-between gap-4 border-b border-[#F0F2F7] pb-2"
                      >
                        <dt className="text-[#6B7693]">{k}</dt>
                        <dd className="text-right font-semibold">{val}</dd>
                      </div>
                    ))}
                  </dl>
                  <div>
                    <h3 className="font-display font-bold text-[#16234A]">ประวัติแจ้งซ่อมในเดโม</h3>
                    <div className="mt-3 space-y-2">
                      {history.map((j) => (
                        <Link
                          key={j.id}
                          href={`${BASE}/job?id=${j.id}`}
                          className="flex w-full items-center justify-between rounded-xl bg-[#F5F7FC] px-3 py-3 text-left text-sm"
                        >
                          <span>
                            <span className="font-semibold">{j.jobNum}</span>
                            <span className="mt-0.5 block text-xs text-[#6B7693]">{j.desc}</span>
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              j.status === "กำลังซ่อม" ? "text-[#1FA97A]" : "text-[#E5544B]"
                            }`}
                          >
                            {j.status}
                          </span>
                        </Link>
                      ))}
                      {history.length === 0 && (
                        <p className="text-sm text-[#6B7693]">ยังไม่มีประวัติในชุดข้อมูลเดโม</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {results.length === 0 && (
          <p className="col-span-full rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6B7693]">
            ไม่พบรถตามคำค้น
          </p>
        )}
      </div>
    </div>
  );
}
