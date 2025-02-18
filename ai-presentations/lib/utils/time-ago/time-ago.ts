export function timeAgo(timestamp: string) {
    const now = new Date()
    const diff = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 1000)

    const intervals = [
        { label: 'year', value: 60 * 60 * 24 * 365 },
        { label: 'month', value: 60 * 60 * 24 * 30 },
        { label: 'days', value: 60 * 60 * 24 },
        { label: 'mins', value: 60 * 60 },
        { label: 'sec', value: 1 },
    ]

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i]
        const count = Math.floor(diff / interval.value)

        if (count >= 1) {
            return `${count} ${interval.label} ago`
        }
    }

    return `just now`
}
