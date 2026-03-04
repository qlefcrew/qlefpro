import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    return NextResponse.json({
        status: 'queued',
        jobId: crypto.randomUUID(),
        estimatedSeconds: 300
    })
}
