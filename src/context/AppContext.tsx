import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, UserProfile, SavedTrip, AppNotification } from '../types';
import { translations } from '../data/translations';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  user: UserProfile | null;
  loginUser: (email: string, name?: string, lang?: Language) => void;
  logoutUser: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  favourites: string[];
  toggleFavourite: (destinationId: string) => void;
  isFavourite: (destinationId: string) => boolean;
  savedTrips: SavedTrip[];
  saveTrip: (trip: SavedTrip) => void;
  deleteTrip: (tripId: string) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  unreadNotificationsCount: number;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  clearAllDemoData: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'demo-user-1',
  name: 'Anand Sundaram',
  email: 'anand.s@example.com',
  language: 'en',
  city: 'Chennai',
  preferredDistricts: ['The Nilgiris', 'Madurai', 'Thanjavur'],
  travelInterests: ['Heritage Architecture', 'Hill Stations', 'Authentic Food', 'Temple Festivals'],
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Upcoming Chithirai Festival in Madurai',
    message: 'The celestial wedding festival begins soon. Book heritage stays early.',
    type: 'event',
    timestamp: '2 hours ago',
    read: false,
    linkUrl: '/app/events',
  },
  {
    id: 'notif-2',
    title: 'Trip Itinerary Reminder',
    message: 'Your upcoming 3-Day Ooty & Coonoor tea circuit has been saved to your trip library.',
    type: 'trip',
    timestamp: '1 day ago',
    read: false,
    linkUrl: '/app/planner',
  },
  {
    id: 'notif-3',
    title: '25% Off Heritage Mansions in Chettinad',
    message: 'Exclusive voucher code TNHERITAGE25 is active for the season.',
    type: 'offer',
    timestamp: '2 days ago',
    read: true,
    linkUrl: '/app/offers',
  },
];

const INITIAL_SAVED_TRIP: SavedTrip = {
  id: 'sample-trip-1',
  title: 'Nilgiri Heritage & Tea Trail',
  fromCity: 'Coimbatore',
  toCity: 'Ooty',
  startDate: '2026-11-14',
  endDate: '2026-11-16',
  travellers: 2,
  companionType: 'Friends',
  budgetLevel: 'Mid-Range',
  totalEstimatedCost: '₹9,500',
  selectedPlaces: ['ooty', 'kodaikanal'],
  createdAt: '2026-10-10',
  itinerary: [
    {
      dayNumber: 1,
      title: 'Arrival in Ooty & Heritage Toy Train',
      activities: [
        { time: '09:00 AM', place: 'Mettupalayam Railway Station', description: 'Board the historic UNESCO Nilgiri Mountain Railway toy train through misty tunnels.', foodRecommendation: 'Local tea & piping hot medu vada' },
        { time: '02:00 PM', place: 'Botanical Gardens', description: 'Stroll through 55-acre heritage flora and ancient fossilized tree trunk.', foodRecommendation: 'Nilgiri Varkey pastries at Nahar Cafe' },
        { time: '05:30 PM', place: 'Ooty Lake', description: 'Sunset pedal boating with reflections of eucalyptus groves.' },
      ],
    },
    {
      dayNumber: 2,
      title: 'Doddabetta Peak & Tea Factory Tour',
      activities: [
        { time: '08:00 AM', place: 'Doddabetta Summit', description: 'Panoramic telescope view of Nilgiri valleys at 2,637m.' },
        { time: '11:30 AM', place: 'Tea Museum & Factory', description: 'Observe CTC tea processing and sample freshly brewed cardamom orthodox tea.', foodRecommendation: 'Artisan homemade chocolates' },
        { time: '04:00 PM', place: 'Pykara Lake & Waterfalls', description: 'Speed boat ride amidst tranquil pine trees.' },
      ],
    },
  ],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tn_language') as Language;
    return saved === 'ta' || saved === 'hi' || saved === 'en' ? saved : 'en';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tn_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tn_favourites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['ooty', 'madurai', 'thanjavur'];
      }
    }
    return ['ooty', 'madurai', 'thanjavur'];
  });

  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(() => {
    const saved = localStorage.getItem('tn_saved_trips');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [INITIAL_SAVED_TRIP];
      }
    }
    return [INITIAL_SAVED_TRIP];
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('tn_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('tn_language', language);
  }, [language]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tn_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tn_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tn_favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('tn_saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    localStorage.setItem('tn_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (user) {
      setUser({ ...user, language: lang });
    }
    showToast(
      lang === 'ta'
        ? 'மொழி தமிழுக்கு மாற்றப்பட்டது'
        : lang === 'hi'
        ? 'भाषा हिंदी में बदली गई'
        : 'Language updated to English',
      'success'
    );
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  const loginUser = (email: string, name?: string, lang?: Language) => {
    const loggedUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: name && name.trim().length > 0 ? name : 'Tamil Nadu Explorer',
      email: email || 'traveler@tnstories.in',
      language: lang || language,
      city: 'Chennai',
      travelInterests: ['Ancient Temples', 'Western Ghats', 'Local Food Trails'],
    };
    setUser(loggedUser);
    showToast(`Welcome back, ${loggedUser.name}!`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out of TN Stories Demo', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const next = { ...user, ...updated };
    setUser(next);
    showToast('Profile updated successfully', 'success');
  };

  const toggleFavourite = (destinationId: string) => {
    setFavourites((prev) => {
      const exists = prev.includes(destinationId);
      if (exists) {
        showToast('Removed from Saved Places', 'info');
        return prev.filter((id) => id !== destinationId);
      } else {
        showToast('Added to Saved Places', 'success');
        return [...prev, destinationId];
      }
    });
  };

  const isFavourite = (destinationId: string) => {
    return favourites.includes(destinationId);
  };

  const saveTrip = (trip: SavedTrip) => {
    setSavedTrips((prev) => {
      const existingIdx = prev.findIndex((t) => t.id === trip.id);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = trip;
        return copy;
      }
      return [trip, ...prev];
    });
    showToast('Trip itinerary saved to your profile!', 'success');
  };

  const deleteTrip = (tripId: string) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
    showToast('Trip itinerary deleted', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared', 'info');
  };

  const clearAllDemoData = () => {
    localStorage.removeItem('tn_favourites');
    localStorage.removeItem('tn_saved_trips');
    localStorage.removeItem('tn_notifications');
    setFavourites([]);
    setSavedTrips([]);
    setNotifications([]);
    showToast('Local demo preferences reset to default', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        user,
        loginUser,
        logoutUser,
        updateProfile,
        favourites,
        toggleFavourite,
        isFavourite,
        savedTrips,
        saveTrip,
        deleteTrip,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        clearNotifications,
        unreadNotificationsCount,
        toasts,
        showToast,
        removeToast,
        clearAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
