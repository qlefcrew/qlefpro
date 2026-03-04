import { useState, useCallback } from 'react'
import { UploadCloud, FileAudio } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface DropZoneProps {
    onFileSelect: (file: File) => void
    selectedFile: File | null
    isUploading: boolean
    progress: number
}

export function DropZone({ onFileSelect, selectedFile, isUploading, progress }: DropZoneProps) {
    const [isDragging, setIsDragging] = useState(false)

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files?.[0]) {
            onFileSelect(e.dataTransfer.files[0])
        }
    }, [onFileSelect])

    return (
        <div
            className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-colors relative",
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                isUploading && "pointer-events-none opacity-80"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="audio/mpeg, audio/wav"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
                disabled={isUploading}
                aria-label="Upload audio file"
            />

            {!selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-semibold text-lg">Drag & drop your audio file</h3>
                    <p className="text-sm text-muted-foreground">MP3 or WAV up to 500MB</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 z-10 relative pointer-events-none">
                    <FileAudio className="h-12 w-12 text-primary" />
                    <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type.split('/')[1].toUpperCase()}
                        </p>
                    </div>
                </div>
            )}

            {isUploading && (
                <div className="mt-6 space-y-2 z-10 relative pointer-events-none">
                    <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            )}
        </div>
    )
}
