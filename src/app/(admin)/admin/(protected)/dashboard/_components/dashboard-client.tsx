// app/(admin)/admin/dashboard/_components/dashboard-client.tsx
'use client'

import { useState } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { formatRupiahFull } from '@/lib/format'

type Participant = {
    id: string
    bib_number: string | null
    name: string
    category: string | null
    status: string
    created_at: string
}

type EventStat = {
    id: string
    name: string
    event_date: string
    quota: number
    status: string
    participants: number
}

type Props = {
    adminEmail: string
    kpi: {
        totalParticipants: number
        remainingQuota: number
        totalQuota: number
        revenue: number
        percentFilled: number
    }
    registrationTrend: { date: string; total: number }[]
    participants: Participant[]
    events: EventStat[]
}

const statusLabel: Record<string, { label: string; className: string }> = {
    paid: { label: 'Lunas', className: 'bg-emerald-50 text-emerald-600' },
    pending: { label: 'Menunggu', className: 'bg-amber-50 text-amber-600' },
    cancelled: { label: 'Dibatalkan', className: 'bg-red-50 text-red-600' },
}

const eventStatusLabel: Record<string, { label: string; className: string }> = {
    open: { label: 'Aktif', className: 'bg-[#130F59]/5 text-[#130F59]' },
    draft: { label: 'Draft', className: 'bg-slate-100 text-slate-500' },
    closed: { label: 'Ditutup', className: 'bg-amber-50 text-amber-600' },
    finished: { label: 'Selesai', className: 'bg-sky-50 text-sky-600' },
}

export default function DashboardClient({ adminEmail, kpi, registrationTrend, participants, events }: Props) {
    const [searchBib, setSearchBib] = useState('')
    const [searchEvent, setSearchEvent] = useState('')

    const filteredParticipants = participants.filter((p) =>
    (p.bib_number ?? '').includes(searchBib)
    )

    const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(searchEvent.toLowerCase())
    )

    const kpiCards = [
        { label: 'Total Peserta', value: kpi.totalParticipants.toLocaleString('id-ID'), sub: 'Semua event' },
        { label: 'Kuota Tersisa', value: kpi.remainingQuota.toLocaleString('id-ID'), sub: `dari ${kpi.totalQuota.toLocaleString('id-ID')}` },
        { label: 'Revenue', value: formatRupiahFull(kpi.revenue), sub: 'Pembayaran lunas' },
        { label: '% Terisi', value: `${kpi.percentFilled.toFixed(1)}%`, sub: 'Rata-rata' },
    ]

    return (
        <div className="space-y-8">
        <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Selamat datang, {adminEmail}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiCards.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-0.5 text-xs text-slate-400">{item.sub}</p>
            </div>
        ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-slate-900">Tren Pendaftaran (7 Hari Terakhir)</h3>
        <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={registrationTrend}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
        contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            fontSize: '13px',
        }}
        labelStyle={{ fontWeight: 600 }}
        />
        <Line type="monotone" dataKey="total" stroke="#130F59" strokeWidth={2} dot={{ fill: '#130F59', r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
        </ResponsiveContainer>
        </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-900">Peserta Terbaru</h3>
        </div>
        <div className="px-5 pt-4">
        <input
        type="text"
        placeholder="Cari BIB..."
        value={searchBib}
        onChange={(e) => setSearchBib(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-[#130F59] focus:ring-2 focus:ring-[#130F59]/10"
        />
        </div>
        <table className="mt-3 w-full text-sm">
        <thead>
        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
        <th className="px-5 py-3">BIB</th>
        <th className="px-5 py-3">Nama</th>
        <th className="px-5 py-3">Kategori</th>
        <th className="px-5 py-3">Status</th>
        </tr>
        </thead>
        <tbody>
        {filteredParticipants.length === 0 ? (
            <tr>
            <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
            Tidak ditemukan
            </td>
            </tr>
        ) : (
            filteredParticipants.map((p) => {
                const status = statusLabel[p.status] ?? statusLabel.pending
                return (
                    <tr key={p.id} className="border-b border-slate-50 transition hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-[#130F59]">
                    {p.bib_number ?? '—'}
                    </td>
                    <td className="px-5 py-3 text-slate-700">{p.name}</td>
                    <td className="px-5 py-3 text-slate-500">{p.category ?? '—'}</td>
                    <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                    {status.label}
                    </span>
                    </td>
                    </tr>
                )
            })
        )}
        </tbody>
        </table>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-900">Event</h3>
        </div>
        <div className="px-5 pt-4">
        <input
        type="text"
        placeholder="Cari event..."
        value={searchEvent}
        onChange={(e) => setSearchEvent(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-[#130F59] focus:ring-2 focus:ring-[#130F59]/10"
        />
        </div>
        <div className="mt-3 divide-y divide-slate-100">
        {filteredEvents.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-400">Tidak ditemukan</p>
        ) : (
            filteredEvents.map((event) => {
                const status = eventStatusLabel[event.status] ?? eventStatusLabel.draft
                return (
                    <div key={event.id} className="px-5 py-4 transition hover:bg-slate-50/50">
                    <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">{event.name}</p>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                    {status.label}
                    </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                    <span>{new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>
                    {event.participants.toLocaleString('id-ID')} / {event.quota.toLocaleString('id-ID')} peserta
                    </span>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                    className="h-1.5 rounded-full bg-[#130F59] transition-all"
                    style={{ width: `${Math.min((event.participants / event.quota) * 100, 100)}%` }}
                    />
                    </div>
                    </div>
                )
            })
        )}
        </div>
        </div>
        </div>
        </div>
    )
}
