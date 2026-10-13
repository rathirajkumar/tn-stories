import React, { useState } from 'react';
import { HOTELS, RESTAURANTS } from '../data/hospitality';
import { HotelCard } from '../components/cards/HotelCard';
import { RestaurantCard } from '../components/cards/RestaurantCard';
import { Hotel, Utensils, Filter, Search, Info } from 'lucide-react';

export const HospitalityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'restaurants'>('hotels');
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const districts = ['all', 'The Nilgiris', 'Madurai', 'Dindigul', 'Thanjavur', 'Sivaganga', 'Chennai'];

  const filteredHotels = HOTELS.filter((h) => {
    if (districtFilter !== 'all' && h.district !== districtFilter) return false;
    if (ratingFilter !== 'all' && h.rating < parseFloat(ratingFilter)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredRestaurants = RESTAURANTS.filter((r) => {
    if (districtFilter !== 'all' && r.district !== districtFilter) return false;
    if (ratingFilter !== 'all' && r.rating < parseFloat(ratingFilter)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-16">
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">
            Hotels & Culinary Dining
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Handpicked heritage boutique stays and legendary dining spots across Tamil Nadu
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'hotels'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Hotel className="w-3.5 h-3.5" />
            <span>Hotels & Stays ({HOTELS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('restaurants')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'restaurants'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Restaurants & Messes ({RESTAURANTS.length})</span>
          </button>
        </div>
      </div>

      {/* Demo notice */}
      <div className="p-3 bg-stone-100 rounded-2xl border border-stone-200/80 text-xs text-slate-600 flex items-center gap-2">
        <Info className="w-4 h-4 text-teal-800 shrink-0" />
        <span>Demonstration Directory: Showing curated sample accommodations and eateries with representative pricing.</span>
      </div>

      {/* Filter Row */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === 'hotels' ? 'Search hotel name or location...' : 'Search restaurant or cuisine...'}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-700"
          />
        </div>

        {/* District Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold">District:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-medium text-slate-800"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d === 'all' ? 'All Districts' : d}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold">Min Rating:</span>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-medium text-slate-800"
          >
            <option value="all">Any Rating</option>
            <option value="4.7">4.7★ & above</option>
            <option value="4.8">4.8★ & above</option>
          </select>
        </div>

        {(search || districtFilter !== 'all' || ratingFilter !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setDistrictFilter('all');
              setRatingFilter('all');
            }}
            className="text-xs text-rose-600 font-bold hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* Grid Content */}
      {activeTab === 'hotels' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
};
