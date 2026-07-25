'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, Keyboard, CheckCircle2 } from 'lucide-react'

export function QrScanner({ onScan }: { onScan: (code: string) => void }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scannerRef = useRef<import('html5-qrcode').Html5Qrcode | null>(null)
    const lastScanRef = useRef<{ code: string; time: number } | null>(null)
    const [mode, setMode] = useState<'camera' | 'manual'>('camera')
    const [manualCode, setManualCode] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [cameraReady, setCameraReady] = useState(false)
    const [justScanned, setJustScanned] = useState(false)

    function handleDetected(decodedText: string) {
        const now = Date.now()
        // cegah 1 QR yang sama ke-scan berkali-kali selama masih di depan kamera
        if (lastScanRef.current && lastScanRef.current.code === decodedText && now - lastScanRef.current.time < 3000) {
            return
        }
        lastScanRef.current = { code: decodedText, time: now }

        if (navigator.vibrate) navigator.vibrate(80)
            setJustScanned(true)
            setTimeout(() => setJustScanned(false), 700)

            onScan(decodedText)
    }

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
                        handleDetected,
                        () => {}
                    )
                    .then(() => setCameraReady(true))
                    .catch(() => setError('Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan, atau gunakan input manual.'))
            })

            return () => {
                isMounted = false
                scannerRef.current?.stop().catch(() => {})
            }
    }, [mode])

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
            <div className="relative mt-4 overflow-hidden rounded-xl bg-ink">
            <div id="qr-reader" ref={containerRef} className="w-full" />

            {!cameraReady && !error && (
                <div className="flex h-64 items-center justify-center gap-2 text-white/70">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <p className="text-sm">Menyiapkan kamera...</p>
                </div>
            )}

            {cameraReady && !error && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                className={`relative h-56 w-56 rounded-2xl transition-all duration-300 ${
                    justScanned ? 'scale-95' : 'scale-100'
                }`}
                >
                <span className={`absolute -left-0.5 -top-0.5 h-8 w-8 rounded-tl-2xl border-l-4 border-t-4 transition-colors ${justScanned ? 'border-success' : 'border-accent'}`} />
                <span className={`absolute -right-0.5 -top-0.5 h-8 w-8 rounded-tr-2xl border-r-4 border-t-4 transition-colors ${justScanned ? 'border-success' : 'border-accent'}`} />
                <span className={`absolute -bottom-0.5 -left-0.5 h-8 w-8 rounded-bl-2xl border-b-4 border-l-4 transition-colors ${justScanned ? 'border-success' : 'border-accent'}`} />
                <span className={`absolute -bottom-0.5 -right-0.5 h-8 w-8 rounded-br-2xl border-b-4 border-r-4 transition-colors ${justScanned ? 'border-success' : 'border-accent'}`} />

                {!justScanned ? (
                    <div className="absolute inset-x-3 h-0.5 animate-scan-line bg-accent shadow-[0_0_10px_var(--color-accent)]" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-success/15">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white">
                    <CheckCircle2 size={24} />
                    </div>
                    </div>
                )}
                </div>
                </div>
            )}

            {cameraReady && !error && (
                <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-white/70">
                Arahkan kamera ke QR tiket peserta
                </p>
            )}

            {error && (
                <div className="flex h-64 flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="text-sm text-danger">{error}</p>
                <button
                onClick={() => setMode('manual')}
                className="mt-1 text-xs font-medium text-accent hover:underline"
                >
                Gunakan input manual saja
                </button>
                </div>
            )}
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
