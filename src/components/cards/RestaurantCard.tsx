import React, { useState } from 'react';
import { Restaurant } from '../../types';
import { RatingDisplay } from '../common/RatingDisplay';
import { MapPin, Utensils, Clock, Leaf } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const [imageError, setImageError] = useState(false);
  const { showToast } = useApp();

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-teal-600/40 hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 text-white text-center">
            <Utensils className="w-8 h-8 text-amber-300 mb-2 opacity-80" />
            <span className="text-xs font-medium text-slate-200">{restaurant.name}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-900 font-bold text-xs shadow-sm">
          {restaurant.priceRange}
        </div>
        {restaurant.isVegetarian && (
          <div className="absolute top-3 left-3 bg-emerald-700 text-white px-2 py-0.5 rounded flex items-center gap-1 text-[11px] font-semibold">
            <Leaf className="w-3 h-3" />
            <span>Pure Veg</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <MapPin className="w-3 h-3 text-teal-700 shrink-0" />
            <span className="truncate">{restaurant.location}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 font-display mb-1">{restaurant.name}</h3>

          <div className="text-xs text-amber-800 font-medium mb-3">
            <span>{restaurant.cuisine}</span>
          </div>

          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Signature Specialties</p>
            <div className="flex flex-wrap gap-1">
              {restaurant.popularDishes.slice(0, 3).map((dish, i) => (
                <span key={i} className="text-[11px] text-slate-700 bg-amber-50/70 border border-amber-200/50 px-2 py-0.5 rounded-md">
                  {dish}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <RatingDisplay rating={restaurant.rating} size="sm" showCount={false} />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{restaurant.operatingHours.split('&')[0]}</span>
            </div>
            <button
              onClick={() => showToast(`Menu viewing simulated for ${restaurant.name}`, 'info')}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors whitespace-nowrap"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
