'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubscription } from '@/hooks/useSubscription'
import { Loader2, Check } from 'lucide-react'

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
            <div>
                <h1 className="text-3xl font-bold mb-2">Settings & Billing</h1>
                <p className="text-muted-foreground">Manage your account preferences and subscription plan.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>You are currently on the {isPro ? 'Pro' : 'Free'} tier.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Loader2 className="animate-spin text-primary h-6 w-6" />
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="text-2xl font-bold">MusicForge {isPro ? 'Pro' : 'Free'}</div>
                            {isPro && <Badge variant="default" className="bg-primary">Active</Badge>}
                        </div>
                    )}

                    {!isPro && !loading && (
                        <div className="mt-6 space-y-4">
                            <h4 className="font-semibold">Pro Features:</h4>
                            <ul className="space-y-2">
                                {['Unlimited track uploads', 'Up to 10 royalty splits per track', 'Advanced streaming analytics', 'Financial transparency tools'].map((feature, i) => (
                                    <li key={i} className="flex gap-2 items-center text-sm text-muted-foreground">
                                        <Check className="h-4 w-4 text-green-500" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="bg-muted/50 rounded-b-xl border-t mt-6 flex justify-between items-center py-4">
                    <p className="text-sm text-muted-foreground">
                        {isPro ? 'Manage your payment methods and invoices via Stripe.' : 'Upgrade now to unlock all features.'}
                    </p>
                    <Button onClick={isPro ? handleManageBilling : handleUpgrade} disabled={checkoutLoading || loading}>
                        {checkoutLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        {isPro ? 'Manage Billing' : 'Upgrade to Pro'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
