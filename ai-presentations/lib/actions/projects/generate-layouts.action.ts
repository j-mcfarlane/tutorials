'use server'

import { client } from '@/lib/data/prisma'
import { onAuthenticateUser } from '../user/on-authenticate-user.action'
import { generateLayoutsJson } from './generate-layouts-json.action'

export async function generateLayouts(id: string, theme: string) {
    try {
        const clerk = await onAuthenticateUser()

        if (clerk.status !== 200 || !clerk.user) {
            return {
                status: 403,
                error: 'User not authenticated',
                data: null,
            }
        }

        if (!id) {
            return {
                status: 400,
                error: 'Project ID is required',
                data: null,
            }
        }

        const user = await client.user.findUnique({
            where: {
                clerkId: clerk.user.clerkId,
            },
        })

        if (!user || !user.subscription) {
            return {
                status: 400,
                error: 'Cant',
                data: null,
            }
        }

        const project = await client.project.findUnique({
            where: {
                id,
                isDeleted: false,
            },
        })

        if (!project) {
            return {
                status: 404,
                error: 'Project not found',
                data: null,
            }
        }

        if (!project.outlines || project.outlines.length === 0) {
            return {
                status: 400,
                error: 'Project does not have any outlines',
                data: null,
            }
        }

        const layouts = await generateLayoutsJson(project?.outlines)

        if (layouts?.status !== 200) {
            return {
                status: 400,
                error: 'err',
                data: null,
            }
        }

        const data = await client.project.update({
            where: {
                id,
            },
            data: {
                slides: layouts.data,
                themeName: theme,
            },
        })

        return { status: 200, data }
    } catch (err) {
        return {
            status: 500,
            error: 'Server error',
        }
    }
}
