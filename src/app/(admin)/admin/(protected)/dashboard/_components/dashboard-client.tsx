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

// --- Mock data (nanti ganti dari database) ---

const registrationTrend = [
    { date: '18 Jun', total: 28 },
{ date: '19 Jun', total: 45 },
{ date: '20 Jun', total: 38 },
{ date: '21 Jun', total: 62 },
{ date: '22 Jun', total: 55 },
{ date: '23 Jun', total: 71 },
{ date: '24 Jun', total: 84 },
]

const participants = [
    { bib: '0001', name: 'Ahmad Rizki Pratama', category: '10K', status: 'Lunas', date: '24 Jun 2025' },
{ bib: '0002', name: 'Siti Nurhaliza', category: '5K', status: 'Lunas', date: '24 Jun 2025' },
{ bib: '0003', name: 'Budi Santoso', category: 'Half Marathon', status: 'Menunggu', date: '23 Jun 2025' },
{ bib: '0004', name: 'Dewi Lestari', category: '10K', status: 'Lunas', date: '23 Jun 2025' },
{ bib: '0005', name: 'Raka Aditya', category: '5K', status: 'Lunas', date: '22 Jun 2025' },
{ bib: '0006', name: 'Putri Wulandari', category: '10K', status: 'Menunggu', date: '22 Jun 2025' },
{ bib: '0007', name: 'Fajar Nugroho', category: 'Half Marathon', status: 'Lunas', date: '21 Jun 2025' },
{ bib: '0008', name: 'Ayu Permata Sari', category: '5K', status: 'Lunas', date: '21 Jun 2025' },
]

const events = [
    { id: 1, name: 'Thamrin Run 2025', date: '20 Jul 2025', participants: 1247, quota: 2000, status: 'Aktif' },
{ id: 2, name: 'Night Run Jakarta', date: '15 Agu 2025', participants: 580, quota: 1000, status: 'Aktif' },
{ id: 3, name: 'Fun Run Keluarga', date: '10 Sep 2025', participants: 0, quota: 500, status: 'Draft' },
]

const kpi = [
    { label: 'Total Peserta', value: '1.247', sub: 'Semua event' },
{ label: 'Kuota Tersisa', value: '1.673', sub: 'dari 3.500' },
{ label: 'Revenue', value: 'Rp 62,3jt', sub: 'Pembayaran lunas' },
{ label: '% Terisi', value: '52,3%', sub: 'Rata-rata' },
]

// --- Komponen ---

export default function DashboardClient({ adminEmail }: { adminEmail: string }) {
    const [searchBib, setSearchBib] = useState('')
    const [searchEvent, setSearchEvent] = useState('')

    const filteredParticipants = participants.filter((p) =>
    p.bib.includes(searchBib)
    )

    const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(searchEvent.toLowerCase())
    )

    return (
        <div className="space-y-8">
        {/* Header */}
        <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
        Selamat datang, {adminEmail}
        </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
        {kpi.map((item) => (
            <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
            >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
            {item.value}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">{item.sub}</p>
            </div>
        ))}
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-slate-900">
        Tren Pendaftaran (7 Hari Terakhir)
        </h3>
        <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={registrationTrend}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
        dataKey="date"
        tick={{ fontSize: 12, fill: '#94a3b8' }}
        axisLine={false}
        tickLine={false}
        />
        <YAxis
        tick={{ fontSize: 12, fill: '#94a3b8' }}
        axisLine={false}
        tickLine={false}
        />
        <Tooltip
        contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            fontSize: '13px',
        }}
        labelStyle={{ fontWeight: 600 }}
        />
        <Line
        type="monotone"
        dataKey="total"
        stroke="#130F59"
        strokeWidth={2}
        dot={{ fill: '#130F59', r: 4 }}
        activeDot={{ r: 6 }}
        />
        </LineChart>
        </ResponsiveContainer>
        </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-6">
        {/* Peserta Terbaru */}
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
            filteredParticipants.map((p) => (
                <tr
                key={p.bib}
                className="border-b border-slate-50 transition hover:bg-slate-50/50"
                >
                <td className="px-5 py-3 font-mono text-xs font-semibold text-[#130F59]">
                {p.bib}
                </td>
                <td className="px-5 py-3 text-slate-700">{p.name}</td>
                <td className="px-5 py-3 text-slate-500">{p.category}</td>
                <td className="px-5 py-3">
                <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.status === 'Lunas'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-amber-50 text-amber-600'
                }`}
                >
                {p.status}
                </span>
                </td>
                </tr>
            ))
        )}
        </tbody>
        </table>
        </div>

        {/* Event Aktif */}
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
            <p className="px-5 py-10 text-center text-sm text-slate-400">
            Tidak ditemukan
            </p>
        ) : (
            filteredEvents.map((event) => (
                <div key={event.id} className="px-5 py-4 transition hover:bg-slate-50/50">
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">
                {event.name}
                </p>
                <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    event.status === 'Aktif'
                    ? 'bg-[#130F59]/5 text-[#130F59]'
                    : 'bg-slate-100 text-slate-500'
                }`}
                >
                {event.status}
                </span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                <span>{event.date}</span>
                <span>
                {event.participants.toLocaleString('id-ID')} / {event.quota.toLocaleString('id-ID')} peserta
                </span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                <div
                className="h-1.5 rounded-full bg-[#130F59] transition-all"
                style={{
                    width: `${Math.min((event.participants / event.quota) * 100, 100)}%`,
                }}
                />
                </div>
                </div>
            ))
        )}
        </div>
        </div>
        </div>
        </div>
    )
}
