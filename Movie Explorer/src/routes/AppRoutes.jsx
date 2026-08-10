import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import MovieDetails from '../pages/MovieDetails';
import Favorites from '../pages/Favorites';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}
