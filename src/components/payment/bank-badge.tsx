const bankStyle: Record<string, { bg: string; label: string }> = {
    bca: { bg: '#0066AE', label: 'BCA' },
    bni: { bg: '#F37021', label: 'BNI' },
    bri: { bg: '#00529C', label: 'BRI' },
    permata: { bg: '#00A99D', label: 'PMT' },
    qris: { bg: '#EE2A24', label: 'QR' },
}

export function BankBadge({ bank, size = 'md' }: { bank: string; size?: 'md' | 'lg' }) {
    const style = bankStyle[bank] ?? { bg: '#6C6C87', label: bank.slice(0, 3).toUpperCase() }
    const dimension = size === 'lg' ? 'h-11 w-11 text-sm' : 'h-9 w-9 text-[10px]'

    return (
        <div
        className={`flex ${dimension} shrink-0 items-center justify-center rounded-lg font-bold tracking-tight text-white`}
        style={{ backgroundColor: style.bg }}
        >
        {style.label}
        </div>
    )
}
