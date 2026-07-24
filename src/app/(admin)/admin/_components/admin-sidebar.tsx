'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, QrCode, Trophy, LogOut, X } from 'lucide-react'
import { logout } from '@/features/auth/actions'


const menu = [
{ href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
{ href: '/admin/events', label: 'Event', icon: Calendar },
{ href: '/admin/participants', label: 'Peserta', icon: Users },
{ href: '/admin/checkin', label: 'Check-in', icon: QrCode },
{ href: '/admin/results', label: 'Hasil & Leaderboard', icon: Trophy },
]

export function AdminSidebar({
  email,
  onNavigate,
  onClose,
}: {
  email?: string
  onNavigate?: () => void
  onClose?: () => void
}) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-surface p-4">
    <div className="mb-8 flex items-center justify-between px-2">
    <div className="flex items-center gap-2">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/run.jpeg" alt="Thamrin Run" className="h-9 w-9 rounded-lg object-cover" />
    <p className="text-sm font-semibold text-ink">Thamrin Run</p>
    </div>
    {onClose && (
      <button
      onClick={onClose}
      className="rounded-lg p-1.5 text-muted hover:bg-canvas md:hidden"
      aria-label="Tutup menu"
      >
      <X size={18} />
      </button>
    )}
    </div>

    <nav className="flex-1 space-y-1">
    {menu.map((item) => {
      const active = pathname.startsWith(item.href)
      const Icon = item.icon
      return (
        <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          active
          ? 'bg-accent-soft text-accent'
          : 'text-muted hover:bg-canvas hover:text-ink'
        }`}
        >
        <Icon size={17} strokeWidth={2} />
        {item.label}
        </Link>
      )
    })}
    </nav>

    <form action={logout} className="border-t border-border pt-4">
    <p className="mb-2 truncate px-1 text-xs text-muted">{email}</p>
    <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-canvas hover:text-ink">
    <LogOut size={17} />
    Keluar
    </button>
    </form>
    </aside>
  )
}
