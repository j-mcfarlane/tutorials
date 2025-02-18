'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '../../ui/switch'

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState<boolean>(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div>
            <Switch
                checked={theme === 'light'}
                className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80"
                onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
            />
        </div>
    )
}
