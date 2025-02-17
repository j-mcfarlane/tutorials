import { PropsWithChildren } from 'react'

// Providers
import { ToastProvider } from '@/lib/components/ui/toast'

export function UIProvider({ children }: PropsWithChildren) {
    return <ToastProvider>{children}</ToastProvider>
}
