// app/(admin)/admin/dashboard/page.tsx
import { getCurrentAdmin } from '@/features/auth/queries'
import DashboardClient from './_components/dashboard-client'

export default async function DashboardPage() {
    const admin = await getCurrentAdmin()

    return <DashboardClient adminEmail={admin?.email ?? ''} />
}
