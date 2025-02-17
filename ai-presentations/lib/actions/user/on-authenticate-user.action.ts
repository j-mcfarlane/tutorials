'use server'

import { client } from '@/lib/data/prisma'
import { currentUser } from '@clerk/nextjs/server'

export async function onAuthenticateUser() {
    try {
        const current = await currentUser()

        if (!current) {
            return {
                status: 403,
            }
        }

        const user = await client.user.findUnique({
            where: {
                clerkId: current.id,
            },
            include: {
                PurchasedProjects: {
                    select: {
                        id: true,
                    },
                },
            },
        })

        if (user) {
            return {
                status: 200,
                user,
            }
        }

        const newUser = await client.user.create({
            data: {
                clerkId: current.id,
                email: current.emailAddresses[0].emailAddress,
                name: current.firstName + ' ' + current.lastName,
                profileImage: current.imageUrl,
            },
        })

        if (newUser) {
            return {
                status: 201,
                user: newUser,
            }
        }

        return {
            status: 400,
        }
    } catch (err) {
        console.error('Error', err)

        return {
            status: 500,
        }
    }
}
