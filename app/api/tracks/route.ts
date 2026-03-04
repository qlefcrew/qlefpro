import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const { searchParams } = new URL(req.url)
        const status = searchParams.get('status') || 'live'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const offset = (page - 1) * limit

        const supabase = createServerClient()
        const { data: user } = await supabase.from('users').select('id').eq('clerk_id', userId).single()
        if (!user) return new NextResponse('User not found', { status: 404 })

        const { data: tracks, error } = await supabase
            .from('tracks')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', status)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (error) {
            console.error(error)
            return new NextResponse('Database Error', { status: 500 })
        }

        return NextResponse.json({ tracks })
    } catch (error) {
        console.error('Fetch tracks error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
