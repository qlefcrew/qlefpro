'use client'

import Link from 'next/link'
import { Music, BarChart3, Shield, Zap, ArrowRight, Disc3, Headphones, TrendingUp, Users, ChevronRight } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

const features = [
  {
    icon: Music,
    title: 'Upload & Distribute',
    description: 'Drag-and-drop your tracks and publish to your catalog in seconds. MP3 & WAV support with up to 500MB per file.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Shield,
    title: 'Transparent Royalties',
    description: 'Real-time royalty split management with up to 10 collaborators. Every penny is tracked and accounted for.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep dive into streaming data, earnings trends, geographic breakdowns, and platform performance metrics.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with cutting-edge technology for instant uploads, real-time metrics, and a seamless experience across all devices.',
    gradient: 'from-amber-500 to-orange-500',
  },
]

const stats = [
  { value: '99.9%', label: 'Uptime', icon: Zap },
  { value: '12%', label: 'Platform Fee', icon: TrendingUp },
  { value: '10', label: 'Max Splits', icon: Users },
  { value: '500MB', label: 'Max File Size', icon: Disc3 },
]

export default function Home() {
  const { isSignedIn } = useAuth()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ─── Animated Background ─────────────────────── */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* ─── Navigation ──────────────────────────────── */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" id="nav-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/40 transition-shadow">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">
              Music<span className="gradient-text">Forge</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                id="nav-dashboard-btn"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  id="nav-signin-btn"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  id="nav-signup-btn"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────── */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden" id="hero-section">
        <div className="max-w-5xl mx-auto text-center animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-sm text-violet-300 mb-8">
            <Headphones className="w-4 h-4" />
            <span>Built for Independent Artists</span>
            <ChevronRight className="w-3 h-3" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Distribute.{' '}
            <span className="gradient-text">Split.</span>{' '}
            <br className="hidden sm:block" />
            Grow.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform for independent musicians.
            Upload tracks, manage transparent royalty splits, and unlock
            real-time streaming analytics — all in one dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              id="hero-cta-primary"
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-base hover:opacity-90 transition-all shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 flex items-center gap-2"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              id="hero-cta-secondary"
              className="px-8 py-4 rounded-xl glass text-sm font-medium hover:bg-white/5 transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </section>

      {/* ─── Stats Bar ───────────────────────────────── */}
      <section className="relative py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center group" id={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 mb-3 group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────── */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Own Your Music</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A powerful suite of tools designed from the ground up for independent artists.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 stagger-children">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl glass card-hover cursor-default"
                  id={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────── */}
      <section className="relative py-24 px-6" id="cta-section">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl glass-strong relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Disc3 className="w-12 h-12 text-violet-400 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                Join thousands of independent artists who trust MusicForge
                to manage their catalog, splits, and earnings.
              </p>
              <Link
                href="/sign-up"
                id="cta-bottom-btn"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-base hover:opacity-90 transition-all shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40"
              >
                Create Your Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────── */}
      <footer className="relative border-t border-white/5 py-12 px-6" id="footer">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MusicForge. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
