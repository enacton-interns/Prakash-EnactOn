import { fetchFromTMDB } from './api';

// Trending Movies
export async function getTrendingMovies(timeWindow = 'day') {
  return fetchFromTMDB(`/trending/movie/${timeWindow}`);
}

// Popular Movies
export async function getPopularMovies(page = 1) {
  return fetchFromTMDB('/movie/popular', { page });
}

// Top Rated Movies
export async function getTopRatedMovies(page = 1) {
  return fetchFromTMDB('/movie/top_rated', { page });
}

// Upcoming Movies
export async function getUpcomingMovies(page = 1) {
  return fetchFromTMDB('/movie/upcoming', { page });
}

// Movie Details
export async function getMovieDetails(movieId) {
  if (!movieId) throw new Error('Movie ID is required');
  return fetchFromTMDB(`/movie/${movieId}`);
}

// Movie Credits (Cast & Crew)
export async function getMovieCredits(movieId) {
  if (!movieId) throw new Error('Movie ID is required');
  return fetchFromTMDB(`/movie/${movieId}/credits`);
}

// Movie Videos (Trailers/Teasers)
export async function getMovieVideos(movieId) {
  if (!movieId) throw new Error('Movie ID is required');
  return fetchFromTMDB(`/movie/${movieId}/videos`);
}

// Search Movies
export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) {
    return { results: [], total_pages: 0, total_results: 0, page: 1 };
  }
  return fetchFromTMDB('/search/movie', { query: query.trim(), page });
}

// Movie Genres List
export async function getMovieGenres() {
  return fetchFromTMDB('/genre/movie/list');
}

// Discover Movies with Filters & Sorting
export async function discoverMovies({ genre = '', year = '', sort = 'popularity.desc', page = 1 } = {}) {
  const params = { page, sort_by: sort };
  if (genre) params.with_genres = genre;
  if (year) params.primary_release_year = year;
  return fetchFromTMDB('/discover/movie', params);
}

// Image helper configuration for poster & backdrop URLs
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export function getImageUrl(path, size = 'w500') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}
