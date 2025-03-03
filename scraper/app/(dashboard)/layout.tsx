import { PropsWithChildren } from 'react'

// Components
import { BreadcrumbHeader } from '@/lib/layout/BreadcrumbHeader'
import { DesktopSidebar } from '@/lib/layout/DesktopSidebar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/lib/layout/ThemeToggle'

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-screen">
            <DesktopSidebar />
            <div className="flex flex-col flex-1 min-h-screen">
                <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
                    <BreadcrumbHeader />

                    <div>
                        <ThemeToggle />
                    </div>
                </header>

                <Separator />

                <div className="overflow-auto">
                    <div className="flex-1 container py-4 text-accent-foreground"></div>
                    {children}
                </div>
            </div>
        </div>
    )
}
