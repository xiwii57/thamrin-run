export default function Loading() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center bg-canvas px-4 py-16">
        <div className="h-4 w-20 animate-pulse rounded bg-border" />
        <div className="mt-2 h-7 w-56 animate-pulse rounded bg-border" />
        <div className="mt-8 h-12 w-full animate-pulse rounded-lg bg-border" />
        </div>
    )
}
