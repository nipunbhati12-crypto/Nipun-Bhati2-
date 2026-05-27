import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Sun, Moon, Menu, X, Flame } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onSearchClick: (query: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({
  categories,
  activeCategory,
  setActiveCategory,
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onSearchClick,
  isDark,
  toggleTheme
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchClick(searchVal);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      {/* Dynamic Announcement Ticker */}
      <div className="w-full bg-black dark:bg-red-700 text-white text-[10px] md:text-xs font-mono py-1 px-4 tracking-widest overflow-hidden text-center flex items-center justify-center gap-2">
        <Flame size={12} className="animate-pulse text-red-500 dark:text-neutral-200" />
        <span>MEMBERS EXCLUSIVE: CODE <strong className="text-red-400 dark:text-white font-bold bg-white/10 px-1 py-0.5 rounded">LEVIS20</strong> FOR 20% OFF ALL ENTIRE DENIM RANGE • FREE DELIVERIES</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
              aria-label="Toggle Mobile Menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Genuine Brand Logo (Sleek High-Contrast Crimson Badge) */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start items-center">
            <a href="#" onClick={() => setActiveCategory("All")} className="flex items-center gap-1 group">
              <div className="bg-[#E00000] px-4 py-2.5 transform group-hover:scale-105 transition-transform duration-300 shadow-md">
                <span className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase italic block leading-none">Levi's</span>
              </div>
            </a>
          </div>

          {/* Desktop Categories Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setMobileMenuOpen(false);
                  }}
                  id={`nav-link-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-3 py-2 text-xs lg:text-sm font-display font-bold uppercase tracking-widest transition-all relative ${
                    isActive 
                      ? "text-[#E00000] dark:text-red-500" 
                      : "text-zinc-700 dark:text-zinc-300 hover:text-[#E00000] dark:hover:text-red-400"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E00000] dark:bg-red-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search toggler */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center animate-fade-in">
                  <input
                    type="text"
                    placeholder="Search premium denim..."
                    value={searchVal}
                    onChange={(e) => {
                      setSearchVal(e.target.value);
                      onSearchClick(e.target.value);
                    }}
                    className="w-40 md:w-56 px-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E00000]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchVal("");
                      onSearchClick("");
                    }}
                    className="absolute right-2.5 text-zinc-400 hover:text-[#E00000]"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  aria-label="Open Search"
                  id="search-btn"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Theme"
              id="theme-toggle-btn"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist triggers */}
            <button
              onClick={onWishlistClick}
              className="relative p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#E00000] dark:hover:text-red-400 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Open Wishlist"
              id="wishlist-btn"
            >
              <Heart size={20} className={wishlistCount > 0 ? "fill-[#E00000] text-[#E00000] animate-pulse" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-none bg-black dark:bg-[#E00000] text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart trigger */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-zinc-600 dark:text-zinc-300 hover:text-[#E00000] dark:hover:text-red-400 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Open Shopping Cart"
              id="cart-btn"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-none bg-[#E00000] text-[10px] font-bold text-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-all border-b-2 border-[#E00000]">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm font-display font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === cat 
                    ? "bg-[#E00000] text-white" 
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
