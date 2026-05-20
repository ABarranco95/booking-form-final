# Booking Form — Public Booking UI

> Multi-step public booking form for cleaning services. Light mode, teal accent, 7-step flow with live price calculation.

## Tech Stack

- **Next.js 16** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **Geist** font (Next.js built-in)

## Project Structure

```
app/
├── layout.tsx              # Root layout — white bg, Geist font
├── page.tsx                # Main booking page — step router + layout
├── globals.css             # Tailwind imports + light theme
├── hooks/
│   └── useBookingForm.ts   # Central state for all 7 steps
├── components/
│   ├── Sidebar.tsx         # Desktop step sidebar (280px)
│   ├── MobileStepper.tsx   # Horizontal stepper for mobile
│   └── PriceSummary.tsx    # Sticky right panel with pricing + trust signals
└── steps/
    ├── Step1Service.tsx    # Service cards (Standard, Deep, Move-in/out, Post-Construction)
    ├── Step2Home.tsx       # Bed/bath counters, sqft, home type
    ├── Step3Frequency.tsx  # One-time / Weekly / Bi-weekly / Monthly
    ├── Step4Addons.tsx     # Add-on checkboxes (fridge, oven, cabinets, etc.)
    ├── Step5Pets.tsx       # Pet info (yes/no, count, type, shedding)
    ├── Step6DateTime.tsx   # Calendar picker + time slot chips
    └── Step7Confirm.tsx    # Summary + contact/address inputs + Book Now
```

## How to Run

```bash
cd booking-form-final
npm install
npm run dev          # localhost:3012
npm run build        # static export to ./dist
```

## How to Deploy

### Vercel (recommended)
```bash
npx vercel --prod
```

### Any static host (Netlify, Cloudflare Pages, etc.)
```bash
npm run build
# Upload ./dist folder
```

## Key Patterns

### Adding a New Step
1. Create `app/steps/Step8NewStep.tsx`
2. Add the step to `useBookingForm.ts`:
   - Extend `FormData` interface
   - Add validation in `canProceed()`
3. Wire it in `app/page.tsx` switch statement
4. Add label/icon in `app/components/Sidebar.tsx`

### Modifying Pricing
Edit `app/components/PriceSummary.tsx`. The formula is:
- Base price from selected service
- + $15 per bedroom, + $20 per bathroom
- + add-on prices
- × frequency multiplier (weekly 0.85, bi-weekly 0.90, monthly 0.95)

### Changing Services
Edit the `services` array in `app/steps/Step1Service.tsx`. Each service needs:
- `id`, `emoji`, `title`, `description`, `price`, `popular?`

## Known Limitations

- All data is client-side mock state. No backend/API integration yet.
- "Book Now" on Step 7 shows an `alert()` instead of submitting to a server.
- No form validation on contact fields (just visual inputs).
- No persistent storage (refresh loses progress).
- Images are unoptimized due to static export.

## Future Goals

See `ROADMAP.md` in this directory.
\n## 🚀 Live Demo\n\n**https://booking-form-final.vercel.app**\n
