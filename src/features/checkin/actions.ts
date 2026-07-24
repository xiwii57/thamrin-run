'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { verifyCheckinCode } from '@/lib/qr-token'
import { revalidatePath } from 'next/cache'
import type { CheckinResult } from './schema'

export async function checkInParticipant(rawCode: string): Promise<CheckinResult> {
    const registrationId = verifyCheckinCode(rawCode.trim())

    if (!registrationId) {
        return { status: 'invalid' }
    }

    const supabase = createAdminClient()

    const { data: registration } = await supabase
    .from('registrations')
    .select('id, name, category, status, bib_number, checked_in_at, events(name)')
    .eq('id', registrationId)
    .single()

    if (!registration) {
        return { status: 'invalid' }
    }

    if (registration.status !== 'paid') {
        return { status: 'not_paid', name: registration.name }
    }

    if (registration.checked_in_at) {
        return {
            status: 'already_checked_in',
            name: registration.name,
            checkedInAt: registration.checked_in_at,
        }
    }

    const authClient = await createClient()
    const { data: { user } } = await authClient.auth.getUser()

    await supabase
    .from('registrations')
    .update({ checked_in_at: new Date().toISOString(), checked_in_by: user?.id })
    .eq('id', registrationId)

    const event = Array.isArray(registration.events) ? registration.events[0] : registration.events

    revalidatePath('/admin/checkin')

    return {
        status: 'success',
        name: registration.name,
        category: registration.category,
        bibNumber: registration.bib_number,
        eventName: event?.name ?? '',
    }
}
