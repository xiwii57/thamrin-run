import Link from 'next/link'
import { Plus, CalendarDays } from 'lucide-react'
import { getEvents } from '@/features/events/queries'
import { EventsTable } from './_components/events-table'

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
    <h1 className="text-xl font-semibold text-ink sm:text-2xl">Event</h1>
    <p className="mt-1 text-sm text-muted">Kelola event lari yang kamu selenggarakan</p>
    </div>
    <Link
    href="/admin/events/new"
    className="flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark"
    >
    <Plus size={16} />
    Tambah Event
    </Link>
    </div>

    {events.length === 0 ? (
      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-4 py-16 text-center sm:py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
      <CalendarDays size={22} />
      </div>
      <p className="mt-4 text-sm font-medium text-ink">Belum ada event</p>
      <p className="mt-1 text-sm text-muted">Buat event pertamamu untuk mulai menerima pendaftaran</p>
      <Link
      href="/admin/events/new"
      className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
      >
      + Tambah Event
      </Link>
      </div>
    ) : (
      <EventsTable events={events} />
    )}
    </div>
  )
}
