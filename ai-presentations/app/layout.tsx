import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

// Providers
import { Providers } from '@/lib/providers'
import { ClerkProvider } from '@clerk/nextjs'

// Styling
import { dark } from '@clerk/themes'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'AI Presentation Generator',
    description: 'Build AI presentations',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en" suppressHydrationWarning>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>
    )
}
