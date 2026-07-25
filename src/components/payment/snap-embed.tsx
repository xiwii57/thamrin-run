'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Loader2, ArrowRight } from 'lucide-react'

declare global {
    interface Window {
        snap: {
            embed: (
                token: string,
                options: {
                    embedId: string
                    onSuccess?: () => void
                    onPending?: () => void
                    onError?: () => void
                    onClose?: () => void
                }
            ) => void
        }
    }
}

export function SnapEmbed({
    snapToken,
    registrationId,
    accessCode,
}: {
    snapToken: string
    registrationId: string
    accessCode: string
}) {
    const router = useRouter()
    const [scriptReady, setScriptReady] = useState(false)
    const [showManualLink, setShowManualLink] = useState(false)

    async function grantAccess() {
        await fetch('/api/ticket/grant-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationId, accessCode }),
        })
    }

    async function goToTicket() {
        await grantAccess()
        router.push(`/tiket/${registrationId}`)
    }

    useEffect(() => {
        if (!scriptReady || typeof window === 'undefined' || !window.snap) return

            window.snap.embed(snapToken, {
                embedId: 'snap-container',
                // Pembayaran instan yang benar-benar tuntas (kartu kredit, dsb) -> langsung pindah
                onSuccess: goToTicket,
                // VA/QRIS baru DIBUAT di sini, bukan berarti sudah dibayar.
                // Biarkan widget tetap terbuka supaya user masih bisa lihat instruksi
                // bayar atau ganti metode pembayaran di dalam Snap itu sendiri.
                // Cukup siapkan akses tiket di background + munculkan opsi manual.
                onPending: async () => {
                    await grantAccess()
                    setShowManualLink(true)
                },
                onError: () => router.refresh(),
            })

            const timer = setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 300)

            return () => clearTimeout(timer)
    }, [scriptReady, snapToken, registrationId, accessCode])

    return (
        <div className="p-6">
        <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        onReady={() => setScriptReady(true)}
        />

        {!scriptReady && (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted">
            <Loader2 size={24} className="animate-spin" />
            <p className="text-sm">Menyiapkan halaman pembayaran...</p>
            </div>
        )}

        <div id="snap-container" className="w-full min-h-[600px]" />

        {showManualLink && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-canvas px-4 py-3">
            <p className="text-sm text-muted">
            Sudah dapat kode/nomor pembayaran? Kamu bisa lihat status tiket kapan saja.
            </p>
            <button
            onClick={() => router.push(`/tiket/${registrationId}`)}
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
            Lihat Tiket
            <ArrowRight size={14} />
            </button>
            </div>
        )}
        </div>
    )
}
