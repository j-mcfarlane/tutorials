import { LayoutSlides } from '@/lib/types/global'
import { cn } from '@/lib/utils/cn'
import { useDrop } from 'react-dnd'

export interface DropzoneProps {
    index: number
    onDrop: (
        item: {
            type: string
            layoutType: string
            component: LayoutSlides
            index?: number
        },
        dropIndex: number,
    ) => void
    isEditable: boolean
}

export function Dropzone({ index, onDrop, isEditable }: DropzoneProps) {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: ['SLIDE', 'layout'],
        drop: (item: { type: string; layoutType: string; component: LayoutSlides; index?: number }) => {
            onDrop(item, index)
        },
        canDrop: () => isEditable,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    })

    if (isEditable) return null

    return (
        <div
            className={cn(
                `h-4 my-2 rounded-md transition-all duration-200`,
                isOver && canDrop ? 'border-green-500' : 'border-gray-300',
                canDrop ? 'border-blue-300' : '',
            )}
        >
            {isOver && canDrop && (
                <div className="h-full flex items-center justify-center text-green-600">Drop here</div>
            )}
        </div>
    )
}
