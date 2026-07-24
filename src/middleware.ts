import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

function getClientIp(request: NextRequest): string {
    const forwardedFor = request.headers.get('x-forwarded-for')
    if (forwardedFor) return forwardedFor.split(',')[0].trim()
        const realIp = request.headers.get('x-real-ip')
        if (realIp) return realIp.trim()
            return 'unknown'
}

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request })
    response.headers.set('x-pathname', request.nextUrl.pathname)

    const path = request.nextUrl.pathname
    const isLoginPage = path === '/admin/login'

    // Rate limit dicek di sini, TIDAK ADA cara untuk reset-nya dari luar —
    // window otomatis kadaluarsa sendiri di Redis, tidak bergantung pada
    // request lain yang bisa dipalsukan.
    if (isLoginPage && request.method === 'POST') {
        const ip = getClientIp(request)
        const { success } = await rateLimit(`login:${ip}`, 5, 60)

        if (!success) {
            return NextResponse.redirect(
                new URL('/admin/login?error=' + encodeURIComponent('Terlalu banyak percobaan. Coba lagi dalam 1 menit.'), request.url)
            )
        }
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
