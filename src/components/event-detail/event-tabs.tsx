'use client'

import { useEffect, useRef, useState } from 'react'
import { formatRupiahFull } from '@/lib/format'

const sections = [
    { id: 'deskripsi', label: 'Deskripsi' },
{ id: 'tiket', label: 'Tiket' },
{ id: 'syarat', label: 'Syarat dan Ketentuan' },
] as const

type SectionId = (typeof sections)[number]['id']

export function EventTabs({
    description,
    categories,
    price,
    quota,
    registeredCount,
    terms,
}: {
    description: string | null
    categories: string[]
    price: number
    quota: number
    registeredCount: number
    terms: string | null
}) {
    const [active, setActive] = useState<SectionId>('deskripsi')
    const refs = useRef<Record<SectionId, HTMLDivElement | null>>({
        deskripsi: null,
        tiket: null,
        syarat: null,
    })

    const remaining = Math.max(quota - registeredCount, 0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting)
                if (visible) setActive(visible.target.id as SectionId)
            },
            { rootMargin: '-96px 0px -60% 0px', threshold: 0 }
        )

        sections.forEach((s) => {
            const el = refs.current[s.id]
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    function handleClick(id: SectionId) {
        const el = refs.current[id]
        if (!el) return
            const offset = el.getBoundingClientRect().top + window.scrollY - 88 // kompensasi sticky header
            window.scrollTo({ top: offset, behavior: 'smooth' })
    }

    return (
        <div>
        {/* Nav sticky di bawah header */}
        <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-canvas/95 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="flex gap-6 overflow-x-auto">
        {sections.map((s) => (
            <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            className={`relative shrink-0 whitespace-nowrap py-3 text-sm font-medium transition ${
                active === s.id ? 'text-accent' : 'text-muted hover:text-ink'
            }`}
            >
            {s.label}
            {active === s.id && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" />
            )}
            </button>
        ))}
        </div>
        </div>

        {/* Semua section tampil sekaligus, ditumpuk vertikal */}
        <div
        id="deskripsi"
        ref={(el) => { refs.current.deskripsi = el }}
        className="scroll-mt-24 py-6"
        >
        <h2 className="mb-3 text-lg font-semibold text-ink">Deskripsi</h2>
        {description ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{description}</p>
        ) : (
            <p className="text-sm text-muted">Deskripsi belum diisi oleh penyelenggara.</p>
        )}
        </div>

        <div
        id="tiket"
        ref={(el) => { refs.current.tiket = el }}
        className="scroll-mt-24 border-t border-border py-6"
        >
        <h2 className="mb-3 text-lg font-semibold text-ink">Tiket</h2>
        <div className="space-y-3">
        {categories.length === 0 && (
            <p className="text-sm text-muted">Belum ada kategori lomba.</p>
        )}
        {categories.map((cat) => (
            <div
            key={cat}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-4"
            >
            <div>
            <p className="text-sm font-semibold text-ink">{cat}</p>
            <p className="mt-0.5 text-xs text-muted">
            {remaining > 0 ? `Sisa ${remaining} slot` : 'Kuota penuh'}
            </p>
            </div>
            <div className="text-right">
            <p className="text-sm font-semibold text-accent">{formatRupiahFull(price)}</p>
            <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                remaining > 0 ? 'bg-success-soft text-success' : 'bg-canvas text-muted'
            }`}
            >
            {remaining > 0 ? 'Tersedia' : 'Penuh'}
            </span>
            </div>
            </div>
        ))}
        </div>
        </div>

        <div
        id="syarat"
        ref={(el) => { refs.current.syarat = el }}
        className="scroll-mt-24 border-t border-border py-6"
        >
        <h2 className="mb-3 text-lg font-semibold text-ink">Syarat dan Ketentuan</h2>
        {terms ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{terms}</p>
        ) : (
            <p className="text-sm text-muted">Syarat dan ketentuan belum diisi oleh penyelenggara.</p>
        )}
        </div>
        </div>
    )
}
