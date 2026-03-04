import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const supabase = createServerClient()
        const { data: user } = await supabase
            .from('users')
            .select('stripe_customer_id')
            .eq('clerk_id', userId)
            .single()

        if (!user || !user.stripe_customer_id) {
            return new NextResponse('Customer not found', { status: 404 })
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripe_customer_id,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Stripe error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
