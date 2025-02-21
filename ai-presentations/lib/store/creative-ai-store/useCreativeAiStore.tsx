import { OutlineCard } from '@/lib/types/outline-card.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CreativeAIStore {
    currentAiPrompt: string
    outlines: OutlineCard[]
    setCurrentAiPrompt: (prompt: string) => void
    addMultipleOutlines: (outlines: OutlineCard[]) => void
    addOutline: (outline: OutlineCard) => void
    resetOutlines: () => void
}

export const useCreativeAIStore = create<CreativeAIStore>()(
    persist(
        (set) => ({
            currentAiPrompt: '',
            outlines: [],
            setCurrentAiPrompt: (prompt: string) => {
                set({ currentAiPrompt: prompt })
            },
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
        {
            name: 'creative-ai',
        },
    ),
)
