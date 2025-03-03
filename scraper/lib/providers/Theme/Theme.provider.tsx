import { PropsWithChildren } from 'react'
import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...rest }: PropsWithChildren<ThemeProviderProps>) {
    return (
        <NextThemeProvider attribute="class" defaultTheme="light" enableSystem {...rest}>
            {children}
        </NextThemeProvider>
    )
}
