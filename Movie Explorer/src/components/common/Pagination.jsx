import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  // Cap totalPages to 500 as per TMDB limit
  const maxPages = Math.min(totalPages, 500);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(maxPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-cinema-border">
      <p className="text-xs text-cinema-muted font-mono">
        Page <span className="text-slate-100 font-bold">{page}</span> of{' '}
        <span className="text-slate-100 font-bold">{maxPages}</span>
      </p>

      <div className="flex items-center gap-1.5">
        {/* Previous Page */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-lg bg-cinema-panel hover:bg-cinema-surface disabled:opacity-30 disabled:hover:bg-cinema-panel text-slate-300 transition-colors border border-cinema-border cursor-pointer disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-xs font-semibold font-mono transition-all duration-200 cursor-pointer ${
              p === page
                ? 'bg-gold-500 text-cinema-black shadow-md shadow-gold-500/25'
                : 'bg-cinema-panel hover:bg-cinema-surface text-slate-300 border border-cinema-border hover:border-gold-500/30'
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= maxPages}
          className="p-2 rounded-lg bg-cinema-panel hover:bg-cinema-surface disabled:opacity-30 disabled:hover:bg-cinema-panel text-slate-300 transition-colors border border-cinema-border cursor-pointer disabled:cursor-not-allowed"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
