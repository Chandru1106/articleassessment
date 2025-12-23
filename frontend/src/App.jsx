import React, { useState, useEffect } from 'react';
import './index.css';
import { api } from './services/api';
import { Header } from './components/Header';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await api.getArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch articles. Make sure Laravel server is running.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayArticles = () => {
    return articles.map(article => {
      if (viewMode === 'original') {
        return { ...article, displayContent: article.original_content, displayLabel: 'Original' };
      } else if (viewMode === 'enhanced') {
        return { ...article, displayContent: article.content, displayLabel: 'Enhanced' };
      }
      return { ...article, displayContent: article.content, displayLabel: article.is_updated ? 'Enhanced' : 'Original' };
    });
  };

  const displayArticles = getDisplayArticles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Articles Dashboard</h2>
              <p className="text-gray-500">
                Manage and view your scraped articles • Viewing <span className="font-medium text-blue-600">{viewMode === 'all' ? 'all versions' : `${viewMode} versions`}</span>
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 p-1.5 bg-gray-100 rounded-xl">
              <button
                onClick={() => setViewMode('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'all'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                All ({articles.length})
              </button>
              <button
                onClick={() => setViewMode('enhanced')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'enhanced'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                ✨ Enhanced
              </button>
              <button
                onClick={() => setViewMode('original')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'original'
                    ? 'bg-white text-amber-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                📄 Original
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              <p className="text-sm text-gray-500">Total Articles</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{articles.filter(a => a.is_updated).length}</p>
              <p className="text-sm text-gray-500">Enhanced</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <span className="text-xl">📄</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{articles.filter(a => !a.is_updated).length}</p>
              <p className="text-sm text-gray-500">Original Only</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-5 rounded-2xl mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Connection Error</p>
                <p className="text-sm mt-1 text-red-500">{error}</p>
                <button onClick={fetchArticles} className="mt-3 text-sm font-medium text-red-600 hover:underline">
                  Try again →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                viewMode={viewMode}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && displayArticles.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📭</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-500">Run the scraper to fetch articles from BeyondChats</p>
          </div>
        )}
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

export default App;
