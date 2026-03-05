'use client'

import { useState, useEffect } from 'react'
import { RoyaltySplitCard } from '@/components/transparency/RoyaltySplitCard'
import { useSubscription } from '@/hooks/useSubscription'
import { PaywallBanner } from '@/components/dashboard/PaywallBanner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, FileText, DollarSign, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'
import type { RoyaltyData, CostBreakdown, UnclaimedRoyalty } from '@/types/api'

export default function TransparencyPage() {
    const { isPro, loading: subLoading } = useSubscription()
    const [royalties, setRoyalties] = useState<RoyaltyData[]>([])
    const [costs, setCosts] = useState<CostBreakdown | null>(null)
    const [unclaimed, setUnclaimed] = useState<UnclaimedRoyalty[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isPro) return
        Promise.all([
            fetch('/api/transparency/royalties').then(r => r.json()),
            fetch('/api/transparency/costs').then(r => r.json()),
            fetch('/api/transparency/unclaimed').then(r => r.json()),
        ])
            .then(([royaltyData, costData, unclaimedData]) => {
                if (Array.isArray(royaltyData)) setRoyalties(royaltyData)
                if (!costData.error) setCosts(costData)
                if (Array.isArray(unclaimedData)) setUnclaimed(unclaimedData)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [isPro])

    if (subLoading) {
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
                    <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight">Transparency</h1>
                    <p className="text-white/40 text-[14px] mt-0.5">See exactly where your money goes.</p>
                </div>
                <PaywallBanner feature="Transparency Reports" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight">Transparency</h1>
                <p className="text-white/40 text-[14px] mt-0.5">See exactly where your money goes.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[40vh]">
                    <Loader2 className="w-5 h-5 animate-spin text-white/30" />
                </div>
            ) : (
                <div className="space-y-6 stagger-children">
                    {/* Info Cards */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Card className="bg-white/[0.03] border-white/[0.06]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
                                    Platform Costs
                                </CardTitle>
                                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                    <Info className="h-3.5 w-3.5 text-white/40" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/40 text-[13px] leading-relaxed">
                                    Breakdown of the 12% qlefPro fee — server costs, Stripe fees, and PRO administration.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/[0.03] border-white/[0.06]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
                                    Unclaimed Royalties
                                </CardTitle>
                                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                    <DollarSign className="h-3.5 w-3.5 text-white/40" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/40 text-[13px] leading-relaxed">
                                    Unclaimed splits are held in escrow for up to 90 days before reverting.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Royalty Split Charts */}
                    {royalties.map((royalty) => (
                        <RoyaltySplitCard key={royalty.trackId} data={royalty} />
                    ))}

                    {royalties.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-white/30" />
                            </div>
                            <h2 className="text-[17px] font-semibold mb-1">No royalty data yet</h2>
                            <p className="text-white/40 text-[14px] mb-5 max-w-xs">
                                Upload a track with collaborator splits to see transparency reports.
                            </p>
                            <Link
                                href="/upload"
                                className="inline-flex items-center gap-1 text-[13px] text-white/60 font-medium hover:text-white transition-colors"
                            >
                                Upload a Track <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
