import { PropsWithChildren } from 'react'
import { ThemeProvider } from './Theme'

export function Providers({ children }: PropsWithChildren) {
    return <ThemeProvider>{children}</ThemeProvider>
}
