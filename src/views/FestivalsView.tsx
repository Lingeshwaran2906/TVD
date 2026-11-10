import React from 'react';
import { Calendar, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

import { FestivalCalendar } from '../components/FestivalCalendar.tsx';

interface FestivalsViewProps {
  onNavigate: (view: string) => void;
}

export const FestivalsView: React.FC<FestivalsViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { festivals } = useDevasthanam();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'தேவஸ்தான திருவிழாக்கள்' : 'Auspicious Celebrations'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {t.festivalsTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto">
          {t.festivalsSubtitle}
        </p>
      </div>

      {/* Festival Calendar Component with Bilingual Date-Click Modal */}
      <FestivalCalendar
        onNavigateToBooking={() => onNavigate('darshan-booking')}
        onNavigateToPooja={() => onNavigate('pooja-booking')}
      />

      {/* Festivals List */}
      <div className="space-y-6">
        {festivals.map((fest) => (
          <div
            key={fest.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-amber-400 transition-colors"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? fest.dateTa : fest.dateEn}</span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-500 font-sans">{language === 'ta' ? fest.timeTa : fest.timeEn}</span>
              </div>

              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
                {language === 'ta' ? fest.titleTa : fest.titleEn}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                {language === 'ta' ? fest.descTa : fest.descEn}
              </p>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                onClick={() => onNavigate('darshan-booking')}
                className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>{language === 'ta' ? 'விழா தரிசனம் பதிவு' : 'Book Festival Darshan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
