import React from 'react';

export function ArticleCard({ article, viewMode, onClick }) {
    const contentToShow = viewMode === 'original'
        ? (article.original_content || article.content || '')
        : (article.content || '');
    const isShowingOriginal = viewMode === 'original';

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(article);
    };

    return (
        <div
            onClick={handleClick}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 cursor-pointer"
        >
            {/* Top accent bar */}
            <div className={`h-1 ${isShowingOriginal ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-emerald-400 to-teal-400'}`}></div>

            <div className="p-6">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${isShowingOriginal
                        ? 'bg-amber-50 text-amber-600 border border-amber-100'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                        {isShowingOriginal ? '📄 Original' : '✨ Enhanced'}
                    </span>

                    {article.references && article.references.length > 0 && !isShowingOriginal && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            {article.references.length} refs
                        </span>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                </h2>

                {/* Content preview */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">
                    {stripHtml(contentToShow).substring(0, 140)}...
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs text-gray-400 font-medium">
                        {article.created_at ? new Date(article.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        }) : 'N/A'}
                    </span>
                    <span className="text-sm font-medium text-blue-500 group-hover:text-blue-600 flex items-center gap-1">
                        Read article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}

function stripHtml(html) {
    if (!html) return '';
    try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    } catch (e) {
        return String(html);
    }
}

