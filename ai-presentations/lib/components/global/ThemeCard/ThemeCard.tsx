'use client'

import { Theme } from '@/lib/types/theme.interface'
import { AnimationControls } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '../../ui/card'
import Image from 'next/image'

export interface ThemeCardProps {
    title: string
    description: string
    content: ReactNode
    variant: 'left' | 'main' | 'right'
    theme: Theme
    controls: AnimationControls
}

export function ThemeCard({ title, description, content, variant, theme, controls }: ThemeCardProps) {
    const variants = {
        left: {
            hidden: {
                opacity: 0,
                x: '-50%',
                y: '-50%',
                scale: 0.9,
                rotate: 0,
            },
            visible: {
                opacity: 1,
                x: '-25%',
                y: '-25%',
                scale: 0.95,
                rotate: -10,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: 0.1,
                },
            },
        },
        right: {
            hidden: {
                opacity: 0,
                x: '50%',
                y: '50%',
                scale: 0.9,
                rotate: 0,
            },
            visible: {
                opacity: 1,
                x: '25%',
                y: '25%',
                scale: 0.95,
                rotate: 10,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: 0.1,
                },
            },
        },
        main: {
            hidden: {
                opacity: 0,
                scale: 0.9,
            },
            visible: {
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2,
                },
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            variants={variants[variant]}
            animate={controls}
            className="absolute w-full max-w-3xl"
            style={{ zIndex: variant === 'main' ? 10 : 0 }}
        >
            <Card
                className="h-full shadow-2xl backdrop-blur-sm"
                style={{ backgroundColor: theme.slideBackgroundColor, border: `1px solid ${theme.accentColor}20` }}
            >
                <div className="flex flex-col md:flex-row">
                    <CardContent className="flex-1 p-8 space-y-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tight" style={{ color: theme.accentColor }}>
                                {title}
                            </h2>
                            <p className="text-lg" style={{ color: `${theme.accentColor}90` }}>
                                {description}
                            </p>
                        </div>

                        {content}
                    </CardContent>

                    <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden rounded-r-lg">
                        <Image
                            src="https://picsum.photos/500"
                            alt="Theme preview"
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
