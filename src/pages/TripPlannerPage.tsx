import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DESTINATIONS } from '../data/destinations';
import { SavedTrip, ItineraryDay } from '../types';
import {
  Route,
  Calendar,
  Users,
  Wallet,
  Sparkles,
  Plus,
  Trash2,
  Bookmark,
  Share2,
  Clock,
  Utensils,
  MapPin,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

export const TripPlannerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedDestId = searchParams.get('destination');

  const { savedTrips, saveTrip, deleteTrip, showToast } = useApp();

  const [fromCity, setFromCity] = useState('Chennai');
  const [toCity, setToCity] = useState(
    preselectedDestId
      ? DESTINATIONS.find((d) => d.id === preselectedDestId)?.name || 'Madurai'
      : 'Madurai'
  );
  const [startDate, setStartDate] = useState('2026-11-15');
  const [endDate, setEndDate] = useState('2026-11-17');
  const [travellers, setTravellers] = useState(2);
  const [companionType, setCompanionType] = useState<'Family' | 'Friends' | 'Solo' | 'Group'>('Friends');
  const [budgetLevel, setBudgetLevel] = useState<'Budget' | 'Mid-Range' | 'Luxury'>('Mid-Range');
  const [preferredTransport, setPreferredTransport] = useState('Train (Southern Railway)');
  const [accommodationType, setAccommodationType] = useState('Heritage Stay / Boutique Hotel');
  const [travelInterests, setTravelInterests] = useState<string[]>(['Temples', 'Local Food']);

  const [activePlan, setActivePlan] = useState<SavedTrip | null>(null);
  const [viewingSavedTab, setViewingSavedTab] = useState(false);

  const interestOptions = ['Temples & Heritage', 'Hill Stations & Mist', 'Local Food Trails', 'Wildlife & Nature', 'Beaches & Oceans'];

  const toggleInterest = (interest: string) => {
    if (travelInterests.includes(interest)) {
      setTravelInterests(travelInterests.filter((i) => i !== interest));
    } else {
      setTravelInterests([...travelInterests, interest]);
    }
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate smart day-by-day itinerary
    const sampleItinerary: ItineraryDay[] = [
      {
        dayNumber: 1,
        title: `Arrival in ${toCity} & Heritage Orientation`,
        activities: [
          {
            time: '08:30 AM',
            place: `${toCity} Central Arrival Point`,
            description: `Check-in at your ${accommodationType.toLowerCase()}. Freshen up and begin exploration.`,
            foodRecommendation: 'Traditional breakfast (Mallipoo Idli / Pongal & Filter Coffee)',
          },
          {
            time: '11:00 AM',
            place: `Historic Monuments of ${toCity}`,
            description: 'Guided walk through ancient Dravidian stone corridors and architecture.',
          },
          {
            time: '01:30 PM',
            place: 'Renowned Heritage Mess',
            description: 'Banana leaf lunch feast featuring regional spices and delicacies.',
            foodRecommendation: 'Full South Indian thali with regional side gravies',
          },
          {
            time: '05:00 PM',
            place: 'Evening Cultural Promenade',
            description: 'Sunset stroll through vibrant bazaar streets and artisan workshops.',
          },
        ],
      },
      {
        dayNumber: 2,
        title: `Deep Exploration & Scenic Excursion`,
        activities: [
          {
            time: '06:00 AM',
            place: 'Dawn Viewpoint / Temple Darshan',
            description: 'Early morning experience when the surroundings are peaceful and atmospheric.',
          },
          {
            time: '10:00 AM',
            place: 'Art & Craft Guilds',
            description: 'Visit local handloom weavers or bronze casting artisans in the district.',
            foodRecommendation: 'Fresh tender coconut water & crispy medu vada',
          },
          {
            time: '03:30 PM',
            place: 'Nature / Scenic Reservoir Walk',
            description: 'Relaxed afternoon excursion away from central traffic.',
          },
          {
            time: '07:30 PM',
            place: 'Night Food Trail',
            description: 'Sample street food delicacies including Jigarthanda, Bun Parotta or Dosa.',
          },
        ],
      },
    ];

    const estimatedCost =
      budgetLevel === 'Budget' ? '₹4,800' : budgetLevel === 'Mid-Range' ? '₹9,200' : '₹18,500';

    const newTrip: SavedTrip = {
      id: 'trip-' + Date.now(),
      title: `${toCity} ${companionType} Expedition`,
      fromCity,
      toCity,
      startDate,
      endDate,
      travellers,
      companionType,
      budgetLevel,
      totalEstimatedCost: estimatedCost,
      selectedPlaces: [toCity],
      itinerary: sampleItinerary,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setActivePlan(newTrip);
    setViewingSavedTab(false);
    showToast('Customized itinerary generated!', 'success');
  };

  const handleSaveActiveTrip = () => {
    if (!activePlan) return;
    saveTrip(activePlan);
  };

  const handleRemoveActivity = (dayIndex: number, actIndex: number) => {
    if (!activePlan) return;
    const nextItinerary = [...activePlan.itinerary];
    nextItinerary[dayIndex].activities.splice(actIndex, 1);
    setActivePlan({ ...activePlan, itinerary: nextItinerary });
    showToast('Activity removed from itinerary', 'info');
  };

  const handleAddActivity = (dayIndex: number) => {
    if (!activePlan) return;
    const nextItinerary = [...activePlan.itinerary];
    nextItinerary[dayIndex].activities.push({
      time: '04:00 PM',
      place: 'Custom Traveler Stop',
      description: 'Custom activity added by you. Perfect for souvenir shopping or tea break.',
      foodRecommendation: 'Fresh local snacks & degree filter coffee',
    });
    setActivePlan({ ...activePlan, itinerary: nextItinerary });
    showToast('Custom activity added!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">
            Tamil Nadu Trip Planner
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Build custom day-by-day itineraries tailored to your companions and budget
          </p>
        </div>

        {/* Tab Toggle for Saved Trips vs Builder */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewingSavedTab(false)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              !viewingSavedTab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Plan New Trip
          </button>
          <button
            onClick={() => setViewingSavedTab(true)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              viewingSavedTab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Saved Trips</span>
            <span className="text-[10px] bg-teal-800 text-white px-1.5 rounded-full font-mono">
              {savedTrips.length}
            </span>
          </button>
        </div>
      </div>

      {viewingSavedTab ? (
        /* Saved Trips Library View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Saved Trip Itineraries ({savedTrips.length})
            </h2>
            <button
              onClick={() => setViewingSavedTab(false)}
              className="text-xs font-bold text-teal-800 hover:text-teal-950"
            >
              + Create Another Trip
            </button>
          </div>

          {savedTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-teal-800">{trip.companionType} Trip</span>
                      <span>Created {trip.createdAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display mb-1">{trip.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">{trip.fromCity} → {trip.toCity}</p>

                    <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 text-xs text-slate-600 mb-4">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">{trip.startDate} to {trip.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Travellers:</span>
                        <span className="font-semibold">{trip.travellers} Person(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Budget:</span>
                        <span className="font-bold text-teal-900">{trip.totalEstimatedCost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setActivePlan(trip);
                        setViewingSavedTab(false);
                      }}
                      className="text-xs font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider"
                    >
                      View & Edit Plan
                    </button>

                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto">
              <Route className="w-8 h-8 text-teal-700 mx-auto mb-2 opacity-60" />
              <h3 className="font-bold text-slate-900">No Saved Trips Yet</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Use the planner form to generate and save personalized itineraries.
              </p>
              <button
                onClick={() => setViewingSavedTab(false)}
                className="px-4 py-2 bg-teal-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Plan a Trip Now
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Planner Form & Active Plan Split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: 5 Columns */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Itinerary Generator</span>
            </div>

            <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs">
              {/* Origin & Destination */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Starting City</label>
                  <input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                    placeholder="e.g. Chennai"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Destination</label>
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Travellers & Companions */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">No. of Travellers</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={travellers}
                    onChange={(e) => setTravellers(parseInt(e.target.value) || 1)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Companions</label>
                  <select
                    value={companionType}
                    onChange={(e) => setCompanionType(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    <option value="Solo">Solo Traveler</option>
                    <option value="Friends">Friends Group</option>
                    <option value="Family">Family Holiday</option>
                    <option value="Group">Extended Group</option>
                  </select>
                </div>
              </div>

              {/* Budget & Transport */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Budget Level</label>
                  <select
                    value={budgetLevel}
                    onChange={(e) => setBudgetLevel(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Mid-Range">Mid-Range</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Transport</label>
                  <select
                    value={preferredTransport}
                    onChange={(e) => setPreferredTransport(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900"
                  >
                    <option value="Train (Southern Railway)">Train (Southern Railway)</option>
                    <option value="State Bus (SETC Deluxe)">State Bus (SETC Deluxe)</option>
                    <option value="Chauffeur Cab (Sedan/SUV)">Chauffeur Cab</option>
                    <option value="Self Drive Bike/Car">Self Drive</option>
                  </select>
                </div>
              </div>

              {/* Interests multi-select */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Travel Interests</label>
                <div className="flex flex-wrap gap-1.5">
                  {interestOptions.map((opt) => {
                    const active = travelInterests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          active
                            ? 'bg-teal-800 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-4"
              >
                Generate Trip Itinerary
              </button>
            </form>
          </div>

          {/* Right Area: Generated Plan Details & Interactive Days (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {activePlan ? (
              <div className="space-y-6">
                {/* Plan Header Card */}
                <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                      {activePlan.companionType} Expedition
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                      {activePlan.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {activePlan.startDate} to {activePlan.endDate} · {activePlan.travellers} Traveler(s) · {activePlan.budgetLevel}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleSaveActiveTrip}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Trip</span>
                    </button>
                  </div>
                </div>

                {/* Budget Breakdown Strip */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-teal-900 text-white rounded-2xl text-center">
                  <div>
                    <p className="text-[10px] text-teal-300 uppercase font-semibold">Total Estimated Cost</p>
                    <p className="text-sm sm:text-base font-bold text-amber-300">{activePlan.totalEstimatedCost}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-teal-300 uppercase font-semibold">Transport Mode</p>
                    <p className="text-xs font-bold truncate">{preferredTransport.split(' ')[0]}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-teal-300 uppercase font-semibold">Total Days</p>
                    <p className="text-xs font-bold">2 Full Days</p>
                  </div>
                </div>

                {/* Day-by-Day Itinerary Cards */}
                <div className="space-y-4">
                  {activePlan.itinerary.map((day, dayIdx) => (
                    <div
                      key={day.dayNumber}
                      className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">
                            Day {day.dayNumber}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 font-display mt-1">
                            {day.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => handleAddActivity(dayIdx)}
                          className="flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-950 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Stop</span>
                        </button>
                      </div>

                      {/* Activities Timeline */}
                      <div className="space-y-3">
                        {day.activities.map((act, actIdx) => (
                          <div
                            key={actIdx}
                            className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70 flex items-start justify-between gap-3 group"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="text-[11px] font-mono font-bold text-teal-900 bg-teal-100 px-2 py-0.5 rounded shrink-0">
                                {act.time}
                              </span>
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{act.place}</h4>
                                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                  {act.description}
                                </p>
                                {act.foodRecommendation && (
                                  <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-800 font-medium">
                                    <Utensils className="w-3 h-3 shrink-0" />
                                    <span>Food tip: {act.foodRecommendation}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveActivity(dayIdx, actIdx)}
                              className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove Stop"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Placeholder before generating */
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-200 text-center">
                <Route className="w-12 h-12 text-teal-700 mb-3 opacity-40" />
                <h3 className="text-base font-bold text-slate-800 font-display">
                  Your Custom Itinerary Will Appear Here
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                  Fill in your travel preferences on the left and click <strong>Generate Trip Itinerary</strong> to create day-by-day sightseeing, meals, and timings.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
