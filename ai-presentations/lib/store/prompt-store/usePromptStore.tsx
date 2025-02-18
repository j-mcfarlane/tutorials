import { Page } from '@/lib/types/page.type'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface PromptStore {
    page: Page
    setPage: (page: Page) => void
}

export const usePromptStore = create<PromptStore>()(
    devtools(
        persist(
            (set) => ({
                page: Page.CREATE,
                setPage: (page: Page) => set({ page }),
            }),
            { name: 'prompts' },
        ),
    ),
)
