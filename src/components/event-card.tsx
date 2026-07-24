import Link from 'next/link'
import { MapPin, ImageIcon } from 'lucide-react'
import { formatRupiahFull } from '@/lib/format'

type EventCardProps = {
    slug: string
    name: string
    event_date: string
    location: string | null
    price: number
    quota: number
    registered_count?: number
    poster_url: string | null
    categories: string[]
}

export function EventCard({ event }: { event: EventCardProps }) {
    const date = new Date(event.event_date)
    const day = date.toLocaleDateString('id-ID', { day: 'numeric' })
    const month = date.toLocaleDateString('id-ID', { month: 'long' })
    const year = date.toLocaleDateString('id-ID', { year: 'numeric' })

    const filled = event.registered_count ?? 0
    const remaining = Math.max(event.quota - filled, 0)
    const percentage = event.quota > 0 ? Math.min(Math.round((filled / event.quota) * 100), 100) : 0

    const isFull = remaining === 0
    const isAlmostFull = !isFull && remaining <= event.quota * 0.2

    return (
        <Link
        href={`/events/${event.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-accent/20"
        >
        {/* poster area */}
        <div className="relative aspect-[16/10] overflow-hidden bg-accent-soft">
        {event.poster_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
            src={event.poster_url}
            alt={`Poster ${event.name}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 shadow-sm">
            <ImageIcon size={20} className="text-accent/40" />
            </div>
            <span className="text-xs font-medium text-accent/40">
            Poster segera hadir
            </span>
            </div>
        )}

        {/* badge status — hanya muncul jika perlu */}
        {isFull && (
            <span className="absolute left-3 top-3 rounded-lg bg-danger px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            Kuota Penuh
            </span>
        )}
        {isAlmostFull && (
            <span className="absolute left-3 top-3 rounded-lg bg-warning px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            Hampir Penuh
            </span>
        )}
        </div>

        {/* content */}
        <div className="flex flex-1 flex-col p-5">
        {/* categories */}
        <div className="flex flex-wrap gap-1.5">
        {event.categories.slice(0, 3).map((cat) => (
            <span
            key={cat}
            className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent"
            >
            {cat}
            </span>
        ))}
        </div>

        {/* title */}
        <h3 className="mt-2.5 text-lg font-bold leading-snug text-ink line-clamp-2">
        {event.name}
        </h3>

        {/* meta info */}
        <div className="mt-3 space-y-1.5 text-sm">
        <p className="font-medium text-ink">
        {day} {month} {year}
        </p>
        {event.location && (
            <p className="flex items-center gap-1.5 text-muted">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{event.location}</span>
            </p>
        )}
        </div>

        {/* spacer — dorong bagian bawah ke dasar card */}
        <div className="flex-1" />

        {/* progress bar kuota */}
        {event.quota > 0 && (
            <div className="mt-4">
            <div className="flex items-baseline justify-between text-[11px]">
            <span className="text-muted">
            {isFull ? 'Kuota penuh' : `Sisa ${remaining} slot`}
            </span>
            <span className="font-semibold text-ink">{percentage}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-accent-soft">
            <div
            className={`h-full rounded-full transition-all duration-700 ${
                isFull
                ? 'bg-danger'
                : isAlmostFull
                ? 'bg-warning'
                : 'bg-accent'
            }`}
            style={{ width: `${percentage}%` }}
            />
            </div>
            </div>
        )}

        {/* harga + CTA */}
        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <div>
        <p className="text-[11px] text-muted">Mulai dari</p>
        <p className="text-lg font-bold text-ink">
        {formatRupiahFull(event.price)}
        </p>
        </div>
        <span
        className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            isFull
            ? 'bg-border text-muted'
            : 'bg-accent text-white group-hover:bg-accent-dark'
        }`}
        >
        {isFull ? 'Penuh' : 'Detail →'}
        </span>
        </div>
        </div>
        </Link>
    )
}
