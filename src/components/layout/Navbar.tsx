import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import {
  Search,
  Bell,
  Heart,
  User,
  Globe,
  Compass,
  LogOut,
  Sparkles,
  Menu,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const {
    t,
    language,
    setLanguage,
    user,
    logoutUser,
    favourites,
    unreadNotificationsCount,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/app/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: t('explore'), path: '/app/explore' },
    { label: t('hiddenGems'), path: '/app/hidden-gems' },
    { label: t('temples'), path: '/app/temples' },
    { label: t('stories'), path: '/app/stories' },
    { label: t('aiAssistant'), path: '/app/assistant' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link
            to="/app"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-teal-900 whitespace-nowrap shrink-0 group"
          >
            <span className="w-8 h-8 rounded-lg bg-teal-800 text-amber-300 flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-teal-900 transition-colors">
              TN
            </span>
            <span className="font-display tracking-normal">TN Stories</span>
          </Link>
        </div>

        {/* Search Bar in Desktop Header */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md items-center relative"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-700 transition-colors"
          />
        </form>

        {/* Zone 2: Concise Nav Links (Hidden on mobile/tablet) */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-600">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-teal-900 font-bold border-b-2 border-teal-800'
                    : 'hover:text-teal-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Functional Group & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              aria-label="Language selector"
            >
              <Globe className="w-3.5 h-3.5 text-teal-700" />
              <span className="font-semibold uppercase tracking-wider">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div
                className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowLangMenu(false)}
              >
                <button
                  onClick={() => {
                    setLanguage('en');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                    language === 'en' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span className="text-[10px] text-teal-700 font-semibold">Active</span>}
                </button>
                <button
                  onClick={() => {
                    setLanguage('ta');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                    language === 'ta' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>தமிழ் (Tamil)</span>
                  {language === 'ta' && <span className="text-[10px] text-teal-700 font-semibold">Active</span>}
                </button>
                <button
                  onClick={() => {
                    setLanguage('hi');
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                    language === 'hi' ? 'bg-teal-50 text-teal-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>हिंदी (Hindi)</span>
                  {language === 'hi' && <span className="text-[10px] text-teal-700 font-semibold">Active</span>}
                </button>
              </div>
            )}
          </div>

          {/* Saved Places Quick Link */}
          <Link
            to="/app/saved"
            className="relative p-2 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Saved Places"
            aria-label="View saved places"
          >
            <Heart className="w-4 h-4" />
            {favourites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {favourites.length}
              </span>
            )}
          </Link>

          {/* Notifications Quick Link */}
          <Link
            to="/app/notifications"
            className="relative p-2 text-slate-600 hover:text-teal-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {unreadNotificationsCount}
              </span>
            )}
          </Link>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pl-2 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              aria-label="User profile menu"
            >
              <span className="hidden sm:inline max-w-[100px] truncate">{user ? user.name.split(' ')[0] : 'Demo User'}</span>
              <div className="w-7 h-7 rounded-lg bg-teal-800 text-amber-300 flex items-center justify-center font-bold text-xs shadow-sm">
                {user ? user.name[0] : 'U'}
              </div>
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">{user ? user.name : 'Demo Traveler'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user ? user.email : 'traveler@tnstories.in'}</p>
                </div>

                <Link
                  to="/app/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-900 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/app/planner"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-900 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Trip Planner</span>
                </Link>

                <Link
                  to="/app/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-900 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </Link>

                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowUserMenu(false);
                      navigate('/welcome');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Demo Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
