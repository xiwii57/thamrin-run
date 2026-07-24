import crypto from 'crypto'

function sign(registrationId: string) {
    return crypto
    .createHmac('sha256', process.env.QR_SIGNING_SECRET!)
    .update(registrationId)
    .digest('hex')
    .slice(0, 16) // cukup 16 karakter, tetap sangat sulit ditebak
}

export function generateCheckinCode(registrationId: string) {
    return `${registrationId}.${sign(registrationId)}`
}

export function verifyCheckinCode(code: string): string | null {
    const [registrationId, signature] = code.split('.')
    if (!registrationId || !signature) return null

        const expected = sign(registrationId)
        const valid =
        signature.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))

        return valid ? registrationId : null
}
