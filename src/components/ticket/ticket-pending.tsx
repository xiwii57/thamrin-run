'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export function TicketPending() {
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => router.refresh(), 5000)
        return () => clearInterval(interval)
    }, [router])

    return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <Loader2 size={28} className="animate-spin text-accent" />
        <h1 className="mt-4 text-xl font-bold text-ink">Menunggu Konfirmasi Pembayaran</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
        Tiket kamu akan otomatis muncul di sini setelah pembayaran terverifikasi. Halaman ini refresh otomatis.
        </p>
        </div>
    )
}
