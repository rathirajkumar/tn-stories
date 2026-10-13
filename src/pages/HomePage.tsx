import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DESTINATIONS, HERO_IMAGE } from '../data/destinations';
import { STORIES } from '../data/stories';
import { HOTELS } from '../data/hospitality';
import { EVENTS } from '../data/events';
import { OFFERS } from '../data/offers';
import { DestinationCard } from '../components/cards/DestinationCard';
import { StoryCard } from '../components/cards/StoryCard';
import { HotelCard } from '../components/cards/HotelCard';
import {
  Search,
  Sparkles,
  Compass,
  ArrowRight,
  Landmark,
  Mountain,
  Waves,
  Calendar,
  Utensils,
  MapPin,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/app/explore?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/app/explore');
    }
  };

  const quickCategories = [
    { label: 'Popular Places', path: '/app/explore?category=popular', icon: Compass },
    { label: 'Hidden Gems', path: '/app/hidden-gems', icon: Sparkles },
    { label: 'Temples & Heritage', path: '/app/temples', icon: Landmark },
    { label: 'Hill Stations', path: '/app/explore?category=hill-station', icon: Mountain },
    { label: 'Beaches', path: '/app/explore?category=beach', icon: Waves },
    { label: 'Culture & Stories', path: '/app/stories', icon: Utensils },
  ];

  const popularDestinations = DESTINATIONS.slice(0, 8);
  const hiddenGems = DESTINATIONS.filter((d) => d.isGem || d.category === 'hidden').slice(0, 3);
  const heritagePlaces = DESTINATIONS.filter((d) => d.category === 'temple' || d.category === 'monument' || d.category === 'culture').slice(0, 3);

  const localFoods = [
    { name: 'Madurai Jigarthanda', desc: 'Chilled almond gum, nannari syrup & basundi ice-cream', origin: 'Madurai' },
    { name: 'Chettinad Pepper Chicken', desc: 'Stone-ground black pepper, shallots & kalpasi spice', origin: 'Karaikudi' },
    { name: 'Mylapore Filter Coffee', desc: 'Chicory blend freshly frothed in brass dabara sets', origin: 'Chennai' },
    { name: 'Dindigul Thalappakatti Biryani', desc: 'Seeraga samba rice cooked with tender meat & spices', origin: 'Dindigul' },
    { name: 'Nilgiri Varkey & Tea', desc: 'Crispy layered pastry paired with fresh high-grown tea', origin: 'Ooty' },
  ];

  const weekendTrips = [
    {
      title: 'Nilgiri Mist & Heritage Train Circuit',
      route: 'Coimbatore → Ooty → Coonoor',
      days: '3 Days / 2 Nights',
      cost: 'Approx ₹7,500',
      highlights: 'UNESCO Toy train, tea garden walks, Doddabetta peak',
    },
    {
      title: 'Great Living Chola Temples Trail',
      route: 'Trichy → Thanjavur → Kumbakonam',
      days: '2 Days / 1 Night',
      cost: 'Approx ₹4,500',
      highlights: 'Brihadeeswarar Temple, Airavatesvara, bronze casting',
    },
    {
      title: 'Spiritual Cape & Pamban Island',
      route: 'Madurai → Rameswaram → Dhanushkodi',
      days: '3 Days / 2 Nights',
      cost: 'Approx ₹6,000',
      highlights: 'Pamban sea bridge, ghost town ruins, Meenakshi temple',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[480px] lg:min-h-[520px] flex items-center justify-center text-white px-4 sm:px-8 py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Tamil Nadu Temples & Nilgiri Hills"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-600/40 text-amber-300 text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Discover Tamil Nadu Beyond the Ordinary</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight leading-tight mb-4 text-balance">
            {t('heroHeading')}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            {t('heroSub')}
          </p>

          {/* Search Box in Hero */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/20 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center px-3 w-full">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Where in Tamil Nadu do you wish to go? (e.g. Ooty, Madurai...)"
                className="w-full py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap"
              >
                {t('searchBtn')}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app/explore"
              className="text-xs font-semibold text-amber-300 hover:text-white inline-flex items-center gap-1 transition-colors underline underline-offset-4"
            >
              <span>Browse All 38 Districts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. QUICK CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {t('quickCategories')}
            </h2>
            <p className="text-xs text-slate-500">Explore Tamil Nadu by landscape and interest</p>
          </div>
          <Link
            to="/app/explore"
            className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={i}
                to={cat.path}
                className="p-4 bg-white border border-slate-200/90 rounded-2xl hover:border-teal-700/50 hover:shadow-sm transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 group-hover:bg-teal-800 group-hover:text-amber-300 transition-colors flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-teal-900 transition-colors">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {t('popularPlaces')}
            </h2>
            <p className="text-xs text-slate-500">
              The most celebrated destinations across Tamil Nadu
            </p>
          </div>
          <Link
            to="/app/explore"
            className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. HIDDEN GEMS SPOTLIGHT */}
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Untouched & Uncrowded Escapes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Hidden Gems of Tamil Nadu
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Dense shola forests of Valparai, subterranean mangroves in Pichavaram, and 70 hairpin curves of Kolli Hills.
              </p>
            </div>
            <Link
              to="/app/hidden-gems"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md transition-colors shrink-0"
            >
              <span>Explore All Hidden Gems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hiddenGems.map((gem) => (
              <DestinationCard key={gem.id} destination={gem} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. DISCOVER TAMIL HERITAGE & STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Living Heritage & Cultural Stories
            </h2>
            <p className="text-xs text-slate-500">
              Every stone, gopuram, and temple corridor has an ancient story to tell
            </p>
          </div>
          <Link
            to="/app/stories"
            className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1 uppercase tracking-wider"
          >
            <span>All Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.slice(0, 3).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 6. POPULAR LOCAL FOOD STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-amber-50/70 border border-amber-200/60 rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">
                <Utensils className="w-3.5 h-3.5" />
                <span>Culinary Heritage</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Authentic Flavours of Tamil Nadu
              </h2>
            </div>
            <Link
              to="/app/hospitality"
              className="text-xs font-bold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1"
            >
              <span>Explore Restaurants</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {localFoods.map((food, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-amber-200/50 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded uppercase">
                    {food.origin}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-2 font-display">{food.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">{food.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RECOMMENDED HOTELS & STAYS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Handpicked Heritage Stays
            </h2>
            <p className="text-xs text-slate-500">
              Tea bungalows in Ooty, palace retreats in Madurai, and coastal villas
            </p>
          </div>
          <Link
            to="/app/hospitality"
            className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All Hotels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOTELS.slice(0, 3).map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 8. SUGGESTED WEEKEND TRIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Suggested Weekend Getaways
            </h2>
            <p className="text-xs text-slate-500">
              Ready-made itineraries crafted for road trips and short holidays
            </p>
          </div>
          <Link
            to="/app/planner"
            className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Custom Trip Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {weekendTrips.map((trip, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-slate-200/90 rounded-2xl hover:border-teal-700/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                  <span className="text-teal-800 font-semibold">{trip.days}</span>
                  <span className="font-semibold text-slate-800">{trip.cost}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display mb-1.5">
                  {trip.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{trip.route}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {trip.highlights}
                </p>
              </div>

              <Link
                to="/app/planner"
                className="w-full py-2 px-3 text-center rounded-xl bg-slate-50 hover:bg-teal-50 text-teal-900 text-xs font-bold border border-slate-200 transition-colors"
              >
                Plan Itinerary
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 9. UPCOMING EVENTS & OFFERS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Events preview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Festivals & Celebrations
            </h3>
            <Link
              to="/app/events"
              className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1"
            >
              <span>All Events</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {EVENTS.slice(0, 3).map((ev) => (
              <div
                key={ev.id}
                className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 flex items-start gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-teal-800 text-amber-300 font-bold text-xs flex flex-col items-center justify-center shrink-0 text-center leading-tight">
                  <Calendar className="w-4 h-4 mb-0.5" />
                  <span className="text-[9px] uppercase">Fest</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{ev.name}</h4>
                  <p className="text-[11px] text-teal-800 font-semibold">{ev.date} · {ev.location}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers preview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Exclusive Tourism Deals
            </h3>
            <Link
              to="/app/offers"
              className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1"
            >
              <span>View Offers</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {OFFERS.slice(0, 3).map((deal) => (
              <div
                key={deal.id}
                className="p-3 bg-teal-50/60 rounded-xl border border-teal-200/50 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {deal.discountLabel}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 truncate max-w-xs">{deal.title}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Use code: {deal.promoCode}</p>
                </div>
                <Link
                  to="/app/offers"
                  className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-900 bg-white border border-teal-300 rounded-lg hover:bg-teal-100 transition-colors whitespace-nowrap"
                >
                  Get Offer
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
