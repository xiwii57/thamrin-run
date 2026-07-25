'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { generateSessionToken } from '@/lib/token'
import { registrationSchema } from './schema'
import { redirect } from 'next/navigation'
import { createSnapToken } from '@/features/payment/actions'
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
| { ok: true; snapToken: string; registrationId: string; accessCode: string }
| { ok: false; error: string }

export async function submitRegistration(token: string, formData: FormData): Promise<SubmitResult> {
    const supabase = createAdminClient()

    const { data: session } = await supabase
    .from('registration_sessions')
    .select('*')
    .eq('token', token)
    .single()

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

    await supabase.from('registration_sessions').delete().eq('token', token)

    const snapToken = await createSnapToken(newRegistration.id)

    return {
        ok: true,
        snapToken,
        registrationId: newRegistration.id,
        accessCode: generateCheckinCode(newRegistration.id),
    }
}
