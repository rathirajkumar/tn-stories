/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { LanguageSelectionPage } from './pages/LanguageSelectionPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { HiddenGemsPage } from './pages/HiddenGemsPage';
import { TemplesPage } from './pages/TemplesPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { HospitalityPage } from './pages/HospitalityPage';
import { TransportationPage } from './pages/TransportationPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { EventsPage } from './pages/EventsPage';
import { OffersPage } from './pages/OffersPage';
import { SavedPlacesPage } from './pages/SavedPlacesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Welcome & Onboarding Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/language" element={<LanguageSelectionPage />} />

          {/* Main Application Layout & Nested Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="hidden-gems" element={<HiddenGemsPage />} />
            <Route path="temples" element={<TemplesPage />} />
            <Route path="places/:id" element={<DestinationDetailPage />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="stories/:id" element={<StoryDetailPage />} />
            <Route path="assistant" element={<AIAssistantPage />} />
            <Route path="planner" element={<TripPlannerPage />} />
            <Route path="hospitality" element={<HospitalityPage />} />
            <Route path="transport" element={<TransportationPage />} />
            <Route path="emergency" element={<EmergencyPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="offers" element={<OffersPage />} />
            <Route path="saved" element={<SavedPlacesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
