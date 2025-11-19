import { google } from '@ai-sdk/google';
import { generateText, embed } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text || text.length < 10) {
            return NextResponse.json(
                { error: 'Text is required and must be at least 10 characters' },
                { status: 400 }
            );
        }

        // Step 1: Analyze text structure using AI
        const analysisPrompt = `Analyze the following text and determine its structure:
Text: "${text}"

Respond with ONLY ONE of these categories:
- comparison (comparing two or more things)
- process (steps or workflow)
- hierarchy (levels or structure)
- cycle (circular process)
- relationship (connections between entities)
- timeline (events over time)

Category:`;

        const { text: category } = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: analysisPrompt,
        });

        const cleanCategory = category.trim().toLowerCase();

        // Step 2: Generate embedding for vector search
        const { embedding } = await embed({
            model: google.textEmbeddingModel('text-embedding-004'),
            value: text,
        });

        // Step 3: Search for similar templates (mock for now)
        // TODO: Implement actual vector search with Convex

        // Step 4: Generate SVG based on category
        const svgPrompt = `Create a simple, clean SVG diagram for the following text.
Category: ${cleanCategory}
Text: "${text}"

Requirements:
- Use a modern, minimal design
- Include the text content in the diagram
- Use pleasant colors (blues, purples, greens)
- Make it 400x300 pixels
- Return ONLY the SVG code, no explanation

SVG:`;

        const { text: svgCode } = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: svgPrompt,
        });

        // Extract SVG from response
        const svgMatch = svgCode.match(/<svg[\s\S]*<\/svg>/i);
        const finalSvg = svgMatch ? svgMatch[0] : svgCode;

        return NextResponse.json({
            suggestions: [
                {
                    id: '1',
                    svg: finalSvg,
                    title: cleanCategory.charAt(0).toUpperCase() + cleanCategory.slice(1),
                    category: cleanCategory,
                },
            ],
            embedding: embedding.slice(0, 10), // Return first 10 dims for debugging
        });
    } catch (error) {
        console.error('Error generating SVG:', error);
        return NextResponse.json(
            { error: 'Failed to generate SVG' },
            { status: 500 }
        );
    }
}
