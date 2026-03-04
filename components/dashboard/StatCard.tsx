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
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {delta !== undefined && (
                    <p className={cn(
                        "text-xs mt-1",
                        delta > 0 ? "text-green-500" : delta < 0 ? "text-red-500" : "text-muted-foreground"
                    )}>
                        {delta > 0 ? '+' : ''}{delta}% from last month
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
