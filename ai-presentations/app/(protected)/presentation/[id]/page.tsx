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

    return <DndProvider></DndProvider>
}
