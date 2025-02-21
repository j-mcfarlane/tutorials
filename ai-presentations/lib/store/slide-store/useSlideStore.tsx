import { themes } from '@/lib/data/themes.type'
import { Slide } from '@/lib/types/slide.interface'
import { Theme } from '@/lib/types/theme.interface'
import { Project } from '@prisma/client'
import { v4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SlideState {
    slides: Slide[]
    project: Project | null
    currentTheme: Theme
    currentSlide: number
    setSlides: (slides: Slide[]) => void
    setProject: (project: Project) => void
    setCurrentTheme: (theme: Theme) => void
    getOrderedSlides: () => Slide[]
    reOrderSlides: (from: number, to: number) => void
    removeSlide: (id: string) => void
    adSlideAtIndex: (slide: Slide, index: number) => void
}

export const useSlideStore = create(
    persist<SlideState>(
        (set, get) => ({
            slides: [],
            project: null,
            currentTheme: themes[0],
            currentSlide: 0,
            setSlides: (slides: Slide[]) => set({ slides }),
            setProject: (project: Project) => set({ project }),
            setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
            getOrderedSlides: () => {
                const state = get()

                return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder)
            },
            reOrderSlides: (from: number, to: number) => {
                set((state) => {
                    const newSlides = [...state.slides]
                    const [removed] = newSlides.splice(from, 1)

                    newSlides.splice(to, 0, removed)

                    return {
                        slides: newSlides.map((slide, index) => ({
                            ...slide,
                            slideOrder: index,
                        })),
                    }
                })
            },
            removeSlide: (id) => {
                set((state) => ({
                    slides: state.slides.filter((slide) => slide.id !== id),
                }))
            },
            adSlideAtIndex: (slide: Slide, index: number) => {
                set((state) => {
                    const newSlides = [...state.slides]

                    newSlides.splice(index, 0, { ...slide, id: v4() })

                    newSlides.forEach((s, i) => {
                        s.slideOrder = i
                    })

                    return {
                        slides: newSlides,
                        currentSlide: index,
                    }
                })
            },
        }),
        {
            name: 'slides-storage',
        },
    ),
)
