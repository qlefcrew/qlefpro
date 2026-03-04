import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const supabase = createServerClient()
        const { data: user } = await supabase.from('users').select('id').eq('clerk_id', userId).single()
        if (!user) return new NextResponse('User not found', { status: 404 })

        const { count: trackCount } = await supabase.from('tracks').select('id', { count: 'exact', head: true }).eq('user_id', user.id)

        const { data: tracks } = await supabase.from('tracks').select('id').eq('user_id', user.id)
        const trackIds = tracks?.map(t => t.id) || []

        let totalStreams = 0
        let totalEarnings = 0

        if (trackIds.length > 0) {
            const { data: events } = await supabase.from('stream_events').select('stream_count, revenue_usd').in('track_id', trackIds)
            events?.forEach(e => {
                totalStreams += e.stream_count
                totalEarnings += Number(e.revenue_usd || 0)
            })
        }

        return NextResponse.json({
            totalStreams,
            totalEarnings,
            trackCount: trackCount || 0
        })
    } catch (error) {
        console.error('Overview error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
