// src/features/auth/queries.ts
import { createClient } from '@/lib/supabase/server'

export async function getCurrentAdmin() {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) return null

    if (!user) return null

        const { data: admin } = await supabase
        .from('admin_users')
        .select('id, email, role')
        .eq('id', user.id)
        .single()

        return admin
}
