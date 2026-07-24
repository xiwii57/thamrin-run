import { Users, CheckCircle2, Clock, Wallet } from 'lucide-react'
import { getEventsForFilter, getRegistrationsByEvent, getRegistrationStats } from '@/features/registration/queries'
import { RegistrationsTable } from '@/components/admin/registrations-table'
import { EventFilter } from '@/components/admin/event-filter'
import { formatRupiahFull } from '@/lib/format'

export default async function ParticipantsPage({
    searchParams,
}: {
    searchParams: Promise<{ event?: string }>
}) {
    const { event: eventId } = await searchParams
    const [events, registrations, stats] = await Promise.all([
        getEventsForFilter(),
                                                             getRegistrationsByEvent(eventId),
                                                             getRegistrationStats(eventId),
    ])

    return (
        <div>
        <h1 className="text-2xl font-semibold text-ink">Peserta & Pembayaran</h1>
        <p className="mt-1 text-sm text-muted">
        Status pembayaran otomatis terupdate setelah Midtrans mengonfirmasi transaksi
        </p>

        <div className="mt-5">
        <EventFilter events={events} selectedEventId={eventId} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-muted"><Users size={15} /><span className="text-xs">Total Daftar</span></div>
        <p className="mt-1 text-2xl font-bold text-ink">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-muted"><CheckCircle2 size={15} /><span className="text-xs">Lunas</span></div>
        <p className="mt-1 text-2xl font-bold text-success">{stats.paid}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-muted"><Clock size={15} /><span className="text-xs">Menunggu Bayar</span></div>
        <p className="mt-1 text-2xl font-bold text-warning">{stats.pending}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-muted"><Wallet size={15} /><span className="text-xs">Revenue</span></div>
        <p className="mt-1 text-xl font-bold text-accent">{formatRupiahFull(stats.revenue)}</p>
        </div>
        </div>

        <div className="mt-8">
        <RegistrationsTable registrations={registrations} />
        </div>
        </div>
    )
}
