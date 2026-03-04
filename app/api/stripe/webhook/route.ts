import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase'


export async function POST(req: Request) {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const supabase = createServerClient()

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any
        const customerId = session.customer as string
        const clerkId = session.client_reference_id

        if (clerkId) {
            await supabase.from('users')
                .update({ subscription_status: 'active', stripe_customer_id: customerId })
                .eq('clerk_id', clerkId)
        }
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as any
        const customerId = subscription.customer as string

        await supabase.from('users')
            .update({ subscription_status: 'canceled' })
            .eq('stripe_customer_id', customerId)
    }

    if (event.type === 'customer.subscription.updated') {
        const subscription = event.data.object as any
        const customerId = subscription.customer as string
        const status = subscription.status === 'active' ? 'active' : 'canceled'

        await supabase.from('users')
            .update({ subscription_status: status })
            .eq('stripe_customer_id', customerId)
    }

    return new NextResponse('OK', { status: 200 })
}
