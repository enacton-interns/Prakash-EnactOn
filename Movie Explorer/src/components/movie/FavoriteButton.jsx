import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../store/favorites';

export default function FavoriteButton({ movie, className = '' }) {
  const { isFav, toggleFav } = useFavorites();
  const active = isFav(movie?.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFav(movie);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-curtain/30 text-curtain-light border border-curtain/50 hover:bg-curtain/40 glow-gold'
          : 'bg-cinema-black/60 text-slate-400 border border-cinema-border hover:text-curtain-light hover:bg-cinema-black/80'
      } ${className}`}
    >
      <Heart className={`w-4 h-4 transition-transform duration-300 ${active ? 'fill-curtain-light scale-110' : ''}`} />
    </button>
  );
}
