'use client'

import { useTracks } from '@/hooks/useTracks'
import { Card, CardContent } from '@/components/ui/card'
import { Disc, Loader2, UploadCloud, Music2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function CatalogPage() {
    const { tracks, loading, error } = useTracks('live', 1, 50)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Catalog</h1>
                    <p className="text-muted-foreground mt-1">All your released tracks in one place.</p>
                </div>
                <Link
                    href="/upload"
                    id="catalog-upload-btn"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-violet-600/20 w-fit"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload New
                </Link>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">Loading your catalog…</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!loading && tracks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl" id="catalog-empty-state">
                    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6">
                        <Music2 className="h-8 w-8 text-violet-400/40" />
                    </div>
                    <p className="text-lg font-semibold mb-1">No tracks released yet</p>
                    <p className="text-sm text-muted-foreground mb-6">Head over to the Upload tab to release your first track.</p>
                    <Link
                        href="/upload"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-all"
                    >
                        <UploadCloud className="w-4 h-4" />
                        Upload Your First Track
                    </Link>
                </div>
            )}

            {/* Tracks Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
                {tracks.map(track => (
                    <Card key={track.id} className="group overflow-hidden glass border-white/5 card-hover" id={`track-${track.id}`}>
                        <div className="aspect-square bg-gradient-to-br from-card to-muted/30 flex items-center justify-center relative overflow-hidden">
                            {track.cover_art_url ? (
                                <img src={track.cover_art_url} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <Disc className="h-16 w-16 text-violet-400/20" />
                                </div>
                            )}
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="overflow-hidden">
                                    <h3 className="font-semibold text-base line-clamp-1 group-hover:text-violet-300 transition-colors">{track.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-1">{track.artist}</p>
                                </div>
                                <Badge variant="secondary" className="capitalize text-[10px] bg-violet-500/10 text-violet-300 border-violet-500/20 shrink-0 ml-2">
                                    {track.status}
                                </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-white/5">
                                Released {new Date(track.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
