import { ContentType } from './content-type.type'

export interface ContentItem {
    id: string
    type: ContentType
    name: string
    content: ContentItem[] | string | string[] | string[][]
    initialRows?: number
    initialColumns?: number
    restrictToDrop?: boolean
    columns?: number
    placeholder?: string
    className?: string
    alt?: string
    callOutType?: 'success' | 'warning' | 'info' | 'question' | 'caution'
    link?: string
    code?: string
    language?: string
    bgColor?: string
    isTransparent?: boolean
}
