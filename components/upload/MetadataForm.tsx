import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { validateSplits } from '@/lib/utils'
import { Split } from '@/types/api'
import { Plus, Trash2, Sparkles } from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'
import { PaywallBanner } from '../dashboard/PaywallBanner'

interface MetadataFormProps {
    onSubmit: (data: { title: string, artist: string, genre: string, splits: Split[] }) => void
    isUploading: boolean
}

export function MetadataForm({ onSubmit, isUploading }: MetadataFormProps) {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [splits, setSplits] = useState<Split[]>([{ collaborator: 'Me', role: 'Artist', percentage: 100 }])
    const [splitError, setSplitError] = useState('')
    const { isPro } = useSubscription()

    const handleAddSplit = () => {
        if (!isPro && splits.length >= 1) return // free tier limit is 1
        if (splits.length >= 10) return
        setSplits([...splits, { collaborator: '', role: '', percentage: 0 }])
    }

    const handleRemoveSplit = (index: number) => {
        setSplits(splits.filter((_, i) => i !== index))
    }

    const handleSplitChange = (index: number, field: keyof Split, value: string | number) => {
        const newSplits = [...splits]
        newSplits[index] = { ...newSplits[index], [field]: value } as any
        setSplits(newSplits)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { valid, error } = validateSplits(splits)
        if (!valid) {
            setSplitError(error || 'Invalid splits')
            return
        }
        setSplitError('')
        onSubmit({ title, artist, genre, splits })
    }

    const totalSplit = splits.reduce((acc, curr) => acc + (Number(curr.percentage) || 0), 0)

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="title" className="text-sm font-medium mb-1.5 block">Track Title *</Label>
                    <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} disabled={isUploading} className="bg-white/[0.03] border-white/10 focus:border-violet-500/50 transition-colors" placeholder="Enter track title" />
                </div>
                <div>
                    <Label htmlFor="artist" className="text-sm font-medium mb-1.5 block">Artist Name *</Label>
                    <Input id="artist" required value={artist} onChange={(e) => setArtist(e.target.value)} disabled={isUploading} className="bg-white/[0.03] border-white/10 focus:border-violet-500/50 transition-colors" placeholder="Enter artist name" />
                </div>
                <div>
                    <Label htmlFor="genre" className="text-sm font-medium mb-1.5 block">Genre (optional)</Label>
                    <Input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} disabled={isUploading} className="bg-white/[0.03] border-white/10 focus:border-violet-500/50 transition-colors" placeholder="e.g. Hip Hop, R&B, Pop" />
                </div>
            </div>

            <div className="pt-5 border-t border-white/5">
                <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-semibold flex items-center gap-2">
                        <div className="w-1 h-4 rounded-full bg-gradient-to-b from-violet-600 to-indigo-600" />
                        Royalty Splits
                    </Label>
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-lg ${Math.abs(totalSplit - 100) < 0.01 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {totalSplit.toFixed(0)}%
                    </span>
                </div>

                <div className="space-y-2.5 mb-4">
                    {splits.map((split, i) => (
                        <div key={i} className="flex gap-2 items-center p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                            <Input placeholder="Collaborator" value={split.collaborator} onChange={(e) => handleSplitChange(i, 'collaborator', e.target.value)} disabled={isUploading} className="flex-1 bg-transparent border-white/10 h-9 text-sm" required />
                            <Input placeholder="Role" value={split.role} onChange={(e) => handleSplitChange(i, 'role', e.target.value)} disabled={isUploading} className="w-1/4 bg-transparent border-white/10 h-9 text-sm" required />
                            <div className="relative w-20">
                                <Input type="number" min="0" max="100" value={split.percentage} onChange={(e) => handleSplitChange(i, 'percentage', parseFloat(e.target.value) || 0)} disabled={isUploading} className="pr-6 bg-transparent border-white/10 h-9 text-sm" required />
                                <span className="absolute right-2.5 top-2 text-muted-foreground text-xs">%</span>
                            </div>
                            {i > 0 && (
                                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveSplit(i)} disabled={isUploading} className="h-9 w-9 hover:bg-red-500/10 hover:text-red-400">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {splitError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
                        {splitError}
                    </div>
                )}

                {!isPro && splits.length >= 1 ? (
                    <PaywallBanner feature="Advanced Splits" />
                ) : (
                    <Button type="button" variant="outline" size="sm" onClick={handleAddSplit} disabled={isUploading || splits.length >= 10} className="bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-violet-500/30">
                        <Plus className="h-4 w-4 mr-2" /> Add Collaborator
                    </Button>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 border-0 text-white shadow-lg shadow-violet-600/20 h-12 text-base font-semibold"
                disabled={isUploading}
                id="upload-submit-btn"
            >
                {isUploading ? (
                    <span className="flex items-center gap-2">Uploading…</span>
                ) : (
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Upload & Publish
                    </span>
                )}
            </Button>
        </form>
    )
}
