'use client'

import { useState } from 'react'
import { StreamsLineChart } from '@/components/analytics/StreamsLineChart'
import { useSubscription } from '@/hooks/useSubscription'
import { PaywallBanner } from '@/components/dashboard/PaywallBanner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart2, TrendingUp, DollarSign, Loader2 } from 'lucide-react'

export default function AnalyticsPage() {
    const { isPro, loading } = useSubscription()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-5 h-5 animate-spin text-white/30" />
            </div>
        )
    }

    if (!isPro) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight">Analytics</h1>
                    <p className="text-white/40 text-[14px] mt-0.5">Deep dive into your streaming performance.</p>
                </div>
                <PaywallBanner feature="Analytics" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight">Analytics</h1>
                <p className="text-white/40 text-[14px] mt-0.5">Deep dive into your streaming performance.</p>
            </div>

            <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 stagger-children">
                <Card className="bg-white/[0.03] border-white/[0.06]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Streams</CardTitle>
                        <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                            <BarChart2 className="h-3.5 w-3.5 text-white/40" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-[22px] font-bold">12,459</div>
                        <p className="text-[11px] text-emerald-400">↑ 15.2% vs last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/[0.03] border-white/[0.06]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Earnings</CardTitle>
                        <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                            <DollarSign className="h-3.5 w-3.5 text-white/40" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-[22px] font-bold">$4,320</div>
                        <p className="text-[11px] text-emerald-400">↑ 8.7% vs last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/[0.03] border-white/[0.06] col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Growth</CardTitle>
                        <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                            <TrendingUp className="h-3.5 w-3.5 text-white/40" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-[22px] font-bold">+22.4%</div>
                        <p className="text-[11px] text-white/30">Quarter over quarter</p>
                    </CardContent>
                </Card>
            </div>

            <StreamsLineChart />
        </div>
    )
}
