'use client'

import { Project } from '@prisma/client'
import { motion } from 'framer-motion'
import { ProjectCard } from '../ProjectCard'

export interface ProjectsProps {
    projects: Project[]
}

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export function Projects({ projects }: ProjectsProps) {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </motion.div>
    )
}
