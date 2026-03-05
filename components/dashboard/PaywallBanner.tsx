import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Lock, Sparkles } from 'lucide-react'

export function PaywallBanner({ feature }: { feature: string }) {
    return (
        <div className="relative w-full overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] mt-6" id={`paywall-${feature.toLowerCase().replace(/\s+/g, '-')}`}>
            {/* Blurred mock content */}
            <div className="relative p-8">
                <div className="opacity-10 pointer-events-none select-none blur-sm">
                    <div className="h-28 w-full bg-white/10 rounded-xl mb-4" />
                    <div className="h-5 w-1/2 bg-white/10 rounded-lg mb-2" />
                    <div className="h-5 w-3/4 bg-white/10 rounded-lg" />
                </div>
            </div>

            {/* Paywall overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 backdrop-blur-md bg-background/40">
                <Card className="w-full max-w-sm text-center bg-card/90 backdrop-blur-xl border-white/[0.08] shadow-2xl">
                    <CardHeader className="pb-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-3">
                            <Lock className="h-5 w-5 text-white/50" />
                        </div>
                        <CardTitle className="text-[17px]">{feature}</CardTitle>
                        <CardDescription className="text-[13px]">
                            Upgrade to qlefPro Premium to unlock {feature.toLowerCase()}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-white text-black hover:bg-white/90 border-0 font-semibold active:scale-[0.97]" size="lg">
                            <Link href="/settings" className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Upgrade
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
