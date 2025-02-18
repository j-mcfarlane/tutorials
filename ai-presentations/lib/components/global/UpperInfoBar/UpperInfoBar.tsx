import { PropsWithChildren } from 'react'
import { User } from '@prisma/client'
import { Upload } from 'lucide-react'

// Components
import { SidebarTrigger } from '../../ui/sidebar'
import { Separator } from '../../ui/separator'
import { SearchBar } from '../SearchBar'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { Button } from '../../ui/button'
import { NewProjectButton } from '../NewProjectButton'

export interface UpperInfoBarProps {
    user: User
}

export function UpperInfoBar({ user }: UpperInfoBarProps) {
    return (
        <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2  bg-background p-4 justify-between">
            <SidebarTrigger className="" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
                <SearchBar />
                <ThemeSwitcher />

                <div className="flex flex-wrap gap-4 items-center justify-end">
                    <Button className="bg-primary-80 rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed">
                        <Upload />
                        Import
                    </Button>

                    <NewProjectButton user={user} />
                </div>
            </div>
        </header>
    )
}
