'use client'

import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { User } from '@prisma/client'

// Component
import { Button } from '../../ui/button'

export interface NewProjectButtonProps {
    user: User
}

export function NewProjectButton({ user }: NewProjectButtonProps) {
    const router = useRouter()

    return (
        <Button size="lg" className="rounded-lg font-semibold" disabled={!user.subscription} onClick={() => {}}>
            <Plus />
            New Project
        </Button>
    )
}
