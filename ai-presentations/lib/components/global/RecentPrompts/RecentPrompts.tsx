import { motion } from 'framer-motion'
import { Prompt, usePromptStore } from '@/lib/store/prompt-store/usePromptStore'
import { containerVariants, itemVariants } from '@/lib/types/animation.type'
import { Card } from '../../ui/card'
import { Button } from '../../ui/button'
import { useCreativeAIStore } from '@/lib/store/creative-ai-store'
import { timeAgo } from '@/lib/utils/time-ago/time-ago'

export function RecentPrompts() {
    const { prompts, setPage } = usePromptStore()
    const { addMultipleOutlines, setCurrentAiPrompt } = useCreativeAIStore()

    const handleEdit = (prompt: Prompt) => {
        setPage('creative-ai')

        addMultipleOutlines(prompt?.outlines)
        setCurrentAiPrompt(prompt?.title)
    }

    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            className="space-y-4 !mt-20"
        >
            <motion.h2
                variants={{
                    hidden: {
                        y: 20,
                        opacity: 0,
                    },
                    visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            type: 'spring',
                            stiffness: 100,
                        },
                    },
                }}
            >
                Your recent prompts
            </motion.h2>
            <motion.div variants={containerVariants} className="space-y-2 w-full lg:max-w-[80%] mx-auto">
                {prompts.map((prompt) => (
                    <motion.div key={prompt.id} variants={itemVariants}>
                        <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
                            <div className="max-w-[70%]">
                                <h3 className="font-semibold text-xl line-clamp-1">{prompt.title}</h3>

                                <p className="font-semibold text-sm text-muted-foreground">
                                    {timeAgo(prompt.createdAt)}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-vivid"></span>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary"
                                    onClick={() => handleEdit(prompt)}
                                >
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}
