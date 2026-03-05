# MusicForge MVP

A Next.js 14 B2C SaaS platform for independent musicians to manage their music catalog, upload tracks with royalty splits, view stream analytics, and manage transparent financials.

## Features

- **Authentication & User Management:** Powered by Clerk with premium dark theme integration.
- **Database & Storage:** Supabase for PostgreSQL, AWS S3 for direct file uploads.
- **Subscriptions & Billing:** Stripe integration with checkout and billing portals.
- **Catalog Management:** Secure track uploads with presigned S3 URLs and drag-and-drop UI.
- **Transparency & Royalties:** Advanced split validation up to 10 collaborators, with interactive doughnut charts.
- **Analytics:** View stream counts and earnings over time through gradient area charts.
- **Premium UI:** Glassmorphism design system, micro-animations, gradient accents, and responsive layouts.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui + custom glassmorphism design system
- **Icons:** Lucide React
- **Charts:** Chart.js + react-chartjs-2
- **Auth:** Clerk (with dark theme)
- **DB:** Supabase (PostgreSQL)
- **Payments:** Stripe
- **Storage:** AWS S3
- **Deployment:** Vercel

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

## Deploying to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect the Next.js framework

3. **Configure Environment Variables:**
   Add all variables from `.env.local.example` to your Vercel project settings:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` → `/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` → `/sign-up`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` → `/dashboard`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` → `/dashboard`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_S3_BUCKET_NAME`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRO_PRICE_ID`
   - `NEXT_PUBLIC_APP_URL` → `https://your-vercel-domain.vercel.app`

4. **Deploy:** Click "Deploy" and Vercel handles the rest.

5. **Update Webhook URLs:**
   After deployment, update your Clerk and Stripe webhook endpoints to use your Vercel domain.

## Production Build

To build the application locally for production:
```bash
pnpm build
pnpm start
```

## Testing

The project uses Jest and React Testing Library for automated tests.
```bash
pnpm test
```
