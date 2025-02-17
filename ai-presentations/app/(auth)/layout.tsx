import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
    return <div className="w-full min-h-screen flex justify-center items-center">{children}</div>
}
