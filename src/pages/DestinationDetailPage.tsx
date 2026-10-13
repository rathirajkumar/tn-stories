import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { STORIES } from '../data/stories';
import { HOTELS, RESTAURANTS } from '../data/hospitality';
import { useApp } from '../context/AppContext';
import { RatingDisplay } from '../components/common/RatingDisplay';
import { FavoriteButton } from '../components/common/FavoriteButton';
import { EmptyState } from '../components/common/EmptyState';
import {
  MapPin,
  Clock,
  Calendar,
  Wallet,
  Compass,
  Share2,
  Route,
  Navigation,
  BookOpen,
  Utensils,
  Hotel,
  Bus,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Info,
  ExternalLink,
} from 'lucide-react';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'culture' | 'food' | 'stays' | 'transport' | 'emergency'>('overview');
  const [directionsModalOpen, setDirectionsModalOpen] = useState(false);

  const destination = DESTINATIONS.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="py-20 px-4">
        <EmptyState
          icon={Compass}
          title="Destination Not Found"
          description="We couldn't locate the requested Tamil Nadu tourist destination."
          actionText="Back to Explore"
          actionLink="/app/explore"
        />
      </div>
    );
  }

  const relatedStory = STORIES.find((s) => s.relatedDestinationId === destination.id);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${destination.name} - TN Stories`,
          text: `Explore ${destination.name} in Tamil Nadu: ${destination.shortDescription}`,
          url,
        });
        showToast('Shared successfully!', 'success');
      } catch {
        // User dismissed share dialog
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast('Destination link copied to clipboard!', 'success');
    }
  };

  const handleAddToTrip = () => {
    navigate(`/app/planner?destination=${destination.id}`);
  };

  return (
    <div className="pb-20 space-y-8">
      {/* 1. Large Hero Header */}
      <div className="relative min-h-[400px] lg:min-h-[460px] flex items-end bg-slate-900 text-white overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 hover:bg-black/80 backdrop-blur-md text-xs font-semibold text-white transition-colors border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Action Buttons Top Right */}
        <div className="absolute top-6 right-4 sm:right-8 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white transition-colors border border-white/10"
            title="Share destination"
            aria-label="Share destination"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <FavoriteButton destinationId={destination.id} size="md" />
        </div>

        {/* Hero Title Container */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-2">
            <span>{destination.district}</span>
            <span aria-hidden="true">·</span>
            <span>{destination.category.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span>{destination.budgetLevel}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-1">
            {destination.name}
          </h1>
          {destination.tamilName && (
            <p className="text-sm sm:text-base text-amber-200/90 font-serif mb-4">
              {destination.tamilName}
            </p>
          )}

          {/* Key Metrics Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 border-t border-white/15 text-xs text-slate-200">
            <RatingDisplay rating={destination.rating} reviewCount={destination.reviewCount} size="md" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>{destination.visitingDuration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Best: {destination.bestTimeToVisit}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-amber-300" />
              <span>{destination.estimatedCost}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddToTrip}
              className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center gap-2"
            >
              <Route className="w-4 h-4" />
              <span>Add to Trip Planner</span>
            </button>

            <button
              onClick={() => setDirectionsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-teal-800" />
              <span>Get Directions</span>
            </button>

            {relatedStory && (
              <Link
                to={`/app/stories/${relatedStory.id}`}
                className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Read Cultural Story</span>
              </Link>
            )}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Demo coordinates: {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
          </div>
        </div>
      </div>

      {/* 3. Section Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Highlights' },
            { id: 'culture', label: 'Historical Lore' },
            { id: 'food', label: 'Local Flavours' },
            { id: 'stays', label: 'Hotels & Dining' },
            { id: 'transport', label: 'How to Reach' },
            { id: 'emergency', label: 'Emergency & Safety' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-teal-800 text-teal-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Tab Content Panels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Description & Highlights */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs">
                <h2 className="text-xl font-bold text-slate-900 font-display mb-3">About {destination.name}</h2>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  {destination.fullDescription}
                </p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-900 mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 p-2.5 bg-stone-50 rounded-xl border border-stone-200/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900 font-display mb-3">Nearby Attractions & Excursions</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.nearbyAttractions.map((att, i) => (
                    <span key={i} className="text-xs text-slate-700 bg-teal-50/70 border border-teal-200/60 px-3 py-1.5 rounded-xl font-medium">
                      {att}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              {destination.reviews && destination.reviews.length > 0 && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
                  <h3 className="text-base font-bold text-slate-900 font-display mb-4">Traveler Experiences (Sample Data)</h3>
                  <div className="space-y-4">
                    {destination.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900">{rev.userName} ({rev.userCity})</span>
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>
                        <RatingDisplay rating={rev.rating} size="sm" showCount={false} />
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 1 Col: Practical Travel Card & Simulated Map */}
            <div className="space-y-6">
              {/* Practical Facts Box */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Visitor Quick Guide</h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Opening Timings:</span>
                    <span className="font-semibold text-slate-900 text-right">{destination.timings}</span>
                  </div>

                  <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Sample Entry Fee:</span>
                    <span className="font-semibold text-slate-900 text-right">{destination.entryFee}</span>
                  </div>

                  <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Estimated Budget:</span>
                    <span className="font-semibold text-teal-800 text-right">{destination.estimatedCost}</span>
                  </div>

                  <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Suggested Stay:</span>
                    <span className="font-semibold text-slate-900 text-right">{destination.visitingDuration}</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-slate-500">Best Season:</span>
                    <span className="font-semibold text-slate-900 text-right">{destination.bestTimeToVisit}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-[11px] text-amber-900">
                  <p className="font-semibold">Visitor Tip:</p>
                  <p className="mt-0.5">Early morning arrivals beat tourist queues and catch mist or golden hour light.</p>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Interactive Location Pin</h3>
                
                <div className="relative aspect-video rounded-2xl bg-teal-950 overflow-hidden flex flex-col items-center justify-center text-center p-4 text-white">
                  {/* Stylized geometric topographical lines */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg animate-bounce">
                      <MapPin className="w-5 h-5 fill-slate-950" />
                    </div>
                    <span className="text-xs font-bold mt-2 text-white">{destination.name}</span>
                    <span className="text-[11px] text-teal-200 font-mono">
                      {destination.coordinates.lat.toFixed(4)}, {destination.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setDirectionsModalOpen(true)}
                  className="w-full mt-3 py-2 text-center text-xs font-bold text-teal-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  View Route Simulation
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Historical Chronology</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Historical & Cultural Legacy
              </h2>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {destination.historicalSignificance}
            </p>

            {relatedStory ? (
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Related Heritage Tale</span>
                <h3 className="text-base font-bold text-slate-900 font-display">{relatedStory.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{relatedStory.shortDescription}</p>
                <Link
                  to={`/app/stories/${relatedStory.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider"
                >
                  <span>Read Full Heritage Narrative</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Tamil cultural chronicle compiled from archaeological records and state heritage archives.
              </p>
            )}
          </div>
        )}

        {activeTab === 'food' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                <Utensils className="w-4 h-4" />
                <span>Culinary Traditions</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Local Delicacies of {destination.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Must-try flavours, traditional mess dishes, and authentic sweets</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {destination.localFood.map((item, i) => (
                <div key={i} className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Authentic {destination.district} specialty</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stays' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Recommended Stays & Dining near {destination.name}
              </h2>
              <Link to="/app/hospitality" className="text-xs font-bold text-teal-800 hover:text-teal-950">
                View All Hospitality
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOTELS.slice(0, 3).map((h) => (
                <div key={h.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Hotel Partner</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 font-display">{h.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{h.pricePerNight}</p>
                  <p className="text-[11px] text-slate-400 mt-2">{h.distanceFromAttraction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 font-display">Transportation & Commute Options</h2>
            <div className="space-y-3">
              {destination.transportOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60 text-xs text-slate-800">
                  <Bus className="w-4 h-4 text-teal-800 shrink-0" />
                  <span>{opt}</span>
                </div>
              ))}
            </div>
            <Link
              to="/app/transport"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider"
            >
              <span>Search inter-city buses, trains and rentals</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center gap-2 text-rose-700">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h2 className="text-lg font-bold font-display text-slate-900">Nearby Emergency & Police Contacts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/60">
                <p className="text-xs font-bold text-rose-900 uppercase">District Hospital & Emergency Unit</p>
                <p className="text-xs text-slate-800 mt-1">{destination.emergencyContact.hospital}</p>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/60">
                <p className="text-xs font-bold text-teal-900 uppercase">Local Police Station</p>
                <p className="text-xs text-slate-800 mt-1">{destination.emergencyContact.police}</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              In case of emergency across Tamil Nadu, dial national universal helpline <strong>112</strong> or ambulance <strong>108</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Directions Modal */}
      {directionsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-teal-800" />
                <h3 className="font-bold text-slate-900 font-display">Route to {destination.name}</h3>
              </div>
              <button
                onClick={() => setDirectionsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                <strong>Coordinates:</strong> {destination.coordinates.lat}° N, {destination.coordinates.lng}° E
              </p>
              <div className="p-3 bg-stone-50 rounded-xl space-y-2">
                <p className="font-semibold text-slate-900">Transit Highlights:</p>
                {destination.transportOptions.map((o, idx) => (
                  <p key={idx} className="text-[11px] text-slate-600">• {o}</p>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                (Demonstration Route: Live GPS turn-by-turn guidance simulated for showcase mode)
              </p>
            </div>

            <button
              onClick={() => {
                setDirectionsModalOpen(false);
                showToast('Navigation simulation active!', 'info');
              }}
              className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider"
            >
              Close Route View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
