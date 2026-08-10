import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Film, Compass, Heart, Home } from 'lucide-react';

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-gold-500/10 text-gold-400 border border-gold-500/25'
        : 'text-slate-400 hover:text-gold-300 hover:bg-cinema-surface/80'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-cinema-dark/95 backdrop-blur-lg border-b border-cinema-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 text-cinema-black shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 group-hover:scale-105 transition-all duration-300">
            <Film className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg tracking-tight text-white leading-tight">
              Movie<span className="text-gold-400">Explorer</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500/60 font-medium leading-none hidden sm:block">
              Your Personal Cinema
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          <NavLink to="/" end className={navLinkClass}>
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          <NavLink to="/movies" className={navLinkClass}>
            <Compass className="w-4 h-4" />
            <span>Movies</span>
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
