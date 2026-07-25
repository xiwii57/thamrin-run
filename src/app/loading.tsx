export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-soft border-t-accent" />
        <p className="text-sm text-muted">Memuat...</p>
        </div>
    )
}
