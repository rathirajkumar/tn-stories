import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle,
  Trash2,
  Calendar,
  Route,
  Tag,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return <Route className="w-4 h-4 text-teal-700" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      default:
        return <Compass className="w-4 h-4 text-teal-800" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">
            Notifications ({notifications.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Stay updated with festival dates, trip reminders, and regional offers
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <CheckCircle className="w-3.5 h-3.5 text-teal-800" />
              <span>Mark All Read</span>
            </button>
            <button
              onClick={clearNotifications}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                n.read
                  ? 'bg-white border-slate-200/80 opacity-80'
                  : 'bg-white border-teal-600/50 shadow-2xs ring-1 ring-teal-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-slate-400 pt-1">{n.timestamp}</p>
                </div>
              </div>

              {n.linkUrl && (
                <Link
                  to={n.linkUrl}
                  className="p-2 rounded-lg text-teal-800 hover:bg-teal-50 shrink-0 self-center"
                  title="Open notification link"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="All Caught Up!"
          description="You don't have any pending notifications right now. Check back soon for festival dates and trip updates."
          actionText="Explore Destinations"
          actionLink="/app/explore"
        />
      )}
    </div>
  );
};
