import { useQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieGenres,
  discoverMovies,
} from '../services/tmdb/movies';

// Custom Hook for Trending Movies
export function useTrendingMovies(timeWindow = 'day') {
  return useQuery({
    queryKey: ['movies', 'trending', timeWindow],
    queryFn: () => getTrendingMovies(timeWindow),
  });
}

// Custom Hook for Popular Movies
export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopularMovies(page),
    keepPreviousData: true,
  });
}

// Custom Hook for Top Rated Movies
export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => getTopRatedMovies(page),
    keepPreviousData: true,
  });
}

// Custom Hook for Upcoming Movies
export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => getUpcomingMovies(page),
    keepPreviousData: true,
  });
}

// Custom Hook for Genres List
export function useMovieGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getMovieGenres,
    staleTime: 1000 * 60 * 60 * 24, // Genres change rarely, 24 hour stale time
  });
}

// Custom Hook for Discovering Movies with Filters
export function useDiscoverMovies({ genre, year, sort, page = 1 }) {
  return useQuery({
    queryKey: ['movies', 'discover', { genre, year, sort, page }],
    queryFn: () => discoverMovies({ genre, year, sort, page }),
  });
}
