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
import { Loader2 } from 'lucide-react'

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
                    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.5)');
                    gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
                    return gradient;
                },
                tension: 0.4,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { mode: 'index' as const, intersect: false } },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'rgba(255, 255, 255, 0.7)' } },
            x: { grid: { display: false }, ticks: { color: 'rgba(255, 255, 255, 0.7)', maxTicksLimit: 10 } },
        },
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Stream Performance</CardTitle>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[120px]">
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
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}
                    <Line options={options} data={chartData} />
                </div>
            </CardContent>
        </Card>
    )
}
