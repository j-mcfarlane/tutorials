'use client'

import { usePathname } from 'next/navigation'

// Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Fragment } from 'react'

export function BreadcrumbHeader() {
    const pathname = usePathname()
    const paths = pathname === '/' ? [''] : pathname?.split('/')

    return (
        <div className="flex items-center flex-start">
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, idx) => (
                        <Fragment key={idx}>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                                    {path === '' ? 'Home' : path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
