import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  const isApiKeyError = message?.includes('API Key');

  return (
    <div className="bg-curtain-dark/20 border border-curtain/30 rounded-xl p-6 text-center max-w-xl mx-auto my-6">
      <div className="inline-flex p-3 rounded-full bg-curtain/20 text-curtain-light mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-curtain-light mb-1">
        {isApiKeyError ? 'API Key Required' : 'Failed to load data'}
      </h3>
      <p className="text-sm text-red-300/80 mb-4">{message || 'An unexpected error occurred.'}</p>
      {isApiKeyError ? (
        <div className="bg-cinema-dark p-3 rounded-lg border border-cinema-border text-left text-xs font-mono text-slate-300">
          <p className="text-slate-400 font-body mb-1">How to fix:</p>
          <p>1. Open your <code className="text-gold-400">.env</code> file in the project root.</p>
          <p>2. Add: <code className="text-gold-400">VITE_TMDB_API_KEY=your_actual_tmdb_api_key</code></p>
          <p>3. Restart the dev server.</p>
        </div>
      ) : onRetry ? (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-curtain/20 hover:bg-curtain/30 text-curtain-light border border-curtain/40 rounded-lg text-sm transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      ) : null}
    </div>
  );
}
