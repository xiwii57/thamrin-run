export default function Loading() {
    return (
        <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="h-4 w-20 animate-pulse rounded bg-border" />
        <div className="mt-5 h-3 w-40 animate-pulse rounded bg-border" />
        <div className="mt-2 h-8 w-64 animate-pulse rounded bg-border" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
            <div className="h-3 w-20 animate-pulse rounded bg-border" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-border" />
            </div>
        ))}
        </div>
        </div>
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-surface" />
        </div>
        </div>
        </div>
    )
}
