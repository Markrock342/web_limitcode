"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function VisitorCount() {
  const { t, locale } = useLocale();
  const [count, setCount] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    let mounted = true;

    async function loadCount() {
      try {
        const response = await fetch("/api/visitors", { signal: controller.signal });
        if (!response.ok) throw new Error("Visitor count unavailable");
        const payload: { visitors?: unknown } = await response.json();
        if (typeof payload?.visitors !== "number" || !Number.isSafeInteger(payload.visitors) || payload.visitors < 0) {
          throw new Error("Invalid visitor count");
        }
        if (mounted) setCount(payload.visitors);
      } catch {
        if (mounted) setUnavailable(true);
      } finally {
        clearTimeout(timeout);
      }
    }

    void loadCount();
    return () => {
      mounted = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const label = unavailable ? t.footer.visitorsUnavailable : t.footer.visitors;
  const value = count === null ? (unavailable ? "—" : "…") : new Intl.NumberFormat(locale).format(count);

  return (
    <span
      role="status"
      aria-label={`${label}: ${value}`}
      title={label}
      className="inline-flex items-center gap-1.5 text-xs leading-5 text-slate-500 tabular-nums"
    >
      <Eye className="size-3.5" aria-hidden="true" />
      <span aria-hidden="true">: {value}</span>
    </span>
  );
}
