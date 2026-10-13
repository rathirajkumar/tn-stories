import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 max-w-md mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1 font-display">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          {actionText}
        </Link>
      )}
      {actionText && onActionClick && !actionLink && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
