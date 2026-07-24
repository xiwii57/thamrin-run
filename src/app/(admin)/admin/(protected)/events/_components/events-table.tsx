'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteEvent } from '@/features/events/actions'
import { formatRupiahFull, formatDate } from '@/lib/format'

const statusStyle: Record<string, string> = {
  draft: 'bg-canvas text-muted border border-border',
  open: 'bg-success-soft text-success',
  closed: 'bg-warning-soft text-warning',
  finished: 'bg-accent-soft text-accent',
}

const statusLabel: Record<string, string> = {
  draft: 'Draft',
  open: 'Dibuka',
  closed: 'Ditutup',
  finished: 'Selesai',
}

type EventRow = {
  id: string
  name: string
  slug: string
  event_date: string
  quota: number
  price: number
  status: string
}

export function EventsTable({ events }: { events: EventRow[] }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete(id: string, name: string) {
    if (!confirm(`Hapus event "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return
      startTransition(() => deleteEvent(id))
  }

  return (
    <div className="mt-6">
    {/* Desktop / tablet: table */}
    <div className="hidden overflow-x-auto rounded-xl border border-border bg-surface md:block">
    <table className="w-full text-sm">
    <thead>
    <tr className="border-b border-border bg-canvas/60 text-left text-xs font-medium uppercase tracking-wide text-muted">
    <th className="px-5 py-3">Event</th>
    <th className="px-5 py-3">Tanggal</th>
    <th className="px-5 py-3">Kuota</th>
    <th className="px-5 py-3">Harga</th>
    <th className="px-5 py-3">Status</th>
    <th className="px-5 py-3 text-right">Aksi</th>
    </tr>
    </thead>
    <tbody className="divide-y divide-border">
    {events.map((event) => (
      <tr key={event.id} className="transition hover:bg-canvas/40">
      <td className="px-5 py-4">
      <p className="font-medium text-ink">{event.name}</p>
      <p className="text-xs text-muted">/{event.slug}</p>
      </td>
      <td className="px-5 py-4 text-ink">{formatDate(event.event_date)}</td>
      <td className="px-5 py-4 text-ink">{event.quota} peserta</td>
      <td className="px-5 py-4 text-ink">{formatRupiahFull(event.price)}</td>
      <td className="px-5 py-4">
      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[event.status]}`}>
      {statusLabel[event.status]}
      </span>
      </td>
      <td className="px-5 py-4">
      <div className="flex items-center justify-end gap-3">
      <Link
      href={`/admin/events/${event.id}/edit`}
      className="text-muted transition hover:text-accent"
      >
      <Pencil size={15} />
      </Link>
      <button
      onClick={() => handleDelete(event.id, event.name)}
      disabled={isPending}
      className="text-muted transition hover:text-danger disabled:opacity-50"
      >
      <Trash2 size={15} />
      </button>
      </div>
      </td>
      </tr>
    ))}
    </tbody>
    </table>
    </div>

    {/* Mobile: card list */}
    <div className="space-y-3 md:hidden">
    {events.map((event) => (
      <div key={event.id} className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
      <p className="truncate font-medium text-ink">{event.name}</p>
      <p className="text-xs text-muted">/{event.slug}</p>
      </div>
      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[event.status]}`}>
      {statusLabel[event.status]}
      </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
      <div>
      <p className="text-xs text-muted">Tanggal</p>
      <p className="mt-0.5 text-ink">{formatDate(event.event_date)}</p>
      </div>
      <div>
      <p className="text-xs text-muted">Kuota</p>
      <p className="mt-0.5 text-ink">{event.quota} peserta</p>
      </div>
      <div className="col-span-2">
      <p className="text-xs text-muted">Harga</p>
      <p className="mt-0.5 text-ink">{formatRupiahFull(event.price)}</p>
      </div>
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
      <Link
      href={`/admin/events/${event.id}/edit`}
      className="flex items-center gap-1.5 text-sm font-medium text-accent"
      >
      <Pencil size={14} /> Edit
      </Link>
      <button
      onClick={() => handleDelete(event.id, event.name)}
      disabled={isPending}
      className="flex items-center gap-1.5 text-sm font-medium text-danger disabled:opacity-50"
      >
      <Trash2 size={14} /> Hapus
      </button>
      </div>
      </div>
    ))}
    </div>
    </div>
  )
}
