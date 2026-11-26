"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Entrance sequence: two ornamental gate leaves with an abstract geometric
 * lattice swing open in 3D to reveal the hero. The leaves are decorative and
 * do not depict or imitate any real door or sacred inscription.
 */
function Leaf({ side }: { side: "left" | "right" }) {
  const id = `lat-${side}`;
  return (
    <svg viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#c9a86a" strokeWidth="1" opacity=".55">
            <path d="M32 4l8 20 20 8-20 8-8 20-8-20-20-8 20-8z" />
            <rect x="14" y="14" width="36" height="36" transform="rotate(45 32 32)" />
            <circle cx="32" cy="32" r="5" />
          </g>
        </pattern>
        <linearGradient id={`${id}-g`} x1={side === "left" ? "0" : "1"} x2={side === "left" ? "1" : "0"}>
          <stop offset="0" stopColor="#04190f" />
          <stop offset="1" stopColor="#0b3324" />
        </linearGradient>
      </defs>
      <rect width="400" height="900" fill={`url(#${id}-g)`} />
      <rect width="400" height="900" fill={`url(#${id})`} />
      {/* inner arched panel */}
      <path
        d={side === "left" ? "M60 860V300a240 240 0 0 1 340-218" : "M340 860V300A240 240 0 0 0 0 82"}
        fill="none"
        stroke="#e6d09f"
        strokeWidth="2"
        opacity=".8"
      />
      <path
        d={side === "left" ? "M90 860V310a210 210 0 0 1 310-190" : "M310 860V310A210 210 0 0 0 0 120"}
        fill="none"
        stroke="#c9a86a"
        strokeWidth="1"
        opacity=".55"
      />
      {/* door edge */}
      <rect x={side === "left" ? 392 : 0} width="8" height="900" fill="#c9a86a" opacity=".85" />
      {/* handle */}
      <circle cx={side === "left" ? 360 : 40} cy="520" r="14" fill="none" stroke="#e6d09f" strokeWidth="2.5" />
    </svg>
  );
}

export default function Gate({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"closed" | "opening" | "done">("closed");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("nh-gate") === "1";
    } catch {}
    if (reduce || seen) {
      setPhase("done");
      onOpen();
      return;
    }
    const t1 = setTimeout(() => setPhase("opening"), 1500);
    const t2 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("nh-gate", "1");
      } catch {}
    }, 3300);
    const t3 = setTimeout(onOpen, 1700);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [reduce, onOpen]);

  const skip = () => {
    setPhase("done");
    onOpen();
    try {
      sessionStorage.setItem("nh-gate", "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[60] [perspective:1800px]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="presentation"
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 origin-left shadow-[30px_0_60px_rgba(0,0,0,.5)] [backface-visibility:hidden]"
            animate={phase === "opening" ? { rotateY: -105 } : { rotateY: 0 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <Leaf side="left" />
          </motion.div>
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 origin-right shadow-[-30px_0_60px_rgba(0,0,0,.5)] [backface-visibility:hidden]"
            animate={phase === "opening" ? { rotateY: 105 } : { rotateY: 0 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <Leaf side="right" />
          </motion.div>

          {/* light spilling through the seam */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gold-light"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={phase === "opening" ? { opacity: 0, width: 400 } : { opacity: 1, scaleY: 1 }}
            transition={{ duration: phase === "opening" ? 0.9 : 1, ease: "easeOut" }}
            style={{ boxShadow: "0 0 60px 20px rgba(230,208,159,.55)" }}
          />

          <motion.div
            className="absolute inset-0 grid place-items-center text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={phase === "opening" ? { opacity: 0, scale: 1.1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="font-arabic text-[clamp(40px,7vw,72px)] leading-none text-gold-light drop-shadow-[0_0_24px_rgba(230,208,159,.4)]" lang="ar" dir="rtl">
                {site.arabic}
              </p>
              <p className="font-display mt-4 text-sm tracking-[0.5em] text-ivory/80">NURUL HARAMAIN</p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={skip}
            className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 px-5 py-2 text-xs text-ivory/80 hover:text-ivory"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
