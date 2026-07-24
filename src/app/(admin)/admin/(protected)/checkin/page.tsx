import { Users, CheckCircle2 } from 'lucide-react'
import { getRecentCheckins, getCheckinStats } from '@/features/checkin/queries'
import { CheckinPanel } from '@/components/admin/checkin-panel'

export default async function CheckinPage() {
    const [stats, recent] = await Promise.all([getCheckinStats(), getRecentCheckins()])

    return (
        <div>
        <h1 className="text-2xl font-semibold text-ink">Check-in Peserta</h1>
        <p className="mt-1 text-sm text-muted">Scan QR tiket peserta untuk menandai kehadiran hari-H</p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-muted">
        <Users size={15} />
        <span className="text-xs">Total Lunas</span>
        </div>
        <p className="mt-1 text-2xl font-bold text-ink">{stats.totalPaid}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-muted">
        <CheckCircle2 size={15} />
        <span className="text-xs">Sudah Check-in</span>
        </div>
        <p className="mt-1 text-2xl font-bold text-accent">{stats.totalCheckedIn}</p>
        </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
        <CheckinPanel />

        <div>
        <h2 className="text-sm font-semibold text-ink">Check-in Terbaru</h2>
        <div className="mt-3 space-y-2">
        {recent.length === 0 && (
            <p className="text-sm text-muted">Belum ada peserta yang check-in.</p>
        )}
        {recent.map((r) => {
            const event = Array.isArray(r.events) ? r.events[0] : r.events
            return (
                <div key={r.id} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
                <div>
                <p className="text-sm font-medium text-ink">{r.name}</p>
                <p className="text-xs text-muted">
                {event?.name}{r.bib_number ? ` • Bib #${r.bib_number}` : ''}
                </p>
                </div>
                <span className="text-xs text-muted">
                {new Date(r.checked_in_at!).toLocaleTimeString('id-ID')}
                </span>
                </div>
            )
        })}
        </div>
        </div>
        </div>
        </div>
    )
}
