import { track } from "@vercel/analytics";

export type ConversionEvent = "line_click" | "work_open" | "pricing_view";
export type ConversionProperties = Record<string, string | number | boolean | null>;

export function trackConversion(event: ConversionEvent, properties: ConversionProperties = {}) {
  if (typeof window === "undefined") return;

  const detail = {
    ...properties,
    locale: document.documentElement.dataset.locale ?? "unknown",
  };

  try {
    track(event, detail);
  } catch {
    // Analytics must never interrupt navigation or a conversion action.
  }

  window.dispatchEvent(new CustomEvent("lcs:conversion", { detail: { event, properties: detail } }));
}

export function analyticsRegion(element: HTMLElement, fallback = "unknown") {
  return element.closest<HTMLElement>("[data-analytics-region]")?.dataset.analyticsRegion ?? fallback;
}
