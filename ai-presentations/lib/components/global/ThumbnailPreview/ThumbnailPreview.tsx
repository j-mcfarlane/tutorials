import { Slide } from '@/lib/types/slide.interface'
import { Theme } from '@/lib/types/theme.interface'
import { cn } from '@/lib/utils/cn'

export interface ThumbnailPreviewProps {
    slide: Slide
    theme: Theme
}

export function ThumbnailPreview({ slide, theme }: ThumbnailPreviewProps) {
    return (
        <div
            className={cn(`w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2`)}
            style={{
                fontFamily: theme.fontFamily,
                color: theme.accentColor,
                backgroundColor: theme.slideBackgroundColor,
                backgroundImage: theme.gradientBackground,
            }}
        >
            Thumbnail Preview
        </div>
    )
}
