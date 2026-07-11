"use client";

import { approveQuote, QUOTE_STYLE, useGuardNest } from "../store";

export function GuardQuotesPage() {
  const { state, setState } = useGuardNest();

  function toggle(id: string) {
    setState((s) => approveQuote(s, id));
  }

  const total = state.quotes.reduce((s, q) => s + q.amount, 0);
  const approved = state.quotes
    .filter((q) => q.status === "อนุมัติแล้ว")
    .reduce((s, q) => s + q.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-[#0b1f3a]">ใบเสนอราคา</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {state.quotes.length} ใบ · กดสถานะเพื่อสลับ ร่าง → รออนุมัติ → อนุมัติแล้ว
          </p>
        </div>
        <p className="text-sm text-slate-500">
          อนุมัติแล้ว{" "}
          <strong className="text-[#0b1f3a]">฿{approved.toLocaleString()}</strong>
          <span className="mx-2 text-slate-300">|</span>
          รวม{" "}
          <strong className="text-[#0b1f3a]">฿{total.toLocaleString()}</strong>
        </p>
      </div>

      <div className="overflow-x-auto bg-white shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">เลขที่</th>
              <th className="px-4 py-3 font-medium">ลูกค้า</th>
              <th className="px-4 py-3 font-medium">บริการ</th>
              <th className="px-4 py-3 font-medium">ยอด</th>
              <th className="px-4 py-3 font-medium">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {state.quotes.map((q) => (
              <tr key={q.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-800">{q.id}</td>
                <td className="px-4 py-3 text-slate-700">{q.customer}</td>
                <td className="px-4 py-3 text-slate-600">{q.service}</td>
                <td className="px-4 py-3 font-medium text-slate-800">
                  ฿{q.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggle(q.id)}
                    className={`px-2.5 py-1 text-[11px] font-medium transition hover:opacity-80 ${QUOTE_STYLE[q.status]}`}
                    title="กดเพื่อเปลี่ยนสถานะ"
                  >
                    {q.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
