'use client'

import { useState } from 'react'
import { Link2, Check, MessageCircle } from 'lucide-react'

export function ShareButtons({ url, title }: { url: string; title: string }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div>
        <p className="text-xs font-medium text-muted">Bagikan Event</p>
        <div className="mt-2 flex gap-2">
        <button onClick={handleCopy} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:bg-canvas hover:text-ink" aria-label="Salin tautan">
        {copied ? <Check size={16} className="text-success" /> : <Link2 size={16} />}
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:bg-canvas hover:text-ink" aria-label="Bagikan ke WhatsApp">
        <MessageCircle size={16} />
        </a>
        </div>
        </div>
    )
}
