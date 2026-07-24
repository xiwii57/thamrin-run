'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { CountdownTimer } from './countdown-timer'
import { formatRupiahFull } from '@/lib/format'

const paymentMethods = [
    { id: 'va', label: 'Virtual Account', desc: 'BCA, Mandiri, BNI, BRI' },
{ id: 'ewallet', label: 'E-Wallet', desc: 'GoPay, OVO, ShopeePay' },
{ id: 'qris', label: 'QRIS', desc: 'Scan dari aplikasi apa saja' },
]

type EventInfo = {
    slug: string
    name: string
    event_date: string
    location: string | null
    price: number
    categories: string[]
}

export function RegistrationForm({
    action,
    event,
    expiresAt,
    error,
}: {
    action: (formData: FormData) => void
    event: EventInfo
    expiresAt: string
    error?: string
}) {
    const [selectedPayment, setSelectedPayment] = useState('va')
    const [agreed, setAgreed] = useState(false)

    const date = new Date(event.event_date)
    const fullDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    const serviceFee = 2500
    const total = event.price + serviceFee

    return (
        <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Link href={`/events/${event.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        <ArrowLeft size={15} />
        Kembali
        </Link>

        <p className="mt-4 text-xs font-medium text-muted">Langkah 1 dari 2 &middot; Data Peserta</p>
        <h1 className="mt-1 text-2xl font-bold text-ink">{event.name}</h1>
        <p className="mt-1 text-sm text-muted">
        {fullDate}{event.location ? ` — ${event.location}` : ''}
        </p>

        <form action={action} className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
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
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-sm font-semibold text-ink">Metode Pembayaran</h2>
        <p className="mt-1 text-xs text-muted">Pembayaran diproses aman melalui payment gateway</p>

        <div className="mt-4 space-y-2.5">
        {paymentMethods.map((m) => (
            <label
            key={m.id}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition ${
                selectedPayment === m.id ? 'border-accent bg-accent-soft' : 'border-border hover:bg-canvas'
            }`}
            >
            <input
            type="radio"
            name="payment_method"
            value={m.id}
            checked={selectedPayment === m.id}
            onChange={() => setSelectedPayment(m.id)}
            className="accent-accent"
            />
            <div>
            <p className="text-sm font-medium text-ink">{m.label}</p>
            <p className="text-xs text-muted">{m.desc}</p>
            </div>
            </label>
        ))}
        </div>
        </div>
        </div>

        <div>
        <div className="sticky top-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <CountdownTimer expiresAt={expiresAt} />

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
        disabled={!agreed}
        className="mt-4 w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted"
        >
        Lanjut ke Pembayaran
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
        <ShieldCheck size={13} />
        Data kamu aman dan terenkripsi
        </p>
        </div>
        </div>
        </div>
        </form>
        </div>
        </div>
    )
}
