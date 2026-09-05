"use client";

import { useMemo, useState } from "react";
import { DEMOS, type DemoCategory } from "@/lib/demos";
import { OSS_KIND_ORDER, type OssKind } from "@/lib/open-source-demos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { DemoCard } from "./DemoCard";

const STUDIO_FILTERS: DemoCategory[] = [
  "ลูกค้าของเรา",
  "อสังหาริมทรัพย์",
  "เว็บบริษัท",
  "ขายของ",
  "ร้านอาหาร",
  "จองบริการ",
  "ระบบหลังบ้าน",
];

type FilterKey = "all" | DemoCategory | OssKind;

function isOssKind(key: FilterKey): key is OssKind {
  return (OSS_KIND_ORDER as string[]).includes(key);
}

export function ShowcaseGrid() {
  const { t } = useLocale();
  const [active, setActive] = useState<FilterKey>("all");

  const ossKindsPresent = useMemo(() => {
    const kinds = new Set(
      DEMOS.filter((d) => d.openSource?.kind).map((d) => d.openSource!.kind as OssKind),
    );
    return OSS_KIND_ORDER.filter((k) => kinds.has(k));
  }, []);

  const filters = useMemo<FilterKey[]>(
    () => ["all", ...STUDIO_FILTERS, ...ossKindsPresent],
    [ossKindsPresent],
  );

  const list = useMemo(() => {
    if (active === "all") return DEMOS;
    if (isOssKind(active)) {
      return DEMOS.filter((d) => d.openSource?.kind === active);
    }
    return DEMOS.filter((d) => d.category === active);
  }, [active]);

  const countLabel = isOssKind(active)
    ? t.showcase.ossKinds[active].short
    : active === "all"
      ? t.showcase.all
      : t.showcase.categories[active];

  const chip = (pressed: boolean) =>
    `px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
      pressed
        ? "bg-brand-600 text-white"
        : "border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = active === f;
          const label =
            f === "all"
              ? t.showcase.all
              : isOssKind(f)
                ? t.showcase.ossKinds[f].short
                : t.showcase.categories[f];
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

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
        {list.length} {countLabel}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <DemoCard key={d.slug} demo={d} />
        ))}
      </div>
    </div>
  );
}
