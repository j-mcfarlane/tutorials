import { Slide } from '@/lib/types/slide.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SlideState {
    slides: Slide[]
    setSlides: (slides: Slide[]) => void
}

export const useSlideStore = create(
    persist<SlideState>(
        (set) => ({
            slides: [],
            setSlides: (slides: Slide[]) => set({ slides }),
        }),
        {
            name: 'slides-storage',
        },
    ),
)
