'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubscription } from '@/hooks/useSubscription'
import { Loader2, Check, Sparkles, Crown, Settings as SettingsIcon } from 'lucide-react'

const proFeatures = [
    'Unlimited track uploads',
    'Up to 10 royalty splits per track',
    'Advanced streaming analytics',
    'Financial transparency tools',
    'Priority support',
]

export default function SettingsPage() {
    const { isPro, loading } = useSubscription()
    const [checkoutLoading, setCheckoutLoading] = useState(false)

    const handleUpgrade = async () => {
        setCheckoutLoading(true)
        try {
            const res = await fetch('/api/stripe/create-checkout', { method: 'POST' })
            const { url } = await res.json()
            if (url) window.location.href = url
        } catch (err) {
            console.error(err)
        } finally {
            setCheckoutLoading(false)
        }
    }

    const handleManageBilling = async () => {
        setCheckoutLoading(true)
        try {
            const res = await fetch('/api/stripe/portal', { method: 'POST' })
            const { url } = await res.json()
            if (url) window.location.href = url
        } catch (err) {
            console.error(err)
        } finally {
            setCheckoutLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20 shrink-0">
                    <SettingsIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings & Billing</h1>
                    <p className="text-muted-foreground mt-1">Manage your account preferences and subscription plan.</p>
                </div>
            </div>

            {/* Current Plan Card */}
            <Card className="glass border-white/5 overflow-hidden" id="settings-plan-card">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isPro ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20' : 'bg-violet-500/10'}`}>
                            {isPro ? <Crown className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-violet-400" />}
                        </div>
                        <div>
                            <CardTitle className="text-lg">Current Plan</CardTitle>
                            <CardDescription>You are currently on the {isPro ? 'Pro' : 'Free'} tier.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center gap-3 py-4">
                            <Loader2 className="animate-spin text-violet-400 h-5 w-5" />
                            <span className="text-sm text-muted-foreground">Loading subscription status…</span>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-2xl font-bold">MusicForge {isPro ? 'Pro' : 'Free'}</div>
                                {isPro && (
                                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/20">
                                        Active
                                    </Badge>
                                )}
                            </div>

                            {!isPro && (
                                <div className="p-5 rounded-xl bg-violet-500/5 border border-violet-500/10">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-violet-400" />
                                        Pro Features
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {proFeatures.map((feature, i) => (
                                            <li key={i} className="flex gap-2.5 items-center text-sm text-muted-foreground">
                                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                                    <Check className="h-3 w-3 text-emerald-400" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5">
                    <p className="text-sm text-muted-foreground">
                        {isPro ? 'Manage your payment methods and invoices via Stripe.' : 'Upgrade now to unlock all premium features.'}
                    </p>
                    <Button
                        onClick={isPro ? handleManageBilling : handleUpgrade}
                        disabled={checkoutLoading || loading}
                        id="settings-plan-btn"
                        className={isPro
                            ? "bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
                            : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 border-0 text-white shadow-lg shadow-violet-600/20"
                        }
                        size="lg"
                    >
                        {checkoutLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        {isPro ? 'Manage Billing' : (
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Upgrade to Pro
                            </span>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
