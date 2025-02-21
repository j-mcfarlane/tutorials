import { PropsWithChildren } from 'react'

export default function PresentationLayout({ children }: PropsWithChildren) {
    return <div className="h-full w-full overflow-x-hidden">{children}</div>
}
