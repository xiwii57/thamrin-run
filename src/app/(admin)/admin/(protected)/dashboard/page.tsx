// app/(admin)/admin/dashboard/page.tsx
import { getCurrentAdmin } from '@/features/auth/queries'
import {
    getDashboardKpi,
    getRegistrationTrend,
    getRecentParticipants,
    getEventsWithStats,
} from '@/features/dashboard/queries'
import DashboardClient from './_components/dashboard-client'

export default async function DashboardPage() {
    const [admin, kpi, trend, participants, events] = await Promise.all([
        getCurrentAdmin(),
                                                                        getDashboardKpi(),
                                                                        getRegistrationTrend(),
                                                                        getRecentParticipants(),
                                                                        getEventsWithStats(),
    ])

    return (
        <DashboardClient
        adminEmail={admin?.email ?? ''}
        kpi={kpi}
        registrationTrend={trend}
        participants={participants}
        events={events}
        />
    )
}
