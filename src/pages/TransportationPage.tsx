import React, { useState } from 'react';
import { TRANSPORT_ROUTES } from '../data/transportation';
import { useApp } from '../context/AppContext';
import { TransportRoute } from '../types';
import {
  Bus,
  Train,
  Car,
  Bike,
  Search,
  Clock,
  Compass,
  ArrowRight,
  Info,
  Phone,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const TransportationPage: React.FC = () => {
  const { showToast } = useApp();

  const [fromCity, setFromCity] = useState('All');
  const [toCity, setToCity] = useState('All');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [compareModalRoute, setCompareModalRoute] = useState<TransportRoute | null>(null);

  const transportTypes = [
    { label: 'All Modes', value: 'all', icon: Compass },
    { label: 'Government & Private Buses', value: 'bus', icon: Bus },
    { label: 'Trains (Southern Railway)', value: 'train', icon: Train },
    { label: 'Chauffeur Taxis & Cabs', value: 'taxi', icon: Car },
    { label: 'Rentals & Two-Wheelers', value: 'rental', icon: Bike },
  ];

  const filteredRoutes = TRANSPORT_ROUTES.filter((r) => {
    if (selectedType !== 'all' && r.type !== selectedType) return false;
    if (fromCity !== 'All' && !r.fromCity.toLowerCase().includes(fromCity.toLowerCase())) return false;
    if (toCity !== 'All' && !r.toCity.toLowerCase().includes(toCity.toLowerCase())) return false;
    return true;
  });

  const handleContactProvider = (name: string) => {
    showToast(`Contact inquiry simulated for ${name}. Demonstration line active.`, 'info');
  };

  const handleOpenOfficialWebsite = (urlName: string) => {
    showToast(`Redirect to official booking portal simulated (${urlName})`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">
          Intercity Transportation & Commutes
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore bus routes, Vande Bharat trains, Nilgiri mountain railway, and chauffeur cab connections
        </p>
      </div>

      {/* Demonstration Notice */}
      <div className="p-3 bg-stone-100 rounded-2xl border border-stone-200/80 text-xs text-slate-600 flex items-center gap-2">
        <Info className="w-4 h-4 text-teal-800 shrink-0" />
        <span>Demonstration Directory: Showing representative fares, frequencies, and schedules across Tamil Nadu.</span>
      </div>

      {/* Mode Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {transportTypes.map((t) => {
          const Icon = t.icon;
          const active = selectedType === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setSelectedType(t.value)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                active
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Route Cards */}
      <div className="space-y-4">
        {filteredRoutes.map((route) => {
          return (
            <div
              key={route.id}
              className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:border-teal-700/40 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Route Details */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="font-bold text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded-md uppercase">
                    {route.type.toUpperCase()}
                  </span>
                  <span>{route.operatorName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {route.fromCity}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-teal-700 shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {route.toCity}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{route.duration}</span>
                  </div>
                  <span>·</span>
                  <span>{route.distanceKm} km</span>
                  <span>·</span>
                  <span>{route.frequencyOrTiming}</span>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {route.highlights.map((h, i) => (
                    <span key={i} className="text-[11px] text-slate-600 bg-stone-100 px-2 py-0.5 rounded">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fare & Action Buttons */}
              <div className="md:text-right shrink-0 flex flex-col md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">Demo Est. Fare</span>
                  <span className="text-base sm:text-lg font-bold text-teal-900 tabular-nums">
                    {route.fareDemo}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCompareModalRoute(route)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    View Route
                  </button>

                  <button
                    onClick={() => handleContactProvider(route.operatorName)}
                    className="px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-colors"
                  >
                    Contact Provider
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compare / Route Modal */}
      {compareModalRoute && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 font-display text-base">
                Route Details: {compareModalRoute.fromCity} to {compareModalRoute.toCity}
              </h3>
              <button
                onClick={() => setCompareModalRoute(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p><strong>Carrier:</strong> {compareModalRoute.operatorName}</p>
              <p><strong>Journey Duration:</strong> {compareModalRoute.duration} ({compareModalRoute.distanceKm} km)</p>
              <p><strong>Schedule:</strong> {compareModalRoute.frequencyOrTiming}</p>
              <p><strong>Sample Fare:</strong> {compareModalRoute.fareDemo}</p>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <p className="font-semibold text-slate-900">Amenities & Route Highlights:</p>
                {compareModalRoute.highlights.map((h, i) => (
                  <p key={i} className="text-[11px] text-slate-600">• {h}</p>
                ))}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-[11px] text-amber-900">
                Official booking tickets for Southern Railway can be reserved via IRCTC, and buses via SETC TNSTC portal.
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleOpenOfficialWebsite('IRCTC / TNSTC');
                  setCompareModalRoute(null);
                }}
                className="flex-1 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider"
              >
                Open Official Portal
              </button>
              <button
                onClick={() => setCompareModalRoute(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
