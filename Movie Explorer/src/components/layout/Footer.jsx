import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-cinema-black border-t border-cinema-border py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative curtain line */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-curtain/40 to-transparent" />
          <span className="text-gold-500/50 text-xs font-heading tracking-widest uppercase">🎬</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-curtain/40 to-transparent" />
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-slate-400 font-heading italic">
            "Every great film begins with a single frame."
          </p>
          <p className="text-xs text-slate-600">
            Movie Explorer — Powered by TMDB API &middot; Built with React & TanStack Query
          </p>
        </div>
      </div>
    </footer>
  );
}
