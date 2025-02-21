import { Suspense } from 'react'

import { CreatePageSkeleton } from '@/lib/components/global/CreatePageSkeleton'
import { RenderPage } from '@/lib/components/global/RenderPage/RenderPage'
import { onAuthenticateUser } from '@/lib/actions/user/on-authenticate-user.action'
import { redirect } from 'next/navigation'

export default async function CreateProjectPage() {
    const checkUser = await onAuthenticateUser()

    if (!checkUser.user) {
        redirect(`/sign-in`)
    }

    if (!checkUser.user.subscription) {
        redirect(`/sign-in`)
    }

    return (
        <main className="w-full h-full pt-6">
            <Suspense fallback={<CreatePageSkeleton />}>
                <RenderPage />
            </Suspense>
        </main>
    )
}
