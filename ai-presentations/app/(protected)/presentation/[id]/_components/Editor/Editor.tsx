import { Skeleton } from '@/lib/components/ui/skeleton'
import { useSlideStore } from '@/lib/store/slide-store'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useState } from 'react'
import { Dropzone } from '../Dropzone'
import { LayoutSlides } from '@/lib/types/global'

export interface EditorProps {
    isEditable: boolean
}

export function Editor({ isEditable }: EditorProps) {
    const { getOrderedSlides, currentSlide } = useSlideStore()

    const [loading, setLoading] = useState<boolean>(false)

    const handleDrop = (item: { type: string; layoutType: string; component: LayoutSlides; index?: number }) => {}

    return (
        <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
            {loading ? (
                <div className="w-full px-4 flex flex-col space-y-6">
                    <Skeleton className="h-52 w-full" />
                    <Skeleton className="h-52 w-full" />
                    <Skeleton className="h-52 w-full" />
                </div>
            ) : (
                <ScrollArea className="flex-1 mt-8">
                    <div className="px-4 pb-4 space-y-4 pt-2">
                        {isEditable && <Dropzone index={0} onDrop={handleDrop} isEditable={isEditable} />}
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}
