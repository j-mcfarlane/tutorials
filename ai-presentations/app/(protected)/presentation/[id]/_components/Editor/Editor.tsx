'use client'

import { Skeleton } from '@/lib/components/ui/skeleton'
import { useSlideStore } from '@/lib/store/slide-store'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dropzone } from '../Dropzone'
import { LayoutSlides } from '@/lib/types/global'
import { v4 } from 'uuid'
import { DraggableSlide } from '../DraggableSlide'

export interface EditorProps {
    isEditable: boolean
}

export function Editor({ isEditable }: EditorProps) {
    const { getOrderedSlides, currentSlide, addSlideAtIndex, reOrderSlides, removeSlide } = useSlideStore()
    const orderedSlides = getOrderedSlides()

    const [loading, setLoading] = useState<boolean>(true)

    const slideRefs = useRef<(HTMLDivElement | null)[]>([])

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        if (isEditable) {
            reOrderSlides(dragIndex, hoverIndex)
        }
    }

    const handleDrop = (
        item: { type: string; layoutType: string; component: LayoutSlides; index?: number },
        dropIndex: number,
    ) => {
        if (!isEditable) return

        if (item.type === 'layout') {
            addSlideAtIndex(
                {
                    ...item.component,
                    id: v4(),
                    slideOrder: dropIndex,
                },
                dropIndex,
            )
        } else if (item.type === 'SLIDE' && item.index !== undefined) {
            moveSlide(item.index, dropIndex)
        }
    }

    const handleDelete = (id: string) => {
        if (isEditable) {
            removeSlide(id)
        }
    }

    useEffect(() => {
        if (slideRefs.current[currentSlide]) {
            slideRefs.current[currentSlide]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }, [currentSlide])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoading(false)
        }
    }, [])

    return (
        <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
            {loading ? (
                <div className="w-full px-4 flex flex-col space-y-6">
                    <Skeleton className="h-52 w-full" />
                    <Skeleton className="h-52 w-full" />
                    <Skeleton className="h-52 w-full" />
                </div>
            ) : (
                <ScrollArea className="flex-1 mt-8 min-h-screen">
                    <div className="px-4 pb-4 space-y-4 pt-2">
                        {isEditable && <Dropzone index={0} onDrop={handleDrop} isEditable={isEditable} />}

                        {orderedSlides.map((slide, index) => {
                            return (
                                <Fragment key={slide.id || index}>
                                    <DraggableSlide
                                        slide={slide}
                                        index={index}
                                        moveSlide={moveSlide}
                                        handleDelete={handleDelete}
                                        isEditable={isEditable}
                                    />
                                </Fragment>
                            )
                        })}
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}
