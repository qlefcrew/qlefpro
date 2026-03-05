'use client'

import { useState } from 'react'
import { DropZone } from '@/components/upload/DropZone'
import { MetadataForm } from '@/components/upload/MetadataForm'
import { useTrackUpload } from '@/hooks/useTrackUpload'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Split } from '@/types/api'
import { UploadCloud } from 'lucide-react'

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
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20 shrink-0">
                    <UploadCloud className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Upload Track</h1>
                    <p className="text-muted-foreground mt-1">Upload your latest masterpiece and submit metadata.</p>
                </div>
            </div>

            {/* Drop Zone */}
            <DropZone
                onFileSelect={setFile}
                selectedFile={file}
                isUploading={isUploading}
                progress={progress}
            />

            {/* Metadata Form */}
            {file && (
                <div className="glass rounded-2xl p-6 animate-slide-up" id="upload-metadata-section">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-violet-600 to-indigo-600" />
                        Track Metadata
                    </h2>
                    <MetadataForm onSubmit={handleMetadataSubmit} isUploading={isUploading} />
                </div>
            )}
        </div>
    )
}
