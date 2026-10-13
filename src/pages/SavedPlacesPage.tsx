import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/cards/DestinationCard';
import { EmptyState } from '../components/common/EmptyState';
import { Heart, Search, X, Route, Trash2 } from 'lucide-react';

export const SavedPlacesPage: React.FC = () => {
  const { favourites, toggleFavourite, showToast } = useApp();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const savedDestinations = DESTINATIONS.filter((d) => favourites.includes(d.id));

  const filtered = savedDestinations.filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.district.toLowerCase().includes(q) ||
      d.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-600" />
            <span>Wishlist & Saved Sanctuaries</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">
            Saved Places ({savedDestinations.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your personal collection of must-visit Tamil Nadu spots
          </p>
        </div>

        {savedDestinations.length > 0 && (
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your saved places..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-700 shadow-2xs"
            />
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((dest) => (
            <div key={dest.id} className="relative group">
              <DestinationCard destination={dest} />
              <div className="mt-2 flex items-center justify-between px-1">
                <button
                  onClick={() => navigate(`/app/planner?destination=${dest.id}`)}
                  className="text-[11px] font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1 uppercase tracking-wider"
                >
                  <Route className="w-3.5 h-3.5" />
                  <span>Add to Trip</span>
                </button>
                <button
                  onClick={() => toggleFavourite(dest.id)}
                  className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title={savedDestinations.length === 0 ? "You Haven't Saved Any Places Yet" : "No Matching Saved Places"}
          description={
            savedDestinations.length === 0
              ? "Browse through our popular destinations, hidden gems, and ancient temples to build your wishlist."
              : "No destinations match your search query."
          }
          actionText={savedDestinations.length === 0 ? "Explore Destinations" : "Clear Search"}
          actionLink={savedDestinations.length === 0 ? "/app/explore" : undefined}
          onActionClick={savedDestinations.length > 0 ? () => setSearch('') : undefined}
        />
      )}
    </div>
  );
};
