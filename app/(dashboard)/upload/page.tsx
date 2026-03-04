'use client'

import { useState } from 'react'
import { DropZone } from '@/components/upload/DropZone'
import { MetadataForm } from '@/components/upload/MetadataForm'
import { useTrackUpload } from '@/hooks/useTrackUpload'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Split } from '@/types/api'

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const { uploadTrack, isUploading, progress } = useTrackUpload()
    const router = useRouter()
    const { toast } = useToast()

    const handleMetadataSubmit = (metadata: { title: string, artist: string, genre: string, splits: Split[] }) => {
        if (!file) {
            toast({ title: 'No file selected', description: 'Please select an audio file to upload.', variant: 'destructive' })
            return
        }

        uploadTrack(
            file,
            metadata,
            () => {
                toast({ title: 'Upload successful!', description: 'Your track is now processing.' })
                router.push('/catalog')
            },
            (err) => {
                toast({ title: 'Upload failed', description: err, variant: 'destructive' })
            }
        )
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Upload Track</h1>
                <p className="text-muted-foreground">Upload your latest masterpiece and submit metadata.</p>
            </div>

            <DropZone
                onFileSelect={setFile}
                selectedFile={file}
                isUploading={isUploading}
                progress={progress}
            />

            {file && (
                <div className="bg-card border rounded-xl p-6 mt-8">
                    <h2 className="text-xl font-semibold mb-6">Track Metadata</h2>
                    <MetadataForm onSubmit={handleMetadataSubmit} isUploading={isUploading} />
                </div>
            )}
        </div>
    )
}
