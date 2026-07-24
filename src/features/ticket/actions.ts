'use server'

import QRCode from 'qrcode'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateCheckinCode } from '@/lib/qr-token'
import { rateLimit } from '@/lib/rate-limit'

type RevealResult =
| { ok: true; qrDataUrl: string }
| { ok: false; error: string }

export async function revealTicketQr(registrationId: string, phoneLast4: string): Promise<RevealResult> {
    // batasi format input, cegah query aneh-aneh
    if (!/^\d{4}$/.test(phoneLast4)) {
        return { ok: false, error: 'Masukkan 4 digit terakhir nomor HP' }
    }

    // Maksimal 5 percobaan per registrasi per 5 menit -> mustahil brute-force
    // 10.000 kombinasi dalam waktu wajar
    const { success } = await rateLimit(`ticket-unlock:${registrationId}`, 5, 300)
    if (!success) {
        return { ok: false, error: 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit.' }
        }

    const supabase = createAdminClient()

    const { data: registration } = await supabase
    .from('registrations')
    .select('id, phone, status')
    .eq('id', registrationId)
    .single()

    // pesan error sengaja generic (tidak bilang "nomor salah" vs "belum bayar")
    // supaya tidak membocorkan info yang bisa dipakai enumerasi data orang lain
    if (!registration) {
        return { ok: false, error: 'Data tidak ditemukan atau nomor HP tidak cocok' }
    }

    const actualLast4 = (registration.phone ?? '').replace(/\D/g, '').slice(-4)

    if (actualLast4 !== phoneLast4 || registration.status !== 'paid') {
        return { ok: false, error: 'Data tidak ditemukan atau nomor HP tidak cocok' }
    }

    const qrDataUrl = await QRCode.toDataURL(generateCheckinCode(registration.id), {
        width: 320,
        margin: 1,
    })

    return { ok: true, qrDataUrl }
}
