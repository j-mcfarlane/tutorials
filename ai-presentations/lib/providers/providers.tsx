import { PropsWithChildren } from 'react'

// Provider
import { ThemeProvider } from './theme'
import { UIProvider } from './ui'

export function Providers({ children }: PropsWithChildren) {
    return (
        <ThemeProvider>
            <UIProvider>{children}</UIProvider>
        </ThemeProvider>
    )
}
