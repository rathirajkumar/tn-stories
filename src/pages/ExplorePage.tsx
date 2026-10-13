import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCategory } from '../types';
import { DestinationCard } from '../components/cards/DestinationCard';
import { EmptyState } from '../components/common/EmptyState';
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Compass,
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Distinct districts
  const districts = useMemo(() => {
    const list = Array.from(new Set(DESTINATIONS.map((d) => d.district))).sort();
    return ['all', ...list];
  }, []);

  const categories: { label: string; value: string }[] = [
    { label: 'All Categories', value: 'all' },
    { label: 'Popular Places', value: 'popular' },
    { label: 'Hidden Spots', value: 'hidden' },
    { label: 'Temples & Sacred', value: 'temple' },
    { label: 'Historical Monuments', value: 'monument' },
    { label: 'Hill Stations', value: 'hill-station' },
    { label: 'Beaches & Oceans', value: 'beach' },
    { label: 'Heritage Culture', value: 'culture' },
  ];

  const filteredDestinations = useMemo(() => {
    let result = [...DESTINATIONS];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.district.toLowerCase().includes(q) ||
          d.shortDescription.toLowerCase().includes(q) ||
          (d.tamilName && d.tamilName.includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((d) => {
        if (selectedCategory === 'hidden') return d.isGem || d.category === 'hidden';
        if (selectedCategory === 'popular') return d.category === 'popular' || d.rating >= 4.8;
        return d.category === selectedCategory;
      });
    }

    // District filter
    if (selectedDistrict !== 'all') {
      result = result.filter((d) => d.district === selectedDistrict);
    }

    // Budget filter
    if (selectedBudget !== 'all') {
      result = result.filter((d) => d.budgetLevel === selectedBudget);
    }

    // Rating filter
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      result = result.filter((d) => d.rating >= minRating);
    }

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, selectedCategory, selectedDistrict, selectedBudget, selectedRating, sortBy]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDistrict('all');
    setSelectedBudget('all');
    setSelectedRating('all');
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">
            Explore Tamil Nadu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover destinations across all 38 districts with interactive filters
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city, temple, hill station..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-teal-700 shadow-2xs"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
            aria-label="Filter toggle"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className={`space-y-4 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
        {/* Category Filter Tabs (Interactive buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Select Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs items-center">
          {/* District Dropdown */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-teal-700"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All Districts' : d}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Budget</label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-teal-700"
            >
              <option value="all">All Budgets</option>
              <option value="Budget">Budget Friendly</option>
              <option value="Mid-Range">Mid-Range</option>
              <option value="Luxury">Luxury Stays</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Minimum Rating</label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-teal-700"
            >
              <option value="all">Any Rating</option>
              <option value="4.6">4.6★ and above</option>
              <option value="4.8">4.8★ and above (Top Rated)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-teal-700"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Layout & Reset */}
          <div className="flex items-center justify-between sm:justify-end gap-2 col-span-2 sm:col-span-4 lg:col-span-1 pt-2 lg:pt-3">
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold transition-colors"
            >
              Reset Filters
            </button>

            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-md ${
                  viewLayout === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewLayout('list')}
                className={`p-1.5 rounded-md ${
                  viewLayout === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Counter & Active Filter summary */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>
          Showing <strong className="text-slate-900 tabular-nums">{filteredDestinations.length}</strong> destinations across Tamil Nadu
        </p>
      </div>

      {/* Destination Grid / List */}
      {filteredDestinations.length > 0 ? (
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} layout={viewLayout} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Compass}
          title="No Destinations Found"
          description="We couldn't find any places matching your current filters. Try resetting the category, search keyword, or rating filter."
          actionText="Clear All Filters"
          onActionClick={clearAllFilters}
        />
      )}
    </div>
  );
};
