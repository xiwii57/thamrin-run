declare module 'qrcode' {
    interface QRCodeToDataURLOptions {
        width?: number
        margin?: number
        color?: {
            dark?: string
            light?: string
        }
        errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high' | 'L' | 'M' | 'Q' | 'H'
    }

    function toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>

    const QRCode: { toDataURL: typeof toDataURL }
    export default QRCode
}
