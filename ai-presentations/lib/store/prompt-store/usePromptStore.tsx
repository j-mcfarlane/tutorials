import { OutlineCard } from '@/lib/types/outline-card.interface'
import { Page } from '@/lib/types/page.type'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Prompt {
    id: string
    createdAt: string
    title: string
    outlines: OutlineCard[]
}

export interface PromptStore {
    page: Page
    prompts: Prompt[]
    addPrompt: (prompt: Prompt) => void
    removePrompt: (prompt: Prompt) => void
    setPage: (page: Page) => void
}

export const usePromptStore = create<PromptStore>()(
    devtools(
        persist(
            (set) => ({
                page: Page.CREATE,
                prompts: [],
                addPrompt: (prompt: Prompt) =>
                    set((state) => ({
                        prompts: [prompt, ...state.prompts],
                    })),
                removePrompt: (prompt: Prompt) =>
                    set((state) => ({
                        prompts: state.prompts.filter((p) => p.id !== prompt.id),
                    })),
                setPage: (page: Page) => set({ page }),
            }),
            { name: 'prompts' },
        ),
    ),
)
