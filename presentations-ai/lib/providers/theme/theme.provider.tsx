import { PropsWithChildren } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children, ...rest }: PropsWithChildren) {
    return (
        <NextThemeProvider attribute={'class'} defaultTheme="dark" enableSystem disableTransitionOnChange {...rest}>
            {children}
        </NextThemeProvider>
    )
}
