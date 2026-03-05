'use client'

import { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, TrendingUp } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export function StreamsLineChart() {
    const [period, setPeriod] = useState('30d')
    const [data, setData] = useState<{ date: string; count: number }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const res = await fetch(`/api/analytics?period=${period}`)
                if (res.ok) {
                    const json = await res.json()
                    setData(json.streamsByDay || [])
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [period])

    const chartData = {
        labels: data.map(d => new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
        datasets: [
            {
                fill: true,
                label: 'Streams',
                data: data.map(d => d.count),
                borderColor: '#7C3AED',
                backgroundColor: (context: any) => {
                    const ctx = context.chart?.ctx;
                    if (!ctx) return 'rgba(124, 58, 237, 0.2)';
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.3)');
                    gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.1)');
                    gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
                    return gradient;
                },
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#7C3AED',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(15, 17, 23, 0.9)',
                borderColor: 'rgba(124, 58, 237, 0.3)',
                borderWidth: 1,
                padding: 12,
                titleColor: 'rgba(255, 255, 255, 0.9)',
                bodyColor: 'rgba(255, 255, 255, 0.7)',
                cornerRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.04)', drawBorder: false },
                ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { size: 11 } },
                border: { display: false },
            },
            x: {
                grid: { display: false },
                ticks: { color: 'rgba(255, 255, 255, 0.4)', maxTicksLimit: 10, font: { size: 11 } },
                border: { display: false },
            },
        },
    }

    return (
        <Card className="glass border-white/5" id="streams-chart">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-violet-400" />
                    </div>
                    <CardTitle className="text-base">Stream Performance</CardTitle>
                </div>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[130px] h-9 text-sm bg-white/[0.03] border-white/10">
                        <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                        <SelectItem value="90d">Last 90 Days</SelectItem>
                        <SelectItem value="365d">Last Year</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[300px] relative">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm z-10 rounded-xl">
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
                                <span className="text-xs text-muted-foreground">Loading chart…</span>
                            </div>
                        </div>
                    )}
                    <Line options={options} data={chartData} />
                </div>
            </CardContent>
        </Card>
    )
}
