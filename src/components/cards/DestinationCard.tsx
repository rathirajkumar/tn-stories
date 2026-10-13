import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../../types';
import { RatingDisplay } from '../common/RatingDisplay';
import { FavoriteButton } from '../common/FavoriteButton';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  layout?: 'grid' | 'list';
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  layout = 'grid',
}) => {
  const [imageError, setImageError] = useState(false);

  if (layout === 'list') {
    return (
      <div className="group relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-teal-600/40 hover:shadow-md transition-all flex flex-col md:flex-row">
        <div className="relative md:w-72 h-52 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
          {!imageError ? (
            <img
              src={destination.image}
              alt={destination.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-900 to-slate-900 text-white text-center">
              <Compass className="w-8 h-8 text-amber-300 mb-2 opacity-80" />
              <span className="text-xs font-medium text-slate-200">{destination.name}</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <FavoriteButton destinationId={destination.id} size="sm" />
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Zero-Pill Metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
              <span className="text-teal-800 font-semibold">{destination.district}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.visitingDuration}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.budgetLevel}</span>
            </div>

            <Link to={`/app/places/${destination.id}`}>
              <h3 className="text-lg font-bold text-slate-900 hover:text-teal-800 transition-colors font-display">
                {destination.name}
              </h3>
            </Link>
            {destination.tamilName && (
              <p className="text-xs text-slate-400 mb-2 font-normal">
                {destination.tamilName}
              </p>
            )}

            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
              {destination.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
            <RatingDisplay rating={destination.rating} reviewCount={destination.reviewCount} size="sm" />
            <Link
              to={`/app/places/${destination.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-teal-600/40 hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={destination.image}
            alt={destination.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-900 to-slate-900 text-white text-center">
            <Compass className="w-8 h-8 text-amber-300 mb-2 opacity-80" />
            <span className="text-xs font-medium text-slate-200">{destination.name}</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <FavoriteButton destinationId={destination.id} size="sm" />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-xs font-medium">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{destination.district}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
            <span>{destination.visitingDuration}</span>
            <span aria-hidden="true">·</span>
            <span>{destination.budgetLevel}</span>
          </div>

          <Link to={`/app/places/${destination.id}`}>
            <h3 className="text-base font-bold text-slate-900 hover:text-teal-800 transition-colors font-display line-clamp-1">
              {destination.name}
            </h3>
          </Link>
          {destination.tamilName && (
            <p className="text-xs text-slate-400 mb-2 line-clamp-1">
              {destination.tamilName}
            </p>
          )}

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {destination.shortDescription}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <RatingDisplay rating={destination.rating} reviewCount={destination.reviewCount} size="sm" />
          <Link
            to={`/app/places/${destination.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
