'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { usePromptStore } from '@/lib/store/prompt-store/usePromptStore'
import { Page } from '@/lib/types/page.type'
import { CreatePage } from '../CreatePage'

export function RenderPage() {
    const router = useRouter()

    const { page, setPage } = usePromptStore()

    const renderStep = () => {
        switch (page) {
            case Page.CREATE:
                return <CreatePage />
            case Page.CREATE_SCRATCH:
                return <></>
            case Page.CREATIVE_AI:
                return <></>
            default:
        }
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={page}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>
    )
}
