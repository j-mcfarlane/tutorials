import { BookTemplate, Home, Settings, Trash } from 'lucide-react'

export const data = {
    user: {
        name: 'Jason',
        email: 'email@email.com',
        avatar: '/jason/jason.png',
    },
    navMain: [
        {
            title: 'Home',
            url: '/dashboard',
            icon: Home,
        },
        {
            title: 'Templates',
            url: '/templates',
            icon: BookTemplate,
        },
        {
            title: 'Trash',
            url: '/trash',
            icon: Trash,
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
        },
    ],
}
