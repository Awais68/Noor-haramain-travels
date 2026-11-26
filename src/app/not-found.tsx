import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden bg-forest-950 px-5 pt-24 text-center text-ivory">
      <div className="lattice absolute inset-0 opacity-[0.07]" />
      <div className="relative">
        <p className="font-display text-8xl text-gold">404</p>
        <h1 className="font-display mt-2 text-4xl">This page could not be found.</h1>
        <p className="mt-3 text-ivory/70">The path may have changed. Let us guide you back.</p>
        <Link href="/" className="btn-gold mt-8 inline-block rounded-full px-7 py-3.5 font-semibold">Return home</Link>
      </div>
    </section>
  );
}
