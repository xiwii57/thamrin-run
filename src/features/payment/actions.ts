// features/payment/actions.ts
'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createSnapClient } from '@/lib/midtrans'

export async function createPaymentTransaction(registrationId: string) {
    const supabase = createAdminClient()

    const { data: registration, error } = await supabase
    .from('registrations')
    .select('*, events(name, price)')
    .eq('id', registrationId)
    .single()

    if (error || !registration) throw new Error('Registrasi tidak ditemukan')

        const orderId = `THAMRIN-${registration.id.slice(0, 8)}-${Date.now()}`
        const amount = registration.events.price

        const snap = createSnapClient()

        const transaction = await snap.createTransaction({
            transaction_details: {
                order_id: orderId,
                gross_amount: amount,
            },
            customer_details: {
                first_name: registration.name,
                email: registration.email,
                phone: registration.phone,
            },
            item_details: [
                {
                    id: registration.event_id,
                    price: amount,
                    quantity: 1,
                    name: registration.events.name,
                },
            ],
            callbacks: {
                finish: `${process.env.NEXT_PUBLIC_APP_URL}/pendaftaran-berhasil?event=${registration.event_id}`,
            },
        })

        await supabase.from('payments').insert({
            registration_id: registration.id,
            order_id: orderId,
            amount,
            status: 'pending',
        })

        return transaction.redirect_url as string
}
