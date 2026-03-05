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
        <Card className="group relative overflow-hidden card-hover bg-card/50 glass border-white/5">
            {/* Gradient border accent on hover */}
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                </CardTitle>
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="h-4 w-4 text-violet-400" />
                </div>
            </CardHeader>
            <CardContent className="relative">
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                {delta !== undefined && (
                    <div className="flex items-center gap-1 mt-2">
                        <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
                            delta > 0
                                ? "bg-emerald-500/10 text-emerald-400"
                                : delta < 0
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-muted text-muted-foreground"
                        )}>
                            {delta > 0 ? '↑' : delta < 0 ? '↓' : '→'} {Math.abs(delta)}%
                        </span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
