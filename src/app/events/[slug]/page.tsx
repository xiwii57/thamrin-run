import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Calendar, Tag, ArrowLeft, ImageIcon } from 'lucide-react'
import { getEventBySlug } from '@/features/events/queries'
import { formatRupiahFull } from '@/lib/format'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { EventTabs } from '@/components/event-detail/event-tabs'
import { ShareButtons } from '@/components/event-detail/share-buttons'
import { createRegistrationSession } from '@/features/registration/actions'

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const event = await getEventBySlug(slug)

    if (!event) notFound()

        const date = new Date(event.event_date)
        const fullDate = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

        const remaining = Math.max(event.quota - event.registered_count, 0)
        const isFull = remaining === 0
        const eventUrl = `https://thamrinrun.com/events/${event.slug}` // sesuaikan domain saat sudah live

        return (
            <div className="flex min-h-screen flex-col bg-canvas">
            <SiteHeader />

            {/* Banner */}
            <div className="relative h-64 w-full bg-accent-soft sm:h-80 lg:h-96">
            {event.poster_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.poster_url} alt={event.name} className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full items-center justify-center">
                <ImageIcon size={40} className="text-accent/40" />
                </div>
            )}
            </div>

            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Kolom kiri */}
            <div className="pt-6 lg:pt-8">
            <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
            <ArrowLeft size={15} />
            Kembali ke daftar event
            </Link>

            <h1 className="text-2xl font-bold text-ink sm:text-3xl">{event.name}</h1>

            <div className="mt-4 space-y-2.5 text-sm text-muted">
            {event.location && (
                <p className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-accent" />
                {event.location}
                </p>
            )}
            <p className="flex items-center gap-2">
            <Calendar size={16} className="shrink-0 text-accent" />
            {fullDate}
            </p>
            {event.categories.length > 0 && (
                <p className="flex items-center gap-2">
                <Tag size={16} className="shrink-0 text-accent" />
                {event.categories.join(' • ')}
                </p>
            )}
            </div>

            <div className="mt-6">
            <EventTabs
            description={event.description}
            categories={event.categories}
            price={event.price}
            quota={event.quota}
            registeredCount={event.registered_count}
            terms={event.terms}
            />
            </div>
            </div>

            {/* Sidebar mengambang, menimpa banner (desktop) */}
            <div className="hidden lg:block">
            <div className="sticky top-24 -mt-56 overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-border">
            <div className="h-44 w-full bg-accent-soft">
            {event.poster_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.poster_url} alt={event.name} className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full items-center justify-center">
                <ImageIcon size={28} className="text-accent/40" />
                </div>
            )}
            </div>

            <div className="p-5">
            <div className="flex items-center justify-between gap-3">
            <div>
            <p className="text-xs text-muted">Harga mulai dari</p>
            <p className="text-xl font-bold text-ink">{formatRupiahFull(event.price)}</p>
            </div>
            {isFull ? (
                <span className="mt-5 block w-full cursor-not-allowed rounded-lg bg-canvas px-4 py-3 text-center text-sm font-semibold text-muted">
                Kuota Penuh
                </span>
                ) : (
                    <form action={createRegistrationSession.bind(null, event.id)} className="mt-5">
                    <button type="submit" className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark">
                    Daftar Sekarang
                    </button>
                    </form>
                    )}
            </div>

            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted">
            <p className="font-medium text-ink">{event.name}</p>
            {event.location && (
                <p className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                {event.location}
                </p>
            )}
            <p className="flex items-center gap-2">
            <Calendar size={14} className="shrink-0" />
            {fullDate}
            </p>
            </div>

            <div className="mt-5 border-t border-border pt-4">
            <p className="text-xs text-muted">Diselenggarakan oleh</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{event.organizer_name}</p>
            </div>

            <div className="mt-5 border-t border-border pt-4">
            <ShareButtons url={eventUrl} title={event.name} />
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

            {/* Sticky bottom bar (mobile) */}
            <div className="sticky bottom-0 z-40 mt-8 border-t border-border bg-surface p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden">
            <div className="flex items-center justify-between gap-4">
            <div>
            <p className="text-xs text-muted">Mulai dari</p>
            <p className="text-lg font-bold text-ink">{formatRupiahFull(event.price)}</p>
            </div>
            {isFull ? (
                <span className="rounded-lg bg-canvas px-6 py-3 text-sm font-semibold text-muted">
                Kuota Penuh
                </span>
            ) : (
                <form action={createRegistrationSession.bind(null, event.id)}>
                <button type="submit" className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white">
                Daftar Sekarang
                </button>
                </form>
            )}
            </div>
            </div>

            <SiteFooter />
            </div>
        )
}
