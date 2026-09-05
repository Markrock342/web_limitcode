"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { analyticsRegion, trackConversion, type ConversionEvent } from "@/lib/analytics";

export function AnalyticsTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-track-event]");
      if (!tracked) return;

      const eventName = tracked.dataset.trackEvent as ConversionEvent | undefined;
      if (!eventName) return;

      trackConversion(eventName, {
        source: tracked.dataset.trackSource ?? analyticsRegion(tracked),
        item: tracked.dataset.trackItem ?? null,
        kind: tracked.dataset.trackKind ?? null,
        label: tracked.dataset.trackLabel ?? null,
      });
    };

    document.addEventListener("click", handleClick, { capture: true });

    const viewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const tracked = entry.target as HTMLElement;
          const eventName = tracked.dataset.trackView as ConversionEvent | undefined;
          if (!eventName) return;

          trackConversion(eventName, {
            source: tracked.dataset.trackSource ?? analyticsRegion(tracked),
            item: tracked.dataset.trackItem ?? null,
          });
          viewObserver.unobserve(tracked);
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll<HTMLElement>("[data-track-view]").forEach((element) => viewObserver.observe(element));

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      viewObserver.disconnect();
    };
  }, []);

  return <Analytics />;
}
