'use client'

import { Button } from '@/lib/components/ui/button'
import { useSlideStore } from '@/lib/store/slide-store'
import { HomeIcon, Play, ShareIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export interface NavBarProps {
    id: string
}

export function Navbar({ id }: NavBarProps) {
    const { currentTheme } = useSlideStore()

    const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/share/${id}`)
        toast.success(`Link copied`)
    }

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
            style={{
                backgroundColor: currentTheme.navbarColor || currentTheme.backgroundColor,
                color: currentTheme.accentColor,
            }}
        >
            <Link href="/dashboard" passHref>
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    style={{ backgroundColor: currentTheme.backgroundColor }}
                >
                    <HomeIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Return Home</span>
                </Button>
            </Link>

            <Link href="/presentation/template-market" className="text-lg font-semibold hidden sm:block">
                Presentation Editor
            </Link>

            <div className="flex items-center gap-4">
                <Button
                    style={{ backgroundColor: currentTheme.backgroundColor }}
                    variant="outline"
                    onClick={handleCopy}
                >
                    <ShareIcon className="w-4 h-4" />
                </Button>

                <Button
                    variant={'default'}
                    className="flex items-center gap-2"
                    onClick={() => setIsPresentationMode(true)}
                >
                    <Play className="w-4 h-4" />
                    <span className="hidden sm:inline">Present</span>
                </Button>
            </div>

            {/* {isPresentationMode && <PresentationMode />} */}
        </nav>
    )
}
