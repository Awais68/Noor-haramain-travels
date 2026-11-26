export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-forest-950" role="status" aria-label="Loading">
      <svg viewBox="0 0 48 48" className="h-14 w-14 animate-spin [animation-duration:2.4s]" aria-hidden="true">
        <g fill="none" stroke="#c9a86a" strokeWidth="1.6">
          <rect x="10" y="10" width="28" height="28" />
          <rect x="10" y="10" width="28" height="28" transform="rotate(45 24 24)" />
        </g>
      </svg>
    </div>
  );
}
