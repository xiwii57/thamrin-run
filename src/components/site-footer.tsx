import { MapPin, Mail } from 'lucide-react'

const navLinks = [
    { href: '#events', label: 'Event' },
{ href: '/check-status', label: 'Cek Status Pendaftaran' },
]

const helpLinks = [
    { href: '/faq', label: 'FAQ' },
{ href: '/syarat-ketentuan', label: 'Syarat & Ketentuan' },
{ href: '/kebijakan-privasi', label: 'Kebijakan Privasi' },
]

export function SiteFooter() {
    return (
        <footer id="tentang" className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2.5">
        <img
        src="/run.jpeg"
        alt="Thamrin Run"
        className="h-8 w-auto"
        />
        <span className="text-sm font-bold tracking-tight text-ink">
        Thamrin Run
        </span>
        </div>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
        Platform pendaftaran event lari terbuka untuk umum.
        Daftar mudah, bib otomatis, sertifikat digital.
        </p>
        </div>

        <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
        Navigasi
        </p>
        <ul className="mt-4 space-y-2.5">
        {navLinks.map((link) => (
            <li key={link.label}>
            <a
            href={link.href}
            className="text-sm text-muted transition-colors hover:text-ink"
            >
            {link.label}
            </a>
            </li>
        ))}
        </ul>
        </div>

        <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
        Bantuan
        </p>
        <ul className="mt-4 space-y-2.5">
        {helpLinks.map((link) => (
            <li key={link.label}>
            <a
            href={link.href}
            className="text-sm text-muted transition-colors hover:text-ink"
            >
            {link.label}
            </a>
            </li>
        ))}
        </ul>
        </div>

        <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
        Kontak
        </p>
        <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-2 text-sm text-muted">
        <MapPin size={15} className="mt-0.5 shrink-0 text-accent/60" />
        <span>Jl. M.H. Thamrin No. 1, Jakarta Pusat</span>
        </li>
        <li className="flex items-center gap-2 text-sm text-muted">
        <Mail size={15} className="shrink-0 text-accent/60" />
        <span>info@thamrinrun.com</span>
        </li>
        </ul>
        </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
        <p className="text-center text-xs text-muted">
        © {new Date().getFullYear()} Thamrin Run. Semua hak dilindungi.
        </p>
        </div>
        </div>
        </footer>
    )
}
