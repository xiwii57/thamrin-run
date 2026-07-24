import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/features/auth/queries'
import { AdminShell } from '../_components/admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const admin = await getCurrentAdmin()
    if (!admin) redirect('/admin/login')

        return <AdminShell email={admin.email}>{children}</AdminShell>
}
