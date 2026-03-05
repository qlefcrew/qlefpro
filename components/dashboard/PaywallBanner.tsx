import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Lock, Sparkles } from 'lucide-react'

export function PaywallBanner({ feature }: { feature: string }) {
    return (
        <div className="relative w-full overflow-hidden rounded-2xl glass mt-8" id={`paywall-${feature.toLowerCase().replace(/\s+/g, '-')}`}>
            {/* Blurred decorative background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
            </div>

            {/* Blurred mock content */}
            <div className="relative z-10 p-8">
                <div className="opacity-15 pointer-events-none select-none blur-sm">
                    <div className="h-32 w-full bg-gradient-to-r from-muted to-muted/50 rounded-xl mb-4" />
                    <div className="h-6 w-1/2 bg-muted rounded-lg mb-3" />
                    <div className="h-6 w-3/4 bg-muted rounded-lg" />
                </div>
            </div>

            {/* Centered paywall card */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 backdrop-blur-md bg-background/30">
                <Card className="w-full max-w-md text-center shadow-2xl border-violet-500/20 bg-card/90 backdrop-blur-xl">
                    <CardHeader className="pb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-600/25">
                            <Lock className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">{feature} is a Premium Feature</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                            Upgrade to MusicForge Pro to unlock {feature.toLowerCase()} and take your career to the next level.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-violet-600/20 border-0 text-white" size="lg">
                            <Link href="/settings" className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Upgrade to Pro
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
