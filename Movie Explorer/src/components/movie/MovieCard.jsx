import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  getImageUrl,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from '../../services/tmdb/movies';
import MovieRating from './MovieRating';
import FavoriteButton from './FavoriteButton';

export default function MovieCard({ movie }) {
  const queryClient = useQueryClient();

  if (!movie) return null;

  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  // Prefetch movie details, credits, and videos into cache on hover
  const handleMouseEnter = () => {
    if (!movie?.id) return;

    const movieIdStr = String(movie.id);

    queryClient.prefetchQuery({
      queryKey: ['movie', movieIdStr],
      queryFn: () => getMovieDetails(movie.id),
      staleTime: 1000 * 60 * 5,
    });

    queryClient.prefetchQuery({
      queryKey: ['movie', movieIdStr, 'credits'],
      queryFn: () => getMovieCredits(movie.id),
      staleTime: 1000 * 60 * 5,
    });

    queryClient.prefetchQuery({
      queryKey: ['movie', movieIdStr, 'videos'],
      queryFn: () => getMovieVideos(movie.id),
      staleTime: 1000 * 60 * 5,
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="group relative bg-cinema-panel hover:bg-cinema-surface border border-cinema-border hover:border-gold-500/30 rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-gold-500/8 hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Poster Image Container */}
      <Link to={`/movies/${movie.id}`} className="relative aspect-[2/3] w-full overflow-hidden bg-cinema-dark block">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-cinema-muted p-4 text-center">
            <Film className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs">No Poster</span>
          </div>
        )}

        {/* Gold spotlight overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Floating Favorite Button */}
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton movie={movie} />
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-3.5 flex flex-col justify-between flex-grow gap-2">
        <Link to={`/movies/${movie.id}`} className="block group-hover:text-gold-400 transition-colors duration-200">
          <h3 className="font-semibold text-sm text-slate-100 line-clamp-1 leading-snug" title={movie.title}>
            {movie.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-xs font-mono text-cinema-muted">{releaseYear}</span>
          <MovieRating rating={movie.vote_average} size="sm" />
        </div>
      </div>
    </div>
  );
}
