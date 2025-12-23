import dotenv from 'dotenv';
dotenv.config();

export const config = {
    laravelApiUrl: process.env.LARAVEL_API_URL || 'http://127.0.0.1:8000/api',
    serpApiKey: process.env.SERPAPI_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    llmProvider: process.env.LLM_PROVIDER || 'gemini',
};
