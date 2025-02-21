import { ComponentGroup, LayoutGroup } from '../types/global'
import {
    BlankCardIcon,
    FourColumnsIcon,
    FourImageColumnsIcon,
    ImageAndTextIcon,
    TextAndImageIcon,
    ThreeColumnsIcon,
    ThreeColumnsWithHeadingsIcon,
    ThreeImageColumnsIcon,
    TwoColumnsIcon,
    TwoColumnsWithHeadingsIcon,
    TwoImageColumnsIcon,
} from './icons-component'
import {
    BulletListComponent,
    CalloutBoxComponent,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    NumberedListComponent,
    Paragraph,
    ResizableColumn,
    Table,
    Title,
    TodoListComponent,
} from './slide-components'
import {
    AccentLeft,
    AccentRight,
    BlankCard,
    FourColumns,
    FourImageColumns,
    ImageAndText,
    TextAndImage,
    ThreeColumns,
    ThreeColumnsWithHeadings,
    ThreeImageColumns,
    TwoColumns,
    TwoColumnsWithHeadings,
    TwoImageColumns,
} from './slide-layouts'

export const layouts: LayoutGroup[] = [
    {
        name: 'Basic',
        layouts: [
            {
                name: 'Blank card',
                icon: BlankCardIcon,
                type: 'layout',
                layoutType: 'blank-card',
                component: BlankCard,
            },
            {
                name: 'Image and text',
                icon: ImageAndTextIcon,
                type: 'layout',
                layoutType: 'imageAndText',
                component: ImageAndText,
            },
            {
                name: 'Text and image',
                icon: TextAndImageIcon,
                type: 'layout',
                layoutType: 'textAndImage',
                component: TextAndImage,
            },
            {
                name: 'Two Columns',
                icon: TwoColumnsIcon,
                type: 'layout',
                layoutType: 'twoColumns',
                component: TwoColumns,
            },
            {
                name: 'Two Columns with headings',
                icon: TwoColumnsWithHeadingsIcon,
                type: 'layout',
                layoutType: 'twoColumnsWithHeadings',
                component: TwoColumnsWithHeadings,
            },
            {
                name: 'Three Columns',
                icon: ThreeColumnsIcon,
                type: 'layout',
                layoutType: 'threeColumns',
                component: ThreeColumns,
            },
            {
                name: 'Three Columns with headings',
                icon: ThreeColumnsWithHeadingsIcon,
                type: 'layout',
                layoutType: 'threeColumnsWithHeadings',
                component: ThreeColumnsWithHeadings,
            },

            {
                name: 'Four Columns',
                icon: FourColumnsIcon,
                type: 'layout',
                layoutType: 'fourColumns',
                component: FourColumns,
            },
        ],
    },

    {
        name: 'Card layouts',
        layouts: [
            {
                name: 'Accent left',
                icon: ImageAndTextIcon,
                type: 'layout',
                layoutType: 'accentLeft',
                component: AccentLeft,
            },
            {
                name: 'Accent right',
                icon: TextAndImageIcon,
                type: 'layout',
                layoutType: 'accentRight',
                component: AccentRight,
            },
        ],
    },

    {
        name: 'Images',
        layouts: [
            {
                name: '2 images columns',
                icon: TwoImageColumnsIcon,
                type: 'layout',
                layoutType: 'twoImageColumns',
                component: TwoImageColumns,
            },
            {
                name: '3 images columns',
                icon: ThreeImageColumnsIcon,
                type: 'layout',
                layoutType: 'threeImageColumns',
                component: ThreeImageColumns,
            },
            {
                name: '4 images columns',
                icon: FourImageColumnsIcon,
                type: 'layout',
                layoutType: 'fourImageColumns',
                component: FourImageColumns,
            },
        ],
    },
]

export const component: ComponentGroup[] = [
    {
        name: 'Text',
        components: [
            {
                name: 'Title',
                icon: 'T',
                type: 'component',
                component: Title,
                componentType: 'title',
            },
            {
                componentType: 'heading1',
                name: 'Heading 1',
                type: 'component',
                component: Heading1,
                icon: 'H1',
            },
            {
                componentType: 'heading2',
                name: 'Heading 2',
                type: 'component',
                component: Heading2,
                icon: 'H2',
            },
            {
                componentType: 'heading3',
                name: 'Heading 3',
                type: 'component',
                component: Heading3,
                icon: 'H3',
            },
            {
                componentType: 'heading4',
                name: 'Heading 4',
                type: 'component',
                component: Heading4,
                icon: 'H4',
            },

            {
                componentType: 'paragraph',
                name: 'Paragraph',
                type: 'component',
                component: Paragraph,
                icon: 'Paragraph',
            },
        ],
    },

    {
        name: 'Tables',
        components: [
            {
                componentType: 'table2x2',
                name: '2×2 table',
                type: 'component',
                component: { ...Table, initialColumns: 2, initialRows: 2 },
                icon: '⊞',
            },
            {
                componentType: 'table3x3',
                name: '3×3 table',
                type: 'component',
                component: { ...Table, initialColumns: 3, initialRows: 3 },
                icon: '⊞',
            },
            {
                componentType: 'table4x4',
                name: '4×4 table',
                type: 'component',
                component: { ...Table, initialColumns: 4, initialRows: 4 },
                icon: '⊞',
            },
        ],
    },

    {
        name: 'Lists',
        components: [
            {
                componentType: 'bulletList',
                name: 'Bulleted list',
                type: 'component',
                component: BulletListComponent,
                icon: '•',
            },
            {
                componentType: 'numberedList',
                name: 'Numbered list',
                type: 'component',
                component: NumberedListComponent,
                icon: '1.',
            },
            {
                componentType: 'todoList',
                name: 'Todo list',
                type: 'component',
                component: TodoListComponent,
                icon: '☐',
            },
        ],
    },
    {
        name: 'Callouts',
        components: [
            {
                componentType: 'note',
                name: 'Note box',
                type: 'component',
                component: { ...CalloutBoxComponent, callOutType: 'info' },
                icon: '📝',
            },
            {
                componentType: 'info',
                name: 'Info box',
                type: 'component',
                component: { ...CalloutBoxComponent, callOutType: 'info' },
                icon: 'ℹ',
            },
            {
                componentType: 'warning',
                name: 'Warning box',
                type: 'component',
                component: { ...CalloutBoxComponent, callOutType: 'warning' },
                icon: '⚠',
            },
            {
                componentType: 'caution',
                name: 'Caution box',
                type: 'component',
                component: { ...CalloutBoxComponent, callOutType: 'caution' },
                icon: '⚠',
            },
            {
                componentType: 'success',
                name: 'Success box',
                type: 'component',
                component: { ...CalloutBoxComponent, callOutType: 'success' },
                icon: '✓',
            },
            {
                componentType: 'question',
                name: 'Question box',
                type: 'component',
                component: { ...CalloutBoxComponent, callOutType: 'question' },
                icon: '?',
            },
        ],
    },

    {
        name: 'Columns',
        components: [
            {
                componentType: 'resizableColumns',
                name: '2x2 Column',
                type: 'component',
                component: ResizableColumn,
                icon: '⊞',
            },
        ],
    },
]
