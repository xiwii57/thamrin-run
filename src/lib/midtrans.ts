// lib/midtrans.ts
import midtransClient from 'midtrans-client'

export function createCoreApiClient() {
    return new midtransClient.CoreApi({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
        serverKey: process.env.MIDTRANS_SERVER_KEY!,
        clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    })
}
