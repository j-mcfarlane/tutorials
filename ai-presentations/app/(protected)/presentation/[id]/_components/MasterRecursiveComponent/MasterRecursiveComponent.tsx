import { ContentItem } from '@/lib/types/content-item.interface'
import { Fragment, memo } from 'react'
import { ContentRenderer } from '../ContentRenderer'

export interface MasterRecursiveComponentProps {
    content: ContentItem
    onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void
    isPreview?: boolean
    isEditable?: boolean
    slideId: string
    index?: string
}

export const MasterRecursiveComponent = memo(function Base({
    content,
    onContentChange,
    isPreview = false,
    isEditable = true,
    slideId,
    index,
}: MasterRecursiveComponentProps) {
    if (isPreview) {
        return (
            <ContentRenderer
                content={content}
                onContentChange={onContentChange}
                isPreview={isPreview}
                isEditable={isEditable}
                slideId={slideId}
                index={index}
            />
        )
    }

    return (
        <Fragment>
            <ContentRenderer
                content={content}
                onContentChange={onContentChange}
                isPreview={isPreview}
                isEditable={isEditable}
                slideId={slideId}
                index={index}
            />
        </Fragment>
    )
})
