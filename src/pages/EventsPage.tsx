import React, { useState } from 'react';
import { EVENTS } from '../data/events';
import { useApp } from '../context/AppContext';
import { TourismEvent } from '../types';
import { Calendar, MapPin, Clock, Search, Sparkles, Filter, ExternalLink, Bookmark } from 'lucide-react';
import { HERO_IMAGE } from '../data/destinations';

export const EventsPage: React.FC = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEventModal, setSelectedEventModal] = useState<TourismEvent | null>(null);

  const categories = ['all', 'Temple', 'Dance', 'Cultural', 'Seasonal', 'Folk'];

  const filteredEvents = EVENTS.filter((ev) => {
    if (selectedCategory !== 'all' && ev.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ev.name.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="relative bg-teal-950 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={HERO_IMAGE}
            alt="Tamil Nadu cultural celebrations"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/90 border border-teal-700/60 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Celebrations of Tamil Nadu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Festivals & Cultural Events
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Witness celestial temple weddings in Madurai, open-air classical dance by the sea in Mamallapuram, Margazhi Carnatic sabha seasons in Chennai, and fragrant hill flower shows.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {c === 'all' ? 'All Events' : c}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search festival name or city..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-700"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:border-teal-600/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-teal-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-amber-300 font-bold text-[11px]">
                    {ev.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display">{ev.name}</h3>
                  {ev.tamilName && (
                    <p className="text-xs text-slate-400 font-serif">{ev.tamilName}</p>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{ev.location} ({ev.district})</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Timings: {ev.time.split('&')[0]}</span>
                <button
                  onClick={() => setSelectedEventModal(ev)}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 hover:text-teal-950 transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 font-display text-base">
                {selectedEventModal.name}
              </h3>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p><strong>Venue:</strong> {selectedEventModal.location}, {selectedEventModal.district}</p>
              <p><strong>Date & Time:</strong> {selectedEventModal.date} ({selectedEventModal.time})</p>
              <p className="leading-relaxed">{selectedEventModal.description}</p>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200/60 text-teal-900">
                <p className="font-semibold">Visitor Tip:</p>
                <p className="mt-0.5">{selectedEventModal.highlightNotes}</p>
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`Event reminder saved to calendar for ${selectedEventModal.name}`, 'success');
                setSelectedEventModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider"
            >
              Add Reminder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
