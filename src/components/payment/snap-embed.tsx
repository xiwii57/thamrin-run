'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Loader2 } from 'lucide-react'

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

export function SnapEmbed({ snapToken, registrationId }: { snapToken: string; registrationId: string }) {
    const router = useRouter()
    const [scriptReady, setScriptReady] = useState(false)

    useEffect(() => {
        if (!scriptReady || typeof window === 'undefined' || !window.snap) return

            window.snap.embed(snapToken, {
                embedId: 'snap-container',
                onSuccess: () => router.push(`/tiket/${registrationId}`),
                              onPending: () => router.push(`/tiket/${registrationId}`),
                              onError: () => router.refresh(),
            })
    }, [scriptReady, snapToken, registrationId, router])

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

        <div id="snap-container" className="min-h-[500px]" />
        </div>
    )
}
