'use client'

import { useTracks } from '@/hooks/useTracks'
import { Card, CardContent } from '@/components/ui/card'
import { Disc, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function CatalogPage() {
    const { tracks, loading, error } = useTracks('live', 1, 50)

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Catalog</h1>

            {loading && (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

            {error && <div className="text-red-500">{error}</div>}

            {!loading && tracks.length === 0 && (
                <Card className="border-dashed bg-transparent">
                    <CardContent className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                        <Disc className="h-12 w-12 mb-4 opacity-20" />
                        <p className="text-lg font-medium">No tracks released yet</p>
                        <p className="text-sm">Head over to the Upload tab to release your first track.</p>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tracks.map(track => (
                    <Card key={track.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="aspect-square bg-muted flex items-center justify-center">
                            {track.cover_art_url ? (
                                <img src={track.cover_art_url} alt={track.title} className="w-full h-full object-cover" />
                            ) : (
                                <Disc className="h-24 w-24 text-muted-foreground/30" />
                            )}
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold text-lg line-clamp-1">{track.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-1">{track.artist}</p>
                                </div>
                                <Badge variant="secondary" className="capitalize">{track.status}</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-4">
                                Released {new Date(track.created_at).toLocaleDateString()}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
