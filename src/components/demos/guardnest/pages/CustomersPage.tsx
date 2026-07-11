"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { BASE, addCustomerNote, useGuardNest } from "../store";

export function GuardCustomersPage() {
  const { state, setState } = useGuardNest();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [openId, setOpenId] = useState<string | null>(state.customers[0]?.id ?? null);

  function submitNote(customerId: string) {
    const note = drafts[customerId] ?? "";
    setState((s) => addCustomerNote(s, customerId, note));
    setDrafts((d) => ({ ...d, [customerId]: "" }));
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-[#0b1f3a]">ลูกค้า</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {state.customers.length} ราย · คลิกแถวเพื่อดูโน้ตและเพิ่มบันทึกหน้างาน
        </p>
      </div>

      <div className="bg-white shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-medium">ชื่อ</th>
                <th className="px-4 py-3 font-medium">ที่อยู่</th>
                <th className="px-4 py-3 font-medium">โทร</th>
                <th className="px-4 py-3 font-medium">งาน</th>
              </tr>
            </thead>
            <tbody>
              {state.customers.map((c) => {
                const jobs = state.jobs.filter((j) => j.customerId === c.id);
                const open = openId === c.id;
                return (
                  <Fragment key={c.id}>
                    <tr
                      className={`cursor-pointer border-b border-slate-50 hover:bg-slate-50/80 ${
                        open ? "bg-sky-50/40" : ""
                      }`}
                      onClick={() => setOpenId(open ? null : c.id)}
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">{c.name}</td>
                      <td className="px-4 py-3 text-slate-600">{c.address}</td>
                      <td className="px-4 py-3 text-slate-500">{c.phone}</td>
                      <td className="px-4 py-3 text-slate-600">{jobs.length}</td>
                    </tr>
                    {open && (
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td colSpan={4} className="px-4 py-4">
                          <div className="grid gap-4 lg:grid-cols-2">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                งานที่เกี่ยวข้อง
                              </p>
                              {jobs.length === 0 ? (
                                <p className="mt-2 text-sm text-slate-400">ยังไม่มีงาน</p>
                              ) : (
                                <ul className="mt-2 space-y-1">
                                  {jobs.map((j) => (
                                    <li key={j.id}>
                                      <Link
                                        href={`${BASE}/job?id=${encodeURIComponent(j.id)}`}
                                        className="text-sm text-sky-600 hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {j.id} · {j.type} · {j.status}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                โน้ตหน้างาน
                              </p>
                              <ul className="mt-2 space-y-1.5">
                                {c.notes.map((n, i) => (
                                  <li
                                    key={`${c.id}-${i}`}
                                    className="border-l-2 border-sky-400 pl-2.5 text-sm text-slate-700"
                                  >
                                    {n}
                                  </li>
                                ))}
                                {c.notes.length === 0 && (
                                  <li className="text-sm text-slate-400">ยังไม่มีโน้ต</li>
                                )}
                              </ul>
                              <div
                                className="mt-3 flex gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  value={drafts[c.id] ?? ""}
                                  onChange={(e) =>
                                    setDrafts((d) => ({ ...d, [c.id]: e.target.value }))
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") submitNote(c.id);
                                  }}
                                  placeholder="เพิ่มโน้ตหน้างาน…"
                                  className="min-w-0 flex-1 border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => submitNote(c.id)}
                                  className="shrink-0 bg-[#0f2744] px-4 py-2 text-sm font-semibold text-white"
                                >
                                  บันทึก
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
