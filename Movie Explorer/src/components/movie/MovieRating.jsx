import React from 'react';
import { Star } from 'lucide-react';

export default function MovieRating({ rating, count, size = 'sm' }) {
  if (rating === undefined || rating === null) return null;

  const formattedRating = rating.toFixed(1);

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-medium',
    lg: 'text-base font-semibold',
  };

  return (
    <div className="flex items-center gap-1 text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-full w-fit">
      <Star className={`${iconSizes[size]} fill-gold-400`} />
      <span className={`${textSizes[size]} font-mono`}>{formattedRating}</span>
      {count ? <span className="text-slate-500 text-xs font-normal">({count})</span> : null}
    </div>
  );
}
