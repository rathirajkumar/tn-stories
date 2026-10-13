import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/cards/DestinationCard';
import { Sparkles, Info, Compass, Trees, Mountain, Droplets, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data/destinations';

export const HiddenGemsPage: React.FC = () => {
  const [selectedSubtype, setSelectedSubtype] = useState<string>('all');

  // Filter gems
  const gems = DESTINATIONS.filter(
    (d) => d.isGem || d.category === 'hidden' || d.category === 'culture'
  );

  const subtypes = [
    { label: 'All Hidden Gems', value: 'all', icon: Sparkles },
    { label: 'Hill Sanctuaries', value: 'hill', icon: Mountain },
    { label: 'Mangroves & Waters', value: 'water', icon: Droplets },
    { label: 'Heritage Villages', value: 'heritage', icon: Trees },
  ];

  const filtered = gems.filter((g) => {
    if (selectedSubtype === 'hill') return g.district === 'The Nilgiris' || g.district === 'Coimbatore' || g.district === 'Namakkal';
    if (selectedSubtype === 'water') return g.id === 'pichavaram' || g.category === 'beach';
    if (selectedSubtype === 'heritage') return g.id === 'chettinad' || g.category === 'culture';
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Header */}
      <section className="relative bg-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={HERO_IMAGE}
            alt="Tamil Nadu hidden trails"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 border border-emerald-700/60 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Offbeat Expeditions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Hidden Gems of Tamil Nadu
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Escape overcrowded tourist circuits. Discover quiet evergreen canopies, untouched mangrove water labyrinths, 70 mountain hairpin bends, and 19th-century teak palaces.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 p-2 px-3 bg-white/10 rounded-xl border border-white/10 text-xs text-amber-200">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Sample Demonstration Content: Curated travel profiles for offbeat Tamil Nadu</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {subtypes.map((sub) => {
            const Icon = sub.icon;
            const active = selectedSubtype === sub.value;
            return (
              <button
                key={sub.value}
                onClick={() => setSelectedSubtype(sub.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-teal-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((gem) => (
            <DestinationCard key={gem.id} destination={gem} />
          ))}
        </div>
      </div>
    </div>
  );
};
