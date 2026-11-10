import React, { useState } from 'react';
import { Bell, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface AnnouncementBarProps {
  onViewAll: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onViewAll }) => {
  const { language } = useLanguage();
  const { announcements } = useDevasthanam();
  const [dismissed, setDismissed] = useState(false);

  const activeAnnouncement = announcements.find((a) => a.active);

  if (!activeAnnouncement || dismissed) return null;

  const title = language === 'ta' ? activeAnnouncement.titleTa : activeAnnouncement.titleEn;

  return (
    <div className="bg-amber-950 text-amber-100 text-xs py-2 px-4 border-b border-amber-800/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] shrink-0">
            {language === 'ta' ? 'அறிவிப்பு' : 'Notice'}:
          </span>
          <span className="truncate text-amber-100/90 font-medium">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-100 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            <span>{language === 'ta' ? 'விவரம்' : 'Details'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-400/70 hover:text-amber-200 transition-colors p-0.5"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
