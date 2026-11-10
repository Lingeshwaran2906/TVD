/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { DevasthanamProvider } from './context/DevasthanamContext.tsx';
import { MantraAudioProvider } from './context/MantraAudioContext.tsx';
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';

// Views
import { HomeView } from './views/HomeView.tsx';
import { AboutTvdView } from './views/AboutTvdView.tsx';
import { AboutDeityView } from './views/AboutDeityView.tsx';
import { HistoryView } from './views/HistoryView.tsx';
import { DarshanInfoView } from './views/DarshanInfoView.tsx';
import { DarshanBookingView } from './views/DarshanBookingView.tsx';
import { PoojaSevaView } from './views/PoojaSevaView.tsx';
import { PoojaBookingView } from './views/PoojaBookingView.tsx';
import { FestivalsView } from './views/FestivalsView.tsx';
import { GalleryView } from './views/GalleryView.tsx';
import { AnnouncementsView } from './views/AnnouncementsView.tsx';
import { DonationsView } from './views/DonationsView.tsx';
import { ContactView } from './views/ContactView.tsx';
import { PoliciesView } from './views/PoliciesView.tsx';
import { AdminDashboardView } from './views/AdminDashboardView.tsx';

function MainApp() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsTransitioning(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  const handleNavigate = (view: string) => {
    if (view !== currentView) {
      setIsTransitioning(true);
      window.setTimeout(() => setIsTransitioning(false), 420);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-stone-900 selection:bg-amber-700 selection:text-white">
      {/* Top Announcements Notice Bar */}
      <AnnouncementBar onViewAll={() => handleNavigate('announcements')} />

      {/* Top Navigation Bar with Language Selector and Primary Actions */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}
        {currentView === 'about-tvd' && <AboutTvdView onNavigate={handleNavigate} />}
        {currentView === 'about-deity' && <AboutDeityView onNavigate={handleNavigate} />}
        {currentView === 'history' && <HistoryView onNavigate={handleNavigate} />}
        {currentView === 'darshan-info' && <DarshanInfoView onNavigate={handleNavigate} />}
        {currentView === 'pooja-seva' && <PoojaSevaView onNavigate={handleNavigate} />}
        {currentView === 'darshan-booking' && <DarshanBookingView />}
        {currentView === 'pooja-booking' && <PoojaBookingView />}
        {currentView === 'festivals' && <FestivalsView onNavigate={handleNavigate} />}
        {currentView === 'gallery' && <GalleryView />}
        {currentView === 'announcements' && <AnnouncementsView onNavigate={handleNavigate} />}
        {currentView === 'donations' && <DonationsView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'policies' && <PoliciesView />}
        {currentView === 'admin' && <AdminDashboardView />}
      </main>

      {isTransitioning && (
        <div className="tvd-loading" role="status" aria-live="polite">
          <div className="tvd-loading-aura" />
          <div className="tvd-loading-mark">TVD</div>
          <div className="tvd-loading-lotus">🪷</div>
          <p className="font-cinzel text-sm tracking-[.28em] text-amber-200">THILAGAVISHNU</p>
          <p className="font-tamil text-sm text-amber-300">திலகா விஷ்ணு</p>
          <span className="tvd-loading-line" />
          <span className="sr-only">Loading sacred experience</span>
        </div>
      )}

      {/* Sacred Celestial Temple Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DevasthanamProvider>
        <MantraAudioProvider>
          <MainApp />
        </MantraAudioProvider>
      </DevasthanamProvider>
    </LanguageProvider>
  );
}
