import { PropsWithChildren } from 'react'
import { User } from '@prisma/client'
import { SidebarTrigger } from '../../ui/sidebar'
import { Separator } from '../../ui/separator'
import { SearchBar } from '../SearchBar'

export interface UpperInfoBarProps {
    user: User
}

export function UpperInfoBar({ children }: PropsWithChildren<UpperInfoBarProps>) {
    return (
        <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2  bg-background p-4 justify-between">
            <SidebarTrigger className="" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
                <SearchBar />
            </div>
        </header>
    )
}
