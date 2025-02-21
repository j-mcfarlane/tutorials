import { LayoutSlides } from '../types/global'
import { AccentLeft, AccentRight, BlankCard, ImageAndText, TextAndImage } from './slide-layouts'

export const createSlideFromLayout = (layoutType: string): LayoutSlides => {
    switch (layoutType) {
        case 'blank-card':
            return BlankCard
        case 'accentLeft':
            return AccentLeft
        case 'accentRight':
            return AccentRight
        case 'imageAndText':
            return ImageAndText
        case 'textAndImage':
            return TextAndImage
        default:
            return BlankCard
    }
}
