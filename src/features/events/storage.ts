import type { SupabaseClient } from '@supabase/supabase-js'

const ALLOWED_TYPES: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
}

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

// Cek magic bytes asli file, bukan cuma percaya file.type dari browser
// (file.type gampang dipalsukan/diganti nama ekstensi)
async function isValidImageContent(file: File, mimeType: string) {
    const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer())

    if (mimeType === 'image/jpeg') {
        return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    }
    if (mimeType === 'image/png') {
        const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
        return sig.every((b, i) => bytes[i] === b)
    }
    if (mimeType === 'image/webp') {
        const riff = String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
        const webp = String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP'
        return riff && webp
    }
    return false
}

export async function uploadPoster(supabase: SupabaseClient, file: File) {
    if (!(file.type in ALLOWED_TYPES)) {
        return { ok: false as const, error: 'Format file harus JPG, PNG, atau WEBP' }
    }
    if (file.size > MAX_SIZE) {
        return { ok: false as const, error: 'Ukuran file maksimal 5MB' }
    }
    if (!(await isValidImageContent(file, file.type))) {
        return { ok: false as const, error: 'File tidak valid atau rusak' }
    }

    // nama file di-generate server, BUKAN dari nama asli user
    // supaya tidak bisa path traversal ("../../") atau overwrite file orang lain
    const ext = ALLOWED_TYPES[file.type]
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage
    .from('event-posters')
    .upload(fileName, file, { contentType: file.type, upsert: false })

    if (error) {
        return { ok: false as const, error: 'Gagal upload poster: ' + error.message }
    }

    const { data } = supabase.storage.from('event-posters').getPublicUrl(fileName)
    return { ok: true as const, url: data.publicUrl }
}

export async function deletePoster(supabase: SupabaseClient, posterUrl: string | null) {
    if (!posterUrl) return
        const path = posterUrl.split('/event-posters/')[1]
        if (!path) return
            await supabase.storage.from('event-posters').remove([path])
}
