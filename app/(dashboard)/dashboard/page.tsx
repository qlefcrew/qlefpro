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
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Welcome back. Here&apos;s an overview of your music.</p>
                </div>
                <Link
                    href="/upload"
                    id="dashboard-upload-btn"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 w-fit"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload Track
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
                <StatCard
                    label="Total Streams"
                    value={loading ? '—' : overview.totalStreams.toLocaleString()}
                    icon={Activity}
                    delta={12.5}
                />
                <StatCard
                    label="Total Earnings"
                    value={loading ? '—' : formatCurrency(overview.totalEarnings)}
                    icon={DollarSign}
                    delta={8.2}
                />
                <StatCard
                    label="Tracks Released"
                    value={loading ? '—' : overview.trackCount}
                    icon={Disc}
                />
                <StatCard
                    label="Monthly Listeners"
                    value="Coming Soon"
                    icon={Users}
                />
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="group relative p-6 rounded-2xl glass card-hover overflow-hidden" id="dashboard-welcome-card">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-2xl" />
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                            <Music className="w-5 h-5 text-violet-400" />
                        </div>
                        <h2 className="text-lg font-semibold mb-2">Welcome to MusicForge</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            Manage your catalog, view stream transparency, and orchestrate your royalty payouts all in one seamless dashboard.
                        </p>
                        <Link href="/catalog" className="inline-flex items-center gap-1 text-sm text-violet-400 font-medium hover:text-violet-300 transition-colors group/link">
                            View Your Catalog
                            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="group relative p-6 rounded-2xl glass card-hover overflow-hidden" id="dashboard-analytics-card">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl" />
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                            <Activity className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-lg font-semibold mb-2">Stream Analytics</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            Dive deep into your streaming data with advanced charts, geographic breakdowns, and platform performance metrics.
                        </p>
                        <Link href="/analytics" className="inline-flex items-center gap-1 text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors group/link">
                            View Analytics
                            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
