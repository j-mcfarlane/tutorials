import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

// Providers
import { ToastProvider } from '@/lib/components/ui/toast'

export function UIProvider({ children }: PropsWithChildren) {
    return (
        <ToastProvider>
            {children}
            <Toaster />
        </ToastProvider>
    )
}
