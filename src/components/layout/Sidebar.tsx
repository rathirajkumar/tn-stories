import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Compass,
  Sparkles,
  Landmark,
  BookOpen,
  Bot,
  Hotel,
  Bus,
  Calendar,
  Route,
  ShieldAlert,
  Tag,
  Heart,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const { t, favourites, unreadNotificationsCount } = useApp();

  const navigationItems = [
    { label: t('home'), path: '/app', icon: Home, exact: true },
    { label: t('explore'), path: '/app/explore', icon: Compass },
    { label: t('hiddenGems'), path: '/app/hidden-gems', icon: Sparkles },
    { label: t('temples'), path: '/app/temples', icon: Landmark },
    { label: t('stories'), path: '/app/stories', icon: BookOpen },
    { label: t('aiAssistant'), path: '/app/assistant', icon: Bot },
    { label: t('hotelsRestaurants'), path: '/app/hospitality', icon: Hotel },
    { label: t('transportation'), path: '/app/transport', icon: Bus },
    { label: t('events'), path: '/app/events', icon: Calendar },
    { label: t('tripPlanner'), path: '/app/planner', icon: Route },
    { label: t('emergency'), path: '/app/emergency', icon: ShieldAlert },
    { label: t('offers'), path: '/app/offers', icon: Tag },
    {
      label: t('savedPlaces'),
      path: '/app/saved',
      icon: Heart,
      badge: favourites.length > 0 ? favourites.length : undefined,
    },
    { label: t('profile'), path: '/app/profile', icon: User },
    { label: t('settings'), path: '/app/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 border-r border-slate-800">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-amber-300 font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
              TN
            </div>
            <div className="truncate">
              <h2 className="text-base font-bold text-white font-display leading-tight truncate">
                TN Stories
              </h2>
              <p className="text-[10px] text-teal-400 font-medium truncate">
                Tamil Nadu Beyond Ordinary
              </p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-lg bg-teal-600 text-amber-300 font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
            TN
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              {!collapsed && (
                <span className="truncate flex-1 whitespace-nowrap">{item.label}</span>
              )}
              {!collapsed && item.badge !== undefined && (
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Demo Status Banner */}
      {!collapsed ? (
        <div className="p-3 m-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Frontend Preview</span>
          </div>
          <p className="leading-snug">
            Interactive demo with local Tamil Nadu travel dataset & storage.
          </p>
        </div>
      ) : (
        <div className="p-2 text-center text-slate-500 shrink-0" title="Demo Preview Mode">
          <Info className="w-4 h-4 mx-auto text-amber-400" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 sticky top-0 h-screen transition-all duration-300 z-30 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        >
          <div
            className="w-72 h-full max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
