"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import Photo from "./Photo";
import type { PhotoKey } from "@/lib/site";

export default function PageHeader({
  title,
  arabic,
  intro,
  photo,
  crumb,
}: {
  title: string;
  arabic?: string;
  intro: string;
  photo: PhotoKey;
  crumb: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[68svh] items-end overflow-hidden bg-forest-950 pb-14 pt-36 md:min-h-[72svh] md:pb-20">
      <motion.div style={{ y }} className="absolute inset-0">
        <Photo k={photo} priority className="h-full w-full scale-110" credit />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/30" />
      <div className="lattice absolute inset-0 opacity-[0.06]" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[13px] text-ivory/70">
          <Link href="/" className="hover:text-gold-light">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-gold" />
          <span aria-current="page" className="text-gold-light">{crumb}</span>
        </nav>
        {arabic && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1 }} className="font-arabic text-2xl text-gold" lang="ar" dir="rtl" style={{ textAlign: "left" }}>
            {arabic}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-2 max-w-3xl text-[clamp(42px,6vw,76px)] font-semibold leading-[1.02] text-ivory [text-wrap:balance]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-[17px] leading-relaxed text-ivory/80"
        >
          {intro}
        </motion.p>
      </motion.div>
    </section>
  );
}
