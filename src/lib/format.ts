export function formatRupiah(value: number) {
    return new Intl.NumberFormat('id-ID').format(value)
}

export function formatRupiahFull(value: number) {
    return `Rp${formatRupiah(value)}`
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}
