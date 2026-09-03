"use client";

import { motion, useMotionValue, useReducedMotion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const easeOutQuart = [0.25, 1, 0.5, 1] as const;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
};

export function ChannelCard({ children, className = "", href, external }: Props) {
  const reduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateX.set((0.5 - py) * 9);
    rotateY.set((px - 0.5) * 11);
    el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
  };

  const reset = (e: PointerEvent<HTMLElement>) => {
    rotateX.set(0);
    rotateY.set(0);
    e.currentTarget.style.setProperty("--spot-x", "50%");
    e.currentTarget.style.setProperty("--spot-y", "50%");
  };

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

  const classNameFull = `contact-card group relative overflow-hidden ${className}`;
  const motionProps = {
    className: classNameFull,
    onPointerMove,
    onPointerLeave: reset,
    onPointerCancel: reset,
    style: reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 },
    variants: reduced
      ? undefined
      : {
          hidden: { opacity: 0, y: 22 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: easeOutExpo },
          },
        },
    whileHover: reduced ? undefined : { y: -6 },
    whileTap: reduced ? undefined : { scale: 0.985 },
    transition: { type: "tween" as const, duration: 0.38, ease: easeOutQuart },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...motionProps}
      >
        {extras}
        <div className="relative z-1">{children}</div>
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps}>
      {extras}
      <div className="relative z-1">{children}</div>
    </motion.div>
  );
}
