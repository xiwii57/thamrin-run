'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { generateSessionToken } from '@/lib/token'
import { registrationSchema } from './schema'
import { redirect } from 'next/navigation'
import { createSnapToken } from '@/features/payment/actions'
import { cookies } from 'next/headers'
import { generateCheckinCode } from '@/lib/qr-token'

const SESSION_DURATION_MS = 20 * 60 * 1000 // 20 menit

export async function createRegistrationSession(eventId: string) {
    const supabase = createAdminClient()
    const token = generateSessionToken()
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString()

    const { error } = await supabase.from('registration_sessions').insert({
        token,
        event_id: eventId,
        expires_at: expiresAt,
    })

    if (error) throw new Error(error.message)

        redirect(`/daftar/${token}`)
}

type SubmitResult =
| { ok: true; snapToken: string; registrationId: string }
| { ok: false; error: string }

export async function submitRegistration(token: string, formData: FormData): Promise<SubmitResult> {
    const supabase = createAdminClient()

    const { data: session } = await supabase
    .from('registration_sessions')
    .select('*')
    .eq('token', token)
    .single()

    // sesi tidak ada atau sudah lewat 20 menit -> redirect ke URL yang sama,
    // server component akan otomatis render tampilan expired
    if (!session || new Date(session.expires_at).getTime() < Date.now()) {
        redirect(`/daftar/${token}`)
    }

    const parsed = registrationSchema.safeParse({
        name: formData.get('name'),
                                                email: formData.get('email'),
                                                phone: formData.get('phone'),
                                                dob: formData.get('dob'),
                                                gender: formData.get('gender'),
                                                category: formData.get('category'),
    })

    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0].message }
    }

    const { data: newRegistration, error } = await supabase
    .from('registrations')
    .insert({
        event_id: session.event_id,
        name: parsed.data.name,
        email: parsed.data.email.trim().toLowerCase(),
            phone: parsed.data.phone,
            dob: parsed.data.dob,
            gender: parsed.data.gender,
            category: parsed.data.category || null,
            status: 'pending',
    })
    .select('id')
    .single()

    if (error || !newRegistration) {
        return { ok: false, error: 'Gagal menyimpan pendaftaran, coba lagi' }
    }

    // Cookie akses tiket — httpOnly (tidak bisa dibaca/diubah lewat JS) dan signed
    // (nilainya mengandung tanda tangan HMAC yang cuma bisa dibuat server).
    // Ini yang mencegah IDOR: walau orang ubah ID di URL /tiket/[id], tanpa
    // cookie yang valid dan cocok, akses tetap ditolak.
    const cookieStore = await cookies()
    cookieStore.set(`ticket_access_${newRegistration.id}`, generateCheckinCode(newRegistration.id), {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 tahun
        path: '/',
    })

    // token sesi sudah dipakai, hapus supaya tidak bisa dipakai ulang
    await supabase.from('registration_sessions').delete().eq('token', token)

    const snapToken = await createSnapToken(newRegistration.id)

    return { ok: true, snapToken, registrationId: newRegistration.id }
}
