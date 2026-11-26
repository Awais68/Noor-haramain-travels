"use client";

import { useEffect, useRef } from "react";

/**
 * Champagne-gold light motes drifting upward with gentle pointer parallax.
 *
 * Rendered on a plain 2D canvas with additive blending (`lighter`) and a
 * cached radial-gradient sprite — visually equivalent to the previous
 * Three.js implementation, but without shipping ~220 KB (gzip) of WebGL
 * runtime. Pauses when the tab is hidden and honours reduced-motion.
 */
export default function GoldDust({ count = 420 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Pre-render one soft gold mote to an offscreen sprite we can stamp cheaply.
    const SPRITE = 64;
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE;
    const sctx = sprite.getContext("2d")!;
    const grd = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
    grd.addColorStop(0, "rgba(255,240,205,1)");
    grd.addColorStop(0.35, "rgba(230,200,140,0.55)");
    grd.addColorStop(1, "rgba(201,168,106,0)");
    sctx.fillStyle = grd;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    type Mote = { x: number; y: number; z: number; r: number; vy: number; phase: number };
    const motes: Mote[] = Array.from({ length: count }, () => {
      const z = 0.3 + Math.random() * 0.7; // depth → size + speed + parallax
      return {
        x: Math.random(),
        y: Math.random(),
        z,
        r: (2 + Math.random() * 5) * z,
        vy: (0.004 + Math.random() * 0.012) * z,
        phase: Math.random() * Math.PI * 2,
      };
    });

    // Pointer parallax target, eased each frame.
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let running = true;
    let t = 0;

    const frame = () => {
      if (!running) return;
      t += 0.016;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const m of motes) {
        if (!reduce) {
          m.y -= m.vy;
          if (m.y < -0.05) m.y = 1.05;
        }
        const sway = Math.sin(t * 0.6 + m.phase) * 0.004;
        const drawX = (m.x + sway) * w + px * 26 * m.z;
        const drawY = m.y * h + py * 14 * m.z;
        const s = m.r * 2;
        ctx.globalAlpha = 0.85 * m.z;
        ctx.drawImage(sprite, drawX - m.r, drawY - m.r, s, s);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
