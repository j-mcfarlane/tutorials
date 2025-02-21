'use client'

import { getProjectById } from '@/lib/actions/projects/get-project-by-id.action'
import { themes } from '@/lib/data/themes.type'
import { useSlideStore } from '@/lib/store/slide-store'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { redirect, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Navbar } from './_components/Navbar'
import { PreviewSidebar } from './_components/PreviewSidebar'
import { Editor } from './_components/Editor'

export default function PresentationDetailsPage() {
    const { setSlides, setProject, currentTheme, setCurrentTheme } = useSlideStore()
    const params = useParams()
    const { setTheme } = useTheme()

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        ;(async () => {
            try {
                const res = await getProjectById(params.id as string)

                if (res.status !== 200 || !res.project) {
                    toast.error('Error', {
                        description: 'Unable to fetch project',
                    })

                    redirect('/dashboard')
                }

                const findTheme = themes.find((theme) => theme.name === res.project.themeName)

                setCurrentTheme(findTheme || themes[0])
                setTheme(findTheme?.type === 'dark' ? 'dark' : 'light')
                setProject(res.project)
                setSlides(JSON.parse(JSON.stringify(res.project.slides)))
            } catch (err) {
                toast.error('Error', {
                    description: 'Unexpected error',
                })
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <Navbar id={params.id!.toString()} />

                <div
                    className="flex-1 flex overflow-hidden pt-16"
                    style={{
                        color: currentTheme.accentColor,
                        fontFamily: currentTheme.fontFamily,
                        backgroundColor: currentTheme.backgroundColor,
                    }}
                >
                    <PreviewSidebar />

                    <div className="flex-1 ml-64">
                        <Editor isEditable={true} />
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}
