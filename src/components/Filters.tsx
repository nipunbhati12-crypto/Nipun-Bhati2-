import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  selectedFit: string;
  setSelectedFit: (fit: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  availableFits: string[];
}

export default function Filters({
  categories,
  activeCategory,
  setActiveCategory,
  selectedFit,
  setSelectedFit,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  availableFits
}: FiltersProps) {
  const handleReset = () => {
    setActiveCategory("All");
    setSelectedFit("All");
    setPriceRange("All");
    setSortBy("Featured");
    setSearchQuery("");
  };

  const hasActiveFilters = activeCategory !== "All" || selectedFit !== "All" || priceRange !== "All" || searchQuery !== "";

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 shadow-sm transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        
        {/* Left Side: Search and Category badging */}
        <div className="w-full lg:w-auto flex-1">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={18} className="text-[#E00000]" />
            <h2 className="font-display font-black uppercase text-base text-zinc-900 dark:text-white tracking-wider">
              Filter Wardrobe
            </h2>
          </div>

          {/* Search box within filters */}
          <div className="relative max-w-md w-full mb-4">
            <input
              type="text"
              placeholder="Search by name, fit, style story..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E00000]"
              id="filter-search-input"
            />
          </div>

          {/* Quick Categories list */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider rounded-none border transition-all ${
                activeCategory === "All"
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                  : "bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white"
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider rounded-none border transition-all ${
                  activeCategory === cat
                    ? "bg-[#E00000] text-white border-[#E00000]"
                    : "bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Specialized dropdown selectors (Fit, Price range, Sort) */}
        <div className="w-full lg:w-auto flex flex-wrap gap-4 items-center">
          
          {/* Fit Select Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase text-zinc-400">DENIM FIT STYLES</label>
            <select
              value={selectedFit}
              onChange={(e) => setSelectedFit(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-display font-semibold uppercase tracking-wider rounded-none focus:outline-none text-zinc-800 dark:text-zinc-200 cursor-pointer focus:ring-1 focus:ring-[#E00000]"
              id="fit-select"
            >
              <option value="All">All Fit Styles</option>
              {availableFits.map((fit) => (
                <option key={fit} value={fit}>{fit}</option>
              ))}
            </select>
          </div>

          {/* Pricing Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase text-zinc-400">PRICE RANGE</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-display font-semibold uppercase tracking-wider rounded-none focus:outline-none text-zinc-800 dark:text-zinc-200 cursor-pointer focus:ring-1 focus:ring-[#E00000]"
              id="price-range-select"
            >
              <option value="All">All Prices</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 to $100</option>
              <option value="over-100">Over $100</option>
            </select>
          </div>

          {/* Sorter selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-mono uppercase text-zinc-400">SORT BY</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-display font-semibold uppercase tracking-wider rounded-none focus:outline-none text-zinc-800 dark:text-zinc-200 cursor-pointer focus:ring-1 focus:ring-[#E00000]"
              id="sort-by-select"
            >
              <option value="Featured">Featured Outfits</option>
              <option value="Price-Low-High">Price: Low to High</option>
              <option value="Price-High-Low">Price: High to Low</option>
              <option value="Best-Rating">Highly Rated</option>
            </select>
          </div>

          {/* Reset button action */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="mt-5 lg:mt-0 flex items-center gap-1 px-3 py-2 text-xs font-display font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-[#E00000] dark:hover:text-red-400 transition-colors self-end"
              id="reset-filters-btn"
            >
              <RotateCcw size={14} className="animate-spin-slow" />
              Reset
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
