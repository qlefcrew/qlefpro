'use client'

import { useState, useEffect } from 'react'
import { StatCard } from '@/components/dashboard/StatCard'
import { Disc, DollarSign, Activity, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function DashboardPage() {
    const [overview, setOverview] = useState({ totalStreams: 0, totalEarnings: 0, trackCount: 0 })

    useEffect(() => {
        fetch('/api/analytics/overview')
            .then(res => res.json())
            .then(data => {
                if (!data.error) setOverview(data)
            })
            .catch(console.error)
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total Streams"
                    value={overview.totalStreams.toLocaleString()}
                    icon={Activity}
                    delta={12.5}
                />
                <StatCard
                    label="Total Earnings"
                    value={formatCurrency(overview.totalEarnings)}
                    icon={DollarSign}
                    delta={8.2}
                />
                <StatCard
                    label="Tracks Released"
                    value={overview.trackCount}
                    icon={Disc}
                />
                <StatCard
                    label="Active Monthly Listeners"
                    value="-- (Coming Soon)"
                    icon={Users}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-8">
                <div className="p-6 border rounded-xl bg-card">
                    <h2 className="text-xl font-semibold mb-2">Welcome to MusicForge</h2>
                    <p className="text-muted-foreground">
                        Manage your catalog, view stream transparency, and orchestrate your royalty payouts all in one seamless dashboard.
                    </p>
                </div>
            </div>
        </div>
    )
}
