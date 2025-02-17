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
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        tooltip={'Test'}
                        className={`${pathname.includes('rl')} bg-background-80`}
                    >
                        <Link href="/" className={`text-lg ${pathname.includes('test') && 'font-bold'}`}>
                            <Clock className="text-lg" />
                            <span>Test Sidebar Item</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
