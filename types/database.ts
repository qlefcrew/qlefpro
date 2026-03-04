export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type UserRow = {
    id: string
    clerk_id: string
    email: string
    display_name: string | null
    avatar_url: string | null
    subscription_status: string
    stripe_customer_id: string | null
    created_at: string
    updated_at: string
}

export type TrackRow = {
    id: string
    user_id: string
    title: string
    artist: string
    genre: string | null
    s3_key: string
    s3_bucket: string
    file_format: string
    file_size_bytes: number
    duration_seconds: number | null
    splits: Json
    status: string
    cover_art_url: string | null
    isrc_code: string | null
    pro_affiliation: string | null
    created_at: string
    updated_at: string
}

export type StreamEventRow = {
    id: string
    track_id: string
    platform: string
    country_code: string | null
    stream_count: number
    event_date: string
    revenue_usd: number | null
}

export interface Database {
    public: {
        Tables: {
            users: {
                Row: UserRow
                Insert: Partial<UserRow>
                Update: Partial<UserRow>
            }
            tracks: {
                Row: TrackRow
                Insert: Partial<TrackRow>
                Update: Partial<TrackRow>
            }
            stream_events: {
                Row: StreamEventRow
                Insert: Partial<StreamEventRow>
                Update: Partial<StreamEventRow>
            }
        }
    }
}
