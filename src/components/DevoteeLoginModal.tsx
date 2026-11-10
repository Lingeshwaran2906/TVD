import React, { useEffect, useState } from 'react';
import { User, Phone, Sparkles, X, ShieldCheck, LogOut, CheckCircle2, Ticket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface DevoteeLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPasses?: () => void;
}

export interface DevoteeProfile {
  name: string;
  phone: string;
  gothram: string;
  nakshatram: string;
  devoteeId: string;
  isLoggedIn: boolean;
}

export const DevoteeLoginModal: React.FC<DevoteeLoginModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPasses,
}) => {
  const { language } = useLanguage();
  const { darshanBookings } = useDevasthanam();

  // Local storage profile or default
  const [name, setName] = useState('Anbarasan Raman');
  const [phone, setPhone] = useState('9876543210');
  const [gothram, setGothram] = useState('Kashyapa');
  const [nakshatram, setNakshatram] = useState('Rohini');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Keep the page behind the dialog still, and allow Escape to close it.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    localStorage.setItem(
      'tvd_devotee_profile',
      JSON.stringify({
        name,
        phone,
        gothram,
        nakshatram,
        devoteeId: `TVD-${phone.slice(-4)}-${Date.now().toString().slice(-4)}`,
        isLoggedIn: true,
      })
    );
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('tvd_devotee_profile');
    setIsLoggedIn(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="devotee-modal-backdrop fixed inset-0 z-[120] flex items-start sm:items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-md overflow-y-auto overscroll-contain animate-fade-in"
      onClick={onClose}
    >
      <div
        className="devotee-modal-panel relative w-full max-w-md max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] overflow-y-auto overscroll-contain bg-gradient-to-b from-[#1c120a] via-[#24150c] to-[#120a06] border-2 border-amber-500/50 rounded-3xl p-5 sm:p-8 text-amber-50 shadow-2xl space-y-6 my-2 sm:my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 z-20 ml-auto -mt-1 -mb-10 flex w-fit p-2 rounded-full bg-amber-950/95 hover:bg-amber-900 text-amber-300 border border-amber-600/50 shadow-lg transition-colors cursor-pointer"
          aria-label="Close Devotee Login Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!isLoggedIn ? (
          /* Login / Registration Form */
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-amber-400 font-bold">
                <User className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'பக்தர் உள்நுழைவு தளம்' : 'Devotee Pilgrim Portal'}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {language === 'ta' ? 'பக்தர் கணக்கு' : 'Devotee Sign In'}
              </h3>
              <p className="text-xs text-stone-300 font-sans">
                {language === 'ta'
                  ? 'தங்களின் தரிசன அனுமதி சீட்டுகள் மற்றும் சங்கல்ப விவரங்களை உடனுக்குடன் பார்வையிடலாம்.'
                  : 'Access your darshan passes, pooja registrations, and sankalpam profile.'}
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block text-amber-200 font-medium mb-1">
                  {language === 'ta' ? 'பக்தர் பெயர்' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramanathan S"
                  className="w-full bg-stone-900/90 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-amber-200 font-medium mb-1">
                  {language === 'ta' ? 'கைபேசி எண்' : 'Mobile Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-stone-900/90 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-200 font-medium mb-1">
                    {language === 'ta' ? 'கோத்திரம் (விருப்பத்தேர்வு)' : 'Gothram (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={gothram}
                    onChange={(e) => setGothram(e.target.value)}
                    placeholder="e.g. Kashyapa"
                    className="w-full bg-stone-900/90 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-amber-200 font-medium mb-1">
                    {language === 'ta' ? 'நட்சத்திரம்' : 'Nakshatram'}
                  </label>
                  <input
                    type="text"
                    value={nakshatram}
                    onChange={(e) => setNakshatram(e.target.value)}
                    placeholder="e.g. Rohini"
                    className="w-full bg-stone-900/90 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ta' ? 'உள்நுழைக / பதிவு செய்க' : 'Sign In as Devotee'}</span>
            </button>

            <div className="text-center">
              <span className="text-[11px] text-stone-400 font-sans">
                {language === 'ta'
                  ? 'நிர்வாக அணுகலுக்கு மேல் வலது மூலையில் உள்ள "நிர்வாக தளம்" ஐப் பயன்படுத்தவும்.'
                  : 'For Temple Staff / Admin, use the "Admin Portal" in the top bar.'}
              </span>
            </div>
          </form>
        ) : (
          /* Profile & Active Passes View */
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center font-bold text-lg">
                {name.charAt(0)}
              </div>
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white">{name}</h4>
                <div className="text-xs text-amber-300/80 font-mono">📱 +91 {phone}</div>
                <div className="text-[11px] text-stone-400 font-sans">
                  Gothram: {gothram} · Star: {nakshatram}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold border-b border-stone-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ta' ? 'எனது தரிசன அனுமதி சீட்டுகள்' : 'My Active Darshan Passes'}</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {darshanBookings.length} {language === 'ta' ? 'பதிவுகள்' : 'passes'}
                </span>
              </div>

              {darshanBookings.slice(0, 2).map((b) => (
                <div
                  key={b.id}
                  className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/20 text-xs font-mono flex items-center justify-between"
                >
                  <div>
                    <div className="text-white font-bold">{b.referenceNumber}</div>
                    <div className="text-[11px] text-stone-400">{b.date} · {b.slotTime}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-sans font-bold">
                    {b.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigateToPasses) onNavigateToPasses();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'ta' ? 'அனைத்து சீட்டுகளையும் காண்க' : 'View All E-Passes'}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-red-400 border border-red-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span>{language === 'ta' ? 'வெளியேறு' : 'Logout'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
