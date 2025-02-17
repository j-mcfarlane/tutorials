'use server'

import { client } from '@/lib/data/prisma'
import { onAuthenticateUser } from '../user/on-authenticate-user.action'

export async function getRecentProjects() {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'User not authenticated',
            }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: 5,
        })

        if (projects.length === 0) {
            return {
                status: 404,
                error: 'No projects found',
            }
        }

        return {
            status: 200,
            projects,
        }
    } catch (err) {
        console.error('Error', err)

        return {
            status: 500,
        }
    }
}
