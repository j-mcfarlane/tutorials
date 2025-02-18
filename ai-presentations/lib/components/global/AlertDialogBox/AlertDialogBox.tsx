import { PropsWithChildren } from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../ui/alert-dialog'
import { Button } from '../../ui/button'
import { Loader2 } from 'lucide-react'

export interface AlertDialogBoxProps {
    className?: string
    description: string
    loading?: boolean
    open: boolean
    onClick?: () => void
    handleOpen: () => void
}

export function AlertDialogBox({
    children,
    className = '',
    description,
    loading = false,
    open,
    onClick,
    handleOpen,
}: PropsWithChildren<AlertDialogBoxProps>) {
    return (
        <AlertDialog open={open} onOpenChange={handleOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant={'destructive'} className={`${className}`} onClick={onClick}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" /> Loading...
                            </>
                        ) : (
                            'Continue'
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
