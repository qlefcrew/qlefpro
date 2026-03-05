import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
    label: string
    value: string | number
    delta?: number
    icon: LucideIcon
}

export function StatCard({ label, value, delta, icon: Icon }: StatCardProps) {
    return (
        <Card className="group bg-white/[0.03] border-white/[0.06] card-hover overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
                    {label}
                </CardTitle>
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.1] transition-colors">
                    <Icon className="h-3.5 w-3.5 text-white/40" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-[22px] font-bold tracking-tight">{value}</div>
                {delta !== undefined && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={cn(
                            "inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-medium",
                            delta > 0
                                ? "bg-emerald-500/10 text-emerald-400"
                                : delta < 0
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-white/5 text-white/40"
                        )}>
                            {delta > 0 ? '↑' : delta < 0 ? '↓' : '→'} {Math.abs(delta)}%
                        </span>
                        <span className="text-[11px] text-white/25">vs last month</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
