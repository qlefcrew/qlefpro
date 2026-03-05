'use client'

import Link from 'next/link'
import { BarChart3, Shield, Zap, ArrowRight, Disc3, Headphones, TrendingUp, Users, ChevronRight, Music2, Layers } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

const features = [
  {
    icon: Music2,
    title: 'Upload & Distribute',
    description: 'Drag-and-drop your tracks. MP3 & WAV support with presigned cloud uploads up to 500MB.',
  },
  {
    icon: Shield,
    title: 'Transparent Royalties',
    description: 'Real-time split management with up to 10 collaborators. Every penny tracked.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Stream performance, earnings trends, geographic breakdowns, and platform metrics.',
  },
  {
    icon: Layers,
    title: 'Full Catalog Control',
    description: 'Manage your entire catalog, edit metadata, and track release status in one place.',
  },
]

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '12%', label: 'Platform Fee' },
  { value: '10', label: 'Max Splits' },
  { value: '500MB', label: 'Max File Size' },
]

export default function Home() {
  const { isSignedIn } = useAuth()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ─── Background ──────────────────────────────── */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* ─── Navigation ──────────────────────────────── */}
      <nav className="sticky top-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" id="nav-logo">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-black font-extrabold text-sm tracking-tighter">Q</span>
            </div>
            <span className="text-[17px] font-semibold tracking-tight">
              qlef<span className="font-bold">Pro</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                id="nav-dashboard-btn"
                className="px-4 py-2 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-white/90 transition-all active:scale-95"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  id="nav-signin-btn"
                  className="px-4 py-2 rounded-full text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  id="nav-signup-btn"
                  className="px-4 py-2 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-white/90 transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────── */}
      <section className="relative pt-20 sm:pt-28 pb-20 px-5" id="hero-section">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[13px] text-white/70 mb-8">
            <Headphones className="w-3.5 h-3.5" />
            <span>Built for Independent Artists</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
          </div>

          {/* Headline */}
          <h1 className="text-[44px] sm:text-[64px] md:text-[72px] font-extrabold tracking-[-0.04em] leading-[0.95] mb-6">
            Distribute.
            <br />
            <span className="gradient-text-brand">Split. Grow.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[16px] sm:text-[18px] text-white/50 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
            The all-in-one platform for independent musicians.
            Upload, manage royalty splits, and track streaming analytics.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sign-up"
              id="hero-cta-primary"
              className="group w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-white/90 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="#features"
              id="hero-cta-secondary"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[15px] font-medium text-white/80 hover:bg-white/[0.1] transition-all active:scale-[0.97] text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────── */}
      <section className="py-14 px-5">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 stagger-children">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center" id={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="text-[28px] sm:text-[32px] font-bold tracking-tight mb-0.5">{stat.value}</div>
              <div className="text-[13px] text-white/40 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ─── Features ────────────────────────────────── */}
      <section id="features" className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-3">
              Everything you need
            </h2>
            <p className="text-white/40 text-[15px] sm:text-[16px] max-w-md mx-auto">
              A powerful suite of tools designed from the ground up for your music career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 stagger-children">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] card-hover"
                  id={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/[0.1] transition-colors">
                    <Icon className="w-5 h-5 text-white/70" />
                  </div>
                  <h3 className="text-[16px] font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-[14px] leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-5" id="cta-section">
        <div className="max-w-xl mx-auto text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-white/[0.03] border border-white/[0.06] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/[0.08] rounded-full blur-[80px]" />

            <div className="relative">
              <Disc3 className="w-10 h-10 text-white/30 mx-auto mb-6 animate-float" />
              <h2 className="text-[24px] sm:text-[30px] font-bold tracking-tight mb-3">
                Ready to take control?
              </h2>
              <p className="text-white/40 text-[15px] mb-8 max-w-sm mx-auto">
                Join independent artists who trust qlefPro to manage their catalog, splits, and earnings.
              </p>
              <Link
                href="/sign-up"
                id="cta-bottom-btn"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-white/90 transition-all active:scale-[0.97]"
              >
                Create Your Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10 px-5" id="footer">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
              <span className="text-black font-extrabold text-[10px]">Q</span>
            </div>
            <span className="text-[13px] text-white/30">
              © {new Date().getFullYear()} qlefPro
            </span>
          </div>
          <div className="flex items-center gap-5 text-[13px] text-white/30">
            <span className="hover:text-white/60 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white/60 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white/60 transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
