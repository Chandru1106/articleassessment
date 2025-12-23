<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of all articles.
     */
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        return response()->json($articles);
    }

    /**
     * Get the latest article.
     */
    public function latest()
    {
        $article = Article::orderBy('created_at', 'desc')->first();
        
        if (!$article) {
            return response()->json(['message' => 'No articles found'], 404);
        }
        
        return response()->json($article);
    }

    /**
     * Store a newly created article.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'source_url' => 'required|string|max:500',
            'references' => 'nullable|array',
        ]);

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'content' => $validated['content'],
            'original_content' => $validated['content'],
            'source_url' => $validated['source_url'],
            'is_updated' => false,
            'references' => $validated['references'] ?? null,
        ]);

        return response()->json($article, 201);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        return response()->json($article);
    }

    /**
     * Update the specified article.
     */
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'is_updated' => 'sometimes|boolean',
            'references' => 'nullable|array',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $article->update($validated);

        return response()->json($article);
    }

    /**
     * Remove the specified article.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully']);
    }
}
