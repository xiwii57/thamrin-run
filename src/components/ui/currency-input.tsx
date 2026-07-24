'use client'

import { useState } from 'react'
import { formatRupiah } from '@/lib/format'

export function CurrencyInput({
    name,
    defaultValue,
    required,
}: {
    name: string
    defaultValue?: number
        required?: boolean
}) {
    const [display, setDisplay] = useState(
        defaultValue ? formatRupiah(defaultValue) : ''
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const digits = e.target.value.replace(/\D/g, '')
        setDisplay(digits ? formatRupiah(Number(digits)) : '')
    }

    const raw = display.replace(/\D/g, '')

    return (
        <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
        Rp
        </span>
        <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        required={required}
        placeholder="0"
        className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
        <input type="hidden" name={name} value={raw} />
        </div>
    )
}
