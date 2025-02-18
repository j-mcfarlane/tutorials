import { Suspense } from 'react'

import { CreatePageSkeleton } from '@/lib/components/global/CreatePageSkeleton'
import { RenderPage } from '@/lib/components/global/RenderPage/RenderPage'

export default async function CreateProjectPage() {
    return (
        <main className="w-full h-full pt-6">
            <Suspense fallback={<CreatePageSkeleton />}>
                <RenderPage />
            </Suspense>
        </main>
    )
}
