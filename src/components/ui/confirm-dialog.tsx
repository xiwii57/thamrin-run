'use client'

import { AlertTriangle, X } from 'lucide-react'

export function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = 'Ya, Hapus',
    cancelLabel = 'Batal',
    variant = 'danger',
    isLoading = false,
    onConfirm,
    onCancel,
}: {
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    variant?: 'danger' | 'default'
isLoading?: boolean
onConfirm: () => void
onCancel: () => void
}) {
    if (!open) return null

        return (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div onClick={onCancel} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />

            <div className="relative w-full max-w-sm rounded-2xl bg-surface p-6 text-center shadow-2xl">
            <button onClick={onCancel} className="absolute right-4 top-4 text-muted transition hover:text-ink">
            <X size={18} />
            </button>

            <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                variant === 'danger' ? 'bg-danger-soft text-danger' : 'bg-accent-soft text-accent'
            }`}
            >
            <AlertTriangle size={26} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>

            <div className="mt-6 flex gap-3">
            <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-canvas disabled:opacity-50"
            >
            {cancelLabel}
            </button>
            <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 ${
                variant === 'danger' ? 'bg-danger hover:bg-danger/90' : 'bg-accent hover:bg-accent-dark'
            }`}
            >
            {isLoading ? 'Memproses...' : confirmLabel}
            </button>
            </div>
            </div>
            </div>
        )
}
