import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Globe,
  Bell,
  Trash2,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, logoutUser, clearAllDemoData, showToast } = useApp();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [tripReminders, setTripReminders] = useState(true);
  const [festivalAlerts, setFestivalAlerts] = useState(true);
  const [promotionalOffers, setPromotionalOffers] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleToggleTheme = (t: 'light' | 'dark') => {
    setTheme(t);
    showToast(`Theme set to ${t} (Demonstration preference saved)`, 'info');
  };

  const handleClearData = () => {
    if (window.confirm('Reset all saved wishlist places, itineraries, and demo preferences?')) {
      clearAllDemoData();
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/welcome');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">
          Settings & Preferences
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Customize language, notifications, and application preferences
        </p>
      </div>

      {/* 1. Language Selection */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
          <Globe className="w-4 h-4" />
          <span>Application Language</span>
        </div>

        <p className="text-xs text-slate-600">
          Select your primary language for navigation, guides, and cultural storytelling:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {[
            { code: 'en', name: 'English', sub: 'Default' },
            { code: 'ta', name: 'தமிழ் (Tamil)', sub: 'Classical Mother Tongue' },
            { code: 'hi', name: 'हिंदी (Hindi)', sub: 'Supported Interface' },
          ].map((l) => {
            const active = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => handleLanguageChange(l.code as Language)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  active
                    ? 'border-teal-700 bg-teal-50 text-teal-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-xs block">{l.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{l.sub}</span>
                </div>
                {active && <Check className="w-4 h-4 text-teal-700 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Notification Preferences */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
          <Bell className="w-4 h-4" />
          <span>Notification Preferences</span>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl cursor-pointer">
            <div>
              <span className="font-semibold text-slate-900 block">Saved Trip Reminders</span>
              <span className="text-slate-500 text-[11px]">Receive timing and checkpoint alerts for your itineraries</span>
            </div>
            <input
              type="checkbox"
              checked={tripReminders}
              onChange={(e) => setTripReminders(e.target.checked)}
              className="rounded text-teal-800 focus:ring-teal-700 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl cursor-pointer">
            <div>
              <span className="font-semibold text-slate-900 block">Temple Festivals & Cultural Alerts</span>
              <span className="text-slate-500 text-[11px]">Advance notifications before annual Chithirai, Natyanjali and Pongal</span>
            </div>
            <input
              type="checkbox"
              checked={festivalAlerts}
              onChange={(e) => setFestivalAlerts(e.target.checked)}
              className="rounded text-teal-800 focus:ring-teal-700 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl cursor-pointer">
            <div>
              <span className="font-semibold text-slate-900 block">Special Tourism Deals</span>
              <span className="text-slate-500 text-[11px]">Vouchers for hotels, cab rides, and dining mess passes</span>
            </div>
            <input
              type="checkbox"
              checked={promotionalOffers}
              onChange={(e) => setPromotionalOffers(e.target.checked)}
              className="rounded text-teal-800 focus:ring-teal-700 w-4 h-4"
            />
          </label>
        </div>
      </div>

      {/* 3. Theme Preference */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
          <Sun className="w-4 h-4" />
          <span>Theme & Appearance</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => handleToggleTheme('light')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold ${
              theme === 'light'
                ? 'border-teal-700 bg-teal-50 text-teal-900'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Crisp Daylight (Default)</span>
          </button>

          <button
            onClick={() => handleToggleTheme('dark')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold ${
              theme === 'dark'
                ? 'border-teal-700 bg-teal-50 text-teal-900'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Moon className="w-4 h-4 text-slate-700" />
            <span>Night Explorer</span>
          </button>
        </div>
      </div>

      {/* 4. Local Data & Account Actions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">Data Management & Sign Out</h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <button
            onClick={handleClearData}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Local Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
