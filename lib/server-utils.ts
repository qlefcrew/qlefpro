import { NextResponse } from 'next/server'
import { createServerClient } from './supabase'

export async function requireSubscription(clerkId: string): Promise<NextResponse | null> {
    const supabase = createServerClient()
    const { data } = await supabase
        .from('users')
        .select('subscription_status')
        .eq('clerk_id', clerkId)
        .single()

    if (!data || data.subscription_status !== 'active') {
        return new NextResponse('Requires active Pro subscription', { status: 403 })
    }

    return null
}
