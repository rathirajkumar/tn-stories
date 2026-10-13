import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
  size = 'md',
  showCount = true,
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold',
  };

  return (
    <div className="flex items-center gap-1.5 tabular-nums">
      <Star className={`${iconSizes[size]} fill-amber-400 text-amber-400 shrink-0`} />
      <span className={`font-semibold text-slate-900 ${textSizes[size]}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-slate-500 font-normal">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
