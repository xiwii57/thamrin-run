'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { formatRupiahFull } from '@/lib/format'

const statusConfig = {
    paid: { label: 'Lunas', className: 'bg-success-soft text-success' },
    pending: { label: 'Menunggu Bayar', className: 'bg-warning-soft text-warning' },
    cancelled: { label: 'Dibatalkan', className: 'bg-danger-soft text-danger' },
} as const

type Registration = {
    id: string
    name: string
    email: string
    phone: string | null
    category: string | null
    status: string
    bib_number: string | null
    created_at: string
    events: { name: string; price: number } | { name: string; price: number }[] | null
}

export function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const filtered = useMemo(() => {
        return registrations.filter((r) => {
            const matchSearch =
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase()) ||
            (r.bib_number ?? '').includes(search)
            const matchStatus = statusFilter === 'all' || r.status === statusFilter
            return matchSearch && matchStatus
        })
    }, [registrations, search, statusFilter])

    function exportCsv() {
        const rows = [
            ['Nama', 'Email', 'HP', 'Kategori', 'Bib', 'Status', 'Tanggal Daftar'],
            ...filtered.map((r) => [
                r.name,
                r.email,
                r.phone ?? '',
                r.category ?? '',
                r.bib_number ?? '',
                statusConfig[r.status as keyof typeof statusConfig]?.label ?? r.status,
                new Date(r.created_at).toLocaleDateString('id-ID'),
            ]),
        ]
        const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `peserta-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari nama, email, atau bib..."
        className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
        </div>

        <div className="flex items-center gap-2">
        <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        >
        <option value="all">Semua Status</option>
        <option value="paid">Lunas</option>
        <option value="pending">Menunggu Bayar</option>
        <option value="cancelled">Dibatalkan</option>
        </select>
        <button
        onClick={exportCsv}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-canvas"
        >
        Export CSV
        </button>
        </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
        <thead>
        <tr className="border-b border-border bg-canvas/60 text-left text-xs font-medium uppercase tracking-wide text-muted">
        <th className="px-4 py-3">Nama</th>
        <th className="px-4 py-3">Kategori</th>
        <th className="px-4 py-3">Bib</th>
        <th className="px-4 py-3">Status</th>
        <th className="px-4 py-3">Tanggal Daftar</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-border">
        {filtered.map((r) => {
            const config = statusConfig[r.status as keyof typeof statusConfig] ?? statusConfig.pending
            const event = Array.isArray(r.events) ? r.events[0] : r.events
            return (
                <tr key={r.id} className="hover:bg-canvas/40">
                <td className="px-4 py-3">
                <p className="font-medium text-ink">{r.name}</p>
                <p className="text-xs text-muted">{r.email}</p>
                </td>
                <td className="px-4 py-3 text-ink">{r.category ?? '—'}</td>
                <td className="px-4 py-3">
                {r.bib_number ? (
                    <span className="font-display text-accent">{r.bib_number}</span>
                ) : (
                    <span className="text-muted">—</span>
                )}
                </td>
                <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
                {config.label}
                </span>
                </td>
                <td className="px-4 py-3 text-muted">
                {new Date(r.created_at).toLocaleDateString('id-ID')}
                </td>
                </tr>
            )
        })}
        </tbody>
        </table>

        {filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-muted">
            Tidak ada peserta yang cocok dengan pencarian.
            </div>
        )}
        </div>
        </div>
    )
}
