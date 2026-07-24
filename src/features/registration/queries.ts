import { createAdminClient } from '@/lib/supabase/admin'

export async function getRegistrationSession(token: string) {
    const supabase = createAdminClient()

    const { data: session, error } = await supabase
    .from('registration_sessions')
    .select('*, events(*)')
    .eq('token', token)
    .single()

    if (error || !session) return null

        const isExpired = new Date(session.expires_at).getTime() < Date.now()
        return { ...session, isExpired }
}

export async function getRegistrationsByEmail(email: string) {
    const supabase = createAdminClient()

    const { data, error } = await supabase
    .from('registrations')
    .select('id, name, email, category, status, bib_number, created_at, events(name, slug, event_date, location, poster_url)')
    .eq('email', email.trim().toLowerCase())
    .order('created_at', { ascending: false })

    if (error) return []
        return data
}

export async function getEventsForFilter() {
    const supabase = createAdminClient()
    const { data } = await supabase
    .from('events')
    .select('id, name, slug')
    .order('event_date', { ascending: false })

    return data ?? []
}

export async function getRegistrationsByEvent(eventId?: string) {
    const supabase = createAdminClient()

    let query = supabase
    .from('registrations')
    .select('id, name, email, phone, category, status, bib_number, created_at, events(name, price)')
    .order('created_at', { ascending: false })

    if (eventId) {
        query = query.eq('event_id', eventId)
    }

    const { data } = await query
    return data ?? []
}

export async function getRegistrationStats(eventId?: string) {
    const supabase = createAdminClient()

    let base = supabase.from('registrations').select('status, events(price)')
    if (eventId) base = base.eq('event_id', eventId)

        const { data } = await base

        const total = data?.length ?? 0
        const paid = data?.filter((r) => r.status === 'paid').length ?? 0
        const pending = data?.filter((r) => r.status === 'pending').length ?? 0
        const cancelled = data?.filter((r) => r.status === 'cancelled').length ?? 0
        const revenue =
        data
        ?.filter((r) => r.status === 'paid')
        .reduce((sum, r) => {
            const event = Array.isArray(r.events) ? r.events[0] : r.events
            return sum + (event?.price ?? 0)
        }, 0) ?? 0

        return { total, paid, pending, cancelled, revenue }
}
