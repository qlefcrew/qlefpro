'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Split } from '@/types/api'

ChartJS.register(ArcElement, Tooltip, Legend)

interface RoyaltySplitCardProps {
    trackTitle: string
    totalEarnings: number
    splits: Split[]
}

export function RoyaltySplitCard({ trackTitle, totalEarnings, splits }: RoyaltySplitCardProps) {
    const effectiveSplits = splits.map(s => ({
        ...s,
        effectivePercentage: s.percentage * 0.88,
        usd: (s.percentage * 0.88 / 100) * totalEarnings
    }))

    const platformFeeUsd = totalEarnings * 0.12

    const labels = [...effectiveSplits.map(s => s.collaborator), 'MusicForge (Platform Fee)']
    const data = [...effectiveSplits.map(s => s.effectivePercentage), 12]
    const backgroundColors = [
        '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6', '#F97316', '#6366F1', '#334155'
    ]

    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: backgroundColors.slice(0, data.length),
                borderWidth: 0,
                hoverOffset: 4
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'right' as const, labels: { color: 'rgba(255, 255, 255, 0.7)' } },
            tooltip: {
                callbacks: {
                    label: (context: any) => ` ${context.label}: ${context.parsed.toFixed(1)}%`
                }
            }
        },
        cutout: '70%'
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Royalty Split - {trackTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full mb-6 relative">
                    <Doughnut data={chartData} options={options} />
                </div>
                <div className="space-y-3">
                    {effectiveSplits.map((split, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: backgroundColors[i] }} />
                                <span>{split.collaborator} <span className="text-muted-foreground">({split.role})</span></span>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">{formatCurrency(split.usd)}</div>
                                <div className="text-xs text-muted-foreground">{split.percentage}% (gross) / {split.effectivePercentage.toFixed(1)}% (net)</div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center text-sm pt-3 border-t">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-700" />
                            <span>MusicForge <span className="text-muted-foreground">(Platform Fee)</span></span>
                        </div>
                        <div className="text-right">
                            <div className="font-medium">{formatCurrency(platformFeeUsd)}</div>
                            <div className="text-xs text-muted-foreground">12.0%</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
