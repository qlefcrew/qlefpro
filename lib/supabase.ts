import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export function createBrowserClient(clerkToken?: string) {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: clerkToken ? { Authorization: `Bearer ${clerkToken}` } : undefined,
            },
        }
    )
}

export function createServerClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}
