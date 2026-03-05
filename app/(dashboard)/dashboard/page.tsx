'use client'

import { useState, useEffect } from 'react'
import { StatCard } from '@/components/dashboard/StatCard'
import { Disc, DollarSign, Activity, Users, ArrowRight, UploadCloud, Music } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

export default function DashboardPage() {
    const [overview, setOverview] = useState({ totalStreams: 0, totalEarnings: 0, trackCount: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/analytics/overview')
            .then(res => res.json())
            .then(data => {
                if (!data.error) setOverview(data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight">Dashboard</h1>
                    <p className="text-white/40 text-[14px] mt-0.5">Welcome back. Here&apos;s an overview of your music.</p>
                </div>
                <Link
                    href="/upload"
                    id="dashboard-upload-btn"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-white/90 transition-all active:scale-95 w-fit"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload Track
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 stagger-children">
                <StatCard label="Total Streams" value={loading ? '—' : overview.totalStreams.toLocaleString()} icon={Activity} delta={12.5} />
                <StatCard label="Total Earnings" value={loading ? '—' : formatCurrency(overview.totalEarnings)} icon={DollarSign} delta={8.2} />
                <StatCard label="Tracks Released" value={loading ? '—' : overview.trackCount} icon={Disc} />
                <StatCard label="Monthly Listeners" value="Coming Soon" icon={Users} />
            </div>

            {/* Quick Actions */}
            <div className="grid gap-3 sm:grid-cols-2">
                <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] card-hover" id="dashboard-welcome-card">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center mb-3 group-hover:bg-white/[0.1] transition-colors">
                        <Music className="w-4 h-4 text-white/60" />
                    </div>
                    <h2 className="text-[15px] font-semibold mb-1.5">Welcome to qlefPro</h2>
                    <p className="text-white/40 text-[13px] leading-relaxed mb-3">
                        Manage your catalog, view stream transparency, and orchestrate your royalty payouts.
                    </p>
                    <Link href="/catalog" className="inline-flex items-center gap-1 text-[13px] text-white/60 font-medium hover:text-white transition-colors group/link">
                        View Catalog
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] card-hover" id="dashboard-analytics-card">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center mb-3 group-hover:bg-white/[0.1] transition-colors">
                        <Activity className="w-4 h-4 text-white/60" />
                    </div>
                    <h2 className="text-[15px] font-semibold mb-1.5">Stream Analytics</h2>
                    <p className="text-white/40 text-[13px] leading-relaxed mb-3">
                        Deep dive into streaming data with charts, geographic breakdowns, and platform metrics.
                    </p>
                    <Link href="/analytics" className="inline-flex items-center gap-1 text-[13px] text-white/60 font-medium hover:text-white transition-colors group/link">
                        View Analytics
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
