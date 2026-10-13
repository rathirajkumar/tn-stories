import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  MapPin,
  Globe,
  Heart,
  Route,
  Edit2,
  Check,
  Sparkles,
  Camera,
  Shield,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, favourites, savedTrips, language, setLanguage, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Anand Sundaram');
  const [email, setEmail] = useState(user?.email || 'anand.s@example.com');
  const [city, setCity] = useState(user?.city || 'Chennai');
  const [prefLang, setPrefLang] = useState<Language>(user?.language || language || 'en');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      city,
      language: prefLang,
    });
    if (prefLang !== language) {
      setLanguage(prefLang);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Top Banner & Avatar Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 p-6 flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="self-start px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-12 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 rounded-3xl bg-teal-800 border-4 border-white text-amber-300 font-extrabold text-2xl flex items-center justify-center shadow-md">
              {name ? name[0] : 'U'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 font-display">{name}</h1>
              <p className="text-xs text-slate-500">{email} · Base: {city}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 pt-2">
            <Link
              to="/app/saved"
              className="text-center p-2.5 px-4 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200/60 transition-colors"
            >
              <span className="block text-lg font-bold text-teal-900 font-mono">{favourites.length}</span>
              <span className="text-[11px] text-slate-500 font-medium">Saved Places</span>
            </Link>

            <Link
              to="/app/planner"
              className="text-center p-2.5 px-4 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200/60 transition-colors"
            >
              <span className="block text-lg font-bold text-teal-900 font-mono">{savedTrips.length}</span>
              <span className="text-[11px] text-slate-500 font-medium">Saved Trips</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Details or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 font-display">Edit Traveler Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Home Base / City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Language</label>
              <select
                value={prefLang}
                onChange={(e) => setPrefLang(e.target.value as Language)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Travel Preferences */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-900">
              Travel Preferences & Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Ancient Dravidian Temples', 'Misty Western Ghats', 'Local Banana Leaf Food Trails', 'Chola Stone Architecture', 'Secluded Waterfalls'].map((pref, i) => (
                <span key={i} className="text-xs text-slate-700 bg-teal-50/80 border border-teal-200/60 px-3 py-1.5 rounded-xl font-medium">
                  {pref}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
              <p>Preferred Language: <strong className="text-slate-800 uppercase">{user?.language || language}</strong></p>
            </div>
          </div>

          {/* Account Security & Storage */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-900">
              Account Storage & Privacy
            </h3>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70 text-xs text-slate-600 space-y-1">
              <p><strong>Storage:</strong> Local Browser Storage (localStorage)</p>
              <p><strong>Status:</strong> Active Interactive Showcase Session</p>
              <p><strong>Synced Data:</strong> Wishlists, Custom Plans, Notification states</p>
            </div>

            <Link
              to="/app/settings"
              className="inline-block text-xs font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider"
            >
              Go to App Settings →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
