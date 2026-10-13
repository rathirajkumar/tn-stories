import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Route, Bot, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { t } = useApp();

  const navItems = [
    { label: t('home'), path: '/app', icon: Home, exact: true },
    { label: t('explore'), path: '/app/explore', icon: Compass },
    { label: 'Trips', path: '/app/planner', icon: Route },
    { label: 'AI Guide', path: '/app/assistant', icon: Bot },
    { label: t('profile'), path: '/app/profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive
                  ? 'text-teal-800 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="truncate max-w-[64px]">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
