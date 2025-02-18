import Image from 'next/image'

// Types
import { Slide } from '@/lib/types/slide.interface'
import { Theme } from '@/lib/types/theme.interface'

// Utils
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
            {slide ? (
                <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">This is a slide</div>
            ) : (
                <div className="w-full h-full bg-gray-400 flex justify-center items-center">
                    <Image src={'/'} alt="slide" className="w-6 h-6 text-gray-500" />
                </div>
            )}
        </div>
    )
}
