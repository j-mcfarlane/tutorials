import { redirect } from 'next/navigation'

// Action
import { onAuthenticateUser } from '@/lib/actions/user/on-authenticate-user.action'

export default async function CallbackPage() {
    const auth = await onAuthenticateUser()

    if (auth.status === 200 || auth.status === 201) {
        redirect('/dashboard')
    } else if (auth.status === 403 || auth.status === 400 || auth.status === 500) {
        redirect('/sign-in')
    }
}
