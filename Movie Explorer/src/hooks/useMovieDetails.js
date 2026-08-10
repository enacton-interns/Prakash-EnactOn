import { useQuery } from '@tanstack/react-query';
import { getMovieDetails, getMovieCredits, getMovieVideos } from '../services/tmdb/movies';

// Hook for Movie Details
export function useMovieDetails(movieId) {
  return useQuery({
    queryKey: ['movie', String(movieId)],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });
}

// Hook for Movie Credits (Cast & Crew)
export function useMovieCredits(movieId) {
  return useQuery({
    queryKey: ['movie', String(movieId), 'credits'],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
  });
}

// Hook for Movie Videos (Trailers & Clips)
export function useMovieVideos(movieId) {
  return useQuery({
    queryKey: ['movie', String(movieId), 'videos'],
    queryFn: () => getMovieVideos(movieId),
    enabled: !!movieId,
  });
}
