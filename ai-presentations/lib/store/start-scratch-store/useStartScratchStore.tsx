import { OutlineCard } from '@/lib/types/outline-card.interface'
import { Page } from '@/lib/types/page.type'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface useStartScratchStore {
    outlines: OutlineCard[]
    addOutline: (outline: OutlineCard) => void
    addMultipleOutlines: (outlines: OutlineCard[]) => void
    resetOutlines: () => void
}

export const useStartScratchStore = create<useStartScratchStore>()(
    devtools(
        persist(
            (set) => ({
                outlines: [],
                addMultipleOutlines: (outlines: OutlineCard[]) => {
                    set((state) => ({
                        outlines: [...outlines, ...state.outlines],
                    }))
                },
                addOutline: (outline: OutlineCard) => {
                    set((state) => ({
                        outlines: [outline, ...state.outlines],
                    }))
                },
                resetOutlines: () => set({ outlines: [] }),
            }),
            { name: 'start-scratch' },
        ),
    ),
)
