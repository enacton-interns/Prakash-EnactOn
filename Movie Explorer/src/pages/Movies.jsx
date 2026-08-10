import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useMovieGenres, useDiscoverMovies } from '../hooks/useMovies';
import { useSearchMovies } from '../hooks/useSearchMovies';
import MovieGrid from '../components/movie/MovieGrid';
import Pagination from '../components/common/Pagination';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const genreParam = searchParams.get('genre') || '';
  const yearParam = searchParams.get('year') || '';
  const sortParam = searchParams.get('sort') || 'popularity.desc';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(queryParam);

  const { data: genresData } = useMovieGenres();

  const isSearching = queryParam.trim().length > 0;

  const searchQuery = useSearchMovies(queryParam, pageParam);
  const discoverQuery = useDiscoverMovies({
    genre: genreParam,
    year: yearParam,
    sort: sortParam,
    page: pageParam,
  });

  const activeQuery = isSearching ? searchQuery : discoverQuery;
  const { data, isLoading, isError, error, refetch } = activeQuery;

  const updateParams = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val) {
        next.set(key, val);
      } else {
        next.delete(key);
      }
    });
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ q: searchInput.trim(), page: 1 });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateParams({ q: '', page: 1 });
  };

  const handleGenreChange = (e) => {
    updateParams({ genre: e.target.value, page: 1 });
  };

  const handleSortChange = (e) => {
    updateParams({ sort: e.target.value, page: 1 });
  };

  const handleYearChange = (e) => {
    updateParams({ year: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-heading font-extrabold text-white tracking-tight">
          Explore <span className="text-gold-gradient">Movies</span>
        </h1>
        <p className="text-sm text-cinema-muted">
          Search the full catalog or discover hidden gems by genre, year, and more.
        </p>
      </div>

      {/* Controls Container */}
      <div className="bg-cinema-panel/60 border border-cinema-border rounded-2xl p-4 sm:p-6 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-cinema-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search movies by title..."
            className="w-full pl-12 pr-28 py-3 bg-cinema-dark text-white placeholder-cinema-muted rounded-xl border border-cinema-border focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 focus:outline-none text-sm transition-all"
          />
          <div className="absolute right-2 flex items-center gap-2">
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-2.5 py-1 text-xs font-medium text-cinema-muted hover:text-white transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-1.5 bg-gold-500 hover:bg-gold-400 text-cinema-black font-bold rounded-lg text-xs transition-all duration-200 shadow-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-cinema-border/60">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-medium text-cinema-muted mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" /> Filters:
            </div>

            <select
              value={genreParam}
              onChange={handleGenreChange}
              disabled={isSearching}
              className="bg-cinema-dark border border-cinema-border text-slate-200 text-xs rounded-lg px-3 py-2 focus:border-gold-500/50 focus:outline-none disabled:opacity-30 cursor-pointer"
            >
              <option value="">All Genres</option>
              {genresData?.genres?.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <select
              value={yearParam}
              onChange={handleYearChange}
              disabled={isSearching}
              className="bg-cinema-dark border border-cinema-border text-slate-200 text-xs rounded-lg px-3 py-2 focus:border-gold-500/50 focus:outline-none disabled:opacity-30 cursor-pointer"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              value={sortParam}
              onChange={handleSortChange}
              disabled={isSearching}
              className="bg-cinema-dark border border-cinema-border text-slate-200 text-xs rounded-lg px-3 py-2 focus:border-gold-500/50 focus:outline-none disabled:opacity-30 cursor-pointer"
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="vote_average.desc">Highest Rated</option>
              <option value="primary_release_date.desc">Newest First</option>
              <option value="revenue.desc">Top Box Office</option>
            </select>
          </div>

          {(genreParam || yearParam || queryParam || sortParam !== 'popularity.desc') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-cinema-muted hover:text-gold-400 transition-colors py-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Search Banner */}
      {isSearching && (
        <div className="flex items-center justify-between bg-gold-500/8 border border-gold-500/20 px-4 py-2.5 rounded-xl text-xs text-gold-300">
          <span>
            Showing results for "<strong className="text-white">{queryParam}</strong>"
          </span>
          <button onClick={handleClearSearch} className="underline hover:text-white cursor-pointer">
            Back to Discover
          </button>
        </div>
      )}

      {isError && <ErrorMessage message={error?.message} onRetry={refetch} />}

      <MovieGrid
        movies={data?.results}
        isLoading={isLoading}
        emptyMessage={
          isSearching
            ? `No movies found for "${queryParam}". Try a different keyword.`
            : 'No movies match your filter criteria.'
        }
      />

      {!isLoading && data?.total_pages > 1 && (
        <Pagination
          page={pageParam}
          totalPages={data.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
