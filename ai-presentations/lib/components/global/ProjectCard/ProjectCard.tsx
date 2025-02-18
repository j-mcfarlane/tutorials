'use client'

import { useSlideStore } from '@/lib/store/slide-store'
import { Project } from '@prisma/client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ThumbnailPreview } from '../ThumbnailPreview'
import { themes } from '@/lib/data/themes.type'

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

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(project.slides)))
        router.push(`/presentation/${project.id}`)
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
        </motion.div>
    )
}

// const image = `https://picsum.photos/200/300`
