import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ucarecdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placeimg.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
