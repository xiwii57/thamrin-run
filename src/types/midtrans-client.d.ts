declare module 'midtrans-client' {
    interface SnapConfig {
        isProduction: boolean
        serverKey: string
        clientKey?: string
    }

    interface TransactionDetails {
        order_id: string
        gross_amount: number
    }

    interface CreateTransactionParams {
        transaction_details: TransactionDetails
        [key: string]: unknown
    }

    interface CreateTransactionResponse {
        token: string
        redirect_url: string
    }

    class Snap {
        constructor(config: SnapConfig)
        createTransaction(
            params: CreateTransactionParams
        ): Promise<CreateTransactionResponse>
        createTransactionToken(params: CreateTransactionParams): Promise<string>
        createTransactionRedirectUrl(
            params: CreateTransactionParams
        ): Promise<string>
        transaction: {
            status(orderId: string): Promise<Record<string, unknown>>
            notification(payload: unknown): Promise<Record<string, unknown>>
        }
    }

    class CoreApi {
        constructor(config: SnapConfig)
        charge(params: Record<string, unknown>): Promise<Record<string, unknown>>
        transaction: {
            status(orderId: string): Promise<Record<string, unknown>>
            notification(payload: unknown): Promise<Record<string, unknown>>
        }
    }

    const midtransClient: {
        Snap: typeof Snap
        CoreApi: typeof CoreApi
    }

    export default midtransClient
}
