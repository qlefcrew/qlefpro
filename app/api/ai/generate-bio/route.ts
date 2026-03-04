import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    return NextResponse.json({
        bio: 'Rising indie artist known for blending dreamy soundscapes with profound, introspective lyrics.'
    })
}
