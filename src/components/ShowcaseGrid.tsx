"use client";

import { useMemo, useState } from "react";
import { DEMOS, type DemoCategory } from "@/lib/demos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { DemoCard } from "./DemoCard";

const FILTER_KEYS: ("all" | DemoCategory)[] = [
  "all",
  "ลูกค้าของเรา",
  "อสังหาริมทรัพย์",
  "เว็บบริษัท",
  "ขายของ",
  "ร้านอาหาร",
  "จองบริการ",
  "ระบบหลังบ้าน",
  "โอเพนซอร์ส",
];

export function ShowcaseGrid() {
  const { t } = useLocale();
  const [active, setActive] = useState<(typeof FILTER_KEYS)[number]>("all");

  const list = useMemo(
    () => (active === "all" ? DEMOS : DEMOS.filter((d) => d.category === active)),
    [active],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTER_KEYS.map((f) => {
          const isActive = active === f;
          const label = f === "all" ? t.showcase.all : t.showcase.categories[f];
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={`px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <DemoCard key={d.slug} demo={d} />
        ))}
      </div>
    </div>
  );
}
