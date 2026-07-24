'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, Keyboard } from 'lucide-react'

export function QrScanner({ onScan }: { onScan: (code: string) => void }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scannerRef = useRef<import('html5-qrcode').Html5Qrcode | null>(null)
    const [mode, setMode] = useState<'camera' | 'manual'>('camera')
    const [manualCode, setManualCode] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (mode !== 'camera' || !containerRef.current) return

            let isMounted = true

            import('html5-qrcode').then(({ Html5Qrcode }) => {
                if (!isMounted || !containerRef.current) return

                    const scanner = new Html5Qrcode(containerRef.current.id)
                    scannerRef.current = scanner

                    scanner
                    .start(
                        { facingMode: 'environment' },
                        { fps: 10, qrbox: { width: 250, height: 250 } },
                        (decodedText) => {
                            onScan(decodedText)
                        },
                        () => {} // abaikan error tiap frame yang gagal decode, itu normal
                    )
                    .catch(() => setError('Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan, atau gunakan input manual.'))
            })

            return () => {
                isMounted = false
                scannerRef.current?.stop().catch(() => {})
            }
    }, [mode, onScan])

    return (
        <div>
        <div className="flex gap-2 rounded-lg bg-canvas p-1">
        <button
        onClick={() => setMode('camera')}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition ${
            mode === 'camera' ? 'bg-surface text-ink shadow-sm' : 'text-muted'
        }`}
        >
        <Camera size={15} /> Kamera
        </button>
        <button
        onClick={() => setMode('manual')}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition ${
            mode === 'manual' ? 'bg-surface text-ink shadow-sm' : 'text-muted'
        }`}
        >
        <Keyboard size={15} /> Input Manual
        </button>
        </div>

        {mode === 'camera' ? (
            <div className="mt-4">
            <div id="qr-reader" ref={containerRef} className="overflow-hidden rounded-xl" />
            {error && <p className="mt-2 text-sm text-danger">{error}</p>}
            </div>
        ) : (
            <form
            onSubmit={(e) => {
                e.preventDefault()
                if (manualCode.trim()) {
                    onScan(manualCode.trim())
                    setManualCode('')
                }
            }}
            className="mt-4 flex gap-2"
            >
            <input
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Tempel kode dari tiket peserta"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
            />
            <button type="submit" className="shrink-0 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-dark">
            Cek
            </button>
            </form>
        )}
        </div>
    )
}
