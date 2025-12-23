import React, { useState } from 'react';

export function ArticleDetail({ article, onClose }) {
    const [showOriginal, setShowOriginal] = useState(false);

    if (!article) return null;

    // Safe content access
    const currentContent = showOriginal
        ? (article.original_content || article.content || 'No content available')
        : (article.content || 'No content available');

    // Parse references safely - might be string or array
    let references = [];
    try {
        if (article.references) {
            if (typeof article.references === 'string') {
                references = JSON.parse(article.references);
            } else if (Array.isArray(article.references)) {
                references = article.references;
            }
        }
    } catch (e) {
        console.error('Failed to parse references:', e);
        references = [];
    }

    // Safe date formatting
    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'N/A';
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return 'N/A';
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-8">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                            <h2 className="text-2xl font-bold mb-3 leading-tight">{article.title || 'Untitled'}</h2>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(article.created_at)}
                                </span>
                                {article.is_updated && (
                                    <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-medium">
                                        ✨ AI Enhanced
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Toggle for Original/Updated */}
                {article.is_updated && (
                    <div className="px-8 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-4">
                        <span className="text-sm text-gray-500 font-medium">View:</span>
                        <div className="flex gap-1 p-1 bg-gray-200/50 rounded-xl">
                            <button
                                onClick={() => setShowOriginal(false)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${!showOriginal
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                ✨ Enhanced
                            </button>
                            <button
                                onClick={() => setShowOriginal(true)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${showOriginal
                                    ? 'bg-white text-amber-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                📄 Original
                            </button>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div
                        className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-500"
                        dangerouslySetInnerHTML={{ __html: currentContent }}
                    />
                </div>

                {/* References Footer */}
                {references.length > 0 && !showOriginal && (
                    <div className="border-t bg-emerald-50/50 p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            References Used
                        </h4>
                        <ul className="space-y-2">
                            {references.map((ref, index) => (
                                <li key={index}>
                                    <a
                                        href={ref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block"
                                    >
                                        {ref}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Source Link */}
                <div className="border-t p-5 bg-gray-50 flex items-center justify-between">
                    {article.source_url && (
                        <a
                            href={article.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View on BeyondChats
                        </a>
                    )}
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
