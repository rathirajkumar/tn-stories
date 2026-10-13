import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Story } from '../../types';
import { BookOpen, ArrowRight, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StoryCardProps {
  story: Story;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [imageError, setImageError] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { showToast } = useApp();

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    showToast(bookmarked ? 'Story removed from bookmarks' : 'Story bookmarked for reading', 'info');
  };

  return (
    <div className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-teal-600/40 hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={story.coverImage}
            alt={story.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-950 to-slate-900 text-white text-center">
            <BookOpen className="w-8 h-8 text-amber-300 mb-2 opacity-80" />
            <span className="text-xs font-medium text-slate-200">{story.title}</span>
          </div>
        )}
        <button
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            bookmarked
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-white' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <span className="text-amber-700 font-semibold">{story.category}</span>
            <span aria-hidden="true">·</span>
            <span>{story.readingDuration}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[140px]">{story.destinationName}</span>
          </div>

          <Link to={`/app/stories/${story.id}`}>
            <h3 className="text-base font-bold text-slate-900 hover:text-teal-800 transition-colors font-display line-clamp-2 mb-2 leading-snug">
              {story.title}
            </h3>
          </Link>
          {story.tamilTitle && (
            <p className="text-xs text-slate-400 mb-2 line-clamp-1">{story.tamilTitle}</p>
          )}

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {story.shortDescription}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">By {story.author}</span>
          <Link
            to={`/app/stories/${story.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
