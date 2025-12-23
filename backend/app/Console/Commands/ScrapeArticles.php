<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ScrapeArticles extends Command
{
    protected $signature = 'scrape:articles {--count=5 : Number of articles to scrape}';
    protected $description = 'Scrape the oldest articles from BeyondChats blog';

    public function handle()
    {
        $count = (int) $this->option('count');
        $this->info("Starting to scrape {$count} oldest articles from BeyondChats blog...");

        try {
            $blogUrl = 'https://beyondchats.com/blogs/';
            $this->info("Fetching blog listing from: {$blogUrl}");
            
            $response = Http::timeout(30)->get($blogUrl);
            
            if (!$response->successful()) {
                $this->error("Failed to fetch blog listing. Status: " . $response->status());
                return 1;
            }

            $html = $response->body();
            $articles = $this->parseArticleLinks($html);
            
            if (empty($articles)) {
                $this->error("No articles found on the blog page.");
                return 1;
            }

            $this->info("Found " . count($articles) . " article links.");

            // Get the oldest articles (last in the list)
            $oldestArticles = array_slice(array_reverse($articles), 0, $count);

            $this->info("Scraping {$count} oldest articles...");

            $bar = $this->output->createProgressBar(count($oldestArticles));
            $bar->start();

            $savedCount = 0;
            foreach ($oldestArticles as $articleUrl) {
                try {
                    $articleData = $this->scrapeArticle($articleUrl);
                    
                    if ($articleData) {
                        $exists = Article::where('source_url', $articleUrl)->exists();
                        
                        if (!$exists) {
                            Article::create([
                                'title' => $articleData['title'],
                                'slug' => Str::slug($articleData['title']),
                                'content' => $articleData['content'],
                                'original_content' => $articleData['content'],
                                'source_url' => $articleUrl,
                                'is_updated' => false,
                                'references' => null,
                            ]);
                            $savedCount++;
                        }
                    }
                } catch (\Exception $e) {
                    $this->warn(" Failed: " . $e->getMessage());
                }
                
                $bar->advance();
            }

            $bar->finish();
            $this->newLine();
            $this->info("Successfully scraped and saved {$savedCount} new articles!");
            
            return 0;

        } catch (\Exception $e) {
            $this->error("Error during scraping: " . $e->getMessage());
            return 1;
        }
    }

    private function parseArticleLinks(string $html): array
    {
        $articles = [];
        
        // Simple pattern to match /blogs/article-slug/ URLs
        if (preg_match_all('#href=["\']([^"\']+/blogs/[a-z0-9][a-z0-9\-]+/?)["\']#i', $html, $matches)) {
            foreach ($matches[1] as $url) {
                // Make URL absolute if needed
                if (strpos($url, 'http') !== 0) {
                    $url = 'https://beyondchats.com' . $url;
                }
                
                // Skip main listing page
                if (preg_match('#/blogs/?$#', $url)) {
                    continue;
                }
                
                // Normalize trailing slash
                $url = rtrim($url, '/') . '/';
                
                if (!in_array($url, $articles)) {
                    $articles[] = $url;
                }
            }
        }

        return $articles;
    }

    private function scrapeArticle(string $url): ?array
    {
        $response = Http::timeout(30)->get($url);
        
        if (!$response->successful()) {
            return null;
        }

        $html = $response->body();
        $title = $this->extractTitle($html);
        $content = $this->extractContent($html);

        if (empty($title) || empty($content)) {
            return null;
        }

        return [
            'title' => $title,
            'content' => $content,
        ];
    }

    private function extractTitle(string $html): ?string
    {
        // Try h1 first
        if (preg_match('/<h1[^>]*>([^<]+)<\/h1>/i', $html, $matches)) {
            return trim(html_entity_decode($matches[1]));
        }
        
        // Try og:title
        if (preg_match('/property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']/i', $html, $matches)) {
            return trim(html_entity_decode($matches[1]));
        }
        
        // Try title tag
        if (preg_match('/<title[^>]*>([^<]+)<\/title>/i', $html, $matches)) {
            $title = trim(html_entity_decode($matches[1]));
            $title = preg_replace('/\s*[\|–-]\s*BeyondChats.*$/i', '', $title);
            return $title;
        }

        return null;
    }

    private function extractContent(string $html): ?string
    {
        $patterns = [
            '/<article[^>]*>(.*?)<\/article>/is',
            '/<div[^>]*class=["\'][^"\']*blog-content[^"\']*["\'][^>]*>(.*?)<\/div>/is',
            '/<main[^>]*>(.*?)<\/main>/is',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $html, $matches)) {
                $content = $this->cleanContent($matches[1]);
                if (strlen($content) > 100) {
                    return $content;
                }
            }
        }

        return null;
    }

    private function cleanContent(string $html): string
    {
        // Remove script and style tags
        $html = preg_replace('/<script[^>]*>.*?<\/script>/is', '', $html);
        $html = preg_replace('/<style[^>]*>.*?<\/style>/is', '', $html);
        $html = preg_replace('/\s+/', ' ', $html);
        
        return trim($html);
    }
}
