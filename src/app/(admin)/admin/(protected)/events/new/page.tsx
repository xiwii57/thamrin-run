import { createEvent } from '@/features/events/actions'
import { EventForm } from '../_components/event-form'

export default async function NewEventPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div>
    <h1 className="text-2xl font-semibold text-ink">Tambah Event</h1>
    <p className="mt-1 text-sm text-muted">Isi detail event lari yang akan dibuka</p>
    <EventForm action={createEvent} error={error} />
    </div>
  )
}
