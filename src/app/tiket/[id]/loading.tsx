export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-canvas px-4 py-16">
        <div className="w-full max-w-md">
        <div className="mx-auto h-4 w-24 animate-pulse rounded bg-border" />
        <div className="mx-auto mt-2 h-6 w-48 animate-pulse rounded bg-border" />
        <div className="mt-6 h-96 w-full animate-pulse rounded-2xl bg-border" />
        </div>
        </div>
    )
}
