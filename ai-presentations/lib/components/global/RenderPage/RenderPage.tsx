'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { usePromptStore } from '@/lib/store/prompt-store/usePromptStore'
import { Page } from '@/lib/types/page.type'
import { CreatePage } from '../CreatePage'
import { GenerateAI } from '../GenerateAI'
import { CreateFromScratch } from '../CreateFromScratch'

export function RenderPage() {
    const router = useRouter()

    const { page, setPage } = usePromptStore()

    const handleBack = () => {
        setPage('create')
    }

    const handleSelectOption = (option: string) => {
        if (option === Page.CREATE) {
            router.push(`/templates`)
        } else if (option === Page.CREATE_SCRATCH) {
            setPage(Page.CREATE_SCRATCH)
        } else {
            setPage(Page.CREATIVE_AI)
        }
    }

    const renderStep = () => {
        switch (page) {
            case Page.CREATE:
                return <CreatePage onSelectOption={handleSelectOption} />
            case Page.CREATE_SCRATCH:
                return <CreateFromScratch onBack={handleBack} />
            case Page.CREATIVE_AI:
                return <GenerateAI onBack={handleBack} />
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
