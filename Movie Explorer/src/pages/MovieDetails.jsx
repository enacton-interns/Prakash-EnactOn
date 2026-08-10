import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Film, Play, User, X } from 'lucide-react';
import { useMovieDetails, useMovieCredits, useMovieVideos } from '../hooks/useMovieDetails';
import { getImageUrl } from '../services/tmdb/movies';
import FavoriteButton from '../components/movie/FavoriteButton';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import MovieRating from '../components/movie/MovieRating';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(null);

  // Parallel TanStack Queries
  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
    error: movieError,
  } = useMovieDetails(id);

  const {
    data: credits,
    isLoading: isCreditsLoading,
  } = useMovieCredits(id);

  const {
    data: videos,
  } = useMovieVideos(id);

  if (isMovieLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader message="Preparing your screening..." />
      </div>
    );
  }

  if (isMovieError || !movie) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorMessage message={movieError?.message || 'Movie not found.'} />
        <div className="text-center mt-6">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cinema-panel hover:bg-cinema-surface text-slate-200 rounded-lg text-sm transition-colors cursor-pointer border border-cinema-border"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  const formatRuntime = (mins) => {
    if (!mins) return 'N/A';
    const hours = Math.floor(mins / 60);
    const remainder = mins % 60;
    return `${hours}h ${remainder}m`;
  };

  const trailer = videos?.results?.find(
    (v) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
  );

  const topCast = credits?.cast?.slice(0, 12) || [];

  return (
    <div className="min-h-screen pb-16">
      {/* ===== Cinema Screen Hero ===== */}
      <div className="relative w-full overflow-hidden bg-cinema-black">
        {/* Floating Back Button over backdrop */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-30">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cinema-black/80 hover:bg-cinema-black/95 backdrop-blur-md text-slate-300 hover:text-white text-xs font-semibold border border-cinema-border/80 shadow-lg transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold-400" /> Back
          </button>
        </div>

        {/* Backdrop — extending edge-to-edge under top navbar */}
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-[60vh] min-h-[420px] max-h-[650px] object-cover opacity-35"
          />
        )}

        {/* Cinematic overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/70 to-cinema-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-black/50 via-transparent to-transparent" />

        {/* Curtain side accents */}
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-curtain/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-curtain/40 to-transparent" />

        {/* Spotlight from top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[100px]" />

        {/* Main Content Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-44 sm:-mt-64 z-10 pb-6">
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 items-start">
            {/* Movie Poster — framed theater lobby card */}
            <div className="w-48 sm:w-64 lg:w-72 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/20 bg-cinema-dark self-center sm:self-start glow-gold">
              {posterUrl ? (
                <img src={posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
              ) : (
                <div className="aspect-[2/3] flex items-center justify-center bg-cinema-panel text-cinema-muted">
                  <Film className="w-12 h-12" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 space-y-5 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <MovieRating rating={movie.vote_average} count={movie.vote_count} size="md" />
                {movie.status && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-500/10 text-gold-400 border border-gold-500/20">
                    {movie.status}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm sm:text-base italic text-gold-500/70 font-heading">
                  "{movie.tagline}"
                </p>
              )}

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-300 border-y border-cinema-border py-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold-500" />
                  <span>{movie.release_date || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="px-3 py-1 bg-cinema-panel text-slate-300 text-xs font-medium rounded-full border border-cinema-border hover:border-gold-500/30 transition-colors"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="space-y-2 pt-1">
                <h3 className="text-sm font-heading font-semibold text-gold-400 uppercase tracking-widest">
                  Synopsis
                </h3>
                <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-3xl font-light">
                  {movie.overview || 'No overview available for this movie.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <FavoriteButton movie={movie} className="!px-4 !py-2.5 !rounded-xl !flex !items-center !gap-2 text-sm font-medium" />

                {trailer && (
                  <button
                    onClick={() => setActiveVideo(trailer)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-curtain hover:bg-curtain-light text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-curtain/30 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" /> Watch Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Cast Section ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-12">
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gold-500 rounded-full" />
            <h2 className="text-xl font-heading font-bold text-white tracking-tight">The Cast</h2>
          </div>

          {isCreditsLoading ? (
            <Loader message="Loading cast..." />
          ) : topCast.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {topCast.map((actor) => {
                const profileUrl = getImageUrl(actor.profile_path, 'w185');
                return (
                  <div
                    key={actor.id}
                    className="bg-cinema-panel border border-cinema-border rounded-xl overflow-hidden hover:border-gold-500/25 transition-all duration-200 group"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-cinema-dark flex items-center justify-center">
                      {profileUrl ? (
                        <img src={profileUrl} alt={actor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <User className="w-10 h-10 text-cinema-muted" />
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-100 truncate" title={actor.name}>
                        {actor.name}
                      </p>
                      <p className="text-[11px] text-cinema-muted truncate" title={actor.character}>
                        {actor.character}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-cinema-muted font-heading italic">No cast information available.</p>
          )}
        </section>

        {/* ===== Trailer Modal — Cinema Screen ===== */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl bg-cinema-dark rounded-2xl overflow-hidden border border-cinema-border shadow-2xl glow-gold-strong">
              <div className="flex items-center justify-between p-4 border-b border-cinema-border">
                <h3 className="font-heading font-semibold text-white text-sm sm:text-base">{activeVideo.name}</h3>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg text-cinema-muted hover:text-white hover:bg-cinema-surface transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1`}
                  title={activeVideo.name}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
