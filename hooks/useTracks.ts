import { useState, useEffect, useCallback } from 'react'

export function useTracks(status: string = 'live', initialPage: number = 1, limit: number = 20) {
    const [tracks, setTracks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(initialPage)

    const fetchTracks = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/tracks?status=${status}&page=${page}&limit=${limit}`)
            if (!res.ok) throw new Error('Failed to fetch tracks')
            const data = await res.json()
            setTracks(data.tracks || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [status, page, limit])

    useEffect(() => {
        fetchTracks()
    }, [fetchTracks])

    return { tracks, loading, error, page, setPage, refresh: fetchTracks }
}
