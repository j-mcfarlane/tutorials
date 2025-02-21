'use server'

import { ExistingLayouts } from '@/lib/data/slide-layouts'
import { ContentItem } from '@/lib/types/content-item.interface'
import { Slide } from '@/lib/types/slide.interface'
import OpenAI from 'openai'

export async function generateLayoutsJson(outlineArray: string[]) {
    const findImageComponents = (layout: ContentItem): ContentItem[] => {
        const images = []

        if (layout.type === 'image') {
            images.push(layout)
        }

        if (Array.isArray(layout.content)) {
            layout.content.forEach((child) => {
                images.push(...findImageComponents(child as ContentItem))
            })
        } else if (layout.content && typeof layout.content === 'object') {
            images.push(...findImageComponents(layout.content))
        }

        return images
    }

    const generateImageUrl = async (prompt: string): Promise<string> => {
        try {
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            })

            const p = `
                Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting and texture.

                Description ${prompt}

                Important Notes:
                - The image must be in a photorealistic style and visually compelling 
                - Ensure all text, signs, or visible wriitng in the image are in English.
                - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
                - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
                - Focus on accurately depicting the concept described, including specific objects, environment, mood and context. Maintain relevance to the description provided.

                Example Use Cases: Business presentations, educational slides, professional designs.
            `

            const dalleResponse = await openai.images.generate({
                prompt: p,
                n: 1,
                size: '1024x1024',
            })

            return dalleResponse.data[0]?.url || 'https://via.placeholder.com/1024'
        } catch (err) {
            return 'https://via.placeholder.com/1024'
        }
    }

    const replaceImagePlaceholders = async (layout: Slide) => {
        const imageComponents = findImageComponents(layout.content)

        for (const component of imageComponents) {
            component.content = await generateImageUrl(component.alt || 'Placeholder Image')
        }
    }

    const prompt = `
        You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the exisiting layouts as examples for structure and design and generate unique designs based on the provided outline.

        ### Guidlines:
        1. Write layouts based on the specific outline provided.
        2. Use diverse and engaging designs, ensuring each layout is unique. 
        3. Adhere to the structure of existing layouts but add new styles or components if needed.
        4. Fill placeholder data into content fields where required.
        5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline
        6. Ensure proper formatting and schema alignment for the output JSON

        ### Example Layouts:
        ${JSON.stringify(ExistingLayouts, null, 2)}

        ### Outline Array:
        ${JSON.stringify(outlineArray)}

        For each entry in the outline array, generate:
        - A unique JSON layout with creative designs
        - Properly filled content, including placeholders for image components
        - Clear and well-structured JSON data.

        For images:
        - The alt text should describe the image clearly and concisely 
        - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects
        - Ensure the alt text aligns with the context of the presentation slide it will be used on (eg. professional, educational, business-related)
        - Avoid using terms like "image of" or "picture of" and instead focus directly on the content and meaning 
        
        Output the layouts in JSON format. Ensure there are no duplicate layouts across the array. Return exactly only valid JSON (no markdown formatting or extra text).
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
                    content: 'You generate JSON layouts for presentations.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 4000,
            temperature: 0.7,
        })

        const responseContent = completion?.choices?.[0]?.message?.content

        if (!responseContent) {
            return {
                status: 400,
                error: 'No content generated',
            }
        }

        let jsonResponse

        try {
            jsonResponse = JSON.parse(responseContent.replace(/```json|```/g, ''))

            await Promise.all(jsonResponse.map(replaceImagePlaceholders))
        } catch (err) {
            return {
                status: 400,
                error: 'Error',
            }
        }

        return {
            status: 200,
            data: jsonResponse,
        }
    } catch (err) {
        return {
            status: 400,
            error: 'Error',
        }
    }
}
