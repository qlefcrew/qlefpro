'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubscription } from '@/hooks/useSubscription'
import { Settings, Crown, Check, Loader2 } from 'lucide-react'

export default function SettingsPage() {
    const { isPro, loading } = useSubscription()
    const [portalLoading, setPortalLoading] = useState(false)

    const handleManageBilling = async () => {
        setPortalLoading(true)
        try {
            const res = await fetch('/api/stripe/portal', { method: 'POST' })
            const data = await res.json()
            if (data.url) window.location.href = data.url
        } catch (err) {
            console.error('Billing portal error:', err)
        } finally {
            setPortalLoading(false)
        }
    }

    const handleUpgrade = async () => {
        setPortalLoading(true)
        try {
            const res = await fetch('/api/stripe/create-checkout', { method: 'POST' })
            const data = await res.json()
            if (data.url) window.location.href = data.url
        } catch (err) {
            console.error('Checkout error:', err)
        } finally {
            setPortalLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-5 h-5 animate-spin text-white/30" />
            </div>
        )
    }

    const proFeatures = [
        'Advanced Analytics & Insights',
        'Transparency Reports',
        'Priority Support',
        'Early Access to New Features',
        'Custom Branding',
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight">Settings</h1>
                <p className="text-white/40 text-[14px] mt-0.5">Manage your account and subscription.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Current Plan */}
                <Card className="bg-white/[0.03] border-white/[0.06]" id="settings-plan-card">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-[17px]">Your Plan</CardTitle>
                            {isPro && (
                                <Badge className="bg-white/[0.08] text-white border-white/[0.1] text-[11px] font-semibold px-2.5">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Premium
                                </Badge>
                            )}
                        </div>
                        <CardDescription className="text-[13px]">
                            {isPro
                                ? "You're on qlefPro Premium. Enjoy all features."
                                : "Upgrade to qlefPro Premium for full access."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-[28px] font-bold tracking-tight mb-1">
                            qlefPro {isPro ? 'Premium' : 'Free'}
                        </div>
                        <p className="text-white/30 text-[13px]">
                            {isPro ? '$9.99 / month' : '$0 / month'}
                        </p>
                    </CardContent>
                    <CardFooter>
                        {isPro ? (
                            <Button
                                onClick={handleManageBilling}
                                disabled={portalLoading}
                                variant="outline"
                                className="bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] text-[13px] active:scale-[0.97]"
                            >
                                {portalLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Manage Billing
                            </Button>
                        ) : (
                            <Button
                                onClick={handleUpgrade}
                                disabled={portalLoading}
                                className="bg-white text-black hover:bg-white/90 font-semibold text-[13px] active:scale-[0.97]"
                            >
                                {portalLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Upgrade to Premium
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                {/* Features */}
                <Card className="bg-white/[0.03] border-white/[0.06]" id="settings-features-card">
                    <CardHeader>
                        <CardTitle className="text-[17px]">Premium Features</CardTitle>
                        <CardDescription className="text-[13px]">
                            Everything included with qlefPro Premium.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {proFeatures.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-white/50" />
                                    </div>
                                    <span className="text-[14px] text-white/60">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
