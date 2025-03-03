import { useSlideStore } from '@/lib/store/slide-store'
import { ContentItem } from '@/lib/types/content-item.interface'
import { cn } from '@/lib/utils/cn'
import { RefObject } from 'react'
import { useDrop } from 'react-dnd'
import { v4 } from 'uuid'

export interface ContentDropzoneProps {
    index: number
    parent: string
    slide: string
}

export function ContentDropzone({ index, parent, slide }: ContentDropzoneProps) {
    const { addComponentInSlide } = useSlideStore()
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'CONTENT_ITEM',
        drop: (item: { type: string; componentType: string; label: string; component: ContentItem }) => {
            if (item.type === 'component') {
                addComponentInSlide(slide, { ...item.component, id: v4() }, parent, index)
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    })

    return (
        <div
            ref={drop as unknown as RefObject<HTMLDivElement>}
            className={cn(
                'h-3 w-full transition-all duration-200',
                '',
                isOver && canDrop ? 'border-blue-500 bg-blue-100' : 'border-gray-300',
                'hover:border-blue-300',
            )}
        >
            {isOver && canDrop && (
                <div className="w-full h-full flex text-sm items-center justify-center text-green-600">Drop Here</div>
            )}
        </div>
    )
}
