export type Language = 'en' | 'ta' | 'hi';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  language: Language;
  preferredDistricts?: string[];
  travelInterests?: string[];
  phone?: string;
  city?: string;
}

export type DestinationCategory =
  | 'popular'
  | 'hidden'
  | 'temple'
  | 'monument'
  | 'hill-station'
  | 'beach'
  | 'waterfall'
  | 'wildlife'
  | 'adventure'
  | 'museum'
  | 'culture';

export interface Review {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Destination {
  id: string;
  name: string;
  tamilName?: string;
  district: string;
  category: DestinationCategory;
  shortDescription: string;
  fullDescription: string;
  historicalSignificance: string;
  image: string;
  secondaryImages?: string[];
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  budgetLevel: 'Budget' | 'Mid-Range' | 'Luxury';
  estimatedCost: string;
  bestTimeToVisit: string;
  visitingDuration: string;
  entryFee: string;
  timings: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  nearbyAttractions: string[];
  localFood: string[];
  nearbyHotels: string[];
  nearbyRestaurants: string[];
  transportOptions: string[];
  emergencyContact: {
    hospital: string;
    police: string;
  };
  isGem?: boolean;
}

export interface Story {
  id: string;
  title: string;
  tamilTitle?: string;
  relatedDestinationId: string;
  destinationName: string;
  coverImage: string;
  readingDuration: string;
  category: 'History' | 'Mythology' | 'Architecture' | 'Tradition' | 'Culinary';
  shortDescription: string;
  fullStory: string;
  historicalContext: string;
  relatedPhotoGallery: string[];
  author: string;
  publishedDate: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  district: string;
  image: string;
  pricePerNight: string;
  rating: number;
  reviewsCount: number;
  facilities: string[];
  distanceFromAttraction: string;
  roomTypes: string[];
  phoneDemo: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  district: string;
  image: string;
  priceRange: string;
  rating: number;
  popularDishes: string[];
  operatingHours: string;
  isVegetarian?: boolean;
}

export interface TransportRoute {
  id: string;
  type: 'bus' | 'train' | 'taxi' | 'auto' | 'rental';
  operatorName: string;
  fromCity: string;
  toCity: string;
  duration: string;
  fareDemo: string;
  frequencyOrTiming: string;
  distanceKm: number;
  highlights: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: 'Hospital' | 'Police' | 'Ambulance' | 'Tourist Police' | 'Pharmacy';
  district: string;
  address: string;
  phoneDemo: string;
  timing: string;
  distanceDemo: string;
}

export interface TourismEvent {
  id: string;
  name: string;
  tamilName?: string;
  location: string;
  district: string;
  category: 'Temple' | 'Cultural' | 'Dance' | 'Folk' | 'Seasonal' | 'Culinary';
  date: string;
  time: string;
  description: string;
  image: string;
  highlightNotes: string;
}

export interface OfferDeal {
  id: string;
  title: string;
  category: 'Hotel' | 'Restaurant' | 'Transport' | 'Package';
  discountLabel: string;
  promoCode: string;
  validity: string;
  terms: string;
  image: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: {
    time: string;
    place: string;
    description: string;
    foodRecommendation?: string;
  }[];
}

export interface SavedTrip {
  id: string;
  title: string;
  fromCity: string;
  toCity: string;
  startDate: string;
  endDate: string;
  travellers: number;
  companionType: 'Solo' | 'Family' | 'Friends' | 'Group';
  budgetLevel: string;
  totalEstimatedCost: string;
  selectedPlaces: string[];
  itinerary: ItineraryDay[];
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'trip' | 'event' | 'offer' | 'suggestion';
  timestamp: string;
  read: boolean;
  linkUrl?: string;
}
