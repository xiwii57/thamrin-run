import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ event?: string }>
}) {
    const { event } = await searchParams

    return (
        <div className="flex min-h-screen flex-col bg-canvas">
        <SiteHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
        <CheckCircle2 size={26} />
        </div>
        <h1 className="mt-4 text-xl font-bold text-ink">Pendaftaran Berhasil Dikirim</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
        Cek email kamu untuk instruksi pembayaran selanjutnya. Status pendaftaran otomatis
        terupdate setelah pembayaran terverifikasi.
        </p>
        <Link
        href={event ? `/events/${event}` : '/'}
        className="mt-6 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
        >
        Kembali ke Halaman Event
        </Link>
        </div>
        </div>
    )
}
