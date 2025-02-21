'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../ui/button'
import { Plus } from 'lucide-react'

export interface AddCardButtonProps {
    onAddCard: () => void
}

export function AddCardButton({ onAddCard }: AddCardButtonProps) {
    const [showGap, setShowGap] = useState<boolean>(false)

    return (
        <motion.div
            className="w-full relative overflow-hidden"
            initial={{ height: '0.5rem' }}
            animate={{ height: showGap ? '2rem ' : '0.5rem' }}
            onHoverStart={() => setShowGap(true)}
            onHoverEnd={() => setShowGap(false)}
        >
            <AnimatePresence>
                {showGap && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        onHoverStart={() => setShowGap(true)}
                        onHoverEnd={() => setShowGap(false)}
                    >
                        <div className="w-[40%] h-[1px] bg-primary" />

                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary"
                            onClick={onAddCard}
                            aria-label="Add new card"
                        >
                            <Plus className="h-4 w-4 text-black" />
                        </Button>

                        <div className="w-[40%] h-[1px] bg-primary" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
