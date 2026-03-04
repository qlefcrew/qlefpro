import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export function PaywallBanner({ feature }: { feature: string }) {
    return (
        <div className="relative w-full overflow-hidden rounded-xl border bg-background/50 p-8 mt-8">
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-background/20" />

            {/* Decorative blurred content behind the paywall */}
            <div className="opacity-20 pointer-events-none select-none">
                <div className="h-32 w-full bg-muted rounded-md mb-4" />
                <div className="h-8 w-1/2 bg-muted rounded-md mb-2" />
                <div className="h-8 w-3/4 bg-muted rounded-md" />
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
                <Card className="w-full max-w-md text-center shadow-lg border-primary/20 bg-background">
                    <CardHeader>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{feature} is a Premium Feature</CardTitle>
                        <CardDescription>
                            Upgrade to MusicForge Pro to unlock {feature.toLowerCase()} and take your career to the next level.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/settings">Upgrade to Pro</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
