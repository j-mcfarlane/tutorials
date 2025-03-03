import { themes } from '@/lib/data/themes.type'
import { ContentItem } from '@/lib/types/content-item.interface'
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
    addSlideAtIndex: (slide: Slide, index: number) => void
    setCurrentSlide: (index: number) => void
    updateContentItem: (id: string, contentId: string, newContent: string | string[] | string[][]) => void
    addComponentInSlide: (slide: string, item: ContentItem, parent: string, index: number) => void
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
            addSlideAtIndex: (slide: Slide, index: number) => {
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
            setCurrentSlide: (index) => {
                set({ currentSlide: index })
            },
            updateContentItem: (id, content, newContent) => {
                set((state) => {
                    const updateContentRecursively = (item: ContentItem): ContentItem => {
                        if (item.id === content) {
                            return {
                                ...item,
                                content: newContent,
                            }
                        }

                        if (Array.isArray(item.content) && item.content.every((i) => typeof i !== 'string')) {
                            return {
                                ...item,
                                content: item.content.map((sub) => {
                                    if (typeof sub !== 'string') {
                                        return updateContentRecursively(sub as ContentItem)
                                    }

                                    return sub
                                }) as ContentItem[],
                            }
                        }

                        return item
                    }

                    return {
                        slides: state.slides.map((slide) => {
                            return slide.id === id
                                ? {
                                      ...slide,
                                      content: updateContentRecursively(slide.content),
                                  }
                                : slide
                        }),
                    }
                })
            },
            addComponentInSlide: (slide: string, item: ContentItem, parent: string, index: number) => {
                set((state) => {
                    const updatedSlides = state.slides.map((s) => {
                        if (s.id === slide) {
                            const updateContentRecursively = (content: ContentItem): ContentItem => {
                                if (content.id === parent && Array.isArray(content.content)) {
                                    const updatedContent = [...content.content]
                                    updatedContent.splice(index, 0, item)

                                    return {
                                        ...content,
                                        content: updatedContent as unknown as string[],
                                    }
                                }
                                return content
                            }

                            return {
                                ...s,
                                content: updateContentRecursively(s.content),
                            }
                        }

                        return s
                    })

                    return {
                        slides: updatedSlides,
                    }
                })
            },
        }),
        {
            name: 'slides-storage',
        },
    ),
)
