'use client'

import { useTracks } from '@/hooks/useTracks'
import { Card, CardContent } from '@/components/ui/card'
import { Disc, Loader2, UploadCloud, Music2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function CatalogPage() {
    const { tracks, loading, error } = useTracks()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-5 h-5 animate-spin text-white/30" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight">Catalog</h1>
                    <p className="text-white/40 text-[14px] mt-0.5">Your released and uploaded tracks.</p>
                </div>
                <Link
                    href="/upload"
                    id="catalog-upload-btn"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-white/90 transition-all active:scale-95 w-fit"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload Track
                </Link>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/[0.06] border border-red-500/[0.1] text-red-400 text-[13px]">
                    {error}
                </div>
            )}

            {tracks.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center" id="catalog-empty-state">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-4">
                        <Music2 className="w-6 h-6 text-white/30" />
                    </div>
                    <h2 className="text-[17px] font-semibold mb-1">No tracks yet</h2>
                    <p className="text-white/40 text-[14px] mb-5 max-w-xs">
                        Upload your first track to start building your catalog.
                    </p>
                    <Link
                        href="/upload"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-white/90 transition-all active:scale-95"
                    >
                        <UploadCloud className="w-4 h-4" />
                        Upload Your First Track
                    </Link>
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
                    {tracks.map((track) => (
                        <Link href={`/catalog/${track.id}`} key={track.id} id={`track-card-${track.id}`}>
                            <Card className="group bg-white/[0.03] border-white/[0.06] card-hover overflow-hidden cursor-pointer">
                                <div className="relative aspect-square overflow-hidden">
                                    {track.cover_art_url ? (
                                        <Image
                                            src={track.cover_art_url}
                                            alt={track.title}
                                            fill
                                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/[0.03]">
                                            <Disc className="w-10 h-10 text-white/10" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <p className="font-semibold text-[14px] truncate">{track.title}</p>
                                    <p className="text-white/40 text-[12px] truncate mt-0.5">{track.artist}</p>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "mt-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md",
                                            track.status === 'confirmed'
                                                ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.06]"
                                                : "border-white/10 text-white/40 bg-white/[0.03]"
                                        )}
                                    >
                                        {track.status}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
