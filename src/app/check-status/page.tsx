import Link from 'next/link'
import { Search, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { getRegistrationsByEmail } from '@/features/registration/queries'
import { TicketUnlock } from '@/components/ticket/ticket-unlock'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const statusConfig = {
    paid: { label: 'Terverifikasi', icon: CheckCircle2, className: 'bg-success-soft text-success' },
    pending: { label: 'Menunggu Pembayaran', icon: Clock, className: 'bg-warning-soft text-warning' },
    cancelled: { label: 'Dibatalkan', icon: XCircle, className: 'bg-danger-soft text-danger' },
} as const

export default async function CheckStatusPage({
    searchParams,
}: {
    searchParams: Promise<{ email?: string }>
}) {
    const { email } = await searchParams
    const results = email ? await getRegistrationsByEmail(email) : null

    return (
        <div className="flex min-h-screen flex-col bg-canvas">
        <SiteHeader />

        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6">
        <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Cek Status</p>
        <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Status Pendaftaran</h1>
        <p className="mt-2 text-sm text-muted">
        Masukkan email yang kamu gunakan saat mendaftar untuk melihat status dan tiketmu.
        </p>
        </div>

        <form method="GET" className="mt-8 flex gap-2">
        <input
        type="email"
        name="email"
        required
        defaultValue={email}
        placeholder="nama@email.com"
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
        <button
        type="submit"
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
        <Search size={16} />
        Cari
        </button>
        </form>

        {email && (
            <div className="mt-8">
            {results && results.length > 0 ? (
                <div className="space-y-4">
                {results.map((reg) => {
                    const config = statusConfig[reg.status as keyof typeof statusConfig] ?? statusConfig.pending
                    const Icon = config.icon
                    const event = Array.isArray(reg.events) ? reg.events[0] : reg.events
                    const isPaid = reg.status === 'paid'

                return (
                    <div key={reg.id} className="overflow-hidden rounded-xl border border-border bg-surface">
                    <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                    <div>
                    <p className="font-semibold text-ink">{event?.name}</p>
                    <p className="mt-0.5 text-sm text-muted">
                    {reg.name} {reg.category ? `— ${reg.category}` : ''}
                    </p>
                    </div>
                    <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}>
                    <Icon size={13} />
                    {config.label}
                    </span>
                    </div>

                    {reg.bib_number && (
                        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                        <span className="text-xs text-muted">Nomor Bib:</span>
                        <span className="font-display text-lg text-accent">{reg.bib_number}</span>
                        </div>
                    )}

                    {event?.slug && (
                        <Link href={`/events/${event.slug}`} className="mt-3 inline-block text-xs font-medium text-accent hover:underline">
                        Lihat detail event →
                        </Link>
                    )}
                    </div>

                    {isPaid && (
                        <TicketUnlock
                        registrationId={reg.id}
                        fileName={`tiket-${event?.slug}-${reg.bib_number ?? reg.id.slice(0, 8)}.png`}
                        />
                    )}
                    </div>
                )
                })}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
                <p className="text-sm font-medium text-ink">Tidak ditemukan pendaftaran</p>
                <p className="mt-1 text-sm text-muted">
                Pastikan email yang kamu masukkan sesuai dengan email saat mendaftar.
                </p>
                </div>
            )}
            </div>
        )}
        </div>

        <SiteFooter />
        </div>
    )
}
