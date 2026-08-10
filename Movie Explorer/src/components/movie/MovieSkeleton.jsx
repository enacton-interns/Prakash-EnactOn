import React from 'react';

export default function MovieSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-cinema-panel rounded-xl overflow-hidden border border-cinema-border animate-pulse flex flex-col h-full"
        >
          <div className="aspect-[2/3] bg-cinema-surface w-full" />
          <div className="p-3.5 flex flex-col gap-2.5 flex-grow">
            <div className="h-4 bg-cinema-surface rounded w-3/4" />
            <div className="flex justify-between items-center mt-auto pt-2">
              <div className="h-3 bg-cinema-surface rounded w-1/3" />
              <div className="h-3 bg-cinema-surface rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
