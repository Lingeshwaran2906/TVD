import React from 'react';
import { Bell, Calendar, Tag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface AnnouncementsViewProps {
  onNavigate: (view: string) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { announcements } = useDevasthanam();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'அதிகாரப்பூர்வ தகவல் பலகை' : 'Administrative Bulletin'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
          {t.announcementsTitle}
        </h1>
        <p className="text-sm text-stone-600 font-sans max-w-xl mx-auto">
          {t.announcementsSubtitle}
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-3 hover:border-amber-400 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold text-stone-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-800" />
                <span>{ann.date}</span>
              </span>
              {ann.priority === 'urgent' && (
                <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  {language === 'ta' ? 'முக்கிய அறிவிப்பு' : 'Urgent Notice'}
                </span>
              )}
            </div>

            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
              {language === 'ta' ? ann.titleTa : ann.titleEn}
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              {language === 'ta' ? ann.bodyTa : ann.bodyEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
