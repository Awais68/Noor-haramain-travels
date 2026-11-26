"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`flex items-center gap-3 text-[13px] font-semibold ${light ? "text-gold-light" : "text-gold-dark"}`}>
      <span className="h-px w-8 bg-current opacity-70" />
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center [&>span]:justify-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`font-display mt-4 text-[clamp(34px,4.4vw,54px)] font-semibold leading-[1.05] [text-wrap:balance] ${
          light ? "text-ivory" : "text-forest-900"
        }`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-5 text-[17px] leading-relaxed ${light ? "text-ivory/75" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}
