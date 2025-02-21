import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '../../ui/button'
import { containerVariants, itemVariants } from '@/lib/types/animation.type'
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react'
import { Input } from '../../ui/input'
import { useCreativeAIStore } from '@/lib/store/creative-ai-store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { useEffect, useState } from 'react'
import { CardList } from '../CardList'
import { usePromptStore } from '@/lib/store/prompt-store/usePromptStore'
import { RecentPrompts } from '../RecentPrompts'
import { toast } from 'sonner'
import { generateCreativePrompt } from '@/lib/actions/prompt/generate-creative-prompt.action'
import { OutlineCard } from '@/lib/types/outline-card.interface'
import { v4 } from 'uuid'
import { createProject } from '@/lib/actions/projects/create-project.action'
import { useSlideStore } from '@/lib/store/slide-store'

export interface GenerateAIProps {
    onBack: () => void
}

export function GenerateAI({ onBack }: GenerateAIProps) {
    const router = useRouter()
    const { currentAiPrompt, setCurrentAiPrompt, outlines, resetOutlines, addOutline, addMultipleOutlines } =
        useCreativeAIStore()
    const { prompts, addPrompt } = usePromptStore()
    const { setProject } = useSlideStore()

    const [numberOfCards, setNumberOfCards] = useState<number>(0)
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [editText, setEditText] = useState<string>('')

    const resetCards = () => {
        setEditingCard(null)
        setSelectedCard(null)
        setEditText('')
        setCurrentAiPrompt('')
        resetOutlines()
    }

    const generateOutline = async () => {
        if (currentAiPrompt === null) {
            toast('Error', {
                description: 'Please enter a prompt',
            })

            return
        }

        setIsGenerating(true)

        const res = await generateCreativePrompt(currentAiPrompt)

        if (res.status === 200 && res?.data?.outlines) {
            const cards: OutlineCard[] = []

            res.data.outlines.map((outline: string, idx: number) => {
                const newCard = {
                    id: v4(),
                    title: outline,
                    order: idx + 1,
                }

                cards.push(newCard)
            })

            addMultipleOutlines(cards)
            setNumberOfCards(cards.length)
            toast.success('Success', {
                description: 'Outlines generated',
            })
        } else {
            toast.error('Error', {
                description: 'Outlines failed',
            })
        }

        setIsGenerating(false)
    }

    const handleGenerate = async () => {
        setIsGenerating(true)

        if (outlines.length === 0) {
            toast.error('error', {
                description: 'something is wrong',
            })
        }

        try {
            const res = await createProject(currentAiPrompt, outlines.slice(0, numberOfCards))

            console.log(res.project)

            if (res.status !== 200 || !res.project) {
                throw new Error('unable to create project')
            }

            router.push(`/presentation/${res.project.id}/configure`)
            setProject(res.project)

            addPrompt({
                id: v4(),
                title: currentAiPrompt || outlines?.[0]?.title,
                outlines,
                createdAt: new Date().toISOString(),
            })

            toast.success('Success', {
                description: 'Project created sucessfully!',
            })

            setCurrentAiPrompt('')
            resetOutlines()
        } catch (err) {
            console.log(err)
            toast.error('Error', {
                description: 'Failed to create project',
            })
        } finally {
            setIsGenerating(false)
        }
    }

    useEffect(() => {
        setNumberOfCards(outlines.length)
    }, [outlines.length])

    return (
        <motion.div variants={containerVariants} className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button onClick={onBack} variant="outline" className="mb-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <motion.div variants={itemVariants} className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-primary">
                    Generate with <span className="text-vivid">Create AI</span>
                </h1>

                <p className="text-secondary">What would you like to create today?</p>
            </motion.div>

            <motion.div className="bg-primary/10 p-4 rounded-xl" variants={itemVariants}>
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                        placeholder="Enter prompt and add to the cards..."
                        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
                        required
                        value={currentAiPrompt}
                        onChange={(e) => setCurrentAiPrompt(e.target.value)}
                    />

                    <div className="flex items-center gap-3">
                        <Select
                            value={numberOfCards.toString()}
                            onValueChange={(value) => setNumberOfCards(parseInt(value))}
                        >
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                <SelectValue placeholder="Select number of cards" />
                            </SelectTrigger>

                            <SelectContent className="w-fit">
                                {outlines.length === 0 ? (
                                    <SelectItem value="0" className="font-semibold">
                                        No cards
                                    </SelectItem>
                                ) : (
                                    Array.from({ length: outlines.length }, (_, idx) => idx + 1).map((num) => (
                                        <SelectItem key={num} value={num.toString()} className="font-semibold">
                                            {num} {num === 1 ? 'Card' : 'Cards'}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>

                            <Button variant="destructive" onClick={resetCards}>
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </Select>
                    </div>
                </div>
            </motion.div>

            <div className="w-full flex justify-center items-center">
                <Button
                    className="font-medium text-lg flex gap-2 items-center"
                    onClick={generateOutline}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin mr-2" /> Generating ...
                        </>
                    ) : (
                        'Generate outline'
                    )}
                </Button>
            </div>

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

            {prompts?.length > 0 && <RecentPrompts />}
        </motion.div>
    )
}
