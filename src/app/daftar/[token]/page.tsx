import { getRegistrationSession } from '@/features/registration/queries'
import { RegistrationForm } from '@/components/registration/registration-form'
import { ExpiredState } from '@/components/registration/expired-state'

export default async function DaftarPage({
    params,
}: {
    params: Promise<{ token: string }>
}) {
    const { token } = await params
    const session = await getRegistrationSession(token)

    if (!session || session.isExpired) {
        return <ExpiredState eventSlug={session?.events?.slug} />
    }

    return (
        <RegistrationForm
        token={token}
        event={session.events}
        expiresAt={session.expires_at}
        />
    )
}
