import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/tmdb/movies';

export function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query && query.trim().length > 0,
    keepPreviousData: true,
  });
}
