"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { nav, site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./FloatingWhatsApp";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-x-0 border-t-0 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,.6)]" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="Nurul Haramain home" className="rounded-md">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-4 py-2 text-[14px] font-medium tracking-wide transition-colors ${
                  isActive(n.href) ? "text-gold-light" : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {n.label}
                {isActive(n.href) && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2 text-[13px] text-ivory/80 hover:text-ivory">
              <Phone className="h-4 w-4 text-gold" /> {site.phoneDisplay}
            </a>
            <Link href="/contact" className="btn-gold rounded-full px-5 py-2.5 text-[14px] font-semibold">
              Talk to an Advisor
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-ivory lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[45] flex flex-col bg-forest-950 px-6 pb-10 pt-28 lg:hidden"
          >
            <div className="lattice pointer-events-none absolute inset-0 opacity-[0.07]" />
            <nav aria-label="Mobile" className="relative flex flex-col">
              {nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <Link
                    href={n.href}
                    className={`flex items-baseline justify-between border-b border-gold/15 py-4 font-display text-[34px] ${
                      isActive(n.href) ? "text-gold-light" : "text-ivory"
                    }`}
                  >
                    {n.label}
                    <span className="font-sans text-xs text-gold/70">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative mt-auto grid gap-3">
              <a
                href={waLink("Assalamu alaikum, I would like to ask about Umrah/Hajj packages.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#1f9d55] py-3.5 font-semibold text-white"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp an advisor
              </a>
              <a href={`tel:${site.phoneHref}`} className="flex items-center justify-center gap-2 rounded-full border border-gold/40 py-3.5 text-ivory">
                <Phone className="h-4 w-4 text-gold" /> {site.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
