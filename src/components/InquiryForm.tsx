"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { packages, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./FloatingWhatsApp";

type Values = { name: string; phone: string; email: string; pkg: string; travellers: string; month: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const months = ["Flexible", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 3) e.name = "Please enter your full name.";
  const digits = v.phone.replace(/[\s-]/g, "");
  if (!/^(\+92|0092|0)?3\d{9}$/.test(digits) && !/^\+\d{10,15}$/.test(digits))
    e.phone = "Enter a valid mobile number, e.g. 0300 1234567.";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "That email doesn't look right.";
  const t = Number(v.travellers);
  if (!Number.isInteger(t) || t < 1 || t > 40) e.travellers = "Between 1 and 40 travellers.";
  if (!v.pkg) e.pkg = "Choose a package or 'Not sure yet'.";
  return e;
}

export default function InquiryForm({ defaultPkg = "", compact = false, onDone }: { defaultPkg?: string; compact?: boolean; onDone?: () => void }) {
  const uid = useId();
  const [v, setV] = useState<Values>({ name: "", phone: "", email: "", pkg: defaultPkg, travellers: "2", month: "Flexible", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => setV((s) => ({ ...s, pkg: defaultPkg })), [defaultPkg]);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Values) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(v));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    setTouched({ name: true, phone: true, email: true, pkg: true, travellers: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    // Frontend demo: no data leaves the browser. Connect a CRM / API here.
    setTimeout(() => setStatus("done"), 1100);
  };

  const waText = `Assalamu alaikum, my name is ${v.name}. I'm interested in: ${v.pkg || "a package"} for ${v.travellers} traveller(s), month: ${v.month}. ${v.message}`.trim();

  const field = "w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-ink outline-none transition placeholder:text-muted/60 focus:border-gold focus:ring-4 focus:ring-gold/15";
  const err = (k: keyof Values) => (touched[k] && errors[k] ? "border-red-400" : "border-forest-900/15");
  const Msg = ({ k }: { k: keyof Values }) =>
    touched[k] && errors[k] ? <p id={`${uid}-${k}-err`} className="mt-1.5 text-[13px] text-red-600">{errors[k]}</p> : null;

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-forest-600" />
        <h3 className="font-display mt-4 text-3xl font-semibold text-forest-900">JazakAllahu khayran, {v.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          Your inquiry is ready. In this demo nothing is sent to a server — continue on WhatsApp to reach an advisor directly.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#1f9d55] px-6 py-3.5 font-semibold text-white">
            <WhatsAppIcon className="h-5 w-5" /> Continue on WhatsApp
          </a>
          <button type="button" onClick={() => { setStatus("idle"); onDone?.(); }} className="rounded-full border border-forest-900/20 px-6 py-3.5 font-semibold text-forest-900">
            {onDone ? "Close" : "Send another"}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-[14px] font-medium">Full name<span className="text-red-600">*</span></label>
          <input id={`${uid}-name`} autoComplete="name" value={v.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={!!(touched.name && errors.name)} aria-describedby={`${uid}-name-err`} className={`${field} ${err("name")}`} placeholder="Muhammad Ahmed" />
          <Msg k="name" />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-[14px] font-medium">Mobile / WhatsApp<span className="text-red-600">*</span></label>
          <input id={`${uid}-phone`} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} onBlur={blur("phone")} aria-invalid={!!(touched.phone && errors.phone)} aria-describedby={`${uid}-phone-err`} className={`${field} ${err("phone")}`} placeholder="0300 1234567" />
          <Msg k="phone" />
        </div>
      </div>
      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        <div className={compact ? "sm:col-span-2" : ""}>
          <label htmlFor={`${uid}-pkg`} className="mb-1.5 block text-[14px] font-medium">Package<span className="text-red-600">*</span></label>
          <select id={`${uid}-pkg`} value={v.pkg} onChange={set("pkg")} onBlur={blur("pkg")} aria-invalid={!!(touched.pkg && errors.pkg)} className={`${field} ${err("pkg")}`}>
            <option value="">Select…</option>
            <option>Not sure yet</option>
            {packages.map((p) => <option key={p.slug}>{p.name}</option>)}
          </select>
          <Msg k="pkg" />
        </div>
        <div>
          <label htmlFor={`${uid}-travellers`} className="mb-1.5 block text-[14px] font-medium">Travellers</label>
          <input id={`${uid}-travellers`} type="number" min={1} max={40} value={v.travellers} onChange={set("travellers")} onBlur={blur("travellers")} className={`${field} ${err("travellers")}`} />
          <Msg k="travellers" />
        </div>
        <div>
          <label htmlFor={`${uid}-month`} className="mb-1.5 block text-[14px] font-medium">Preferred month</label>
          <select id={`${uid}-month`} value={v.month} onChange={set("month")} className={`${field} border-forest-900/15`}>
            {months.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className="mb-1.5 block text-[14px] font-medium">Email <span className="text-muted">(optional)</span></label>
        <input id={`${uid}-email`} type="email" autoComplete="email" value={v.email} onChange={set("email")} onBlur={blur("email")} className={`${field} ${err("email")}`} placeholder="you@example.com" />
        <Msg k="email" />
      </div>
      <div>
        <label htmlFor={`${uid}-message`} className="mb-1.5 block text-[14px] font-medium">Anything we should know?</label>
        <textarea id={`${uid}-message`} rows={compact ? 2 : 4} value={v.message} onChange={set("message")} className={`${field} border-forest-900/15 resize-y`} placeholder="Elderly parents, wheelchair assistance, preferred hotels, dates…" />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-gold mt-1 flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold disabled:opacity-70">
        {status === "sending" ? <><Loader2 className="h-5 w-5 animate-spin" /> Preparing your inquiry…</> : "Send Inquiry"}
      </button>
      <p className="text-center text-[12px] text-muted">Demo form — your details stay in your browser.</p>
    </form>
  );
}

export function InquiryModal({ pkg, onClose }: { pkg: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!pkg) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [pkg, onClose]);

  return (
    <AnimatePresence>
      {pkg && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-end bg-forest-950/70 p-0 backdrop-blur-sm sm:place-items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inq-title"
            initial={{ y: 60, opacity: 0, rotateX: 8 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-[26px] bg-ivory p-6 sm:rounded-[26px] sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold text-gold-dark">Package inquiry</p>
                <h2 id="inq-title" className="font-display text-3xl font-semibold text-forest-900">{pkg}</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-forest-900/15"><X className="h-5 w-5" /></button>
            </div>
            <InquiryForm defaultPkg={pkg} compact onDone={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
