'use client'

import { useSlideStore } from '@/lib/store/slide-store'
import { Slide } from '@/lib/types/slide.interface'
import { cn } from '@/lib/utils/cn'
import { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { MasterRecursiveComponent } from '../MasterRecursiveComponent'
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/components/ui/popover'
import { EllipsisVertical, Trash } from 'lucide-react'
import { Button } from '@/lib/components/ui/button'

export interface DraggableSlideProps {
    slide: Slide
    index: number
    moveSlide: (dragIndex: number, hoverIndex: number) => void
    handleDelete: (id: string) => void
    isEditable: boolean
}

export function DraggableSlide({ slide, index, moveSlide, handleDelete, isEditable }: DraggableSlideProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } = useSlideStore()

    const [{ isDragging }] = useDrag({
        type: 'SLIDE',
        item: {
            index,
            type: 'SLIDE',
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: isEditable,
    })

    const handleContentChange = (id: string, content: string | string[] | string[][]) => {
        if (isEditable) {
            updateContentItem(slide.id, id, content)
        }
    }

    return (
        <div
            ref={ref}
            className={cn(
                `w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]`,
                'shadow-xl transition-shadow duration-300',
                'flex flex-col',
                index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2' : '',
                slide.className,
                isDragging ? 'opacity-50' : 'opacity-100',
            )}
            style={{ backgroundImage: currentTheme.gradientBackground }}
            onClick={() => setCurrentSlide(index)}
        >
            <div className="h-full w-full flex-grow overflow-hidden">
                <MasterRecursiveComponent
                    content={slide.content}
                    isEditable={isEditable}
                    isPreview={false}
                    slideId={slide.id}
                    onContentChange={handleContentChange}
                />
            </div>

            {isEditable && (
                <Popover>
                    <PopoverTrigger asChild className="absolute top-2 left-2">
                        <Button size="sm" variant="outline">
                            <EllipsisVertical className="w-5 h-5" />
                            <span className="sr-only">Slide options</span>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-fit p-0">
                        <div className="flex spae-x-2">
                            <Button variant="ghost" onClick={() => handleDelete(slide.id)}>
                                <Trash className="w-5 h-5 text-red-500" />
                                <span className="sr-only">Delete Slide</span>
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}
