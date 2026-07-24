// app/(admin)/admin/login/page.tsx
import { login } from '@/features/auth/actions'
import Image from 'next/image'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const { error } = await searchParams

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
        <Image
        src="/logo.svg"
        alt="Thamrin Run"
        width={96}
        height={96}
        className="h-24 w-24"
        />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-[#130F59]">Admin Panel</h1>
        <p className="mt-1 text-sm text-slate-500">Masuk untuk kelola event</p>
        </div>

        {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
            </div>
        )}

        <form action={login} className="space-y-4">
        <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
        name="email"
        type="email"
        required
        placeholder="admin@thamrinrun.com"
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#130F59] focus:ring-2 focus:ring-[#130F59]/10"
        />
        </div>

        <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <input
        name="password"
        type="password"
        required
        placeholder="••••••••"
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#130F59] focus:ring-2 focus:ring-[#130F59]/10"
        />
        </div>

        <button
        type="submit"
        className="w-full rounded-lg bg-[#130F59] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a175e] active:scale-[0.98]"
        >
        Masuk
        </button>
        </form>
        </div>

        <p className="text-center text-xs text-slate-400">
        © 2025 Thamrin Run
        </p>
        </div>
        </div>
    )
}
