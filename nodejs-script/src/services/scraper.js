import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Scrape article content from a URL
 */
export async function scrapeArticle(url) {
    try {
        const response = await axios.get(url, {
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml',
            },
        });

        const $ = cheerio.load(response.data);

        // Remove unwanted elements
        $('script, style, nav, footer, header, aside, .sidebar, .comments, .advertisement').remove();

        // Try to find article content in various selectors
        const contentSelectors = [
            'article',
            '.post-content',
            '.article-content',
            '.entry-content',
            '.blog-content',
            '.content-body',
            'main',
            '.main-content',
        ];

        let content = '';
        for (const selector of contentSelectors) {
            const element = $(selector);
            if (element.length && element.text().trim().length > 200) {
                content = element.html();
                break;
            }
        }

        // Fallback to body if no specific content found
        if (!content) {
            content = $('body').html() || '';
        }

        // Extract title
        const title = $('h1').first().text().trim() ||
            $('title').text().trim() ||
            $('meta[property="og:title"]').attr('content') || '';

        // Clean up content
        const cleanContent = cleanHtml(content);

        return {
            title,
            content: cleanContent,
            url,
        };
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return null;
    }
}

/**
 * Clean HTML content
 */
function cleanHtml(html) {
    const $ = cheerio.load(html);

    // Remove empty elements
    $('*').each((_, el) => {
        const $el = $(el);
        if (!$el.text().trim() && !$el.find('img').length) {
            $el.remove();
        }
    });

    // Get text content with basic formatting
    let text = $('body').length ? $('body').text() : $.text();

    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();

    return text;
}
