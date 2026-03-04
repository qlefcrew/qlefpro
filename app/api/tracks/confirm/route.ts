import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { validateSplits } from '@/lib/utils'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await req.json()
        const { trackId, title, artist, genre, splits } = body

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 })
        }

        if (!artist) {
            return NextResponse.json({ error: 'Artist is required' }, { status: 400 })
        }

        const { valid, error: splitError } = validateSplits(splits)
        if (!valid) {
            return NextResponse.json({ error: splitError }, { status: 400 })
        }

        const supabase = createServerClient()
        const { data: user } = await supabase.from('users').select('id, subscription_status').eq('clerk_id', userId).single()

        if (!user) return new NextResponse('User not found', { status: 404 })

        if (user.subscription_status !== 'active' && splits.length > 1) {
            return NextResponse.json({ error: 'Free tier is limited to 1 collaborator' }, { status: 400 })
        }

        const { error } = await supabase.from('tracks').update({
            title,
            artist,
            genre,
            splits,
            status: 'processing'
        }).eq('id', trackId).eq('user_id', user.id)

        if (error) {
            console.error(error)
            return new NextResponse('Database Error', { status: 500 })
        }

        setTimeout(async () => {
            const bgsupabase = createServerClient()
            await bgsupabase.from('tracks').update({ status: 'live' }).eq('id', trackId)
        }, 3000)

        return NextResponse.json({ success: true, trackId })
    } catch (error) {
        console.error('Confirm error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
