export const Page = {
    CREATE: 'create',
    CREATIVE_AI: 'creative-ai',
    CREATE_SCRATCH: 'create-scratch',
} as const

export type Page = (typeof Page)[keyof typeof Page]
