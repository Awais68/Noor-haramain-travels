# Nurul Haramain — Hajj & Umrah travel website (frontend demo)

A cinematic, fully responsive frontend for a Karachi-based Hajj and Umrah agency.
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · React Three Fiber.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
# production
npm run build && npm start
```

Node 18.18+ (Node 20/22 recommended).

## Pages

| Route | What's on it |
| --- | --- |
| `/` | 3D gate-opening intro, cinematic hero with gold-dust Three.js layer, trust strip, featured packages, Makkah & Madinah parallax sections, journey timeline, services, photo ribbon, testimonials (demo), CTA |
| `/packages` | Umrah + Hajj packages with working filters (type, tier, duration, sort), expandable inclusions, inquiry modal, room-sharing guide, Hajj arrangements section. `?type=Umrah` / `?type=Hajj` deep links |
| `/hotels` | Makkah & Madinah hotels, city + category filters, availability inquiry. `?city=Makkah` / `?city=Madinah` |
| `/about` | Introduction, mission, commitments, service process |
| `/contact` | WhatsApp CTA, office details, business hours, map placeholder, validated inquiry form |

## Customise before showing to the client

Everything lives in **`src/lib/site.ts`**:

- `site` — phone, WhatsApp number, email, address, business hours (all placeholders now).
- `site.heroVideo` — put a **licensed** Masjid an-Nabawi clip at `public/video/hero.mp4`
  (H.264, 1080p/4K, ~6–10 MB, muted) and set `heroVideo: "/video/hero.mp4"`. The photo is used as poster/fallback.
- `photos` — Unsplash photo IDs (real photographs, Unsplash License). Swap IDs or replace with your own files.
- `packages`, `hotels` — sample data. Prices are marked "sample" in the UI.

## Notes

- Forms are frontend-only: validation runs in the browser and the success state hands the inquiry to WhatsApp. Wire `InquiryForm.submit` to an API/CRM when needed.
- The intro gate plays once per browser session and is skipped for users with reduced-motion enabled.
- The Three.js layer is lazy-loaded, uses fewer particles on mobile and is skipped on low-core devices.
- Demo labels are shown on sample prices, hotels, testimonials and business details — remove them only when real, verified content replaces them.
