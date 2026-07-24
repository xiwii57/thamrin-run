import { notFound } from 'next/navigation'
import { getEventById } from '@/features/events/queries'
import { updateEvent } from '@/features/events/actions'
import { EventForm } from '../../_components/event-form'

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams
  const event = await getEventById(id)

  if (!event) notFound()

  const updateEventWithId = updateEvent.bind(null, id)

  return (
    <div>
      <h1 className="text-xl font-semibold">Edit Event</h1>
      <EventForm action={updateEventWithId} defaultValues={event} error={error} />
    </div>
  )
}
