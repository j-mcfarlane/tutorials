import { getAllProjects } from '@/lib/actions/projects/get-all-projects.action'

export default async function DashboardPage() {
    const allProjects = await getAllProjects()

    return (
        <div className="flex w-full flex-col gap-6 relative">
            <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">Projects</h1>
                    <p className="text-base font-normal dark:text-secondary">All of your work in one place</p>
                </div>
            </div>

            {/* Projects */}
        </div>
    )
}
