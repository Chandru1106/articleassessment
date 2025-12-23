import { config } from './config.js';
import { getLatestArticle, updateArticle, getArticles } from './services/laravelApi.js';
import { searchGoogle } from './services/googleSearch.js';
import { scrapeArticle } from './services/scraper.js';
import { enhanceArticle } from './services/llmEnhancer.js';

// Delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processArticle(article) {
    console.log(`\nProcessing: "${article.title}"`);
    console.log('-'.repeat(50));

    try {
        // Skip if already updated
        if (article.is_updated) {
            console.log('  ⚠ Already enhanced. Skipping...');
            return false;
        }

        // Step 1: Search Google
        console.log('  Searching Google...');
        const searchResults = await searchGoogle(article.title, 2);

        if (searchResults.length === 0) {
            console.log('  ⚠ No search results found. Skipping...');
            return false;
        }
        console.log(`  ✓ Found ${searchResults.length} references`);

        // Step 2: Scrape references
        console.log('  Scraping references...');
        const referenceArticles = [];
        for (const result of searchResults) {
            const scraped = await scrapeArticle(result.url);
            if (scraped && scraped.content) {
                referenceArticles.push(scraped);
            }
        }

        if (referenceArticles.length === 0) {
            console.log('  ⚠ No references scraped. Skipping...');
            return false;
        }
        console.log(`  ✓ Scraped ${referenceArticles.length} references`);

        // Step 3: Enhance with LLM
        console.log('  Enhancing with Gemini...');
        const enhancedContent = await enhanceArticle(article, referenceArticles);
        console.log(`  ✓ Generated ${enhancedContent.length} characters`);

        // Step 4: Update article
        console.log('  Updating database...');
        const references = referenceArticles.map(r => r.url);
        await updateArticle(article.id, {
            content: enhancedContent,
            is_updated: true,
            references: references,
        });
        console.log('  ✓ Article enhanced successfully!');

        return true;

    } catch (error) {
        console.error(`  ✗ Error: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('='.repeat(60));
    console.log('BeyondChats - Batch Article Enhancement');
    console.log('='.repeat(60));

    try {
        // Get all articles
        const articles = await getArticles();
        const unenhanced = articles.filter(a => !a.is_updated);

        console.log(`\nFound ${articles.length} total articles`);
        console.log(`${unenhanced.length} need enhancement\n`);

        if (unenhanced.length === 0) {
            console.log('All articles are already enhanced!');
            return;
        }

        let successCount = 0;

        for (let i = 0; i < unenhanced.length; i++) {
            const article = unenhanced[i];

            console.log(`\n[${i + 1}/${unenhanced.length}] Processing article ID: ${article.id}`);

            const success = await processArticle(article);
            if (success) successCount++;

            // Wait 60 seconds between articles to avoid rate limits
            if (i < unenhanced.length - 1) {
                console.log('\n⏳ Waiting 60 seconds for rate limit...');
                await delay(60000);
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('COMPLETE');
        console.log('='.repeat(60));
        console.log(`Successfully enhanced: ${successCount}/${unenhanced.length} articles`);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
