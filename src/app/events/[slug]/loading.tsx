export default function Loading() {
    return (
        <div className="min-h-screen bg-canvas">
        <div className="h-64 w-full animate-pulse bg-accent-soft sm:h-80 lg:h-96" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 pt-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
        <div className="h-4 w-32 animate-pulse rounded bg-border" />
        <div className="h-8 w-2/3 animate-pulse rounded bg-border" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-border" />
        <div className="mt-6 space-y-2.5">
        <div className="h-4 w-full animate-pulse rounded bg-border" />
        <div className="h-4 w-full animate-pulse rounded bg-border" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-border" />
        </div>
        </div>
        <div className="hidden h-80 w-full animate-pulse rounded-2xl bg-border lg:block" />
        </div>
        </div>
        </div>
    )
}
