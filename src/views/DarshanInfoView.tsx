import React from 'react';
import { Clock, ShieldCheck, Heart, AlertCircle, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface DarshanInfoViewProps {
  onNavigate: (view: string) => void;
}

export const DarshanInfoView: React.FC<DarshanInfoViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { darshanCategories, darshanSlots } = useDevasthanam();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'தரிசன வழிகாட்டு நெறிமுறைகள்' : 'Devotee Guidelines'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {t.darshanTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto">
          {t.darshanSubtitle}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('darshan-booking')}
            className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold inline-flex items-center gap-2 shadow-xs"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{t.btnBookDarshan}</span>
          </button>
        </div>
      </div>

      {/* Daily Operating Timings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-amber-900">
            <Clock className="w-6 h-6 text-amber-700" />
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              {language === 'ta' ? 'காலை தேவலோக தரிசனம்' : 'Morning Celestial Darshan'}
            </h2>
          </div>
          <div className="font-mono text-2xl font-bold text-amber-950">
            06:00 AM – 12:30 PM
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            {language === 'ta'
              ? 'விடியற்காலை சுப்ரபாத ஆராதனை, நித்ய அர்ச்சனை மற்றும் காலை சர்வ தரிசன நேரங்கள்.'
              : 'Includes early morning suprabhatam aradhana, floral seva, and morning Sarva Darshan queues.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-amber-900">
            <Clock className="w-6 h-6 text-amber-700" />
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              {language === 'ta' ? 'மாலை தேவலோக தரிசனம்' : 'Evening Celestial Darshan'}
            </h2>
          </div>
          <div className="font-mono text-2xl font-bold text-amber-950">
            04:30 PM – 09:00 PM
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            {language === 'ta'
              ? 'மாலை சாயரட்சை தீபாராதனை, தேவலோக பக்தி இசை மற்றும் இரவு ஏகாந்த சயன தரிசனம்.'
              : 'Features sunset sayarakshai deeparadhana, sacred chant recitals, and night sayana darshan.'}
          </p>
        </div>
      </div>

      {/* Darshan Categories Detailed */}
      <div className="space-y-6">
        <h2 className="font-cinzel text-2xl font-bold text-stone-900">
          {language === 'ta' ? 'தரிசனப் பிரிவுகள்' : 'Darshan Categories'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {darshanCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold text-amber-800 font-sans block">
                  {language === 'ta' ? cat.badgeTa : cat.badgeEn}
                </span>
                <h3 className="font-cinzel font-bold text-lg text-stone-900">
                  {language === 'ta' ? cat.nameTa : cat.nameEn}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {language === 'ta' ? cat.descTa : cat.descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-medium text-stone-700">
                  {language === 'ta' ? cat.priceNoteTa : cat.priceNoteEn}
                </span>
                <button
                  onClick={() => onNavigate('darshan-booking')}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ta' ? 'முன்பதிவு' : 'Book'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dress Code & Devotional Rules */}
      <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200 space-y-4 font-sans text-xs sm:text-sm text-stone-800">
        <div className="flex items-center gap-2 text-amber-900 font-bold font-cinzel text-base">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <span>{language === 'ta' ? 'ஆடை கட்டுப்பாடு & பக்தி நெறிமுறைகள்' : 'Devotional Dress Code & Sanctum Decorum'}</span>
        </div>
        <p className="leading-relaxed">
          {t.darshanDressCode}
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-stone-700">
          <li>
            {language === 'ta'
              ? 'காலணிகள், தோல் பொருட்கள் மற்றும் வெளிப்புற மின்னணு சாதனங்களை தேவலோக நுழைவாயிலில் ஒப்படைக்கவும்.'
              : 'Footwear and electronic equipment must be placed in the designated lockers before entering.'}
          </li>
          <li>
            {language === 'ta'
              ? 'திருச்சன்னிதியில் மனதை ஒருமுகப்படுத்தி "ஓம் திலகாய நமஹா" மந்திரத்தை நினைவில் கொள்ளவும்.'
              : 'Pilgrims are encouraged to chant the sacred mantra "OM THILAGAYA NAMAHA" during their queue.'}
          </li>
          <li>
            {language === 'ta'
              ? 'முன்பதிவு செய்த பக்தர்கள் தங்கள் அனுமதிச் சீட்டு மற்றும் அடையாள அட்டையை தயாராக வைத்திருக்கவும்.'
              : 'Devotees holding online registration passes are requested to present their reference ID upon arrival.'}
          </li>
        </ul>
      </div>
    </div>
  );
};
