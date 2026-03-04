import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const supabase = createServerClient()
        const { data: user } = await supabase.from('users').select('id').eq('clerk_id', userId).single()
        if (!user) return new NextResponse('User not found', { status: 404 })

        const { data: track, error } = await supabase
            .from('tracks')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', user.id)
            .single()

        if (error || !track) {
            return new NextResponse('Track not found', { status: 404 })
        }

        return NextResponse.json({ track })
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}
