'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Loader2, ArrowRight, CreditCard } from 'lucide-react'

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
    const [isClosed, setIsClosed] = useState(false)
    const [reopenKey, setReopenKey] = useState(0) // ganti key -> paksa div #snap-container dibuat ulang

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

    const embedSnap = useCallback(() => {
        if (typeof window === 'undefined' || !window.snap) return

            window.snap.embed(snapToken, {
                embedId: 'snap-container',
                onSuccess: goToTicket,
                onPending: async () => {
                    await grantAccess()
                    setShowManualLink(true)
                },
                onError: () => router.refresh(),
                              onClose: () => setIsClosed(true),
            })

            setTimeout(() => window.dispatchEvent(new Event('resize')), 300)
    }, [snapToken, registrationId, accessCode])

    useEffect(() => {
        if (!scriptReady) return
            embedSnap()
    }, [scriptReady, reopenKey, embedSnap])

    function handleReopen() {
        setIsClosed(false)
        setReopenKey((k) => k + 1) // trigger useEffect di atas untuk embed ulang
    }

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

        {isClosed ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-canvas py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <CreditCard size={22} />
            </div>
            <div>
            <p className="text-sm font-medium text-ink">Jendela pembayaran ditutup</p>
            <p className="mt-1 text-sm text-muted">Kamu bisa buka lagi untuk memilih atau mengganti metode pembayaran.</p>
            </div>
            <button
            onClick={handleReopen}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
            Pilih Metode Pembayaran
            </button>
            </div>
        ) : (
            <div key={reopenKey} id="snap-container" className="w-full min-h-[600px]" />
        )}

        {showManualLink && !isClosed && (
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
