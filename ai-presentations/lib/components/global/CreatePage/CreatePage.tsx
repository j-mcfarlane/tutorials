'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

// Document
import { CreatePageCard } from '@/lib/data/create-page-card.data'
import { usePromptStore } from '@/lib/store/prompt-store/usePromptStore'
import { Button } from '../../ui/button'
import { RecentPrompts } from '../RecentPrompts'

import { Page } from '@/lib/types/page.type'

export interface CreatePageProps {
    onSelectOption: (option: string) => void
}

export function CreatePage({ onSelectOption }: CreatePageProps) {
    const { prompts, setPage } = usePromptStore()

    useEffect(() => {
        setPage(Page.CREATE)
    }, [])

    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            <motion.div
                variants={{
                    hidden: {
                        y: 20,
                        opacity: 0,
                    },
                    visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            type: 'spring',
                            stiffness: 100,
                        },
                    },
                }}
                className="text-center space-y-2"
            >
                <h1 className="text-4xl font-bold text-primary">How would you like to get started?</h1>
                <p className="text-secondary">Choose your preferred method to begin</p>
            </motion.div>

            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                    },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
                className="grid gap-6 md:grid-cols-3"
            >
                {CreatePageCard.map((card) => {
                    return (
                        <motion.div
                            key={card.title}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                            whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.1 } }}
                            className={`${
                                card.highlightedText ? 'bg-vivid-gradient' : 'hover:bg-vivid-gradient border'
                            } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
                        >
                            <motion.div
                                className="w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl"
                                whileHover={{ transition: { duration: 0.1 } }}
                            >
                                <div className="flex flex-col items-start w-full gap-y-3">
                                    <div>
                                        <p className="text-primary text-lg font-semibold">{card.title}</p>
                                        <p
                                            className={`${
                                                card.highlightedText ? 'text-vivid' : 'text-primary'
                                            } text-4xl font-bold`}
                                        >
                                            {card.highlightedText}
                                        </p>
                                    </div>

                                    <p className="text-secondary text-sm font-normal">{card.description}</p>
                                </div>

                                <motion.div
                                    className="self-end"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant={card.highlight ? 'default' : 'outline'}
                                        className="w-fit rounded-xl font-bold"
                                        size="sm"
                                        onClick={() => onSelectOption(card.type)}
                                    >
                                        {card.highlight ? 'Generate' : 'Continue'}
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </motion.div>

            {prompts.length > 0 && <RecentPrompts />}
        </motion.div>
    )
}
