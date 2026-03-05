import { useState, useCallback } from 'react'
import { UploadCloud, FileAudio, CheckCircle2 } from 'lucide-react'
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
                "relative rounded-2xl p-10 text-center transition-all duration-300 glass overflow-hidden group",
                isDragging
                    ? "border-2 border-violet-500/50 bg-violet-500/5 scale-[1.01]"
                    : "border-2 border-dashed border-white/10 hover:border-violet-500/30",
                isUploading && "pointer-events-none"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            id="upload-dropzone"
        >
            {/* Hidden file input */}
            <input
                type="file"
                accept="audio/mpeg, audio/wav"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
                disabled={isUploading}
                aria-label="Upload audio file"
            />

            {/* Drag hover glow */}
            {isDragging && (
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/5 pointer-events-none" />
            )}

            {!selectedFile ? (
                <div className="flex flex-col items-center gap-3 relative">
                    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-2 group-hover:bg-violet-500/15 transition-colors">
                        <UploadCloud className="h-8 w-8 text-violet-400" />
                    </div>
                    <h3 className="font-semibold text-lg">Drag & drop your audio file</h3>
                    <p className="text-sm text-muted-foreground">
                        MP3 or WAV • up to 500MB
                    </p>
                    <div className="mt-2 px-4 py-2 rounded-xl bg-violet-500/10 text-sm text-violet-300 font-medium">
                        or click to browse
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 z-10 relative pointer-events-none">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
                        {isUploading ? (
                            <FileAudio className="h-8 w-8 text-white animate-pulse" />
                        ) : (
                            <CheckCircle2 className="h-8 w-8 text-white" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-base">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type.split('/')[1]?.toUpperCase() || 'AUDIO'}
                        </p>
                    </div>
                </div>
            )}

            {/* Upload progress */}
            {isUploading && (
                <div className="mt-8 space-y-3 z-10 relative pointer-events-none">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uploading to cloud…</span>
                        <span className="font-medium text-violet-300">{progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
