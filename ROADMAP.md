# Booking Form — Roadmap & Future Goals

## Immediate Next Steps (High Impact, Low Effort)

### 1. Backend Integration
- **API Route:** `POST /api/bookings` to receive form payload
- **Database:** Store bookings with Prisma + PostgreSQL (or Supabase)
- **Validation:** Zod schema for all 7 steps before submission
- **Confirmation email:** SendGrid / Resend integration on successful booking

### 2. Persistent Form State
- Save draft to `localStorage` so users don't lose progress on refresh
- Optional: save to server if user provides email early

### 3. Real Pricing Engine
- Replace mock pricing with actual service rates from database
- Promo code / discount code field
- Dynamic pricing based on ZIP code / travel distance

### 4. Payment Integration
- Stripe Checkout or Stripe Elements on Step 7
- Support for deposits (pay 50% now, rest later)
- Invoice generation for corporate clients

## Medium-Term Features

### 5. Availability Calendar
- Connect Step 6 (Date & Time) to real cleaner availability
- Block out dates when no cleaners are available
- Show "Only 2 slots left" urgency messaging

### 6. Customer Accounts
- "Save my info" checkbox → create lightweight account
- Booking history page for returning customers
- Re-book previous service with one click

### 7. SMS Notifications
- Twilio integration for booking confirmations
- Reminder texts 24h before appointment
- "Cleaner is on the way" notification

### 8. Multi-Location Support
- Add a location selector for businesses with multiple service areas
- ZIP code validation before showing available services

## Long-Term Vision

### 9. Mobile App
- React Native or Expo app using shared components
- Push notifications for cleaners and customers
- Photo upload for before/after cleaning documentation

### 10. AI Chat Assistant
- Embedded chat widget on the booking form
- Answers common questions ("What's the difference between Standard and Deep?")
- Helps customers choose the right service

### 11. Reviews & Ratings
- Post-cleaning review request (email/SMS)
- Star ratings + photo reviews displayed on booking page
- Social proof increases conversion

## Technical Debt & Quality

- [ ] Add Jest + React Testing Library for step components
- [ ] Add Playwright E2E tests for full booking flow
- [ ] Accessibility audit (keyboard navigation, ARIA labels, color contrast)
- [ ] Performance: lazy-load heavy steps, optimize bundle size
- [ ] Analytics: Google Analytics 4 or Mixpanel events per step (track drop-off)
- [ ] SEO: meta tags, structured data for local business
