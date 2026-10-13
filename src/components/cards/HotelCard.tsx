import React, { useState } from 'react';
import { Hotel } from '../../types';
import { RatingDisplay } from '../common/RatingDisplay';
import { MapPin, Phone, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [imageError, setImageError] = useState(false);
  const { showToast } = useApp();

  const handleBookingClick = () => {
    showToast(`Demonstration Mode: Booking inquiry initiated for ${hotel.name}. Call ${hotel.phoneDemo}`, 'info');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-teal-600/40 hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={hotel.image}
            alt={hotel.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 text-white text-center">
            <Building className="w-8 h-8 text-teal-400 mb-2 opacity-80" />
            <span className="text-xs font-medium text-slate-200">{hotel.name}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-900 font-bold text-xs shadow-sm">
          {hotel.pricePerNight}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <MapPin className="w-3 h-3 text-teal-700 shrink-0" />
            <span className="truncate">{hotel.location}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 font-display mb-1">{hotel.name}</h3>

          <div className="text-xs text-slate-500 mb-3">
            <span>{hotel.distanceFromAttraction}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.facilities.slice(0, 3).map((f, i) => (
              <span key={i} className="text-[11px] text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <RatingDisplay rating={hotel.rating} reviewCount={hotel.reviewsCount} size="sm" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast(`Sample Reception Desk: ${hotel.phoneDemo}`, 'info')}
              className="p-1.5 text-slate-500 hover:text-teal-800 rounded-lg hover:bg-slate-100 transition-colors"
              title="Call Reception (Demo)"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleBookingClick}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              Check Stays
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
