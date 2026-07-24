import { CalendarX } from 'lucide-react'
import { getOpenEvents } from '@/features/events/queries'
import { EventCard } from './event-card'

export async function EventsSection() {
    const events = await getOpenEvents()

    return (
        <section id="events" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        {/* section header — lebih kuat, dengan aksen garis */}
        <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
        Event Tersedia
        </p>
        <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
        Pilih Event Larimu
        </h2>
        <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-accent" />
        <p className="mt-4 text-sm text-muted">
        Pendaftaran dibuka untuk event-event berikut
        </p>
        </div>

        {events.length === 0 ? (
            /* empty state — lebih diberi ruang dan visual weight */
            <div className="mx-auto mt-14 flex max-w-md flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-8 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft">
            <CalendarX size={24} className="text-accent/50" />
            </div>
            <p className="mt-5 text-base font-semibold text-ink">
            Belum ada event yang dibuka
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
            Pantau terus halaman ini untuk info event berikutnya
            </p>
            </div>
        ) : (
            /* grid layout — bukan vertical stack */
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
            </div>
        )}
        </section>
    )
}
