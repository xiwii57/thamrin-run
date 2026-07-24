import crypto from 'crypto'

export function generateSessionToken() {
    // 16 bytes random -> ~128 bit entropy, url-safe, tidak bisa ditebak
    return crypto.randomBytes(16).toString('base64url')
}
