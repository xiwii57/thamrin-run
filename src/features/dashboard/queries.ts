import { createAdminClient } from '@/lib/supabase/admin'

export async function getDashboardKpi() {
    const supabase = createAdminClient()

    const { data: events } = await supabase.from('events').select('id, quota')
    const totalQuota = events?.reduce((sum, e) => sum + e.quota, 0) ?? 0

    const { data: registrations } = await supabase
    .from('registrations')
    .select('status, events(price)')

    const totalParticipants = registrations?.length ?? 0

    const revenue =
    registrations
    ?.filter((r) => r.status === 'paid')
    .reduce((sum, r) => {
        const event = Array.isArray(r.events) ? r.events[0] : r.events
        return sum + (event?.price ?? 0)
    }, 0) ?? 0

    const remainingQuota = Math.max(totalQuota - totalParticipants, 0)
    const percentFilled = totalQuota > 0 ? (totalParticipants / totalQuota) * 100 : 0

    return { totalParticipants, remainingQuota, totalQuota, revenue, percentFilled }
}

export async function getRegistrationTrend(days = 7) {
    const supabase = createAdminClient()

    const since = new Date()
    since.setDate(since.getDate() - (days - 1))
    since.setHours(0, 0, 0, 0)

    const { data } = await supabase
    .from('registrations')
    .select('created_at')
    .gte('created_at', since.toISOString())

    const counts = new Map<string, number>()
    for (let i = 0; i < days; i++) {
        const d = new Date(since)
        d.setDate(d.getDate() + i)
        counts.set(d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }), 0)
    }

    data?.forEach((r) => {
        const key = new Date(r.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
        if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1)
    })

    return Array.from(counts.entries()).map(([date, total]) => ({ date, total }))
}

export async function getRecentParticipants(limit = 8) {
    const supabase = createAdminClient()
    const { data } = await supabase
    .from('registrations')
    .select('id, bib_number, name, category, status, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)

    return data ?? []
}

export async function getEventsWithStats() {
    const supabase = createAdminClient()

    const { data: events } = await supabase
    .from('events')
    .select('id, name, event_date, quota, status')
    .order('event_date', { ascending: false })

    if (!events?.length) return []

        const { data: counts } = await supabase
        .from('event_registration_counts')
        .select('event_id, count')
        .in('event_id', events.map((e) => e.id))

        const countMap = new Map(counts?.map((c) => [c.event_id, c.count]) ?? [])

        return events.map((e) => ({
            ...e,
            participants: countMap.get(e.id) ?? 0,
        }))
}
