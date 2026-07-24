'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const links = [
    { href: '#events', label: 'Event' },
{ href: '#tentang', label: 'Tentang' },
]

export function SiteHeader() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
        <img
        src="/run.jpeg"
        alt="Thamrin Run"
        className="h-9 w-auto"
        />
        <span className="font-display text-lg tracking-wide text-ink">
        Thamrin Run
        </span>
        </Link>

        <nav className="hidden items-center md:flex">
        {links.map((link, i) => (
            <span key={link.href} className="flex items-center">
            {i > 0 && (
                <span
                aria-hidden
                className="mx-5 h-3 w-px -skew-x-[20deg] bg-border"
                />
            )}

            {/* PERBAIKAN: Menambahkan tag pembuka <Link> di sini */}
            <Link
            href={link.href}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
            {link.label}
            </Link>
            </span>
        ))}

        <span
        aria-hidden
        className="mx-5 h-3 w-px -skew-x-[20deg] bg-border"
        />

        <Link
        href="/check-status"
        className="group flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent hover:text-ink"
        >
        <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Cek Status
        </Link>
        </nav>

        <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg p-2 text-ink transition-colors hover:bg-canvas md:hidden"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
        {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        </div>

        {open && (
            <div className="border-t border-border bg-surface px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-0.5">
            {links.map((link) => (
                /* PERBAIKAN: Menambahkan tag pembuka <Link> di sini */
                <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:bg-canvas hover:text-ink"
                >
                {link.label}
                </Link>
            ))}
            <Link
            href="/check-status"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:bg-canvas hover:text-ink"
            >
            <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Cek Status
            </Link>
            </nav>
            </div>
        )}
        </header>
    )
}
