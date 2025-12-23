import axios from 'axios';
import { config } from '../config.js';

/**
 * Enhance article content using LLM
 */
export async function enhanceArticle(originalArticle, referenceArticles) {
    const provider = config.llmProvider.toLowerCase();

    if (provider === 'openai') {
        return enhanceWithOpenAI(originalArticle, referenceArticles);
    } else {
        return enhanceWithGemini(originalArticle, referenceArticles);
    }
}

/**
 * Enhance article using OpenAI GPT
 */
async function enhanceWithOpenAI(originalArticle, referenceArticles) {
    if (!config.openaiApiKey) {
        throw new Error('OpenAI API key not configured');
    }

    const prompt = buildPrompt(originalArticle, referenceArticles);

    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert content writer. Your task is to improve article content by taking inspiration from top-ranking articles while maintaining originality and the core message.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 4000,
            temperature: 0.7,
        },
        {
            headers: {
                'Authorization': `Bearer ${config.openaiApiKey}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data.choices[0].message.content;
}

/**
 * Enhance article using Google Gemini
 */
async function enhanceWithGemini(originalArticle, referenceArticles) {
    if (!config.geminiApiKey) {
        throw new Error('Gemini API key not configured');
    }

    const prompt = buildPrompt(originalArticle, referenceArticles);

    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.geminiApiKey}`,
        {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
            generationConfig: {
                maxOutputTokens: 4000,
                temperature: 0.7,
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data.candidates[0].content.parts[0].text;
}

/**
 * Build the prompt for LLM
 */
function buildPrompt(originalArticle, referenceArticles) {
    let refContent = referenceArticles
        .map((ref, i) => `Reference Article ${i + 1} (${ref.url}):\n${ref.content.substring(0, 2000)}`)
        .join('\n\n---\n\n');

    return `You are an expert content writer. Your task is to improve the following article by taking inspiration from the reference articles that are ranking well on Google.

ORIGINAL ARTICLE:
Title: ${originalArticle.title}
Content: ${originalArticle.content.substring(0, 3000)}

---

REFERENCE ARTICLES:
${refContent}

---

INSTRUCTIONS:
1. Improve the original article's formatting, structure, and content quality
2. Take inspiration from the reference articles' style and structure
3. Maintain the original article's core message and topic
4. Make it more engaging and comprehensive
5. Keep it around the same length as the original or slightly longer
6. Use proper HTML formatting (headings, paragraphs, bullet points)
7. DO NOT copy content directly from reference articles

Please provide the improved article content in HTML format:`;
}
