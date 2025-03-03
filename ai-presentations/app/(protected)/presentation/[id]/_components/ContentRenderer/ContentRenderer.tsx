'use client'

import { ContentItem } from '@/lib/types/content-item.interface'
import { ChangeEvent, Fragment, memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Heading1, Heading2, Heading3, Heading4, Title } from '@/lib/components/editor/Headers'
import { cn } from '@/lib/utils/cn'
import { Dropzone } from '../Dropzone'
import { ContentDropzone } from '../ContentDropzone'
import { MasterRecursiveComponent } from '../MasterRecursiveComponent'

export interface ContentRendererProps {
    content: ContentItem
    onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void
    isPreview?: boolean
    isEditable?: boolean
    slideId: string
    index?: string
}

export const ContentRenderer = memo(function Component({
    content,
    onContentChange,
    isPreview = false,
    isEditable = true,
    slideId,
    index,
}: ContentRendererProps) {
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            onContentChange(content.id, e.target.value)
        },
        [content.id, onContentChange],
    )

    const common = {
        placeholder: content.placeholder,
        value: content.content as string,
        onChange: handleChange,
        isPreview,
    }

    const animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    }

    switch (content.type) {
        case 'heading1':
            return (
                <motion.div {...animationProps} className="w-full h-full">
                    <Heading1 {...common} />
                </motion.div>
            )
        case 'heading2':
            return (
                <motion.div {...animationProps} className="w-full h-full">
                    <Heading2 {...common} />
                </motion.div>
            )
        case 'heading3':
            return (
                <motion.div {...animationProps} className="w-full h-full">
                    <Heading3 {...common} />
                </motion.div>
            )
        case 'heading4':
            return (
                <motion.div {...animationProps} className="w-full h-full">
                    <Heading4 {...common} />
                </motion.div>
            )
        case 'title':
            return (
                <motion.div {...animationProps} className="w-full h-full">
                    <Title {...common} />
                </motion.div>
            )
        case 'paragraph':
            return (
                <motion.div {...animationProps} className="w-full h-full">
                    <Paragraph {...common} />
                </motion.div>
            )
        case 'column':
            if (Array.isArray(content.content)) {
                return (
                    <motion.div {...animationProps} className={cn('w-full h-full flex flex-col', content.className)}>
                        {content.content.length > 0 ? (
                            (content.content as ContentItem[]).map((item: ContentItem, index: number) => {
                                return (
                                    <Fragment key={item.id || `item-${index}`}>
                                        {!isPreview && !item.restrictToDrop && index === 0 && isEditable && (
                                            <ContentDropzone index={0} parent={content.id} slide={slideId} />
                                        )}

                                        <MasterRecursiveComponent
                                            content={item}
                                            isEditable={isEditable}
                                            isPreview={false}
                                            slideId={slideId}
                                            onContentChange={onContentChange}
                                        />

                                        {!isPreview && !item.restrictToDrop && isEditable && (
                                            <ContentDropzone index={index + 1} parent={content.id} slide={slideId} />
                                        )}
                                    </Fragment>
                                )
                            })
                        ) : isEditable ? (
                            <ContentDropzone index={0} parent={content.id} slide={slideId} />
                        ) : null}
                    </motion.div>
                )
            }

            return null
        default:
            return null
    }
})
