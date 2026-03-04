import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', { status: 400 })
    }

    const { id } = evt.data;
    const eventType = evt.type;
    const supabase = createServerClient()

    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { email_addresses, first_name, last_name, image_url } = evt.data as any
        const email = email_addresses?.[0]?.email_address
        const display_name = [first_name, last_name].filter(Boolean).join(' ') || email

        if (eventType === 'user.created') {
            await supabase.from('users').insert({
                clerk_id: id as string,
                email,
                display_name,
                avatar_url: image_url,
            })
        } else {
            await supabase.from('users').update({
                email,
                display_name,
                avatar_url: image_url,
            }).eq('clerk_id', id as string)
        }
    }

    return new Response('OK', { status: 200 })
}
