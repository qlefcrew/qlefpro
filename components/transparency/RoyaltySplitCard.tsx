'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Split } from '@/types/api'
import { PieChart } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend)

interface RoyaltySplitCardProps {
    trackTitle: string
    totalEarnings: number
    splits: Split[]
}

const COLORS = [
    '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#EC4899', '#8B5CF6', '#14B8A6', '#F97316', '#6366F1',
    '#475569'
]

export function RoyaltySplitCard({ trackTitle, totalEarnings, splits }: RoyaltySplitCardProps) {
    const effectiveSplits = splits.map(s => ({
        ...s,
        effectivePercentage: s.percentage * 0.88,
        usd: (s.percentage * 0.88 / 100) * totalEarnings
    }))

    const platformFeeUsd = totalEarnings * 0.12

    const labels = [...effectiveSplits.map(s => s.collaborator), 'qlefPro (Platform Fee)']
    const data = [...effectiveSplits.map(s => s.effectivePercentage), 12]

    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: COLORS.slice(0, data.length),
                borderWidth: 0,
                hoverOffset: 8,
                spacing: 2,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 17, 23, 0.9)',
                borderColor: 'rgba(124, 58, 237, 0.3)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (context: any) => ` ${context.label}: ${context.parsed.toFixed(1)}%`
                }
            }
        },
        cutout: '72%'
    }

    return (
        <Card className="glass border-white/5" id="royalty-split-card">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <PieChart className="w-4 h-4 text-violet-400" />
                    </div>
                    <CardTitle className="text-base">Royalty Split — {trackTitle}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[220px] w-full mb-6 relative flex items-center justify-center">
                    <Doughnut data={chartData} options={options} />
                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-xs text-muted-foreground">Total</div>
                        <div className="text-lg font-bold">{formatCurrency(totalEarnings)}</div>
                    </div>
                </div>
                <div className="space-y-2.5">
                    {effectiveSplits.map((split, i) => (
                        <div key={i} className="flex justify-between items-center text-sm py-2 px-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-2.5">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                                <span className="font-medium">{split.collaborator} <span className="text-muted-foreground font-normal">({split.role})</span></span>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">{formatCurrency(split.usd)}</div>
                                <div className="text-[11px] text-muted-foreground">{split.percentage}% gross · {split.effectivePercentage.toFixed(1)}% net</div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center text-sm py-2 px-3 rounded-lg border-t border-white/5 mt-2 pt-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[COLORS.length - 1] }} />
                            <span className="font-medium">qlefPro <span className="text-muted-foreground font-normal">(Platform Fee)</span></span>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold">{formatCurrency(platformFeeUsd)}</div>
                            <div className="text-[11px] text-muted-foreground">12.0%</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
