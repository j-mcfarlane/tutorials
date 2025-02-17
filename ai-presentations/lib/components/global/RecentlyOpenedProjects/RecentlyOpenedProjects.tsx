'use client'

import { Project } from '@prisma/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

// Components
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar'
import { Button } from '../../ui/button'

export interface RecentlyOpenedProjectsProps {
    recentProjects: Project[]
}

export function RecentlyOpenedProjects({ recentProjects }: RecentlyOpenedProjectsProps) {
    const router = useRouter()

    const handleClick = (project: Project) => {
        if (!project.id) {
            toast('Project not found', {
                description: 'Please try again',
            })

            return
        }

        // setSlides(JSON.parse(JSON.stringify(project.slides)))
        router.push(`/presentation/${project.id}`)
    }

    return (
        recentProjects.length > 0 && (
            <SidebarGroup>
                <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
                <SidebarMenu>
                    {recentProjects.map((project) => {
                        return (
                            <SidebarMenuItem key={project.id}>
                                <SidebarMenuButton asChild tooltip={'Testing'} className="hover:bg-primary-80">
                                    <Button
                                        variant="link"
                                        className="text-xs items-center justify-start"
                                        onClick={() => handleClick(project)}
                                    >
                                        <span>Testing</span>
                                    </Button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroup>
        )
    )
}
