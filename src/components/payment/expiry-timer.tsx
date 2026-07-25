'use client'

import { useEffect, useState } from 'react'

export function ExpiryTimer({ expiresAt }: { expiresAt: string }) {
    const [remaining, setRemaining] = useState(() => Math.max(0, new Date(expiresAt).getTime() - Date.now()))

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.max(0, new Date(expiresAt).getTime() - Date.now()))
        }, 1000)
        return () => clearInterval(interval)
    }, [expiresAt])

    const hours = Math.floor(remaining / 3600000)
    const minutes = Math.floor((remaining % 3600000) / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    const isUrgent = remaining < 5 * 60 * 1000

    const display = hours > 0
    ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

    return (
        <div className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${isUrgent ? 'bg-danger' : 'bg-warning'}`}>
        <span className="font-display text-lg tracking-wide tabular-nums">{display}</span>
        <span className="text-xs font-medium opacity-90">Batas waktu pembayaran</span>
        </div>
    )
}
