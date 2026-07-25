'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Copy, Check, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react'
import { chargePayment, type PaymentMethod, type ChargeResult } from '@/features/payment/actions'
import { ExpiryTimer } from './expiry-timer'
import { BankBadge } from './bank-badge'

const banks: { id: PaymentMethod; label: string; desc: string }[] = [
    { id: 'bca', label: 'BCA Virtual Account', desc: 'ATM, m-BCA, KlikBCA' },
{ id: 'bni', label: 'BNI Virtual Account', desc: 'ATM, BNI Mobile Banking' },
{ id: 'bri', label: 'BRI Virtual Account', desc: 'ATM, BRImo' },
{ id: 'permata', label: 'Permata Virtual Account', desc: 'ATM, Permata Mobile' },
]

export function PaymentFlow({ registrationId, accessCode }: { registrationId: string; accessCode: string }) {
    const router = useRouter()
    const [selected, setSelected] = useState<PaymentMethod | null>(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<Extract<ChargeResult, { ok: true }> | null>(null)
    const [copied, setCopied] = useState(false)

    async function grantAccess() {
        await fetch('/api/ticket/grant-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationId, accessCode }),
        })
    }

    async function handleCharge() {
        if (!selected) return
            setIsPending(true)
            setError(null)

            const res = await chargePayment(registrationId, selected)
            setIsPending(false)

            if (!res.ok) {
                setError(res.error)
                return
            }

            await grantAccess()
            setResult(res)
    }

    function handleCopy() {
        if (result?.type !== 'va') return
            navigator.clipboard.writeText(result.vaNumber)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
    }

    function handleChangeMethod() {
        setResult(null)
        setSelected(null)
        setError(null)
    }

    if (result) {
        return (
            <div className="p-6">
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-success-soft px-4 py-3 text-sm font-medium text-success">
            <CheckCircle2 size={16} />
            Instruksi pembayaran berhasil dibuat
            </div>

            <ExpiryTimer expiresAt={result.expiresAt} />

            <div className="mt-6">
            {result.type === 'va' ? (
                <div className="overflow-hidden rounded-xl border border-border">
                <div className="flex items-center gap-3 bg-canvas px-5 py-4">
                <BankBadge bank={result.bank.toLowerCase()} size="lg" />
                <div>
                <p className="text-sm font-semibold text-ink">{result.bank} Virtual Account</p>
                <p className="text-xs text-muted">Transfer sesuai nominal yang tertera</p>
                </div>
                </div>

                <div className="p-5">
                <p className="text-xs text-muted">Nomor Virtual Account</p>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="font-display text-2xl tracking-wide text-ink">{result.vaNumber}</p>
                <button
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-accent-dark"
                >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Tersalin' : 'Salin'}
                </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                Bayar melalui ATM, mobile banking, atau internet banking {result.bank} menggunakan nomor Virtual Account di atas.
                </p>
                </div>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-border">
                <div className="flex items-center gap-3 bg-canvas px-5 py-4">
                <BankBadge bank="qris" size="lg" />
                <div>
                <p className="text-sm font-semibold text-ink">QRIS</p>
                <p className="text-xs text-muted">Scan dari aplikasi e-wallet apa saja</p>
                </div>
                </div>
                <div className="flex flex-col items-center p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.qrUrl} alt="QRIS" className="h-56 w-56 rounded-lg border border-border p-2" />
                <p className="mt-3 text-center text-xs text-muted">
                GoPay, OVO, Dana, ShopeePay, LinkAja, dan lainnya
                </p>
                </div>
                </div>
            )}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
            onClick={handleChangeMethod}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-canvas"
            >
            <RefreshCw size={14} />
            Ganti Metode
            </button>
            <button
            onClick={() => router.push(`/tiket/${registrationId}`)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
            Lihat Status Tiket
            <ArrowRight size={14} />
            </button>
            </div>
            </div>
        )
    }

    return (
        <div className="p-6">
        {error && <p className="mb-4 rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-danger">{error}</p>}

        <div className="space-y-5">
        <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted">Virtual Account</p>
        <div className="space-y-2">
        {banks.map((bank) => (
            <label
            key={bank.id}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 transition ${
                selected === bank.id ? 'border-accent bg-accent-soft' : 'border-border hover:border-accent/30 hover:bg-canvas'
            }`}
            >
            <input type="radio" name="method" checked={selected === bank.id} onChange={() => setSelected(bank.id)} className="sr-only" />
            <BankBadge bank={bank.id} />
            <div className="flex-1">
            <p className="text-sm font-semibold text-ink">{bank.label}</p>
            <p className="text-xs text-muted">{bank.desc}</p>
            </div>
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected === bank.id ? 'border-accent bg-accent' : 'border-border'}`}>
            {selected === bank.id && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
            </label>
        ))}
        </div>
        </div>

        <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted">E-Wallet & QRIS</p>
        <label
        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 transition ${
            selected === 'qris' ? 'border-accent bg-accent-soft' : 'border-border hover:border-accent/30 hover:bg-canvas'
        }`}
        >
        <input type="radio" name="method" checked={selected === 'qris'} onChange={() => setSelected('qris')} className="sr-only" />
        <BankBadge bank="qris" />
        <div className="flex-1">
        <p className="text-sm font-semibold text-ink">QRIS</p>
        <p className="text-xs text-muted">GoPay, OVO, Dana, ShopeePay, dan lainnya</p>
        </div>
        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected === 'qris' ? 'border-accent bg-accent' : 'border-border'}`}>
        {selected === 'qris' && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>
        </label>
        </div>
        </div>

        <button
        onClick={handleCharge}
        disabled={!selected || isPending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted"
        >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {isPending ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
        </div>
    )
}
