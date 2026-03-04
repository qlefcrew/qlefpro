import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { requireSubscription } from '@/lib/server-utils'

export async function GET(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const subCheck = await requireSubscription(userId)
        if (subCheck) return subCheck

        const { searchParams } = new URL(req.url)
        const period = searchParams.get('period') || '30d'
        const days = period === '365d' ? 365 : period === '90d' ? 90 : 30

        const supabase = createServerClient()
        const { data: user } = await supabase.from('users').select('id').eq('clerk_id', userId).single()
        if (!user) return new NextResponse('User not found', { status: 404 })

        const { data: tracks } = await supabase.from('tracks').select('id').eq('user_id', user.id)
        const trackIds = tracks?.map(t => t.id) || []

        if (trackIds.length === 0) {
            return NextResponse.json({
                streamsByDay: [],
                earningsByMonth: [],
                totalStreams: 0,
                totalEarnings: 0
            })
        }

        const MathDate = new Date()
        MathDate.setDate(MathDate.getDate() - days)
        const startDateStr = MathDate.toISOString().split('T')[0]

        const { data: events, error } = await supabase
            .from('stream_events')
            .select('*')
            .in('track_id', trackIds)
            .gte('event_date', startDateStr)

        if (error) {
            console.error(error)
            return new NextResponse('Database Error', { status: 500 })
        }

        const streamsByDayMap = new Map<string, number>()
        const earningsByMonthMap = new Map<string, number>()
        let totalStreams = 0
        let totalEarnings = 0

        events?.forEach(event => {
            totalStreams += event.stream_count
            totalEarnings += Number(event.revenue_usd || 0)

            const dateStr = event.event_date
            streamsByDayMap.set(dateStr, (streamsByDayMap.get(dateStr) || 0) + event.stream_count)

            const monthStr = dateStr.substring(0, 7)
            earningsByMonthMap.set(monthStr, (earningsByMonthMap.get(monthStr) || 0) + Number(event.revenue_usd || 0))
        })

        const streamsByDay = Array.from(streamsByDayMap.entries())
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date))

        const earningsByMonth = Array.from(earningsByMonthMap.entries())
            .map(([month, usd]) => ({ month, usd }))
            .sort((a, b) => a.month.localeCompare(b.month))

        return NextResponse.json({
            streamsByDay,
            earningsByMonth,
            totalStreams,
            totalEarnings
        })
    } catch (error) {
        console.error('Analytics error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
