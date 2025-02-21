'use client'

import { Project, User } from '@prisma/client'
import { ComponentProps } from 'react'

// Components
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton } from '../../ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { NavMain } from '../NavMain'
import { RecentlyOpenedProjects } from '../RecentlyOpenedProjects'
import { NavFooter } from '../NavFooter'

// Data
import { data } from '@/lib/types/constants'

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
    recentProjects: Project[]
    user: User
}

export function AppSidebar({ recentProjects, user, ...rest }: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon" className="mx-w-[212px] bg-background-90" {...rest}>
            <SidebarHeader className="pt-6 px-2 pb-0">
                <SidebarMenuButton size="lg" className="data-[state=open]:text-sidebar-accent-foreground">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                        <Avatar className="h-10 w-10 rounded-full">
                            <AvatarImage width={24} />
                            <AvatarFallback>VI</AvatarFallback>
                        </Avatar>
                    </div>

                    <span className="truncate text-primary text-3xl font-semibold">Vivid</span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="px-2 mt-10 gap-y-6">
                <NavMain items={data.navMain} />
                <RecentlyOpenedProjects recentProjects={recentProjects} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
