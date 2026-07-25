'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { CountdownTimer } from './countdown-timer'
import { SnapEmbed } from '@/components/payment/snap-embed'
import { submitRegistration } from '@/features/registration/actions'
import { formatRupiahFull } from '@/lib/format'

type EventInfo = {
    id: string
    slug: string
    name: string
    event_date: string
    location: string | null
    price: number
    categories: string[]
}

export function RegistrationForm({
    token,
    event,
    expiresAt,
}: {
    token: string
    event: EventInfo
    expiresAt: string
}) {
    const formRef = useRef<HTMLFormElement>(null)
    const [step, setStep] = useState<'form' | 'payment'>('form')
    const [agreed, setAgreed] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [snapToken, setSnapToken] = useState<string | null>(null)
    const [registrationId, setRegistrationId] = useState<string | null>(null)
    const [accessCode, setAccessCode] = useState<string | null>(null)

    const date = new Date(event.event_date)
    const fullDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    const serviceFee = 2500
    const total = event.price + serviceFee

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!formRef.current) return
            setError(null)

            const formData = new FormData(formRef.current)

            startTransition(async () => {
                const result = await submitRegistration(token, formData)
                if (result.ok) {
                    setSnapToken(result.snapToken)
                    setRegistrationId(result.registrationId)
                    setAccessCode(result.accessCode)
                    setStep('payment')
                } else {
                    setError(result.error)
                }
            })
    }

    return (
        <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Link href={`/events/${event.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        <ArrowLeft size={15} />
        Kembali
        </Link>

        <p className="mt-4 text-xs font-medium text-muted">
        Langkah {step === 'form' ? '1' : '2'} dari 2 &middot; {step === 'form' ? 'Data Peserta' : 'Pembayaran'}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-ink">{event.name}</h1>
        <p className="mt-1 text-sm text-muted">
        {fullDate}{event.location ? ` — ${event.location}` : ''}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
        {step === 'form' ? (
            <form ref={formRef} onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold text-ink">Data Peserta</h2>

            {error && (
                <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-danger">{error}</p>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted">Nama Lengkap</label>
            <input name="name" required className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft" />
            </div>
            <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted">Email</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft" />
            </div>
            <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted">Nomor HP</label>
            <div className="flex">
            <span className="flex items-center rounded-l-lg border border-r-0 border-border bg-canvas px-3 text-sm text-muted">+62</span>
            <input name="phone" required className="w-full rounded-r-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft" />
            </div>
            </div>
            <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted">Tanggal Lahir</label>
            <input name="dob" type="date" required className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft" />
            </div>
            <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted">Jenis Kelamin</label>
            <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" name="gender" value="male" required className="accent-accent" /> Laki-laki
            </label>
            <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" name="gender" value="female" className="accent-accent" /> Perempuan
            </label>
            </div>
            </div>
            {event.categories.length > 0 && (
                <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wide text-muted">Kategori Lomba</label>
                <select name="category" required className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft">
                {event.categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
                </div>
            )}
            </div>

            <label className="mt-5 flex items-start gap-2 text-xs text-muted">
            <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-accent"
            />
            Saya menyetujui syarat dan ketentuan pendaftaran event ini.
            </label>

            <button
            type="submit"
            disabled={!agreed || isPending}
            className="mt-4 w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted"
            >
            {isPending ? 'Memproses...' : 'Lanjut ke Pembayaran'}
            </button>
            </div>
            </form>
        ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="border-b border-border p-6">
            <h2 className="text-sm font-semibold text-ink">Metode Pembayaran</h2>
            <p className="mt-1 text-xs text-muted">Pembayaran diproses aman melalui payment gateway</p>
            </div>
            {snapToken && registrationId && accessCode && (
                <SnapEmbed snapToken={snapToken} registrationId={registrationId} accessCode={accessCode} />
            )}
            </div>
        )}
        </div>

        <div>
        <div className="sticky top-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {step === 'form' && <CountdownTimer expiresAt={expiresAt} />}

        <div className="p-5">
        <h3 className="text-sm font-semibold text-ink">Ringkasan Pendaftaran</h3>

        <div className="mt-3 flex items-start justify-between text-sm">
        <span className="text-muted">{event.name}</span>
        <span className="font-medium text-ink">{formatRupiahFull(event.price)}</span>
        </div>

        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between text-muted">
        <span>Subtotal</span>
        <span>{formatRupiahFull(event.price)}</span>
        </div>
        <div className="flex justify-between text-muted">
        <span>Biaya Layanan</span>
        <span>{formatRupiahFull(serviceFee)}</span>
        </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold text-ink">Total</span>
        <span className="text-lg font-bold text-ink">{formatRupiahFull(total)}</span>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted">
        <ShieldCheck size={13} />
        Data kamu aman dan terenkripsi
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}
