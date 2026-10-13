import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { STORIES } from '../data/stories';
import { DESTINATIONS } from '../data/destinations';
import { useApp } from '../context/AppContext';
import { StoryCard } from '../components/cards/StoryCard';
import {
  Bookmark,
  Share2,
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  BookOpen,
  Info,
  ExternalLink,
} from 'lucide-react';

export const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [bookmarked, setBookmarked] = useState(false);

  const story = STORIES.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800 font-display">Story Not Found</h2>
        <Link to="/app/stories" className="text-teal-800 font-semibold text-xs mt-2 inline-block">
          Return to All Stories
        </Link>
      </div>
    );
  }

  const relatedDestination = DESTINATIONS.find((d) => d.id === story.relatedDestinationId);
  const otherStories = STORIES.filter((s) => s.id !== story.id).slice(0, 2);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.title} - TN Stories`,
          text: story.shortDescription,
          url,
        });
        showToast('Story shared!', 'success');
      } catch {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast('Story link copied to clipboard!', 'success');
    }
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    showToast(bookmarked ? 'Bookmark removed' : 'Story bookmarked for offline reading', 'info');
  };

  return (
    <article className="pb-20 space-y-8">
      {/* 1. Hero Header */}
      <div className="relative min-h-[380px] lg:min-h-[440px] flex items-end bg-slate-900 text-white overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-70 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 hover:bg-black/80 backdrop-blur-md text-xs font-semibold text-white transition-colors border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="absolute top-6 right-4 sm:right-8 z-20 flex items-center gap-2">
          <button
            onClick={toggleBookmark}
            className={`p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors ${
              bookmarked ? 'bg-amber-500 text-white' : 'bg-black/50 hover:bg-black/80 text-white'
            }`}
            title="Bookmark story"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white transition-colors border border-white/10"
            title="Share story"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Story Title & Byline */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-2">
            <span>{story.category.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span>{story.readingDuration}</span>
            <span aria-hidden="true">·</span>
            <span>{story.destinationName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-2 leading-tight">
            {story.title}
          </h1>
          {story.tamilTitle && (
            <p className="text-base sm:text-lg text-amber-200/90 font-serif mb-4">
              {story.tamilTitle}
            </p>
          )}

          <div className="flex items-center gap-4 pt-3 border-t border-white/15 text-xs text-slate-300">
            <span>By {story.author}</span>
            <span>·</span>
            <span>{story.publishedDate}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Story Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Editorial Disclosure */}
        <div className="p-3 bg-stone-100 rounded-xl border border-stone-200/80 text-xs text-slate-500 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Curated cultural narrative based on historical accounts and Tamil classical literature.</span>
        </div>

        {/* Story Text */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6">
            {story.fullStory.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Historical Context Callout */}
          <div className="mt-8 pt-6 border-t border-slate-100 p-4 bg-teal-50/50 rounded-2xl border border-teal-200/50">
            <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-1">Archaeological & Historical Context</h3>
            <p className="text-xs text-slate-700 leading-relaxed">{story.historicalContext}</p>
          </div>
        </div>

        {/* 3. Associated Destination Spotlight */}
        {relatedDestination && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Place Featured in this Story</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={relatedDestination.image}
                alt={relatedDestination.name}
                referrerPolicy="no-referrer"
                className="w-full sm:w-44 h-32 object-cover rounded-2xl"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-teal-800">{relatedDestination.district}</span>
                <h4 className="text-lg font-bold text-slate-900 font-display mt-0.5">{relatedDestination.name}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">{relatedDestination.shortDescription}</p>
                <Link
                  to={`/app/places/${relatedDestination.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider"
                >
                  <span>Explore Destination Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. Recommended Stories */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 font-display">More Cultural Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherStories.map((other) => (
              <StoryCard key={other.id} story={other} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
