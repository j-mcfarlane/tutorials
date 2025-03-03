import Link from 'next/link'
import { SquareDashedMousePointer } from 'lucide-react'

// Utils
import { cn } from '@/lib/utils'

export interface LogoProps {
    font?: string
    icon?: number
}

export default function Logo({ font = '2xl', icon = 20 }: LogoProps) {
    return (
        <Link href="/" className={cn(`text-2xl font-extrabold flex items-center gap-2`, font)}>
            <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
                <SquareDashedMousePointer size={icon} className="stroke-white" />
            </div>
            <div>
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                    Flow
                </span>
                <span className="text-stone-700 dark:text-stone-500">Scrape</span>
            </div>
        </Link>
    )
}
