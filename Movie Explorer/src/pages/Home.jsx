import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, TrendingUp, Star, Calendar, ArrowRight, Info } from 'lucide-react';
import {
  useTrendingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
} from '../hooks/useMovies';
import MovieGrid from '../components/movie/MovieGrid';
import ErrorMessage from '../components/common/ErrorMessage';
import { getImageUrl } from '../services/tmdb/movies';
import FavoriteButton from '../components/movie/FavoriteButton';

export default function Home() {
  const [trendingTab, setTrendingTab] = useState('day');

  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
    error: trendingError,
    refetch: refetchTrending,
  } = useTrendingMovies(trendingTab);

  const {
    data: popularData,
    isLoading: isPopularLoading,
  } = usePopularMovies(1);

  const {
    data: topRatedData,
    isLoading: isTopRatedLoading,
  } = useTopRatedMovies(1);

  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
  } = useUpcomingMovies(1);

  const heroMovie = trendingData?.results?.[0];
  const backdropUrl = heroMovie ? getImageUrl(heroMovie.backdrop_path, 'original') : null;

  return (
    <div className="min-h-screen pb-16 space-y-16">

      {/* ===== HERO: Cinema Marquee ===== */}
      {heroMovie && (
        <section className="relative w-full h-[75vh] min-h-[500px] max-h-[700px] overflow-hidden bg-cinema-black flex items-end">
          {/* Backdrop Image */}
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={heroMovie.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}

          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/70 to-cinema-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/30 to-transparent" />

          {/* Curtain side accents */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-curtain/40 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-curtain/40 to-transparent" />

          {/* Spotlight glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[100px]" style={{ animation: 'spotlight-pulse 4s ease-in-out infinite' }} />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
            <div className="max-w-2xl space-y-5">
              {/* Now Showing Badge */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold rounded-full flex items-center gap-1.5 uppercase tracking-wide">
                  <Flame className="w-3.5 h-3.5 fill-gold-400" /> Now Showing
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {heroMovie.release_date ? new Date(heroMovie.release_date).getFullYear() : ''}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
                {heroMovie.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300/90 line-clamp-3 leading-relaxed font-light">
                {heroMovie.overview}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  to={`/movies/${heroMovie.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-cinema-black font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 cursor-pointer"
                >
                  <Info className="w-4 h-4" /> View Details
                </Link>
                <FavoriteButton movie={heroMovie} className="!p-3" />
              </div>
            </div>
          </div>

          {/* Bottom decorative curtain trim */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-curtain/60 to-transparent" />
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* API Key Error Check */}
        {isTrendingError && (
          <ErrorMessage
            message={trendingError?.message}
            onRetry={refetchTrending}
          />
        )}

        {/* ===== 1. Trending Section ===== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-curtain/15 text-curtain-light rounded-xl border border-curtain/20">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Trending</h2>
                <p className="text-xs text-cinema-muted mt-0.5">What audiences are watching right now</p>
              </div>
            </div>

            {/* Day / Week Toggle */}
            <div className="flex items-center bg-cinema-panel p-1 rounded-xl border border-cinema-border self-start sm:self-auto text-xs font-medium">
              <button
                onClick={() => setTrendingTab('day')}
                className={`px-4 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  trendingTab === 'day'
                    ? 'bg-gold-500 text-cinema-black font-bold shadow-md shadow-gold-500/20'
                    : 'text-cinema-muted hover:text-white'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTrendingTab('week')}
                className={`px-4 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  trendingTab === 'week'
                    ? 'bg-gold-500 text-cinema-black font-bold shadow-md shadow-gold-500/20'
                    : 'text-cinema-muted hover:text-white'
                }`}
              >
                This Week
              </button>
            </div>
          </div>

          {/* Curtain-style divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cinema-border-light to-transparent" />

          <MovieGrid
            movies={trendingData?.results?.slice(0, 10)}
            isLoading={isTrendingLoading}
          />
        </section>

        {/* ===== 2. Popular Movies ===== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gold-500/10 text-gold-400 rounded-xl border border-gold-500/15">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Popular</h2>
                <p className="text-xs text-cinema-muted mt-0.5">Box office hits everyone loves</p>
              </div>
            </div>
            <Link
              to="/movies"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-500 hover:text-gold-400 transition-colors cursor-pointer"
            >
              See All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cinema-border-light to-transparent" />

          <MovieGrid
            movies={popularData?.results?.slice(0, 10)}
            isLoading={isPopularLoading}
          />
        </section>

        {/* ===== 3. Top Rated ===== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gold-500/10 text-gold-300 rounded-xl border border-gold-500/15">
                <Star className="w-5 h-5 fill-gold-400" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Critics' Choice</h2>
                <p className="text-xs text-cinema-muted mt-0.5">Award-worthy performances & storytelling</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cinema-border-light to-transparent" />

          <MovieGrid
            movies={topRatedData?.results?.slice(0, 10)}
            isLoading={isTopRatedLoading}
          />
        </section>

        {/* ===== 4. Coming Soon ===== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/15">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Coming Soon</h2>
                <p className="text-xs text-cinema-muted mt-0.5">Upcoming releases to look forward to</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cinema-border-light to-transparent" />

          <MovieGrid
            movies={upcomingData?.results?.slice(0, 10)}
            isLoading={isUpcomingLoading}
          />
        </section>
      </div>
    </div>
  );
}
