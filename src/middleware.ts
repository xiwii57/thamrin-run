// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const loginAttempts = new Map<string, { count: number; resetAt: number }>()
function getClientIp(request: NextRequest): string {
    const forwardedFor = request.headers.get('x-forwarded-for')
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim()
    }
    const realIp = request.headers.get('x-real-ip')
    if (realIp) {
        return realIp.trim()
    }
    return 'unknown'
}

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request })
    response.headers.set('x-pathname', request.nextUrl.pathname)

    // Rate limiting untuk login
    if (request.nextUrl.pathname === '/admin/login' && request.method === 'POST') {
        const ip = getClientIp(request)
        const now = Date.now()
        const attempt = loginAttempts.get(ip)

        if (attempt && attempt.count >= 5 && now < attempt.resetAt) {
            return NextResponse.redirect(
                new URL('/admin/login?error=' + encodeURIComponent('Terlalu banyak percobaan. Coba lagi dalam 1 menit.'), request.url)
            )
        }

        loginAttempts.set(ip, {
            count: (attempt?.count ?? 0) + 1,
                          resetAt: now + 60_000,
        })
    }

    // Reset attempt kalau berhasil login (redirect ke dashboard)
    if (request.nextUrl.pathname === '/admin/dashboard') {
        const ip = getClientIp(request)
        loginAttempts.delete(ip)
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                                        setAll: (cookiesToSet) => {
                                            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                                            response = NextResponse.next({ request })
                                            cookiesToSet.forEach(({ name, value, options }) =>
                                            response.cookies.set(name, value, options)
                                            )
                                        },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()
    const path = request.nextUrl.pathname
    const isLoginPage = path === '/admin/login'

    if (path.startsWith('/admin') && !isLoginPage && !user) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (isLoginPage && user) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*'],
}
