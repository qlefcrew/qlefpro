import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { createBrowserClient } from '@/lib/supabase'

export function useSubscription() {
    const { userId, getToken, isLoaded } = useAuth()
    const [status, setStatus] = useState<string>('free')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStatus() {
            if (!isLoaded || !userId) {
                if (isLoaded) setLoading(false)
                return
            }
            try {
                const token = await getToken({ template: 'supabase' }).catch(() => null)
                const supabase = createBrowserClient(token || undefined)
                const { data } = await supabase
                    .from('users')
                    .select('subscription_status')
                    .eq('clerk_id', userId)
                    .single()

                if (data) setStatus(data.subscription_status)
            } catch (err) {
                console.error('Error loading subscription', err)
            } finally {
                setLoading(false)
            }
        }
        loadStatus()
    }, [userId, isLoaded, getToken])

    return { status, loading, isPro: status === 'active' }
}
