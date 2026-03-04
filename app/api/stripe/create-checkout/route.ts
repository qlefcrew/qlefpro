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
            .select('stripe_customer_id, email')
            .eq('clerk_id', userId)
            .single()

        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        let customerId = user.stripe_customer_id

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: { clerkId: userId },
            })
            customerId = customer.id
            await supabase
                .from('users')
                .update({ stripe_customer_id: customerId })
                .eq('clerk_id', userId)
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRO_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
            client_reference_id: userId,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Stripe error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
