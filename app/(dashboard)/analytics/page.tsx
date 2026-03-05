'use client'

import { StreamsLineChart } from '@/components/analytics/StreamsLineChart'
import { useSubscription } from '@/hooks/useSubscription'
import { PaywallBanner } from '@/components/dashboard/PaywallBanner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, BarChart3, Globe, Smartphone } from 'lucide-react'

export default function AnalyticsPage() {
    const { isPro, loading: subLoading } = useSubscription()

    if (subLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                    <Loader2 className="animate-spin text-violet-400 h-6 w-6" />
                </div>
                <p className="text-sm text-muted-foreground">Loading analytics…</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
                    <p className="text-muted-foreground mt-1">Deep dive into your stream performance and earnings data.</p>
                </div>
            </div>

            {!isPro ? (
                <PaywallBanner feature="Advanced Analytics" />
            ) : (
                <div className="grid gap-6 animate-fade-in">
                    <StreamsLineChart />

                    <div className="grid md:grid-cols-2 gap-6 stagger-children">
                        <Card className="glass border-white/5 card-hover" id="analytics-top-countries">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Globe className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <CardTitle className="text-base">Top Countries</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Detailed geographic breakdown of where your listeners are located. Data populates as streams come in.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="glass border-white/5 card-hover" id="analytics-platform-share">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                        <Smartphone className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <CardTitle className="text-base">Platform Share</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Spotify vs Apple Music vs YouTube Music breakdown with comparative performance metrics.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
