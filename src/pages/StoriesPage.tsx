import React, { useState } from 'react';
import { STORIES } from '../data/stories';
import { StoryCard } from '../components/cards/StoryCard';
import { BookOpen, Sparkles, Scroll, Landmark, Utensils } from 'lucide-react';
import { MADURAI_IMAGE } from '../data/destinations';

export const StoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Stories', value: 'all' },
    { label: 'Ancient History', value: 'History' },
    { label: 'Temple Mythology', value: 'Mythology' },
    { label: 'Chola & Dravidian Architecture', value: 'Architecture' },
    { label: 'Living Traditions', value: 'Tradition' },
  ];

  const filtered = STORIES.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="relative bg-stone-900 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={MADURAI_IMAGE}
            alt="Tamil Cultural Heritage"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/80 border border-amber-600/50 text-amber-300 text-xs font-semibold mb-4">
            <Scroll className="w-3.5 h-3.5" />
            <span>Living Sangam & Medieval Lore</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Every Place Has a Story
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Uncover the deep cultural narratives behind Tamil Nadu&apos;s monuments—from Kannagi&apos;s ruby anklet in Madurai to Raja Raja Chola&apos;s monolithic granite engineering and seafaring Chettiar spice trails.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedCategory(c.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === c.value
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};
