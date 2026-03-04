export interface PresignRequest {
    filename: string
    fileType: string
    fileSize: number
}

export interface PresignResponse {
    presignedUrl: string
    trackId: string
    s3Key: string
}

export interface Split {
    collaborator: string
    role: string
    percentage: number
}

export interface ConfirmTrackRequest {
    trackId: string
    title: string
    artist: string
    genre?: string
    splits: Split[]
}

export interface AnalyticsResponse {
    streamsByDay: { date: string; count: number }[]
    earningsByMonth: { month: string; usd: number }[]
    totalStreams: number
    totalEarnings: number
}

export interface AnalyticsOverviewResponse {
    totalStreams: number
    totalEarnings: number
    trackCount: number
}
