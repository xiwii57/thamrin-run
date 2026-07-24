'use client'

import { useState, useTransition } from 'react'
import { Lock, Download, ShieldCheck } from 'lucide-react'
import { revealTicketQr } from '@/features/ticket/actions'

export function TicketUnlock({
    registrationId,
    fileName,
}: {
    registrationId: string
    fileName: string
}) {
    const [phoneLast4, setPhoneLast4] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        startTransition(async () => {
            const result = await revealTicketQr(registrationId, phoneLast4)
            if (result.ok) {
                setQrDataUrl(result.qrDataUrl)
            } else {
                setError(result.error)
            }
        })
    }

    if (qrDataUrl) {
        return (
            <div className="flex flex-col items-center gap-3 border-t border-dashed border-border bg-canvas/50 p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR Tiket" className="h-40 w-40" />
            <p className="text-center text-xs text-muted">
            Tunjukkan QR ini saat pendataan di lokasi event
            </p>

            <a href={qrDataUrl}
            download={fileName}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
            <Download size={15} />
            Download QR Tiket
            </a>
            </div>
        )
    }

    return (
        <div className="border-t border-dashed border-border bg-canvas/50 p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
        <Lock size={15} className="text-accent" />
        Verifikasi untuk melihat QR tiket
        </div>
        <p className="mt-1 text-xs text-muted">
        Masukkan 4 digit terakhir nomor HP yang kamu daftarkan
        </p>

        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
        value={phoneLast4}
        onChange={(e) => setPhoneLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
        inputMode="numeric"
        maxLength={4}
        placeholder="0000"
        required
        className="w-24 rounded-lg border border-border bg-surface px-3 py-2.5 text-center text-sm tracking-widest outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
        <button
        type="submit"
        disabled={isPending || phoneLast4.length !== 4}
        className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
        {isPending ? 'Memeriksa...' : 'Tampilkan QR'}
        </button>
        </form>

        {error && <p className="mt-2 text-xs text-danger">{error}</p>}

        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
        <ShieldCheck size={12} />
        Verifikasi ini melindungi tiketmu dari akses orang lain
        </p>
        </div>
    )
}
