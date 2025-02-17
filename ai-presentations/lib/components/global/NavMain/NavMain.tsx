'use client'

import { FC, SVGProps } from 'react'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export interface NavItem {
    title: string
    url: string
    icon: FC<SVGProps<SVGSVGElement>>
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}

export interface NavMainProps {
    items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
    const pathname = usePathname()

    return (
        <SidebarGroup className="p-0">
            <SidebarMenu>
                {items.map((item) => {
                    return (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                className={`${pathname.includes(item.url)} bg-background-80`}
                            >
                                <Link
                                    href={item.url}
                                    className={`text-lg ${pathname.includes(item.url) && 'font-bold'}`}
                                >
                                    <item.icon className="text-lg" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
