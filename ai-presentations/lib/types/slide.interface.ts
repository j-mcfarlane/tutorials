import { ContentItem } from './content-item.interface'

export interface Slide {
    id: string
    slideName: string
    type: string
    content: ContentItem
    slideOrder: number
    className?: string
}
