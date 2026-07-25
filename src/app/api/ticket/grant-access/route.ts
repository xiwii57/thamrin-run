import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyCheckinCode } from '@/lib/qr-token'

export async function POST(request: Request) {
    const { registrationId, accessCode } = await request.json()

    if (!registrationId || !accessCode) {
        return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    // accessCode cuma bisa valid kalau di-generate server (HMAC dengan secret
    // yang tidak diketahui client) dan memang menunjuk ke registrationId yang sama
    // -> tetap mencegah IDOR walau proses ini sekarang dipanggil dari client
    const verifiedId = verifyCheckinCode(accessCode)
    if (verifiedId !== registrationId) {
        return NextResponse.json({ error: 'Kode tidak valid' }, { status: 403 })
    }

    const cookieStore = await cookies()
    cookieStore.set(`ticket_access_${registrationId}`, accessCode, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
    })

    return NextResponse.json({ ok: true })
}
