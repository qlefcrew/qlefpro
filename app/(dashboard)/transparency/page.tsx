'use client'

import { useState, useEffect } from 'react'
import { RoyaltySplitCard } from '@/components/transparency/RoyaltySplitCard'
import { useSubscription } from '@/hooks/useSubscription'
import { PaywallBanner } from '@/components/dashboard/PaywallBanner'
import { Loader2 } from 'lucide-react'

// Dummy Data for MVP
const MOCK_SPLITS = [
    { collaborator: 'Demo Artist', role: 'Artist', percentage: 60 },
    { collaborator: 'Producer Dan', role: 'Producer', percentage: 30 },
    { collaborator: 'Studio A', role: 'Mix Engineer', percentage: 10 },
]

export default function TransparencyPage() {
    const { isPro, loading: subLoading } = useSubscription()
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        setData({
            trackTitle: 'Midnight Sun',
            totalEarnings: 8450.50,
            splits: MOCK_SPLITS
        })
    }, [])

    if (subLoading) {
        return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Financial Transparency</h1>
                <p className="text-muted-foreground">View real-time royalty splits, platform costs, and unclaimed funds.</p>
            </div>

            {!isPro ? (
                <PaywallBanner feature="Financial Transparency" />
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {data && (
                        <RoyaltySplitCard
                            trackTitle={data.trackTitle}
                            totalEarnings={data.totalEarnings}
                            splits={data.splits}
                        />
                    )}

                    <div className="space-y-6">
                        <div className="p-6 border rounded-xl bg-card">
                            <h2 className="text-xl font-semibold mb-4">Unclaimed Funds</h2>
                            <div className="text-3xl font-bold mb-2">$1,240.00</div>
                            <p className="text-sm text-muted-foreground mb-4">Pending payout processing or missing tax forms.</p>
                            <button className="text-sm text-primary hover:underline">View Details &rarr;</button>
                        </div>

                        <div className="p-6 border rounded-xl bg-card">
                            <h2 className="text-xl font-semibold mb-4">Platform Costs</h2>
                            <p className="text-sm text-muted-foreground mb-4">Breakdown of the 12% MusicForge fee (Server costs, Stripe fees, PRO administration).</p>
                            <button className="text-sm text-primary hover:underline">View Ledger &rarr;</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
