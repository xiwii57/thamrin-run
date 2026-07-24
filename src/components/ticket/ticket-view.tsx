import { Calendar, MapPin, Download } from 'lucide-react'

type EventInfo = {
    name: string
    slug: string
    event_date: string
    location: string | null
    poster_url: string | null
}

type RegistrationInfo = {
    id: string
    name: string
    category: string | null
    bib_number: string | null
}

export function TicketView({
    registration,
    event,
    qrDataUrl,
}: {
    registration: RegistrationInfo
    event: EventInfo
    qrDataUrl: string
}) {
    const fullDate = new Date(event.event_date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <div className="mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-6">
        <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tiket Kamu</p>
        <h1 className="mt-1 text-xl font-bold text-ink">Sampai jumpa di garis start!</h1>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-surface shadow-lg ring-1 ring-border">
        <div className="h-40 bg-accent-soft">
        {event.poster_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={event.poster_url} alt={event.name} className="h-full w-full object-cover" />
        )}
        </div>

        <div className="p-6">
        <p className="text-lg font-bold text-ink">{event.name}</p>
        <div className="mt-2 space-y-1.5 text-sm text-muted">
        <p className="flex items-center gap-2">
        <Calendar size={14} className="text-accent" />
        {fullDate}
        </p>
        {event.location && (
            <p className="flex items-center gap-2">
            <MapPin size={14} className="text-accent" />
            {event.location}
            </p>
        )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
        <div>
        <p className="text-xs text-muted">Nama Peserta</p>
        <p className="font-medium text-ink">{registration.name}</p>
        </div>
        {registration.category && (
            <div>
            <p className="text-xs text-muted">Kategori</p>
            <p className="font-medium text-ink">{registration.category}</p>
            </div>
        )}
        </div>
        </div>

        {/* perforasi sobekan tiket */}
        <div className="relative">
        <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-canvas" />
        <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-canvas" />
        <div className="border-t-2 border-dashed border-border" />
        </div>

        <div className="flex flex-col items-center gap-3 p-6">
        {registration.bib_number && (
            <p className="font-display text-3xl text-accent">#{registration.bib_number}</p>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="QR Tiket" className="h-44 w-44" />
        <p className="text-center text-xs text-muted">
        Tunjukkan QR ini saat pendataan di lokasi event
        </p>

        <a href={qrDataUrl}
        download={`tiket-${event.slug}-${registration.bib_number ?? registration.id.slice(0, 8)}.png`}
        className="mt-2 flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
        <Download size={16} />
        Download QR Tiket
        </a>
        </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
        Simpan tiket ini baik-baik. Wajib ditunjukkan saat pendataan di hari-H.
        </p>
        </div>
    )
}
