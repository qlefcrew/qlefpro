import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { validateSplits } from '@/lib/utils'
import { Split } from '@/types/api'
import { Plus, Trash2 } from 'lucide-react'
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
                    <Label htmlFor="title">Track Title *</Label>
                    <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} disabled={isUploading} />
                </div>
                <div>
                    <Label htmlFor="artist">Artist Name *</Label>
                    <Input id="artist" required value={artist} onChange={(e) => setArtist(e.target.value)} disabled={isUploading} />
                </div>
                <div>
                    <Label htmlFor="genre">Genre (optional)</Label>
                    <Input id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} disabled={isUploading} />
                </div>
            </div>

            <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                    <Label className="text-lg">Royalty Splits</Label>
                    <span className="text-sm font-medium">Total: {totalSplit.toFixed(0)}%</span>
                </div>

                <div className="space-y-3 mb-4">
                    {splits.map((split, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <Input placeholder="Collaborator name" value={split.collaborator} onChange={(e) => handleSplitChange(i, 'collaborator', e.target.value)} disabled={isUploading} className="flex-1" required />
                            <Input placeholder="Role" value={split.role} onChange={(e) => handleSplitChange(i, 'role', e.target.value)} disabled={isUploading} className="w-1/4" required />
                            <div className="relative w-24">
                                <Input type="number" min="0" max="100" value={split.percentage} onChange={(e) => handleSplitChange(i, 'percentage', parseFloat(e.target.value) || 0)} disabled={isUploading} className="pr-6" required />
                                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">%</span>
                            </div>
                            {i > 0 && (
                                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveSplit(i)} disabled={isUploading}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {splitError && <p className="text-red-500 text-sm mb-4">{splitError}</p>}

                {!isPro && splits.length >= 1 ? (
                    <PaywallBanner feature="Advanced Splits" />
                ) : (
                    <Button type="button" variant="outline" size="sm" onClick={handleAddSplit} disabled={isUploading || splits.length >= 10}>
                        <Plus className="h-4 w-4 mr-2" /> Add Collaborator
                    </Button>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload & Publish'}
            </Button>
        </form>
    )
}
