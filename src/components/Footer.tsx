import React from 'react';
import { Sparkles, Shield, Heart, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { templeInfo } = useDevasthanam();

  const handleNav = (view: string) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/40 relative overflow-hidden">
      {/* Subtle divine golden glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Sacred Mantra Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-amber-100 font-bold shadow-md">
                <span className="font-cinzel text-base">TVD</span>
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-200 tracking-wide">
                  {templeInfo.organizationNameEn}
                </h3>
                <p className="font-tamil text-xs text-amber-400/90 font-medium">
                  {templeInfo.organizationNameTa}
                </p>
              </div>
            </div>

            {/* Sacred Mantra Highlight */}
            <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-600/30 text-center space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-sans block">
                {language === 'ta' ? 'அதிகாரப்பூர்வ தேவலோக மந்திரம்' : 'Official Sacred Mantra'}
              </span>
              <p className="font-tamil text-xl font-bold text-amber-200">
                {templeInfo.mantraTa}
              </p>
              <p className="font-cinzel text-sm text-amber-300 font-semibold">
                {templeInfo.mantraEn}
              </p>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              {language === 'ta'
                ? 'ஸ்ரீ திலகா விஷ்ணுவின் அருள் ஒளி உலகெங்கும் பரவவும், மனித குலத்திற்கு அமைதியும் நற்கதியும் அருளவும் அமைக்கப்பட்ட புனித தேவஸ்தான தளம்.'
                : 'Dedicated to the celestial glory of Sri Thilaga Vishnu. Offering devotees worldwide a serene spiritual portal for sacred darshan, sankalpam, and tranquil contemplation.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-200 tracking-wider uppercase">
              {language === 'ta' ? 'முக்கிய பக்கங்கள்' : 'Devotional Portal'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about-deity')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navAboutDeity}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about-tvd')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navAboutTvd}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('history')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navHistory}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('festivals')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navFestivals}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navGallery}
                </button>
              </li>
            </ul>
          </div>

          {/* Bookings & Seva */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-200 tracking-wider uppercase">
              {language === 'ta' ? 'சேவை & முன்பதிவு' : 'Darshan & Seva'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('darshan-booking')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.bookingDarshanTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pooja-booking')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.bookingPoojaTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('darshan-info')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.darshanTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pooja-seva')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.navPooja}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('donations')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.donationsTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('announcements')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.announcementsTitle}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Governance */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-200 tracking-wider uppercase">
              {language === 'ta' ? 'வழிகாட்டுதல்கள்' : 'Devotee Desk'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.contactTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('policies')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.privacyTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('policies')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.termsTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('policies')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.cancellationTitle}
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('admin')}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{t.navAdmin}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Celestial World Concept & Deity Identity Disclaimer */}
        <div className="mt-12 pt-6 border-t border-stone-800 text-center space-y-3">
          <p className="text-[11px] text-stone-400 max-w-4xl mx-auto leading-relaxed font-sans">
            <strong className="text-amber-300 font-medium">Concept & Identity Notice: </strong>
            {t.footerCelestialDisclaimer}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 font-sans">
            <span>{t.footerCopyright}</span>
            <span>·</span>
            <span className="text-amber-400 font-mono">TVD – THILAGAVISHNU DEVASTHANAM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
