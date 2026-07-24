import { createClient } from '@/lib/supabase/server'

export async function getEvents() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function getEventById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function getOpenEvents() {
  const supabase = await createClient()

  const { data: events, error } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'open')
  .order('event_date', { ascending: true })

  if (error) throw new Error(error.message)
    if (!events.length) return []

      const { data: counts } = await supabase
      .from('event_registration_counts')
      .select('event_id, count')
      .in('event_id', events.map((e) => e.id))

      const countMap = new Map(counts?.map((c) => [c.event_id, c.count]) ?? [])

      return events.map((event) => ({
        ...event,
        registered_count: countMap.get(event.id) ?? 0,
      }))
}

export async function getEventBySlug(slug: string) {
  const supabase = await createClient()

  const { data: event, error } = await supabase
  .from('events')
  .select('*')
  .eq('slug', slug)
  .neq('status', 'draft')
  .single()

  if (error || !event) return null

    const { data: countRow } = await supabase
    .from('event_registration_counts')
    .select('count')
    .eq('event_id', event.id)
    .maybeSingle()

    return {
      ...event,
      registered_count: countRow?.count ?? 0,
    }
}
