// app/api/payment/wevhook/route.ts

import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
    const body = await request.json()
    const { order_id, status_code, gross_amount, signature_key, transaction_status, payment_type } = body

    // wajib verifikasi signature -> tanpa ini siapa saja bisa palsukan notifikasi "sudah bayar"
    const expectedSignature = crypto
    .createHash('sha512')
    .update(order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY)
    .digest('hex')

    if (signature_key !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    const supabase = createAdminClient()

    const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', order_id)
    .single()

    if (!payment) {
        return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // idempotent: Midtrans bisa kirim notifikasi ganda, jangan proses dua kali
    if (payment.status === 'settlement') {
        return NextResponse.json({ ok: true })
    }

    await supabase
    .from('payments')
    .update({
        status: transaction_status,
        payment_type,
        raw_payload: body,
        paid_at: transaction_status === 'settlement' ? new Date().toISOString() : null,
    })
    .eq('order_id', order_id)

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
        await supabase.rpc('assign_bib_number', { reg_id: payment.registration_id })
        await supabase.from('registrations').update({ status: 'paid' }).eq('id', payment.registration_id)
    } else if (['expire', 'cancel', 'deny'].includes(transaction_status)) {
        await supabase.from('registrations').update({ status: 'cancelled' }).eq('id', payment.registration_id)
    }

    return NextResponse.json({ ok: true })
}
