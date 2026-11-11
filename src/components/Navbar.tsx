import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Globe, Shield, Calendar, BookOpen, Volume2, VolumeX, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';
import { useMantraAudio } from '../context/MantraAudioContext.tsx';
import { DevoteeLoginModal } from './DevoteeLoginModal.tsx';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { isAdmin } = useDevasthanam();
  const { isPlaying, isMuted, handleTopRightAudioTap } = useMantraAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [devoteeModalOpen, setDevoteeModalOpen] = useState(false);

  // A viewport-level drawer must not inherit the sticky header's stacking context.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="tvd-site-header sticky top-0 z-50 bg-[#fcfaf7]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-8 h-16 sm:h-20">
          {/* Zone 1: Brand Wordmark (Single element) */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
            aria-label="TVD Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-amber-100 font-bold shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-base">TVD</span>
            </div>
            <div className="leading-tight">
              <span className="font-cinzel font-bold text-base md:text-lg text-amber-950 block tracking-tight">
                THILAGAVISHNU
              </span>
              <span className="font-tamil text-xs text-amber-800/80 block">
                திலகவிஷ்ணு தேவஸ்தானம்
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentView === 'home' ? 'text-amber-800 font-semibold border-b-2 border-amber-800' : ''
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handleNav('about-deity')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentView === 'about-deity' ? 'text-amber-800 font-semibold border-b-2 border-amber-800' : ''
              }`}
            >
              {t.navAboutDeity}
            </button>
            <button
              onClick={() => handleNav('darshan-info')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentView === 'darshan-info' ? 'text-amber-800 font-semibold border-b-2 border-amber-800' : ''
              }`}
            >
              {t.navDarshan}
            </button>
            <button
              onClick={() => handleNav('pooja-seva')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentView === 'pooja-seva' ? 'text-amber-800 font-semibold border-b-2 border-amber-800' : ''
              }`}
            >
              {t.navPooja}
            </button>
            <button
              onClick={() => handleNav('festivals')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentView === 'festivals' ? 'text-amber-800 font-semibold border-b-2 border-amber-800' : ''
              }`}
            >
              {t.navFestivals}
            </button>
            <button
              onClick={() => handleNav('gallery')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentView === 'gallery' ? 'text-amber-800 font-semibold border-b-2 border-amber-800' : ''
              }`}
            >
              {t.navGallery}
            </button>
            <button
              onClick={() => handleNav('donations')}
              className={`hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentView === 'donations' ? 'text-amber-800 font-semibold border-b-2 border-amber-800' : ''
              }`}
            >
              {t.navDonations}
            </button>
          </nav>

          {/* Zone 3: Language Selector, Mantra Audio Button & Primary CTA Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Top-Right Mantra Audio Control Button (Requested: tap to mute/resume "ஓம் திலகாய நமஹா") */}
            <button
              onClick={handleTopRightAudioTap}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                isPlaying && !isMuted
                  ? 'bg-amber-100 text-amber-950 border-amber-500 ring-2 ring-amber-400/50 shadow-amber-500/20'
                  : isMuted
                  ? 'bg-stone-100 text-red-700 border-red-300 hover:bg-stone-200'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-amber-50 hover:text-amber-900'
              }`}
              title={
                isPlaying && !isMuted
                  ? 'Mute Mantra Chanting: "ஓம் திலகாய நமஹா"'
                  : isMuted
                  ? 'Resume / Unmute Mantra: "ஓம் திலகாய நமஹா"'
                  : 'Play Tamil Mantra & Temple Drone: "ஓம் திலகாய நமஹா"'
              }
              aria-label={
                isPlaying && !isMuted
                  ? 'Mute Mantra'
                  : isMuted
                  ? 'Unmute Mantra'
                  : 'Play Tamil Mantra'
              }
            >
              {isPlaying && !isMuted ? (
                <div className="flex items-end gap-0.5 h-3.5">
                  <span className="w-1 bg-amber-700 rounded-full animate-wave-1" />
                  <span className="w-1 bg-amber-700 rounded-full animate-wave-2" />
                  <span className="w-1 bg-amber-700 rounded-full animate-wave-3" />
                </div>
              ) : isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-red-600" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              )}
              <span className="hidden sm:inline font-tamil text-[11px]">
                {isMuted ? 'Muted' : isPlaying ? 'ஓம் திலகாய நமஹா' : 'மந்திரம்'}
              </span>
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-800/20 text-xs font-semibold text-amber-900 hover:bg-amber-100/60 transition-colors cursor-pointer"
              title="Switch Language / மொழியை மாற்றுக"
              aria-label="Language Selector"
            >
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNav('darshan-booking')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-50 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.btnBookDarshan}</span>
            </button>

            {/* Separate Devotee Portal (User Login / Profile) */}
            <button
              onClick={() => setDevoteeModalOpen(true)}
              className="hidden sm:flex p-2 rounded-lg text-xs font-medium border bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
              title={language === 'ta' ? 'பக்தர் உள்நுழைவு / அனுமதி சீட்டுகள்' : 'Devotee Sign In / My Passes'}
              aria-label="Devotee Portal"
            >
              <User className="w-4 h-4 text-amber-800" />
              <span className="hidden xl:inline text-[11px] font-semibold">
                {language === 'ta' ? 'பக்தர்' : 'Devotee'}
              </span>
            </button>

            {/* Admin Quick Icon if logged in or direct access */}
            <button
              onClick={() => handleNav('admin')}
              className={`hidden sm:flex p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer items-center gap-1 ${
                currentView === 'admin'
                  ? 'bg-stone-900 text-amber-300 border-stone-800'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
              }`}
              title={isAdmin ? 'Admin Dashboard (Active)' : t.navAdmin}
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4 text-amber-700" />
              <span className="hidden xl:inline text-[11px] font-semibold">
                Admin
              </span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-amber-100/50"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="tvd-mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Viewport-level mobile navigation: rendered outside the sticky header. */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="tvd-mobile-nav-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <aside
            className="tvd-mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="tvd-mobile-nav-header">
              <div>
                <p className="font-cinzel text-lg font-bold text-amber-950">TVD</p>
                <p className="font-tamil text-xs text-amber-800">திலகவிஷ்ணு தேவஸ்தானம்</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="tvd-mobile-nav-close"
                aria-label="Close navigation"
              ><X size={20} /></button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-5">
              <button onClick={() => handleNav('darshan-booking')} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-800 px-2 text-xs font-bold text-white shadow-lg shadow-amber-900/15">
                <Calendar size={15} />{t.btnBookDarshan}
              </button>
              <button onClick={() => handleNav('pooja-booking')} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-100 px-2 text-xs font-bold text-amber-950">
                <BookOpen size={15} />{t.navPoojaBooking}
              </button>
            </div>

            <nav className="tvd-mobile-nav-links">
              {[
                { id: 'home', label: t.navHome },
                { id: 'about-tvd', label: t.navAboutTvd },
                { id: 'about-deity', label: t.navAboutDeity },
                { id: 'history', label: t.navHistory },
                { id: 'darshan-info', label: t.navDarshan },
                { id: 'pooja-seva', label: t.navPooja },
                { id: 'festivals', label: t.navFestivals },
                { id: 'gallery', label: t.navGallery },
                { id: 'announcements', label: t.navAnnouncements },
                { id: 'donations', label: t.navDonations },
                { id: 'contact', label: t.navContact },
                { id: 'admin', label: t.navAdmin },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`tvd-mobile-nav-link ${currentView === item.id ? 'is-active' : ''}`}
                >
                  <span>{item.label}</span><span aria-hidden="true">›</span>
                </button>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-2 mt-5 border-t border-amber-900/10 pt-4">
              <button onClick={toggleLanguage} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-900/15 text-xs font-semibold text-amber-950">
                <Globe size={15} />{language === 'en' ? 'தமிழ்' : 'English'}
              </button>
              <button onClick={() => { setMobileMenuOpen(false); setDevoteeModalOpen(true); }} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-900/15 text-xs font-semibold text-amber-950">
                <User size={15} />Devotee
              </button>
            </div>
          </aside>
        </div>,
        document.body
      )}

      {/* Devotee Login & Profile Modal */}
      <DevoteeLoginModal
        isOpen={devoteeModalOpen}
        onClose={() => setDevoteeModalOpen(false)}
        onNavigateToPasses={() => handleNav('darshan-booking')}
      />
    </header>
  );
};
