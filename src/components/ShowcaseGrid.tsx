"use client";

import { useMemo, useState } from "react";
import { DEMOS, type DemoCategory } from "@/lib/demos";
import { DemoCard } from "./DemoCard";

const FILTERS: ("ทั้งหมด" | DemoCategory)[] = [
  "ทั้งหมด",
  "ลูกค้าของเรา",
  "อสังหาริมทรัพย์",
  "เว็บบริษัท",
  "ขายของ",
  "ร้านอาหาร",
  "จองบริการ",
  "ระบบหลังบ้าน",
];

export function ShowcaseGrid() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("ทั้งหมด");

  const list = useMemo(
    () => (active === "ทั้งหมด" ? DEMOS : DEMOS.filter((d) => d.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-brand-600 text-white shadow-soft"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <DemoCard key={d.slug} demo={d} />
        ))}
      </div>
    </div>
  );
}
