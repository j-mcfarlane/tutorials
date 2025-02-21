'use server'

import { client } from '@/lib/data/prisma'
import { onAuthenticateUser } from '../user/on-authenticate-user.action'

export async function getProjectById(id: string) {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: 'User not authenticated',
            }
        }

        const project = await client.project.findUnique({
            where: {
                id,
            },
        })

        if (!project) {
            return {
                status: 404,
                error: 'No projects found',
            }
        }

        return {
            status: 200,
            project,
        }
    } catch (err) {
        console.error('Error', err)

        return {
            status: 500,
        }
    }
}
