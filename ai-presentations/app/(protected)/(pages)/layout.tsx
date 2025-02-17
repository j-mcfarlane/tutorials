import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

// Action
import { onAuthenticateUser } from '@/lib/actions/user/on-authenticate-user.action'
import { getRecentProjects } from '@/lib/actions/projects/get-recent-projects.action'

// Components
import { SidebarProvider } from '@/lib/components/ui/sidebar'
import { AppSidebar } from '@/lib/components/global/AppSidebar'

export default async function Layout({ children }: PropsWithChildren) {
    const recent = await getRecentProjects()
    const checkUser = await onAuthenticateUser()

    if (!checkUser.user) {
        redirect('/sign-in')
    }
    return (
        <SidebarProvider>
            <AppSidebar recentProjects={recent.projects || []} user={checkUser.user} />
        </SidebarProvider>
    )
}
