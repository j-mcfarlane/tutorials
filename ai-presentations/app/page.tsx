import { onAuthenticateUser } from '@/lib/actions/user/on-authenticate-user.action'
import Image from 'next/image'

export default async function Home() {
    const auth = await onAuthenticateUser()

    return <div>Home</div>
}
