// src/features/auth/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
                             password: z.string().min(6, 'Password minimal 6 karakter'),
})

export async function login(formData: FormData) {
    const parsed = loginSchema.safeParse({
        email: formData.get('email'),
                                         password: formData.get('password'),
    })

    if (!parsed.success) {
        redirect('/admin/login?error=' + encodeURIComponent(parsed.error.issues[0].message))
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data)

    // Delay tetap berjalan meskipun gagal (anti timing attack)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (error) {
        redirect('/admin/login?error=' + encodeURIComponent('Email atau password salah'))
    }

    const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', data.user.id)
    .single()

    if (!admin) {
        await supabase.auth.signOut()
        redirect('/admin/login?error=' + encodeURIComponent('Akun tidak terdaftar sebagai admin'))
    }

    redirect('/admin/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
}
