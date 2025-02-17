import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'

// Authenticated
import { onAuthenticateUser } from '@/lib/actions/user/on-authenticate-user.action'

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: PropsWithChildren) {
    const auth = await onAuthenticateUser()

    if (!auth.user) {
        redirect('/sign-in')
    }

    return <div className="w-full min-h-screen">{children}</div>
}
