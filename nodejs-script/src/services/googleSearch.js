import axios from 'axios';
import { config } from '../config.js';

/**
 * Search Google for a query and return top results
 * Uses SerpAPI for reliable results
 */
export async function searchGoogle(query, numResults = 2) {
    if (!config.serpApiKey) {
        console.log('SerpAPI key not configured, using fallback search...');
        return fallbackSearch(query, numResults);
    }

    try {
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                q: query,
                api_key: config.serpApiKey,
                num: numResults + 5, // Get extra results to filter
                engine: 'google',
            },
        });

        const organicResults = response.data.organic_results || [];

        // Filter for blog/article URLs (exclude BeyondChats itself)
        const filteredResults = organicResults
            .filter(result => {
                const url = result.link.toLowerCase();
                return !url.includes('beyondchats.com') &&
                    (url.includes('blog') ||
                        url.includes('article') ||
                        url.includes('post') ||
                        url.includes('news'));
            })
            .slice(0, numResults);

        return filteredResults.map(r => ({
            title: r.title,
            url: r.link,
            snippet: r.snippet,
        }));
    } catch (error) {
        console.error('SerpAPI error:', error.message);
        return fallbackSearch(query, numResults);
    }
}

/**
 * Fallback search using DuckDuckGo HTML (no API key needed)
 */
async function fallbackSearch(query, numResults = 2) {
    try {
        const response = await axios.get('https://html.duckduckgo.com/html/', {
            params: { q: query },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });

        const html = response.data;
        const results = [];

        // Simple regex to extract result links
        const linkRegex = /href="\/\/duckduckgo\.com\/l\/\?uddg=([^&"]+)/g;
        let match;

        while ((match = linkRegex.exec(html)) !== null && results.length < numResults + 3) {
            const url = decodeURIComponent(match[1]);
            if (!url.includes('beyondchats.com')) {
                results.push({ url, title: '', snippet: '' });
            }
        }

        return results.slice(0, numResults);
    } catch (error) {
        console.error('Fallback search error:', error.message);
        return [];
    }
}
