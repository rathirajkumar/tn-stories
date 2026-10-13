import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FavoriteButtonProps {
  destinationId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  destinationId,
  size = 'md',
  className = '',
}) => {
  const { isFavourite, toggleFavourite } = useApp();
  const active = isFavourite(destinationId);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(destinationId);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={active ? 'Remove from favourites' : 'Save to favourites'}
      className={`rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
        active
          ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 shadow-sm'
          : 'bg-white/85 text-slate-700 hover:text-rose-600 hover:bg-white border border-slate-200/80 shadow-sm'
      } ${sizeClasses[size]} ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform active:scale-90 ${
          active ? 'fill-rose-500 text-rose-500' : ''
        }`}
      />
    </button>
  );
};
