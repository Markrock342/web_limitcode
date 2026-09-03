"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export function ContactMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    let pointerX = -9999;
    let pointerY = -9999;
    let hasPointer = false;

    const spawn = () => {
      const area = w * h;
      const count = Math.max(18, Math.min(56, Math.round(area / 18000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const link = 118;
      const attract = hasPointer ? 96 : 0;

      for (const n of nodes) {
        if (hasPointer) {
          const dx = pointerX - n.x;
          const dy = pointerY - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < attract * attract && d2 > 16) {
            const d = Math.sqrt(d2);
            n.vx += (dx / d) * 0.012;
            n.vy += (dy / d) * 0.012;
          }
        }
        n.vx *= 0.992;
        n.vy *= 0.992;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -8) n.x = w + 8;
        if (n.x > w + 8) n.x = -8;
        if (n.y < -8) n.y = h + 8;
        if (n.y > h + 8) n.y = -8;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > link) continue;
          const alpha = (1 - dist / link) * 0.22;
          ctx.strokeStyle = `rgba(20, 121, 239, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(11, 97, 214, 0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (hasPointer) {
        ctx.fillStyle = "rgba(54, 196, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(pointerX, pointerY, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      hasPointer = true;
    };
    const onLeave = () => {
      hasPointer = false;
      pointerX = -9999;
      pointerY = -9999;
    };

    const vis = () => {
      running = document.visibilityState === "visible";
      if (running && !raf) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    raf = requestAnimationFrame(draw);

    parent.addEventListener("pointermove", onPointer, { passive: true });
    parent.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", vis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("pointermove", onPointer);
      parent.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
