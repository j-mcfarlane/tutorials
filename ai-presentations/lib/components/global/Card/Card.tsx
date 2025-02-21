'use client'

import { CSSProperties, useRef, KeyboardEvent, DragEvent } from 'react'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

import { OutlineCard } from '@/lib/types/outline-card.interface'
import { Card as UICard } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'

export interface CardProps {
    card: OutlineCard
    isEditing: boolean
    isSelected: boolean
    editText: string
    onEditChange: (value: string) => void
    onEditBlur: () => void
    onEditKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    onCardClick: () => void
    onCardDoubleClick: () => void
    onDeleteClick: () => void
    dragHandlers: {
        onDragStart: (e: DragEvent<HTMLDivElement>) => void
        onDragEnd: () => void
    }
    onDragOver: (e: DragEvent<HTMLDivElement>) => void
    dragOverStyles: CSSProperties
}

export function Card({
    card,
    isEditing,
    isSelected,
    editText,
    onEditChange,
    dragOverStyles,
    dragHandlers,
    onDragOver,
    onCardClick,
    onCardDoubleClick,
    onEditBlur,
    onEditKeyDown,
    onDeleteClick,
}: CardProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
        >
            <div draggable onDragOver={onDragOver} style={dragOverStyles} {...dragHandlers}>
                <UICard
                    className={`p-4 cursor-grab active:cursor-grabbing bg-primary-90 ${
                        isEditing || isSelected ? 'border-primary bg-transparent' : ''
                    }`}
                    onClick={onCardClick}
                    onDoubleClick={onCardDoubleClick}
                >
                    <div className="flex justify-between items-center">
                        {isEditing ? (
                            <Input
                                ref={inputRef}
                                value={editText}
                                onChange={(e) => onEditChange(e.target.value)}
                                onBlur={onEditBlur}
                                onKeyDown={onEditKeyDown}
                                className="text-base sm:text-lg"
                            />
                        ) : (
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-base sm:text-lg py-1 px-4 rounded-1 bg-primary-20 ${
                                        isEditing || isSelected ? 'bg-secondary-90 dark:text-black' : ''
                                    }`}
                                >
                                    {card.order}
                                </span>

                                <div className="text-base">{card.title}</div>
                            </div>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDeleteClick()
                            }}
                            aria-label={`Delete card`}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </UICard>
            </div>
        </motion.div>
    )
}
