'use server'

import OpenAI from 'openai'

export async function generateCreativePrompt(prompt: string) {
    const finalPrompt = `
        Create a coherent and relevant outline for the following prompt: "${prompt}".

        The outline should consist of at least 6 points, each written as a single sentence directly related to the topic.

        Return exactly only valid JSON (no markdown formatting or extra text) in the following format:
        {
            "outlines": [
                "Point 1",
                "Point 2",
                "Point 3",
                "Point 4",
                "Point 5",
                "Point 6"
            ]
        }
    `

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        })

        const completion = await openai.chat.completions.create({
            model: 'chatgpt-4o-latest',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful AI That generates outlines for presentations.',
                },
                {
                    role: 'user',
                    content: finalPrompt,
                },
            ],
            max_tokens: 1000,
            temperature: 0.0,
        })

        const responseContent = completion.choices[0].message?.content

        if (responseContent) {
            try {
                const data = JSON.parse(responseContent.replace(/```json|```/g, ''))

                return {
                    status: 200,
                    data,
                }
            } catch (err) {
                return {
                    status: 500,
                    error: err,
                }
            }
        }

        return {
            status: 400,
            error: 'No content generated',
        }
    } catch (err) {
        return {
            status: 500,
            error: 'Internal server error',
        }
    }
}
