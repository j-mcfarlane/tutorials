'use server'

import { client } from '@/lib/data/prisma'
import { onAuthenticateUser } from '../user/on-authenticate-user.action'
import { OutlineCard } from '@/lib/types/outline-card.interface'

export async function createProject(title: string, outlines: OutlineCard[]) {
    try {
        const clerk = await onAuthenticateUser()

        if (clerk.status !== 200 || !clerk.user) {
            return {
                status: 403,
                error: 'User not authenticated',
            }
        }

        if (!title || !outlines || outlines.length === 0) {
            return {
                status: 400,
                error: 'Title and outlines are required',
            }
        }

        const allOutlines = outlines.map((outline) => outline.title)
        const project = await client.project.create({
            data: {
                title,
                outlines: allOutlines,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: clerk.user.id,
            },
        })

        return { status: 200, project }
    } catch (err) {
        return {
            status: 500,
            error: 'Server error',
        }
    }
}
