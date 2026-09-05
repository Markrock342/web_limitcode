"use client";

import { useEffect, useMemo, useState } from "react";
import { DEMOS, type DemoCategory } from "@/lib/demos";
import { OSS_KIND_ORDER, type OssKind } from "@/lib/open-source-demos";
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
  const [ossKind, setOssKind] = useState<"all" | OssKind>("all");

  useEffect(() => {
    if (active !== "โอเพนซอร์ส") setOssKind("all");
  }, [active]);

  const list = useMemo(() => {
    const base = active === "all" ? DEMOS : DEMOS.filter((d) => d.category === active);
    if (active !== "โอเพนซอร์ส" || ossKind === "all") return base;
    return base.filter((d) => d.openSource?.kind === ossKind);
  }, [active, ossKind]);

  const ossKindsPresent = useMemo(() => {
    const kinds = new Set(
      DEMOS.filter((d) => d.category === "โอเพนซอร์ส" && d.openSource?.kind).map(
        (d) => d.openSource!.kind as OssKind,
      ),
    );
    return OSS_KIND_ORDER.filter((k) => kinds.has(k));
  }, []);

  const chip = (pressed: boolean) =>
    `px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
      pressed
        ? "bg-brand-600 text-white"
        : "border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
    }`;

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
              className={chip(isActive)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {active === "โอเพนซอร์ส" ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOssKind("all")}
            aria-pressed={ossKind === "all"}
            className={chip(ossKind === "all")}
          >
            {t.showcase.all}
          </button>
          {ossKindsPresent.map((kind) => {
            const pressed = ossKind === kind;
            return (
              <button
                key={kind}
                type="button"
                onClick={() => setOssKind(kind)}
                aria-pressed={pressed}
                className={chip(pressed)}
              >
                {t.showcase.ossKinds[kind].short}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
        {list.length} {active === "โอเพนซอร์ส" ? t.showcase.ossBadge : t.showcase.all}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <DemoCard key={d.slug} demo={d} />
        ))}
      </div>
    </div>
  );
}
