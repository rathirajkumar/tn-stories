import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/cards/DestinationCard';
import { Landmark, Clock, History, Shield, Filter } from 'lucide-react';
import { THANJAVUR_IMAGE } from '../data/destinations';

export const TemplesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'chola' | 'pandya' | 'pallava'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const heritageDestinations = DESTINATIONS.filter(
    (d) => d.category === 'temple' || d.category === 'monument' || d.category === 'culture'
  );

  const tabs = [
    { label: 'All Temples & Heritage', value: 'all' },
    { label: 'Great Chola Monuments', value: 'chola' },
    { label: 'Pandyan Sanctuaries', value: 'pandya' },
    { label: 'Pallava Rock Architecture', value: 'pallava' },
  ];

  const filtered = heritageDestinations.filter((item) => {
    if (activeTab === 'chola' && item.id !== 'thanjavur') return false;
    if (activeTab === 'pandya' && item.id !== 'madurai' && item.id !== 'rameswaram') return false;
    if (activeTab === 'pallava' && item.id !== 'mahabalipuram' && item.id !== 'chennai') return false;
    if (selectedDistrict !== 'all' && item.district !== selectedDistrict) return false;
    return true;
  });

  const districts = ['all', ...Array.from(new Set(heritageDestinations.map((d) => d.district)))];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="relative bg-teal-950 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={THANJAVUR_IMAGE}
            alt="Thanjavur Brihadisvara Temple"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/90 border border-teal-700/60 text-amber-300 text-xs font-semibold mb-4">
            <Landmark className="w-3.5 h-3.5" />
            <span>Living Dravidian Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Temples & Ancient Heritage
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Marvel at 3,000 years of unbroken spiritual architecture—from the monolithic sea rathas of Mahabalipuram to the soaring granite gopurams of Madurai and Thanjavur.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          {/* Era Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* District Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Filter District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-teal-700"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All Districts' : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Heritage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((place) => (
            <div key={place.id} className="flex flex-col">
              <DestinationCard destination={place} />
              {/* Extra Heritage Snippet */}
              <div className="mt-2 p-3 bg-stone-100/80 rounded-xl border border-stone-200/80 text-xs text-slate-700 flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Darshan Timings:</p>
                  <p className="text-[11px] text-slate-600">{place.timings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
