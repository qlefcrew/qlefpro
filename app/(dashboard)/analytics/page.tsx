'use client'

import { StreamsLineChart } from '@/components/analytics/StreamsLineChart'
import { useSubscription } from '@/hooks/useSubscription'
import { PaywallBanner } from '@/components/dashboard/PaywallBanner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function AnalyticsPage() {
    const { isPro, loading: subLoading } = useSubscription()

    if (subLoading) {
        return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Advanced Analytics</h1>
                <p className="text-muted-foreground">Deep dive into your stream performance and earnings data.</p>
            </div>

            {!isPro ? (
                <PaywallBanner feature="Advanced Analytics" />
            ) : (
                <div className="grid gap-6">
                    <StreamsLineChart />

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle>Top Countries</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">Detailed geographic data goes here.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Platform Share</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">Spotify vs Apple Music vs YouTube breakdown goes here.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
