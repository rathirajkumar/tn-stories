import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HERO_IMAGE } from '../data/destinations';
import { Compass, Sparkles, MapPin, ChevronRight, Globe, ArrowRight } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-950 text-white overflow-hidden">
      {/* Background Image with Dark Gradient Scrim for WCAG AA readability */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Tamil Nadu Heritage Temples and Ghats"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/80" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600/90 text-amber-300 font-extrabold flex items-center justify-center text-lg shadow-lg border border-teal-500/30">
            TN
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white font-display">
              TN Stories
            </h1>
            <p className="text-[11px] text-amber-300/90 font-medium tracking-wide">
              Official Tourism Experience Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/language"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-md transition-colors border border-white/10 text-white"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>Languages</span>
          </Link>
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-md transition-colors border border-white/10 text-white"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white shadow-md transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Body Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-700/50 text-amber-300 text-xs font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Curated Heritage, Western Ghats & Coastal Expeditions</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-display tracking-tight leading-tight mb-6 text-balance">
          Discover Tamil Nadu <br className="hidden sm:inline" />
          <span className="text-amber-300 italic font-serif">Beyond the Ordinary</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          From the soaring 1,000-year-old Chola granite towers to the misty tea plantations of the Nilgiris and fragrant Chettinad feasts—explore authentic cultural stories and tailor-made journeys.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/language')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-semibold text-sm border border-slate-700 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <span>Direct Demo Tour</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Feature Teasers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 text-left">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white">38 Districts</p>
              <p className="text-[11px] text-slate-300">Temples to peaks</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white">Hidden Gems</p>
              <p className="text-[11px] text-slate-300">Secret cascades</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white">Tri-Lingual</p>
              <p className="text-[11px] text-slate-300">தமிழ் · English · हिंदी</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white">Trip Planner</p>
              <p className="text-[11px] text-slate-300">Custom itineraries</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-white/10">
        <p>© 2026 TN Stories · Department of Cultural Exploration & Tourism</p>
        <p className="text-slate-400">Sample Frontend Showcase · No live backend required</p>
      </footer>
    </div>
  );
};
