"use client";

import { type CSSProperties, type PointerEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  href?: string;
  external?: boolean;
};

export function ChannelCard({ children, className = "", delay = 0, href, external }: Props) {
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - py) * 9).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * 11).toFixed(2)}deg`);
    el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
  };

  const reset = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
  };

  const style = delay ? ({ animationDelay: `${delay}ms` } satisfies CSSProperties) : undefined;
  const cls = `contact-card group relative overflow-hidden ${className}`;
  const extras = (
    <>
      <span className="spot-overlay" />
      <span className="status-run" />
      <span aria-hidden className="pointer-events-none absolute inset-0 z-2">
        <span className="absolute left-0 top-0 size-2.5 border-l-[1.5px] border-t-[1.5px] border-brand-400/70" />
        <span className="absolute right-0 top-0 size-2.5 border-r-[1.5px] border-t-[1.5px] border-brand-400/70" />
        <span className="absolute bottom-0 left-0 size-2.5 border-b-[1.5px] border-l-[1.5px] border-brand-400/70" />
        <span className="absolute right-0 bottom-0 size-2.5 border-b-[1.5px] border-r-[1.5px] border-brand-400/70" />
      </span>
    </>
  );

  const bind = {
    onPointerMove,
    onPointerLeave: reset,
    onPointerCancel: reset,
    className: cls,
    style,
  };

  if (href) {
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...bind}>
        {extras}
        <div className="relative z-1">{children}</div>
      </a>
    );
  }

  return (
    <div {...bind}>
      {extras}
      <div className="relative z-1">{children}</div>
    </div>
  );
}
