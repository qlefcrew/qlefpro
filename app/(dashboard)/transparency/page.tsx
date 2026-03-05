'use client'

import { useState, useEffect } from 'react'
import { RoyaltySplitCard } from '@/components/transparency/RoyaltySplitCard'
import { useSubscription } from '@/hooks/useSubscription'
import { PaywallBanner } from '@/components/dashboard/PaywallBanner'
import { Loader2, Shield, Wallet, Receipt, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

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
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                    <Loader2 className="animate-spin text-violet-400 h-6 w-6" />
                </div>
                <p className="text-sm text-muted-foreground">Loading transparency data…</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Financial Transparency</h1>
                    <p className="text-muted-foreground mt-1">View real-time royalty splits, platform costs, and unclaimed funds.</p>
                </div>
            </div>

            {!isPro ? (
                <PaywallBanner feature="Financial Transparency" />
            ) : (
                <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                    {data && (
                        <RoyaltySplitCard
                            trackTitle={data.trackTitle}
                            totalEarnings={data.totalEarnings}
                            splits={data.splits}
                        />
                    )}

                    <div className="space-y-6 stagger-children">
                        <div className="group p-6 rounded-2xl glass card-hover relative overflow-hidden" id="unclaimed-funds-card">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                        <Wallet className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <h2 className="text-lg font-semibold">Unclaimed Funds</h2>
                                </div>
                                <div className="text-3xl font-bold mb-2">{formatCurrency(1240.00)}</div>
                                <p className="text-sm text-muted-foreground mb-4">Pending payout processing or missing tax forms.</p>
                                <button className="inline-flex items-center gap-1 text-sm text-amber-400 font-medium hover:text-amber-300 transition-colors group/link">
                                    View Details
                                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="group p-6 rounded-2xl glass card-hover relative overflow-hidden" id="platform-costs-card">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                        <Receipt className="w-4 h-4 text-violet-400" />
                                    </div>
                                    <h2 className="text-lg font-semibold">Platform Costs</h2>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Breakdown of the 12% MusicForge fee — server costs, Stripe fees, and PRO administration.
                                </p>
                                <button className="inline-flex items-center gap-1 text-sm text-violet-400 font-medium hover:text-violet-300 transition-colors group/link">
                                    View Ledger
                                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
