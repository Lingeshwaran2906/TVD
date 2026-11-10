import React from 'react';
import {
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  ShieldCheck,
  Heart,
  BookOpen,
  ArrowRight,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';
import { AudioMantraPlayer } from '../components/AudioMantraPlayer.tsx';
import { FestivalCalendar } from '../components/FestivalCalendar.tsx';
import { AboutMantraSection } from '../components/AboutMantraSection.tsx';
import { SpiritualWisdom } from '../components/SpiritualWisdom.tsx';
import { VirtualPooja } from '../components/VirtualPooja.tsx';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { darshanCategories, poojaCategories, festivals, announcements, templeInfo } =
    useDevasthanam();

  const handleNav = (view: string) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* =========================================================================
          C. HERO SECTION WITH CELESTIAL FLOWING CLOUDS & GOLDEN LIGHT ANIMATIONS
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#180f0a] via-[#28150c] to-[#120804] text-amber-50 pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-amber-800/40">
        {/* Layer 1: Radial Golden Light & Ambient Saffron/Antique Gold Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/20 via-orange-950/20 to-transparent pointer-events-none" />

        {/* Layer 2: Gentle Pulsating Golden Light Rays (Pulsing Antique Gold and Saffron) */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-400/15 via-orange-500/10 to-transparent rounded-full blur-3xl golden-light-pulse pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-500/10 via-amber-700/15 to-transparent rounded-full blur-3xl golden-light-pulse pointer-events-none" style={{ animationDelay: '2.5s' }} />

        {/* Layer 3: Flowing Celestial Clouds (Back Slow Layer - Maroon & Golden mist) */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden h-72 opacity-40">
          <svg
            className="w-[200%] h-full cloud-flow-slow"
            viewBox="0 0 1440 320"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,213.3C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#cloudGradSlow)"
            />
            <defs>
              <linearGradient id="cloudGradSlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Layer 4: Flowing Celestial Clouds (Mid Fast Layer - Soft white & saffron billowing clouds) */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden h-56 opacity-30">
          <svg
            className="w-[200%] h-full cloud-flow-fast"
            viewBox="0 0 1440 320"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96L60,117.3C120,139,240,181,360,170.7C480,160,600,96,720,90.7C840,85,960,139,1080,165.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              fill="url(#cloudGradFast)"
            />
            <defs>
              <linearGradient id="cloudGradFast" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.25" />
                <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.3" />
                <stop offset="80%" stopColor="#fef08a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating golden stardust particle specks */}
        <div className="absolute top-12 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-60 celestial-float pointer-events-none" />
        <div className="absolute top-28 right-1/3 w-2 h-2 rounded-full bg-yellow-200 opacity-70 celestial-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-44 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 opacity-50 celestial-float pointer-events-none" style={{ animationDelay: '3s' }} />
        <div className="absolute top-64 right-1/6 w-2 h-2 rounded-full bg-orange-300 opacity-60 celestial-float pointer-events-none" style={{ animationDelay: '4.5s' }} />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Header Wordmark & Official Identity */}
            <div className="space-y-2">
              <span className="inline-block text-xs uppercase tracking-widest font-semibold text-amber-300 bg-amber-950/80 border border-amber-600/40 px-3.5 py-1 rounded-full font-sans shadow-xs">
                {t.heroBadge}
              </span>
              <div className="text-amber-400/90 font-cinzel text-sm sm:text-base tracking-widest font-semibold">
                {templeInfo.shortName}
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {templeInfo.organizationNameEn}
              </h1>
              <div className="font-tamil text-2xl sm:text-3xl font-bold text-amber-300">
                {templeInfo.organizationNameTa}
              </div>
            </div>

            {/* Sacred Deity Headline with Pulsing Antique Gold Border */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/60 border border-amber-500/40 backdrop-blur-xs space-y-2 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-amber-400/10 rounded-full blur-xl golden-light-pulse pointer-events-none" />
              <div className="text-xs uppercase tracking-widest text-amber-300/80 font-sans">
                {language === 'ta' ? 'அருள்மிகு மூலவர் திருவுருவம்' : 'Sacred Supreme Deity'}
              </div>
              <div className="font-tamil text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300">
                {templeInfo.deityTamilName}
              </div>
              <div className="font-cinzel text-lg sm:text-xl font-bold text-amber-100 tracking-wider">
                {templeInfo.deityNameEn}
              </div>
              <div className="pt-2 border-t border-amber-700/30 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm text-amber-200">
                <span className="font-tamil font-semibold text-amber-300">
                  {templeInfo.mantraTa}
                </span>
                <span className="text-amber-500">·</span>
                <span className="font-cinzel font-semibold text-amber-200">
                  {templeInfo.mantraEn}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
              {language === 'ta'
                ? 'தேவலோக திருச்சன்னிதியில் ஆதிசேஷன் மேல் ஆனந்த சயனத்தில் அருளும் ஸ்ரீ திலகா விஷ்ணுவின் தரிசனம் பெற்று ஆன்ம அமைதியும், சகல சுபிட்சமும் பெறுங்கள்.'
                : 'Welcome to the celestial digital presence of TVD. Experience the peaceful divine presence of Sri Thilaga Vishnu reclining serenely in the celestial sanctuary, bestowing peace and transcendent blessings upon all seekers.'}
            </p>

            {/* Call To Action Buttons (Explore TVD, Book Darshan, Explore Pooja) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleNav('darshan-booking')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-900" />
                <span>{t.btnBookDarshan}</span>
              </button>

              <button
                onClick={() => handleNav('about-tvd')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-amber-100 bg-amber-950/80 hover:bg-amber-900/80 border border-amber-600/50 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{t.btnExploreTvd}</span>
              </button>

              <button
                onClick={() => handleNav('pooja-seva')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-amber-200 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{t.btnExplorePooja}</span>
              </button>
            </div>

            {/* Operational Timing Ribbon */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-amber-300/80 font-sans">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t.heroDarshanTimings}</span>
            </div>
          </div>

          {/* Right Image Column (5 cols) - The uploaded deity photograph is the authoritative visual identity */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              {/* Pulsating Golden Divine Aura Effect behind Deity */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-3xl blur-md opacity-50 group-hover:opacity-75 transition duration-500 golden-light-pulse" />

              <div className="relative rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-400/60 shadow-2xl">
                {/* Authoritative Deity Photograph - Strictly preserved without obstruction */}
                <img
                  src="/assets/aistudio/image_3d04f7b1.png"
                  alt="Sri Thilaga Vishnu - Authoritative Divine Photograph, TVD"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtitle Scrim */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-center">
                  <div className="font-tamil text-lg font-bold text-amber-200">
                    {templeInfo.deityTamilName}
                  </div>
                  <div className="font-cinzel text-xs font-semibold tracking-wider text-amber-300">
                    {templeInfo.deityNameEn}
                  </div>
                  <div className="text-[10px] text-amber-200/70 mt-1 uppercase tracking-widest font-sans">
                    {language === 'ta' ? 'அசல் அதிகாரப்பூர்வ திருவுருவம்' : 'Authoritative Sacred Deity Photo'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          D. WELCOME SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-amber-900/10 shadow-xs space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
              {language === 'ta' ? 'அறிமுகம் & நோக்கம்' : 'Spiritual Introduction'}
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
              {t.welcomeHeading}
            </h2>
            <p className="text-base sm:text-lg text-amber-900/80 font-medium font-sans">
              {t.welcomeSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
            <p>{t.welcomeText1}</p>
            <p>{t.welcomeText2}</p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-2">
              <div className="font-semibold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{language === 'ta' ? 'தேவலோக சாந்நித்தியம்' : 'Celestial Sanctuary'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'ta'
                  ? 'விண் உலக அமைதியில் தியானித்து ஆன்மீக அமைதி பெறும் பக்தி அனுபவம்.'
                  : 'A tranquil realm of meditation and quiet contemplation rooted in divine celestial harmony.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-2">
              <div className="font-semibold text-amber-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>{language === 'ta' ? 'முறையான தரிசனம்' : 'Verified Darshan'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'ta'
                  ? 'பக்தர்கள் நெரிசலின்றி அமைதியாக வழிபட டிஜிட்டல் நேர முன்பதிவு ஏற்பாடு.'
                  : 'Organized online booking with verified slots to ensure peace and devotion for every pilgrim.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-2">
              <div className="font-semibold text-amber-950 flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-700" />
                <span>{language === 'ta' ? 'சங்கல்ப பூஜைகள்' : 'Dedicated Seva'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'ta'
                  ? 'குடும்ப நலம் மற்றும் சுபிட்சத்திற்கான புனித அர்ச்சனை மற்றும் வழிபாடுகள்.'
                  : 'Sacred rituals, Sahasranama recital, and festival prayers offered in devotee gothram.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEVOTIONAL MANTRA EXPERIENCE (Prompt: Prominently featured mantra)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AudioMantraPlayer />

        {/* Sacred About Mantra Section with Decorative Celestial Border */}
        <AboutMantraSection />

        {/* Spiritual Wisdom Rotating Devotional Quotes */}
        <SpiritualWisdom />
      </section>

      {/* =========================================================================
          E. DARSHAN SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
              {language === 'ta' ? 'புனித தரிசனம்' : 'Sacred Darshan'}
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
              {t.darshanTitle}
            </h2>
            <p className="text-sm text-stone-600 font-sans">
              {t.darshanSubtitle}
            </p>
          </div>
          <button
            onClick={() => handleNav('darshan-booking')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 text-amber-50 text-xs font-semibold hover:bg-amber-800 transition-colors shrink-0"
          >
            <span>{t.btnBookDarshan}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {darshanCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-800 font-semibold font-sans">
                  <span>{language === 'ta' ? category.badgeTa : category.badgeEn}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500 font-mono">{category.durationMinutes} mins</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-cinzel">
                  {language === 'ta' ? category.nameTa : category.nameEn}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {language === 'ta' ? category.descTa : category.descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-medium text-amber-900">
                  {language === 'ta' ? category.priceNoteTa : category.priceNoteEn}
                </span>
                <button
                  onClick={() => handleNav('darshan-booking')}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ta' ? 'பதிவு செய்' : 'Select'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          F. POOJA & SEVA SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
              {language === 'ta' ? 'அர்ச்சனை & வழிபாடுகள்' : 'Rituals & Offerings'}
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
              {t.navPooja}
            </h2>
            <p className="text-sm text-stone-600 font-sans">
              {language === 'ta'
                ? 'ஸ்ரீ திலகா விஷ்ணுவிற்கு நைவேத்தியம் மற்றும் தீப வழிபாடுகளை மேற்கொள்ளுங்கள்'
                : 'Sponsor auspicious sevas and offer heartfelt prayers in the celestial sanctum'}
            </p>
          </div>
          <button
            onClick={() => handleNav('pooja-booking')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 text-amber-50 text-xs font-semibold hover:bg-amber-800 transition-colors shrink-0"
          >
            <span>{t.navPoojaBooking}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {poojaCategories.slice(0, 4).map((pooja) => (
            <div
              key={pooja.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-cinzel">
                    {language === 'ta' ? pooja.nameTa : pooja.nameEn}
                  </h3>
                  <div className="text-xs text-amber-800 font-medium mt-1 font-sans">
                    {language === 'ta' ? pooja.timingTa : pooja.timingEn}
                  </div>
                </div>
                {pooja.isSpecial && (
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md shrink-0">
                    {language === 'ta' ? 'விசேஷ பூஜை' : 'Special Seva'}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {language === 'ta' ? pooja.descTa : pooja.descEn}
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-sans">
                  {language === 'ta' ? pooja.availableDaysTa : pooja.availableDaysEn}
                </span>
                <button
                  onClick={() => handleNav('pooja-booking')}
                  className="font-semibold text-amber-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ta' ? 'முன்பதிவு' : 'Book Seva'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          G. FESTIVALS SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
            {language === 'ta' ? 'தேவலோக உற்சவங்கள்' : 'Celestial Celebrations'}
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
            {t.festivalsTitle}
          </h2>
          <p className="text-sm text-stone-600 font-sans">
            {t.festivalsSubtitle}
          </p>
        </div>

        {/* Interactive Month-by-Month Calendar */}
        <FestivalCalendar
          onNavigateToBooking={() => handleNav('darshan-booking')}
          onNavigateToPooja={() => handleNav('pooja-booking')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {festivals.map((fest) => (
            <div
              key={fest.id}
              className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-xs space-y-4 hover:border-amber-400 transition-colors"
            >
              <div className="text-xs font-semibold text-amber-700 font-mono">
                {language === 'ta' ? fest.dateTa : fest.dateEn}
              </div>
              <h3 className="text-base font-bold text-stone-900 font-cinzel">
                {language === 'ta' ? fest.titleTa : fest.titleEn}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {language === 'ta' ? fest.descTa : fest.descEn}
              </p>
              <div className="pt-2 text-[11px] text-stone-500 font-sans">
                {language === 'ta' ? fest.timeTa : fest.timeEn}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          H. LATEST NEWS & ANNOUNCEMENTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-cinzel text-2xl font-bold text-stone-900">
              {t.announcementsTitle}
            </h2>
            <p className="text-xs text-stone-600 font-sans">{t.announcementsSubtitle}</p>
          </div>
          <button
            onClick={() => handleNav('announcements')}
            className="text-xs font-semibold text-amber-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ta' ? 'அனைத்தும் காண்க' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {announcements.slice(0, 3).map((ann) => (
            <div
              key={ann.id}
              className="bg-white p-5 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                  <span>{ann.date}</span>
                  {ann.priority === 'urgent' && (
                    <span className="text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                      {language === 'ta' ? 'முக்கிய அறிவிப்பு' : 'Important'}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-stone-900">
                  {language === 'ta' ? ann.titleTa : ann.titleEn}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                  {language === 'ta' ? ann.bodyTa : ann.bodyEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          I. GALLERY TEASER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-cinzel text-2xl font-bold text-stone-900">
              {t.navGallery}
            </h2>
            <p className="text-xs text-stone-600 font-sans">
              {language === 'ta'
                ? 'அருள்மிகு ஸ்ரீ திலகா விஷ்ணுவின் அதிகாரப்பூர்வ திருவுருவம் மற்றும் தேவலோக காட்சிகள்'
                : 'Sacred visual identity of Sri Thilaga Vishnu and celestial temple visions'}
            </p>
          </div>
          <button
            onClick={() => handleNav('gallery')}
            className="text-xs font-semibold text-amber-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ta' ? 'முழு தொகுப்பு' : 'Full Gallery'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Original Deity Photo - Authoritative Image */}
          <div className="md:col-span-1 rounded-2xl overflow-hidden bg-stone-900 border border-amber-500/40 shadow-md group relative">
            <img
              src="/assets/aistudio/image_3d04f7b1.png"
              alt="Sri Thilaga Vishnu Authoritative Deity"
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-semibold text-amber-200">
                {templeInfo.deityNameEn} · {templeInfo.deityTamilName}
              </span>
            </div>
          </div>

          {/* Celestial Gopuram Architecture */}
          <div className="rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-md group relative">
            <img
              src="/assets/images/celestial_temple_gopuram_1794329927490.jpg"
              alt="Celestial Temple Gopuram in Clouds"
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-semibold text-amber-200">
                {language === 'ta' ? 'தேவலோக கோபுர தரிசனம்' : 'Celestial Gopuram in Heavenly Clouds'}
              </span>
            </div>
          </div>

          {/* Celestial Golden Sanctum */}
          <div className="rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-md group relative">
            <img
              src="/assets/images/celestial_golden_sanctum_1794329926895.jpg"
              alt="Celestial Golden Sanctum"
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-semibold text-amber-200">
                {language === 'ta' ? 'தேவலோக பொன் மண்டபம்' : 'Celestial Golden Sanctum & Lotus Hall'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8"><VirtualPooja /></div>

      {/* =========================================================================
          J. DONATIONS NOTICE (Prompt: keep payment collection disabled until authorized)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-stone-900 to-amber-950 p-8 sm:p-10 text-amber-100 border border-amber-700/40 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-sans">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t.donationsTitle}</span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            {language === 'ta' ? 'திருக்கோயில் திருப்பணி & காணிக்கை வழிகாட்டுதல்' : 'Support Sacred Temple Activities & Community Service'}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-sans max-w-3xl">
            {t.donationsDisabledNotice}
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleNav('donations')}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs transition-colors"
            >
              {language === 'ta' ? 'காணிக்கை பிரிவுகள் & தகவல்' : 'View Offering Categories'}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          K. CONTACT DESK QUICK SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-cinzel text-xl font-bold text-stone-900">
              {t.contactTitle}
            </h3>
            <p className="text-xs text-stone-600 font-sans max-w-xl">
              {t.contactAddressNote}
            </p>
          </div>
          <button
            onClick={() => handleNav('contact')}
            className="px-6 py-3 rounded-xl bg-amber-950 text-amber-100 text-xs font-semibold hover:bg-amber-900 transition-colors shrink-0"
          >
            {language === 'ta' ? 'தொடர்பு கொள்க' : 'Contact Devotee Desk'}
          </button>
        </div>
      </section>
    </div>
  );
};
