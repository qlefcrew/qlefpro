import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { requireSubscription } from '@/lib/server-utils'

export async function GET(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })
        const subCheck = await requireSubscription(userId)
        if (subCheck) return subCheck

        return NextResponse.json({ royalties: [] })
    } catch (err) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}
