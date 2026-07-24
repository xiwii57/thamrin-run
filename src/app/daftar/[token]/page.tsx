import { getRegistrationSession } from '@/features/registration/queries'
import { submitRegistration } from '@/features/registration/actions'
import { RegistrationForm } from '@/components/registration/registration-form'
import { ExpiredState } from '@/components/registration/expired-state'

export default async function DaftarPage({
    params,
    searchParams,
}: {
    params: Promise<{ token: string }>
    searchParams: Promise<{ error?: string }>
}) {
    const { token } = await params
    const { error } = await searchParams
    const session = await getRegistrationSession(token)

    if (!session || session.isExpired) {
        return <ExpiredState eventSlug={session?.events?.slug} />
    }

    const submitWithToken = submitRegistration.bind(null, token)

    return (
        <RegistrationForm
        action={submitWithToken}
        event={session.events}
        expiresAt={session.expires_at}
        error={error}
        />
    )
}
