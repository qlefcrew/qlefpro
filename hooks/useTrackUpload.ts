import { useState } from 'react'
import { PresignResponse, ConfirmTrackRequest } from '@/types/api'

export function useTrackUpload() {
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const uploadTrack = async (
        file: File,
        metadata: Omit<ConfirmTrackRequest, 'trackId'>,
        onSuccess?: () => void,
        onError?: (err: string) => void
    ) => {
        setIsUploading(true)
        setProgress(0)

        try {
            const presignRes = await fetch('/api/tracks/presign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                }),
            })

            if (!presignRes.ok) {
                const error = await presignRes.json()
                throw new Error(error.error || 'Failed to get presigned URL')
            }

            const { presignedUrl, trackId } = (await presignRes.json()) as PresignResponse

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        setProgress(Math.round((e.loaded * 100) / e.total))
                    }
                })
                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve()
                    } else {
                        reject(new Error('S3 upload failed'))
                    }
                })
                xhr.addEventListener('error', () => reject(new Error('S3 upload network error')))

                xhr.open('PUT', presignedUrl)
                xhr.setRequestHeader('Content-Type', file.type)
                xhr.send(file)
            })

            const confirmRes = await fetch('/api/tracks/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trackId,
                    ...metadata,
                }),
            })

            if (!confirmRes.ok) {
                const error = await confirmRes.json()
                throw new Error(error.error || 'Failed to confirm track metadata')
            }

            onSuccess?.()
        } catch (err: any) {
            onError?.(err.message)
        } finally {
            setIsUploading(false)
            setProgress(0)
        }
    }

    return { uploadTrack, isUploading, progress }
}
