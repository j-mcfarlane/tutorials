import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '../../ui/button'
import { containerVariants, itemVariants } from '@/lib/types/animation.type'
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react'
import { useStartScratchStore } from '@/lib/store/start-scratch-store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { useState } from 'react'
import { Input } from '../../ui/input'
import { CardList } from '../CardList'
import { v4 } from 'uuid'
import { OutlineCard } from '@/lib/types/outline-card.interface'
import { toast } from 'sonner'
import { createProject } from '@/lib/actions/projects/create-project.action'
import { useSlideStore } from '@/lib/store/slide-store'

export interface CreateFromScratchProps {
    onBack: () => void
}

export function CreateFromScratch({ onBack }: CreateFromScratchProps) {
    const router = useRouter()
    const { outlines, resetOutlines, addOutline, addMultipleOutlines } = useStartScratchStore()
    const { setProject } = useSlideStore()

    const [editText, setEditText] = useState<string>('')
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)

    const handleBack = () => {
        resetOutlines()
        onBack()
    }

    const resetCards = () => {}

    const handleAddCard = () => {
        const newCard: OutlineCard = {
            id: v4(),
            title: editText || 'New Section',
            order: outlines.length + 1,
        }

        setEditText('')
        addOutline(newCard)
    }

    const handleGenerate = async () => {
        if (outlines.length === 0) {
            toast.error('Error', {
                description: 'Please add at least on card to generate',
            })

            return
        }

        const res = await createProject(outlines?.[0]?.title, outlines)

        if (res.status !== 200) {
            toast.error('Error', {
                description: res.error || 'Failed to create project',
            })

            return
        }

        if (res.project) {
            setProject(res.project)
            resetOutlines()

            toast.success('Success', {
                description: 'Project created successfully',
            })

            router.push(`/presentation/${res.project?.id}/select-\theme`)
        }
    }

    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Button onClick={handleBack}>
                <ChevronLeft className="" />
                Back
            </Button>

            <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">Prompt</h1>

            <motion.div className="bg-primary/10 p-4 rounded-xl" variants={itemVariants}>
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Enter Prompt and add to the cards..."
                        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
                    />

                    <div className="flex items-center gap-3">
                        <Select value={outlines.length > 0 ? outlines.length.toString() : '0'}>
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                <SelectValue placeholder="Select number of cards" />
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                                {outlines.length === 0 ? (
                                    <SelectItem value="0" className="font-semibold">
                                        No Cards
                                    </SelectItem>
                                ) : (
                                    Array.from({ length: outlines.length }, (_, idx) => idx + 1).map((num) => (
                                        <SelectItem key={num} value={num.toString()} className="font-semibold">
                                            {num} {num === 1 ? 'Card' : 'Cards'}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>

                        <Button variant="destructive" onClick={resetCards} size="icon" aria-label="Reset Cards">
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>

            <CardList
                outlines={outlines}
                addOutline={addOutline}
                addMultipleOutlines={addMultipleOutlines}
                editingCard={editingCard}
                selectedCard={selectedCard}
                editText={editText}
                onEditChange={setEditText}
                onCardSelect={setSelectedCard}
                setEditText={setEditText}
                setEditingCard={setEditingCard}
                setSelectedCard={setSelectedCard}
                onCardDoubleClick={(id, title) => {
                    setEditingCard(id)
                    setEditText(title)
                }}
            />

            <Button className="w-full bg-primary-10" onClick={handleAddCard} variant="secondary">
                Add Card
            </Button>

            {outlines.length > 0 && (
                <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin mr-2" /> Generating ...
                        </>
                    ) : (
                        <>'Generate'</>
                    )}
                </Button>
            )}
        </motion.div>
    )
}
