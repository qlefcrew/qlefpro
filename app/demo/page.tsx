'use client'

import { useState, useEffect } from 'react'
import { StatCard } from '@/components/dashboard/StatCard'
import { Disc, DollarSign, Activity, Users, ArrowRight, UploadCloud, Music, Sparkles, TrendingUp, Globe2, AlertCircle } from 'lucide-react'
import { formatCurrency, cn } from '@/lib/utils'
import Link from 'next/link'

export default function DemoPage() {
    const [loading, setLoading] = useState(true)

    // Simulate loading
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800)
        return () => clearTimeout(t)
    }, [])

    // Fake mock data
    const overview = {
        totalStreams: 14258902,
        totalEarnings: 42776.70,
        trackCount: 24,
        monthlyListeners: 845020
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Banner */}
            <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-indigo-500/20 bg-indigo-500/[0.02]">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-violet-500/20 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[12px] font-medium text-indigo-300 mb-4 shadow-inner shadow-indigo-500/10">
                            <Sparkles className="w-3.5 h-3.5" />
                            qlefPro Demo Mode
                        </div>
                        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight mb-2">
                            Welcome back, <span className="text-white">Demo User</span>
                        </h1>
                        <p className="text-white/60 text-[15px] max-w-lg leading-relaxed">
                            Experience the future of music distribution and royalty management. This demo uses realistic mocked data to showcase our platform&apos;s capabilities.
                        </p>
                    </div>

                    <a
                        href="https://qlefmarketing.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-[14px] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:bg-white/90 hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] transition-all active:scale-[0.98] w-full md:w-auto shrink-0"
                    >
                        <UploadCloud className="w-4 h-4" />
                        Upload Real Track
                        <ArrowRight className="w-4 h-4 text-black/40 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Stats Overview */}
            <div>
                <h2 className="text-[18px] font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    All-Time Performance
                </h2>
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 stagger-children">
                    <StatCard label="Total Streams" value={loading ? '—' : overview.totalStreams.toLocaleString()} icon={Activity} delta={18.4} />
                    <StatCard label="Total Earnings" value={loading ? '—' : formatCurrency(overview.totalEarnings)} icon={DollarSign} delta={22.1} />
                    <StatCard label="Tracks Released" value={loading ? '—' : overview.trackCount} icon={Disc} delta={4.0} />
                    <StatCard label="Monthly Listeners" value={loading ? '—' : overview.monthlyListeners.toLocaleString()} icon={Users} delta={11.2} />
                </div>
            </div>

            {/* Premium AI Insights (Fake) */}
            <div>
                <h2 className="text-[18px] font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    qlefPro Insights
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="col-span-1 md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Globe2 className="w-24 h-24" />
                        </div>
                        <h3 className="text-[16px] font-medium mb-2 text-white/90">Brazil is trending upwards 🚀</h3>
                        <p className="text-[14px] text-white/50 leading-relaxed mb-4 max-w-sm">
                            Your track "Midnight Neon" saw a 340% spike in Spotify playlists across São Paulo. We recommend running targeted social ads in this region to capitalize on the momentum.
                        </p>
                        <a href="https://qlefmarketing.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                            View Geographic Breakdown <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <div className="col-span-1 p-6 rounded-2xl bg-[#111] border border-white/[0.08] flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-[14px] font-medium text-white/70">Unclaimed Royalties</h3>
                                <AlertCircle className="w-4 h-4 text-amber-500" />
                            </div>
                            <div className="text-[28px] font-bold tracking-tight font-mono text-white mb-1">
                                $1,240.50
                            </div>
                            <p className="text-[12px] text-amber-500/80 mb-4 bg-amber-500/10 inline-flex px-2 py-0.5 rounded border border-amber-500/20">
                                Requires action
                            </p>
                        </div>
                        <a href="https://qlefmarketing.com" target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 rounded-lg bg-white/10 text-white text-[13px] font-medium hover:bg-white/15 transition-colors">
                            Resolve Splits
                        </a>
                    </div>
                </div>
            </div>

            {/* Top performing tracks (Fake List) */}
            <div>
                <h2 className="text-[18px] font-semibold mb-4 flex items-center gap-2">
                    <Music className="w-5 h-5 text-blue-400" />
                    Top Performing Tracks
                </h2>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-3 text-[12px] font-medium text-white/40 uppercase tracking-wider">
                        <div className="col-span-6 md:col-span-5">Track</div>
                        <div className="col-span-3 hidden md:block text-right">Streams</div>
                        <div className="col-span-3 text-right">Revenue</div>
                        <div className="col-span-3 md:col-span-1 text-right">Trend</div>
                    </div>

                    {[
                        { title: 'Neon Midnight', artist: 'Demo User', streams: 4205000, rev: 12615.00, trend: '+42%' },
                        { title: 'Summer Breeze', artist: 'Demo User, The Weeknd', streams: 3840100, rev: 11520.30, trend: '+18%' },
                        { title: 'Lofi Study Vibes', artist: 'Demo User', streams: 2150000, rev: 6450.00, trend: '+5%' },
                        { title: 'Ocean Waves Pt. 2', artist: 'Demo User', streams: 1540200, rev: 4620.60, trend: '-2%' },
                    ].map((track, i) => (
                        <div key={i} className="group grid grid-cols-12 gap-4 border-b border-white/[0.03] px-5 py-4 hover:bg-white/[0.04] transition-colors items-center last:border-0 cursor-pointer">
                            <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.2)] transition-shadow">
                                    <Disc className="w-5 h-5 text-white/50" />
                                </div>
                                <div className="truncate">
                                    <p className="text-[14px] font-medium text-white truncate">{track.title}</p>
                                    <p className="text-[12px] text-white/40 truncate">{track.artist}</p>
                                </div>
                            </div>
                            <div className="col-span-3 hidden md:block text-right text-[13px] font-mono text-white/70">
                                {track.streams.toLocaleString()}
                            </div>
                            <div className="col-span-3 text-right text-[13px] font-mono text-white/90">
                                {formatCurrency(track.rev)}
                            </div>
                            <div className="col-span-3 md:col-span-1 text-right flex justify-end">
                                <span className={cn(
                                    "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border",
                                    track.trend.startsWith('+')
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"
                                )}>
                                    {track.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="px-5 py-3 border-t border-white/[0.06] bg-black/20 text-center">
                        <a href="https://qlefmarketing.com" target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/40 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1">
                            View Full Catalog <ArrowRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Promo Call To Action at the bottom */}
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-transparent border border-white/10 text-center relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <h2 className="text-[24px] font-bold text-white mb-3 relative z-10">Stop leaving money on the table.</h2>
                <p className="text-white/60 text-[15px] max-w-md mx-auto mb-6 relative z-10">
                    Join qlefPro today to take control of your music catalog, automate royalty splits, and detailed analytics.
                </p>
                <a
                    href="https://qlefmarketing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-white/90 hover:scale-105 transition-all w-full sm:w-auto shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
                >
                    Claim Your Account
                </a>
            </div>
        </div>
    )
}
