import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getPresignedPutUrl } from '@/lib/aws'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const { filename, fileType, fileSize } = await req.json()

        if (fileType !== 'audio/mpeg' && fileType !== 'audio/wav') {
            return NextResponse.json({ error: 'Invalid file type. Only MP3 and WAV allowed.' }, { status: 400 })
        }

        if (fileSize > 524288000) {
            return NextResponse.json({ error: 'File size exceeds 500MB limit.' }, { status: 400 })
        }

        const s3Key = `users/${userId}/${crypto.randomUUID()}/${filename}`

        const supabase = createServerClient()
        const { data: user } = await supabase.from('users').select('id').eq('clerk_id', userId).single()
        if (!user) return new NextResponse('User not found', { status: 404 })

        const { data: track, error } = await supabase.from('tracks').insert({
            user_id: user.id,
            title: 'Pending Upload',
            artist: 'Unknown',
            s3_key: s3Key,
            s3_bucket: process.env.AWS_S3_BUCKET_NAME || 'local',
            file_format: fileType,
            file_size_bytes: fileSize,
            status: 'pending'
        }).select('id').single()

        if (error || !track) {
            console.error('Supabase error:', error)
            return new NextResponse('Database Error', { status: 500 })
        }

        const presignedUrl = await getPresignedPutUrl(s3Key, fileType, fileSize)

        return NextResponse.json({
            presignedUrl,
            trackId: track.id,
            s3Key
        })
    } catch (error) {
        console.error('Presign error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
