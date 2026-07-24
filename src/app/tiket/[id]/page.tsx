import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import QRCode from 'qrcode'
import { verifyCheckinCode, generateCheckinCode } from '@/lib/qr-token'
import { getTicketData } from '@/features/ticket/queries'
import { TicketView } from '@/components/ticket/ticket-view'
import { TicketPending } from '@/components/ticket/ticket-pending'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default async function TicketPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    // --- Gerbang keamanan utama (anti-IDOR) ---
    // Cookie WAJIB ada, dan hasil verifikasinya (ID yang tertanam di dalam
    // signature) HARUS persis sama dengan ID yang diminta di URL.
    // Kalau seseorang ganti [id] di URL ke ID orang lain, cookie mereka
    // tidak akan pernah cocok -> ditolak, walau mereka tahu ID-nya.
    const cookieStore = await cookies()
    const accessCookie = cookieStore.get(`ticket_access_${id}`)?.value
    const verifiedId = accessCookie ? verifyCheckinCode(accessCookie) : null

    if (!accessCookie || verifiedId !== id) {
        notFound()
    }

    const registration = await getTicketData(id)
    if (!registration) notFound()

        const event = Array.isArray(registration.events) ? registration.events[0] : registration.events
        if (!event) notFound()

            if (registration.status === 'pending') {
                return (
                    <div className="flex min-h-screen flex-col bg-canvas">
                    <SiteHeader />
                    <TicketPending />
                    <SiteFooter />
                    </div>
                )
            }

            if (registration.status === 'cancelled') {
                return (
                    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
                    <SiteHeader />
                    <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-xl font-bold text-ink">Pendaftaran Dibatalkan</h1>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                    Pendaftaran ini berstatus dibatalkan sehingga tiket tidak tersedia.
                    </p>
                    </div>
                    <SiteFooter />
                    </div>
                )
            }

            const checkinCode = generateCheckinCode(registration.id)
            const qrDataUrl = await QRCode.toDataURL(checkinCode, { width: 400, margin: 1 })

            return (
                <div className="flex min-h-screen flex-col bg-canvas">
                <SiteHeader />
                <TicketView registration={registration} event={event} qrDataUrl={qrDataUrl} />
                <SiteFooter />
                </div>
            )
}
