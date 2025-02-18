'use client'

import { useSlideStore } from '@/lib/store/slide-store'
import { Project } from '@prisma/client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { ThumbnailPreview } from '../ThumbnailPreview'
import { themes } from '@/lib/data/themes.type'
import { timeAgo } from '@/lib/utils/time-ago/time-ago'
import { AlertDialogBox } from '../AlertDialogBox'

import { Button } from '../../ui/button'

import { recoverProject } from '@/lib/actions/projects/recover-project.action'
import { deleteProject } from '@/lib/actions/projects/delete-project.action'

export interface ProjectCardProps {
    project: Project
}

const itemVariants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
}

export function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter()
    const { setSlides } = useSlideStore()

    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(project.slides)))
        router.push(`/presentation/${project.id}`)
    }

    const handleRecover = async () => {
        setLoading(true)

        if (!project.id) {
            setLoading(false)
            toast('Error', {
                description: 'Project not found',
            })

            return
        }

        try {
            const response = await recoverProject(project.id)

            if (response.status !== 200) {
                throw new Error('Failed to recover project')
            }

            setOpen(false)

            router.refresh()

            toast('Success', {
                description: 'Project recovered successfully',
            })
        } catch (err) {
            toast('Oops', {
                description: 'Server error',
            })
        }
    }

    const handleDelete = async () => {
        setLoading(true)

        if (!project.id) {
            setLoading(false)
            toast('Error', {
                description: 'Project not found',
            })

            return
        }

        try {
            const response = await deleteProject(project.id)

            if (response.status !== 200) {
                throw new Error('Failed to recover project')
            }

            setOpen(false)

            router.refresh()

            toast('Success', {
                description: 'Project deleted successfully',
            })
        } catch (err) {
            toast('Oops', {
                description: 'Server error',
            })
        }
    }

    const theme = themes.find((t) => t.name === 'Default')
    const d = themes[0]!

    return (
        <motion.div
            className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
                !project.isDeleted && `hover:bg-muted/50`
            }`}
            variants={itemVariants}
        >
            <div
                className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
                onClick={handleNavigation}
            >
                <ThumbnailPreview theme={theme || d} slide={JSON.parse(JSON.stringify(project.slides))?.[0]} />
            </div>

            <div className="w-full">
                <div className="space-y-1">
                    <h3 className="font-semibold text-base text-primary line-clamp-1">{project.title}</h3>

                    <div className="flex w-full justify-between items-center gap-2">
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                            {timeAgo(project.createdAt.toString())}
                        </p>

                        {project.isDeleted ? (
                            <AlertDialogBox
                                description="This will recover your project and restore your data"
                                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                                loading={loading}
                                open={open}
                                onClick={handleRecover}
                                handleOpen={() => setOpen(!open)}
                            >
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="bg-background-80 dark:hover:bg-background-90"
                                    disabled={loading}
                                >
                                    Recover
                                </Button>
                            </AlertDialogBox>
                        ) : (
                            <AlertDialogBox
                                description="This will recover your project and restore your data"
                                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                                loading={loading}
                                open={open}
                                onClick={handleDelete}
                                handleOpen={() => setOpen(!open)}
                            >
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="bg-background-80 dark:hover:bg-background-90"
                                    disabled={loading}
                                >
                                    Recover
                                </Button>
                            </AlertDialogBox>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
