import { MarsStroke } from 'lucide-react'

export function NotFound() {
    return (
        <div className="flex flex-col min-h-[70vh] w-full justify-center items-center gap-12">
            <MarsStroke />

            <p className="text-3xl font-semibold text-primary">Nothing to see here</p>
            <p className="text-base font-normal text-secondary">
                So here is a random image generated by <span className="text-vivid">Creative AI</span>
            </p>
        </div>
    )
}
