'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function CountdownTimer({ expiresAt }: { expiresAt: string }) {
    const router = useRouter()
    const [remaining, setRemaining] = useState(() =>
    Math.max(0, new Date(expiresAt).getTime() - Date.now())
    )

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = new Date(expiresAt).getTime() - Date.now()
            setRemaining(Math.max(0, diff))
            if (diff <= 0) {
                clearInterval(interval)
                router.refresh() // reload server component -> otomatis tampil state expired
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [expiresAt, router])

    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    const isUrgent = remaining < 5 * 60 * 1000

    return (
        <div className={`flex items-center justify-between px-5 py-3 text-sm font-semibold ${isUrgent ? 'bg-danger' : 'bg-warning'} text-white`}>
        <span className="font-display text-xl tracking-wide">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <span className="text-xs font-medium opacity-90">Sisa waktu pendaftaran</span>
        </div>
    )
}
