# MusicForge MVP

A Next.js 14 B2C SaaS platform for independent musicians to manage their music catalog, upload tracks with royalty splits, view stream analytics, and manage transparent financials.

## Features

- **Authentication & User Management:** Powered by Clerk.
- **Database & Storage:** Supabase for PostgreSQL, AWS S3 for direct file uploads.
- **Subscriptions & Billing:** Stripe integration with checkout and billing portals.
- **Catalog Management:** Secure track uploads with presigned S3 URLs.
- **Transparency & Royalties:** Advanced split validation up to 10 collaborators, with interactive visual charts.
- **Analytics:** View stream counts and earnings over time through charts.
- **PWA Ready:** Installable as a Progressive Web App.

## Prerequisites

- Node.js 18+
- PNPM (recommended package manager)
- Accounts for: Clerk, Supabase, AWS, and Stripe.

## Getting Started

1. **Clone and Install:**
   ```bash
   git clone <repository-url>
   cd qlefpro
   pnpm install
   ```

2. **Environment Variables:**
   Copy `.env.local.example` to `.env.local` and fill in your keys.
   ```bash
   cp .env.local.example .env.local
   ```

3. **Database Setup (Supabase):**
   Run the migration files located in `supabase/migrations/` in your Supabase SQL Editor.
   - `001_create_users.sql`
   - `002_create_tracks.sql`
   - `003_create_stream_events.sql`
   - `004_seed_mock_data.sql` (Optional: for testing analytics)

4. **Webhooks Setup:**
   - **Clerk:** Set up a webhook pointing to `https://your-domain/api/webhooks/clerk` for `user.created`, `user.updated`, and `user.deleted` events. Provide the secret as `CLERK_WEBHOOK_SECRET`.
   - **Stripe:** Set up a webhook pointing to `https://your-domain/api/stripe/webhook` for `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`. Provide the secret as `STRIPE_WEBHOOK_SECRET`.

5. **Run the Development Server:**
   ```bash
   pnpm dev
   ```

## Production Build

To build the application for production:
```bash
pnpm build
pnpm start
```

## Testing

The project uses Jest and React Testing Library for automated tests.
```bash
pnpm test
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Charts:** Chart.js + react-chartjs-2
- **Auth:** Clerk
- **DB/Auth:** Supabase
- **Payments:** Stripe
- **Storage:** AWS S3
