'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { AdminSidebar } from './admin-sidebar'

export function AdminShell({
    email,
    children,
}: {
    email?: string
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-canvas">
        {/* overlay saat drawer terbuka di mobile */}
        {open && (
            <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-ink/40 md:hidden"
            aria-hidden
            />
        )}

        {/* sidebar: drawer di mobile, statis di desktop */}
        <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 ease-out md:static md:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
        }`}
        >
        <AdminSidebar
        email={email}
        onNavigate={() => setOpen(false)}
        onClose={() => setOpen(false)}
        />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3 md:hidden">
        <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-ink hover:bg-canvas"
        aria-label="Buka menu"
        >
        <Menu size={20} />
        </button>
        <p className="text-sm font-semibold text-ink">Thamrin Run</p>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">{children}</div>
        </main>
        </div>
        </div>
    )
}
