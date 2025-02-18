'use server'

import { client } from '@/lib/data/prisma'
import { onAuthenticateUser } from '../user/on-authenticate-user.action'

export async function recoverProject(id: string) {
    try {
        const clerk = await onAuthenticateUser()

        if (clerk.status !== 200 || !clerk.user) {
            return {
                status: 403,
                error: 'User not authenticated',
            }
        }

        const project = await client.project.update({
            where: {
                id,
            },
            data: {
                isDeleted: false,
            },
        })

        if (!project) {
            return {
                status: 500,
                error: 'Failed to recover project',
            }
        }

        return { status: 200, project }
    } catch (err) {
        return {
            status: 500,
            error: 'Server error',
        }
    }
}
