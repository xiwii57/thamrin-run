// features/payment.actions.ts

'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createCoreApiClient } from '@/lib/midtrans'

export type PaymentMethod = 'bca' | 'bni' | 'bri' | 'permata' | 'qris'

export type ChargeResult =
| { ok: true; type: 'va'; bank: string; vaNumber: string; expiresAt: string }
| { ok: true; type: 'qris'; qrUrl: string; expiresAt: string }
| { ok: false; error: string }

const SERVICE_FEE = 2500

export async function chargePayment(registrationId: string, method: PaymentMethod): Promise<ChargeResult> {
    const supabase = createAdminClient()

    const { data: registration, error } = await supabase
    .from('registrations')
    .select('*, events(name, price)')
    .eq('id', registrationId)
    .single()

    if (error || !registration) return { ok: false, error: 'Registrasi tidak ditemukan' }

    const orderId = `THAMRIN-${registration.id.slice(0, 8)}-${Date.now()}`
    const amount = registration.events.price + SERVICE_FEE
    const coreApi = createCoreApiClient()

    const basePayload = {
        transaction_details: { order_id: orderId, gross_amount: amount },
        customer_details: {
            first_name: registration.name,
            email: registration.email,
            phone: registration.phone,
        },
        item_details: [
            { id: registration.event_id, price: registration.events.price, quantity: 1, name: registration.events.name },
            { id: 'service-fee', price: SERVICE_FEE, quantity: 1, name: 'Biaya Layanan' },
        ],
    }

    try {
        if (method === 'qris') {
            const result = await coreApi.charge({ ...basePayload, payment_type: 'qris', qris: {} })
            const qrAction = result.actions?.find((a) => a.name === 'generate-qr-code')
            if (!qrAction) return { ok: false, error: 'Gagal membuat QR pembayaran' }

            await supabase.from('payments').insert({ registration_id: registration.id, order_id: orderId, amount, status: 'pending' })

            return {
                ok: true,
                type: 'qris',
                qrUrl: qrAction.url,
                expiresAt: result.expiry_time ?? new Date(Date.now() + 15 * 60 * 1000).toISOString(),
            }
        }

        if (method === 'permata') {
            const result = await coreApi.charge({ ...basePayload, payment_type: 'bank_transfer', bank_transfer: { bank: 'permata' } })

            await supabase.from('payments').insert({ registration_id: registration.id, order_id: orderId, amount, status: 'pending' })

            return {
                ok: true,
                type: 'va',
                bank: 'PERMATA',
                vaNumber: result.permata_va_number ?? '',
                expiresAt: result.expiry_time ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            }
        }

        // bca, bni, bri
        const result = await coreApi.charge({ ...basePayload, payment_type: 'bank_transfer', bank_transfer: { bank: method } })
        const va = result.va_numbers?.[0]
        if (!va) return { ok: false, error: 'Gagal membuat nomor Virtual Account' }

        await supabase.from('payments').insert({ registration_id: registration.id, order_id: orderId, amount, status: 'pending' })

        return {
            ok: true,
            type: 'va',
            bank: va.bank.toUpperCase(),
            vaNumber: va.va_number,
            expiresAt: result.expiry_time ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }
    } catch {
        return { ok: false, error: 'Gagal memproses pembayaran, coba lagi' }
    }
}
