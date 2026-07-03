"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
};

/** การ์ดที่มีแสง spotlight ตามตำแหน่งเคอร์เซอร์ (ผ่าน CSS vars --spot-x / --spot-y) */
export function SpotlightCard({ children, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      }}
      className={`group relative ${className}`}
    >
      {children}
      <span aria-hidden className="spot-overlay" />
    </Tag>
  );
}
