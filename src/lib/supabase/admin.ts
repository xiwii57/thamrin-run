// src/lib/supabase/admin.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Service role — HANYA dipakai di server (route handler / server action).
// Jangan pernah di-import ke client component.
export function createAdminClient() {
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}
