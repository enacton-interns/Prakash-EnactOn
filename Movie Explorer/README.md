# 🎬 Movie Explorer — TanStack Query Practice App

**Movie Explorer** is a modern, cinematic movie discovery web application built with **React**, **TanStack Query v5**, **React Router**, and **Tailwind CSS v4**, powered by the **TMDB API**.

Designed to demonstrate production-ready client-side data fetching, caching, hover prefetching, and state management conventions.

---

## 🌟 Key Features

- **🎬 Cinematic Theater UI**: Modern Dark Cinema theme featuring gold spotlight glows, curtain accents, serif typography (`Playfair Display`), and responsive card grids.
- **⚡ Hover Prefetching**: Prefetches movie details, cast, and video trailers into cache when the cursor hovers over a movie card for instant page loads.
- **🔄 Parallel Queries**: Executes independent, simultaneous TanStack Query fetches for details, credits, and YouTube trailers.
- **🔍 Search & Discover**: Instant title search, multi-filter discovery by Genre and Release Year, and custom sorting (Popularity, Rating, Release Date).
- **❤️ Local Favorites**: Save movies to a personal watchlist persisted in `localStorage`.
- **📜 Automatic Scroll Reset**: Smooth route navigation with immediate scroll-to-top behavior across pages.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19 (JavaScript) + Vite
- **Data Fetching & Cache**: TanStack Query v5 (`@tanstack/react-query`)
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
- **Icons**: Lucide React
- **API Provider**: The Movie Database (TMDB API)

---

## 📐 Architecture & Query Key Design

This application enforces a strict unidirectional data flow:
```
UI Component → Custom Hook (TanStack Query) → API Service → TMDB
```

### Query Key Convention
| Feature | Query Key | Hook |
|---|---|---|
| **Trending** | `["movies", "trending", timeWindow]` | `useTrendingMovies()` |
| **Popular** | `["movies", "popular", page]` | `usePopularMovies()` |
| **Top Rated** | `["movies", "top-rated", page]` | `useTopRatedMovies()` |
| **Upcoming** | `["movies", "upcoming", page]` | `useUpcomingMovies()` |
| **Details** | `["movie", movieId]` | `useMovieDetails()` |
| **Credits** | `["movie", movieId, "credits"]` | `useMovieCredits()` |
| **Videos** | `["movie", movieId, "videos"]` | `useMovieVideos()` |
| **Search** | `["movies", "search", query, page]` | `useSearchMovies()` |
| **Discover** | `["movies", "discover", { genre, year, sort, page }]` | `useDiscoverMovies()` |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- A free TMDB API Key from [themoviedb.org](https://www.themoviedb.org/settings/api)

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
```

### 3. Installation & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
