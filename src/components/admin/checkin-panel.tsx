'use client'

import { useState, useTransition } from 'react'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { QrScanner } from './qr-scanner'
import { checkInParticipant } from '@/features/checkin/actions'
import type { CheckinResult } from '@/features/checkin/schema'

export function CheckinPanel() {
    const [result, setResult] = useState<CheckinResult | null>(null)
    const [isPending, startTransition] = useTransition()

    function handleScan(code: string) {
        if (isPending) return
            startTransition(async () => {
                const res = await checkInParticipant(code)
                setResult(res)
            })
    }

    return (
        <div>
        <div className="rounded-2xl border border-border bg-surface p-5">
        <QrScanner onScan={handleScan} />
        </div>

        {isPending && (
            <p className="mt-4 text-center text-sm text-muted">Memverifikasi...</p>
        )}

        {result && !isPending && (
            <div className="mt-4">
            {result.status === 'success' && (
                <div className="flex items-start gap-3 rounded-xl border border-success/20 bg-success-soft p-4">
                <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-success" />
                <div>
                <p className="font-semibold text-ink">{result.name} — Check-in berhasil</p>
                <p className="mt-1 text-sm text-muted">
                {result.eventName}{result.category ? ` • ${result.category}` : ''}
                {result.bibNumber && ` • Bib #${result.bibNumber}`}
                </p>
                </div>
                </div>
            )}

            {result.status === 'already_checked_in' && (
                <div className="flex items-start gap-3 rounded-xl border border-warning/20 bg-warning-soft p-4">
                <AlertTriangle size={22} className="mt-0.5 shrink-0 text-warning" />
                <div>
                <p className="font-semibold text-ink">{result.name} — Sudah check-in sebelumnya</p>
                <p className="mt-1 text-sm text-muted">
                Pada {new Date(result.checkedInAt).toLocaleTimeString('id-ID')}
                </p>
                </div>
                </div>
            )}

            {result.status === 'not_paid' && (
                <div className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger-soft p-4">
                <XCircle size={22} className="mt-0.5 shrink-0 text-danger" />
                <div>
                <p className="font-semibold text-ink">{result.name} — Belum melunasi pembayaran</p>
                <p className="mt-1 text-sm text-muted">Peserta belum bisa check-in sebelum status pembayaran terverifikasi.</p>
                </div>
                </div>
            )}

            {result.status === 'invalid' && (
                <div className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger-soft p-4">
                <XCircle size={22} className="mt-0.5 shrink-0 text-danger" />
                <div>
                <p className="font-semibold text-ink">Kode tidak valid</p>
                <p className="mt-1 text-sm text-muted">Kode QR tidak dikenali atau rusak. Coba scan ulang.</p>
                </div>
                </div>
            )}
            </div>
        )}
        </div>
    )
}
