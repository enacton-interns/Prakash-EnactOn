import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Compass } from 'lucide-react';
import { useFavorites, saveFavoritesToStorage } from '../store/favorites';
import MovieGrid from '../components/movie/MovieGrid';

export default function Favorites() {
  const { favorites } = useFavorites();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      saveFavoritesToStorage([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-curtain/15 text-curtain-light rounded-xl border border-curtain/25">
            <Heart className="w-6 h-6 fill-curtain-light" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight">My Collection</h1>
            <p className="text-xs text-cinema-muted mt-0.5">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved to your personal watchlist
            </p>
          </div>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-curtain-light bg-curtain-dark/30 hover:bg-curtain-dark/50 border border-curtain/30 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {/* Curtain divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cinema-border-light to-transparent" />

      {/* Grid or Empty State */}
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} isLoading={false} />
      ) : (
        <div className="text-center py-20 px-4 bg-cinema-panel/40 border border-cinema-border rounded-2xl max-w-lg mx-auto space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-cinema-surface flex items-center justify-center text-cinema-muted border border-cinema-border">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-heading font-bold text-white">No Favorites Yet</h3>
            <p className="text-xs text-cinema-muted max-w-xs mx-auto leading-relaxed">
              Browse movies and tap the heart icon on any poster to save it to your personal collection.
            </p>
          </div>
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-cinema-black font-bold rounded-xl text-xs transition-all duration-200 shadow-md shadow-gold-500/20 cursor-pointer"
          >
            <Compass className="w-4 h-4" /> Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
}
