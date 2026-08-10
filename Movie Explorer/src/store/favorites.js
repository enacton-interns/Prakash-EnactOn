import { useState, useEffect } from 'react';

const STORAGE_KEY = 'movie_explorer_favorites';

export function getStoredFavorites() {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (err) {
    console.error('Failed to parse favorites from localStorage', err);
    return [];
  }
}

export function saveFavoritesToStorage(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    // Dispatch custom event to sync state across components
    window.dispatchEvent(new Event('favorites-updated'));
  } catch (err) {
    console.error('Failed to save favorites to localStorage', err);
  }
}

// React Hook to subscribe to favorites state
export function useFavorites() {
  const [favorites, setFavorites] = useState(getStoredFavorites());

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getStoredFavorites());
    };

    window.addEventListener('favorites-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('favorites-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const isFav = (movieId) => {
    return favorites.some((m) => m.id === Number(movieId));
  };

  const toggleFav = (movie) => {
    if (!movie || !movie.id) return;
    const exists = isFav(movie.id);
    let updated;
    if (exists) {
      updated = favorites.filter((m) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    saveFavoritesToStorage(updated);
  };

  return { favorites, isFav, toggleFav };
}
