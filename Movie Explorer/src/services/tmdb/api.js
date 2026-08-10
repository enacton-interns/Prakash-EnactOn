const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchFromTMDB(endpoint, params = {}) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
    throw new Error('TMDB API Key missing. Please set VITE_TMDB_API_KEY in your .env file.');
  }

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.status_message || `TMDB API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
