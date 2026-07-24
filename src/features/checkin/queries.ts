import { createAdminClient } from '@/lib/supabase/admin'

export async function getRecentCheckins(limit = 15) {
    const supabase = createAdminClient()

    const { data } = await supabase
    .from('registrations')
    .select('id, name, bib_number, category, checked_in_at, events(name)')
    .not('checked_in_at', 'is', null)
    .order('checked_in_at', { ascending: false })
    .limit(limit)

    return data ?? []
}

export async function getCheckinStats() {
    const supabase = createAdminClient()

    const { count: totalPaid } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'paid')

    const { count: totalCheckedIn } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .not('checked_in_at', 'is', null)

    return { totalPaid: totalPaid ?? 0, totalCheckedIn: totalCheckedIn ?? 0 }
}
