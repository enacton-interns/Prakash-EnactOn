import React from 'react';
import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';

export default function MovieGrid({ movies, isLoading, emptyMessage = 'No movies found.' }) {
  if (isLoading) {
    return <MovieSkeleton count={10} />;
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-cinema-panel/40 rounded-2xl border border-cinema-border my-6">
        <p className="text-cinema-muted text-base font-heading italic">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
