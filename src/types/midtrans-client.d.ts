declare module 'midtrans-client' {
    interface MidtransConfig {
        isProduction: boolean
        serverKey: string
        clientKey: string
    }

    interface TransactionDetails {
        order_id: string
        gross_amount: number
    }

    interface CustomerDetails {
        first_name?: string
        email?: string
        phone?: string
    }

    interface ItemDetail {
        id: string
        price: number
        quantity: number
        name: string
    }

    interface ChargePayload {
        payment_type: string
        transaction_details: TransactionDetails
        customer_details?: CustomerDetails
        item_details?: ItemDetail[]
        bank_transfer?: { bank: string }
        qris?: Record<string, never>
    }

    interface ChargeAction {
        name: string
        method: string
        url: string
    }

    interface ChargeResult {
        transaction_status: string
        order_id: string
        va_numbers?: { bank: string; va_number: string }[]
        permata_va_number?: string
        actions?: ChargeAction[]
        expiry_time?: string
    }

    class CoreApi {
        constructor(config: MidtransConfig)
        charge(payload: ChargePayload): Promise<ChargeResult>
    }

    const _default: { CoreApi: typeof CoreApi }
    export = _default
}
