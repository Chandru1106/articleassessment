import React from 'react';

export function Header() {
    return (
        <header className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-2xl font-bold text-white">B</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                BeyondChats
                            </h1>
                            <p className="text-sm text-gray-400 font-medium">Article Management System</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-emerald-700 font-medium">Live</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
