"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/** Subtle 3D tilt on pointer devices; flat on touch and reduced motion. */
export default function Tilt({ children, className = "", max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const glare = useTransform([x, y] as never, ([a, b]: number[]) =>
    `radial-gradient(600px circle at ${a * 100}% ${b * 100}%, rgba(230,208,159,.18), transparent 40%)`
  );

  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
      {!reduce && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />}
    </motion.div>
  );
}
