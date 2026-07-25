'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function RouteProgressBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [progress, setProgress] = useState(0)
    const [visible, setVisible] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Setiap pathname/query berubah = navigasi selesai -> tuntaskan bar lalu sembunyikan
    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
            setProgress(100)
            const hide = setTimeout(() => {
                setVisible(false)
                setProgress(0)
            }, 250)
            return () => clearTimeout(hide)
    }, [pathname, searchParams])

    // Deteksi klik link internal -> mulai jalan bar sebelum halaman baru selesai dimuat
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const link = (e.target as HTMLElement)?.closest('a')
            if (!link) return

                const href = link.getAttribute('href')
                const isExternal = href?.startsWith('http') || href?.startsWith('#') || link.target === '_blank'
    if (!href || isExternal) return

        setVisible(true)
        setProgress(15)
        intervalRef.current = setInterval(() => {
            setProgress((p) => (p < 85 ? p + Math.random() * 10 : p))
        }, 200)
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    if (!visible) return null

        return (
            <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-transparent">
            <div
            className="h-full bg-accent shadow-[0_0_8px_var(--color-accent)] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
            />
            </div>
        )
}
