import { themes } from '@/lib/data/themes.type'
import { Slide } from '@/lib/types/slide.interface'
import { Theme } from '@/lib/types/theme.interface'
import { Project } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SlideState {
    slides: Slide[]
    project: Project | null
    currentTheme: Theme
    setSlides: (slides: Slide[]) => void
    setProject: (project: Project) => void
    setCurrentTheme: (theme: Theme) => void
}

export const useSlideStore = create(
    persist<SlideState>(
        (set) => ({
            slides: [],
            project: null,
            currentTheme: themes[0],
            setSlides: (slides: Slide[]) => set({ slides }),
            setProject: (project: Project) => set({ project }),
            setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
        }),
        {
            name: 'slides-storage',
        },
    ),
)
