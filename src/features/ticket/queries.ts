import { createAdminClient } from '@/lib/supabase/admin'

export async function getTicketData(registrationId: string) {
    const supabase = createAdminClient()

    const { data, error } = await supabase
    .from('registrations')
    .select('id, name, category, status, bib_number, events(name, slug, event_date, location, poster_url)')
    .eq('id', registrationId)
    .single()

    if (error || !data) return null
        return data
}
