import React from 'react';
import { BookOpen, Sparkles, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface PoojaSevaViewProps {
  onNavigate: (view: string) => void;
}

export const PoojaSevaView: React.FC<PoojaSevaViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { poojaCategories } = useDevasthanam();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'அர்ச்சனை & வழிபாட்டு பட்டியல்' : 'Pooja & Seva Catalogue'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {t.navPooja}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto">
          {language === 'ta'
            ? 'ஸ்ரீ திலகா விஷ்ணுவின் திருவடிகளில் உங்கள் குடும்பத்தின் பெயரிலும் கோத்திரத்திலும் சமர்ப்பிக்கப்படும் புனித வழிபாடுகள்.'
            : 'Sacred pujas and floral offerings conducted in the name and gothram of devotees for peace, health, and auspiciousness.'}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('pooja-booking')}
            className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold inline-flex items-center gap-2 shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>{t.navPoojaBooking}</span>
          </button>
        </div>
      </div>

      {/* Catalogue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {poojaCategories.map((pooja) => (
          <div
            key={pooja.id}
            className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-amber-400 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                {pooja.isSpecial && (
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
                    {language === 'ta' ? 'விசேஷ பூஜை' : 'Special Seva'}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  {language === 'ta' ? pooja.nameTa : pooja.nameEn}
                </h3>
                <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mt-1 font-sans">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? pooja.timingTa : pooja.timingEn}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                {language === 'ta' ? pooja.descTa : pooja.descEn}
              </p>

              <div className="text-xs text-stone-500 font-sans flex items-center gap-1.5 pt-2">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>
                  {language === 'ta' ? 'நடைபெறும் நாட்கள்' : 'Schedule'}:{' '}
                  <strong className="text-stone-700">
                    {language === 'ta' ? pooja.availableDaysTa : pooja.availableDaysEn}
                  </strong>
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-amber-900 font-semibold">
                {language === 'ta' ? 'சங்கல்ப பதிவு' : 'Sankalpam Included'}
              </span>
              <button
                onClick={() => onNavigate('pooja-booking')}
                className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <span>{language === 'ta' ? 'முன்பதிவு செய்' : 'Book Seva'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
