import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    return NextResponse.json({
        tags: ['indie pop', 'dreamy', 'lo-fi']
    })
}
