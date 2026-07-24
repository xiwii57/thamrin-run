'use client'

import { useState } from 'react'
import { ImagePlus } from 'lucide-react'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

export function PosterUpload({ defaultUrl }: { defaultUrl?: string | null }) {
    const [preview, setPreview] = useState<string | null>(defaultUrl ?? null)
    const [error, setError] = useState<string | null>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        setError(null)
        if (!file) return

            if (!ACCEPTED.includes(file.type)) {
                setError('Format harus JPG, PNG, atau WEBP')
                e.target.value = ''
                return
            }
            if (file.size > MAX_SIZE) {
                setError('Ukuran maksimal 5MB')
                e.target.value = ''
                return
            }

            setPreview(URL.createObjectURL(file))
    }

    return (
        <div className="flex items-start gap-4">
        <div className="flex h-32 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-canvas">
        {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview poster" className="h-full w-full object-cover" />
        ) : (
            <ImagePlus size={22} className="text-muted" />
        )}
        </div>

        <div className="flex-1">
        <input
        type="file"
        name="poster"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent-soft file:px-3 file:py-2 file:text-sm file:font-medium file:text-accent hover:file:bg-accent-soft/70"
        />
        <p className="mt-1.5 text-xs text-muted">JPG, PNG, atau WEBP. Maksimal 5MB.</p>
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>
        </div>
    )
}
