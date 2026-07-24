import Link from 'next/link'
import { Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export function ExpiredState({ eventSlug }: { eventSlug?: string }) {
    return (
        <div className="flex min-h-screen flex-col bg-canvas">
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-soft text-danger">
        <Clock size={26} />
        </div>
        <h1 className="mt-4 text-xl font-bold text-ink">Sesi Pendaftaran Berakhir</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
        Waktu 20 menit untuk menyelesaikan pendaftaran sudah habis. Silakan klik &quot;Daftar Sekarang&quot; lagi dari halaman event.
        </p>
        <Link
        href={eventSlug ? `/events/${eventSlug}` : '/'}
        className="mt-6 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
        >
        Kembali ke Halaman Event
        </Link>
        </div>
        </div>
    )
}
