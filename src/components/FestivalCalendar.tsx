import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  X,
  ArrowRight,
  Info,
  CalendarCheck2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export interface CalendarEvent {
  id: string;
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  month: number; // 0-indexed (10 = Nov, 11 = Dec, etc.)
  year: number;
  type: 'festival' | 'pooja' | 'special';
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  timingsEn: string;
  timingsTa: string;
  image: string;
  badgeEn: string;
  badgeTa: string;
}

export const sampleCalendarEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    dateStr: '2026-11-15',
    dayNumber: 15,
    month: 10, // Nov
    year: 2026,
    type: 'pooja',
    titleEn: 'Karthigai Somavara Special Deepa Pooja',
    titleTa: 'கார்த்திகை சோமவார விசேஷ தீப பூஜை',
    descEn: 'Lighting of 108 auspicious ghee lamps in the celestial sanctum accompanied by divine Vedic chants.',
    descTa: 'தேவலோக திருச்சன்னிதியில் 108 நெய் தீபங்கள் ஏற்றி வேத மந்திரங்கள் முழங்க நடைபெறும் சிறப்பு பூஜை.',
    timingsEn: '06:00 PM – 08:30 PM',
    timingsTa: 'மாலை 06:00 – இரவு 08:30',
    image: '/assets/images/celestial_golden_sanctum_1794329926895.jpg',
    badgeEn: 'Special Seva',
    badgeTa: 'விசேஷ பூஜை',
  },
  {
    id: 'ev-2',
    dateStr: '2026-11-23',
    dayNumber: 23,
    month: 10, // Nov
    year: 2026,
    type: 'festival',
    titleEn: 'Karthigai Maha Deepam Celestial Darshan',
    titleTa: 'கார்த்திகை மகா தீப தேவலோக தரிசனம்',
    descEn: 'The monumental lighting of the cosmic beacon lamp on the celestial golden tower to illuminate the universe.',
    descTa: 'தேவலோக பொன் கோபுர உச்சி மீது மகா தீபம் ஏற்றப்பட்டு உலக அமைதிக்காக பிரார்த்திக்கப்படும் புண்ணிய பெருநாள்.',
    timingsEn: '05:30 AM – 10:00 PM (All Day Special Queue)',
    timingsTa: 'காலை 05:30 – இரவு 10:00 (நாள் முழுதும் சிறப்பு தரிசனம்)',
    image: '/assets/images/celestial_temple_gopuram_1794329927490.jpg',
    badgeEn: 'Maha Festival',
    badgeTa: 'மகா உத்ஸவம்',
  },
  {
    id: 'ev-3',
    dateStr: '2026-12-14',
    dayNumber: 14,
    month: 11, // Dec
    year: 2026,
    type: 'festival',
    titleEn: 'Celestial Brahmotsavam Inauguration (Dhwajarohanam)',
    titleTa: 'தேவலோக பிரம்மோத்ஸவ கொடியேற்றம்',
    descEn: 'Commencement of the 10-day grand celestial festival of Sri Thilaga Vishnu with sacred golden flag hoisting.',
    descTa: 'ஸ்ரீ திலகா விஷ்ணுவின் 10 நாள் மகா பிரம்மோத்ஸவ பெருவிழா மங்கள வாத்தியங்களுடன் பொன் கொடியேற்றத்துடன் துவங்குகிறது.',
    timingsEn: '07:30 AM Flag Hoisting & 06:30 PM Procession',
    timingsTa: 'காலை 07:30 கொடியேற்றம் & மாலை 06:30 வாகன உலா',
    image: '/assets/aistudio/image_3d04f7b1.png',
    badgeEn: 'Grand Festival',
    badgeTa: 'பெருவிழா',
  },
  {
    id: 'ev-4',
    dateStr: '2026-12-19',
    dayNumber: 19,
    month: 11, // Dec
    year: 2026,
    type: 'festival',
    titleEn: 'Vaikunta Ekadasi Celestial Gateway Darshan',
    titleTa: 'வைகுண்ட ஏகாதசி தேவலோக சொர்க்கவாசல் தரிசனம்',
    descEn: 'Opening of the transcendental Golden Celestial Gateway for all visiting devotees with divine blessings.',
    descTa: 'தேவலோக பரமபத வாசல் திறக்கப்பட்டு பக்தர்கள் அனைவருக்கும் விசேஷ அருள் தரிசனம் வழங்கப்படும் உன்னத நாள்.',
    timingsEn: '04:00 AM – 11:00 PM Continuous Darshan',
    timingsTa: 'விடியற்காலை 04:00 – இரவு 11:00 தொடர் தரிசனம்',
    image: '/assets/images/celestial_golden_sanctum_1794329926895.jpg',
    badgeEn: 'Auspicious Ekadasi',
    badgeTa: 'புண்ணிய ஏகாதசி',
  },
  {
    id: 'ev-5',
    dateStr: '2026-12-23',
    dayNumber: 23,
    month: 11, // Dec
    year: 2026,
    type: 'festival',
    titleEn: 'Brahmotsavam Celestial Thirukalyanam & Theerthavari',
    titleTa: 'பிரம்மோத்ஸவ திருக்கல்யாணம் & தீர்த்தவாரி',
    descEn: 'Divine cosmic wedding ceremony and holy celestial flower shower marking the grand conclusion of Brahmotsavam.',
    descTa: 'தேவலோக திருக்கல்யாண மகா வைபவமும், புனித புஷ்ப தீர்த்தவாரியும் நடைபெறும் நிறைவு நாள்.',
    timingsEn: '09:00 AM – 01:00 PM & 06:00 PM',
    timingsTa: 'காலை 09:00 – மதியம் 01:00 & மாலை 06:00',
    image: '/assets/aistudio/image_3d04f7b1.png',
    badgeEn: 'Thirukalyanam',
    badgeTa: 'திருக்கல்யாணம்',
  },
  {
    id: 'ev-6',
    dateStr: '2027-01-14',
    dayNumber: 14,
    month: 0, // Jan 2027
    year: 2027,
    type: 'festival',
    titleEn: 'Celestial Pongal & Makara Sankranti Abhishekam',
    titleTa: 'தேவலோக தைப்பொங்கல் & மகர சங்கராந்தி வழிபாடு',
    descEn: 'Offering of sacred sweet celestial pongal nivedyam and special floral garland seva to Sri Thilaga Vishnu.',
    descTa: 'புது நெல் சர்க்கரை பொங்கல் நைவேத்தியமும், ஸ்ரீ திலகா விஷ்ணுவிற்கு நறுமண மலர் மாலை அலங்கார வழிபாடும்.',
    timingsEn: '06:00 AM – 12:30 PM & 04:30 PM – 09:00 PM',
    timingsTa: 'காலை 06:00 – மதியம் 12:30 & மாலை 04:30 – இரவு 09:00',
    image: '/assets/images/celestial_temple_gopuram_1794329927490.jpg',
    badgeEn: 'Harvest Festival',
    badgeTa: 'பொங்கல் திருநாள்',
  },
  {
    id: 'ev-7',
    dateStr: '2027-02-01',
    dayNumber: 1,
    month: 1, // Feb 2027
    year: 2027,
    type: 'festival',
    titleEn: 'Celestial Thai Poosam Utsavam & Honey Anointing',
    titleTa: 'தேவலோக தைப்பூச பெருவிழா & தேன் அபிஷேகம்',
    descEn: 'Auspicious celebrations with special honey and sandal paste anointing ceremony in the celestial sanctum.',
    descTa: 'சந்தனக் காப்பு, வாசனை திரவிய அலங்காரம் மற்றும் விசேஷ தேவலோக ஆராதனைகளுடன் நடைபெறும் புண்ணிய உத்ஸவம்.',
    timingsEn: '05:30 AM – 09:30 PM',
    timingsTa: 'விடியற்காலை 05:30 – இரவு 09:30',
    image: '/assets/images/celestial_golden_sanctum_1794329926895.jpg',
    badgeEn: 'Thai Poosam',
    badgeTa: 'தைப்பூசம்',
  },
];

interface FestivalCalendarProps {
  onNavigateToBooking: () => void;
  onNavigateToPooja: () => void;
}

export const FestivalCalendar: React.FC<FestivalCalendarProps> = ({
  onNavigateToBooking,
  onNavigateToPooja,
}) => {
  const { language } = useLanguage();

  // Current calendar view month & year (starting November 2026)
  const [currentMonth, setCurrentMonth] = useState<number>(10); // 10 = November
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(sampleCalendarEvents[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'festival' | 'pooja'>('all');

  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthNamesTa = [
    'தை / ஜனவரி', 'மாசி / பிப்ரவரி', 'பங்குனி / மார்ச்', 'சித்திரை / ஏப்ரல்',
    'வைகாசி / மே', 'ஆனி / ஜூன்', 'ஆடி / ஜூலை', 'ஆவணி / ஆகஸ்ட்',
    'புரட்டாசி / செப்டம்பர்', 'ஐப்பசி / அக்டோபர்', 'கார்த்திகை / நவம்பர்', 'மார்கழி / டிசம்பர்'
  ];

  const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeekTa = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Compute days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Filter events for this month
  const monthEvents = sampleCalendarEvents.filter(
    (ev) =>
      ev.month === currentMonth &&
      ev.year === currentYear &&
      (categoryFilter === 'all' || ev.type === categoryFilter)
  );

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle clicking on a calendar date: opens the modal with event details in English & Tamil
  const handleDateClick = (event: CalendarEvent | undefined, day: number) => {
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    } else {
      // Create a default daily celestial darshan event for that day so devotee can view timings & book
      const defaultDailyEvent: CalendarEvent = {
        id: `daily-${currentYear}-${currentMonth}-${day}`,
        dateStr: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        dayNumber: day,
        month: currentMonth,
        year: currentYear,
        type: 'special',
        titleEn: 'Daily Celestial Nithya Darshan',
        titleTa: 'தினசரி தேவலோக நித்ய தரிசனம்',
        descEn: 'Serene daily darshan in the celestial sanctuary before Sri Thilaga Vishnu reclining upon the sacred Adishesha.',
        descTa: 'ஆதிசேஷன் மேல் ஆனந்த சயனத்தில் அருளும் ஸ்ரீ திலகா விஷ்ணுவின் தினசரி தேவலோக நித்ய தரிசனம்.',
        timingsEn: 'Morning: 06:00 AM – 12:30 PM | Evening: 04:30 PM – 09:00 PM',
        timingsTa: 'காலை: 06:00 – மதியம் 12:30 | மாலை: 04:30 – இரவு 09:00',
        image: '/assets/aistudio/image_3d04f7b1.png',
        badgeEn: 'Daily Darshan',
        badgeTa: 'நித்ய தரிசனம்',
      };
      setSelectedEvent(defaultDailyEvent);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-sm space-y-8">
      {/* Header and Month Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-amber-700" />
            <span>{language === 'ta' ? 'ஊடாடும் திருவிழா நாள்காட்டி' : 'Interactive Festival Calendar'}</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            {language === 'ta' ? monthNamesTa[currentMonth] : monthNamesEn[currentMonth]} {currentYear}
          </h2>
        </div>

        {/* Month Navigation & Category Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'all' ? 'bg-amber-900 text-amber-50 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'ta' ? 'அனைத்தும்' : 'All Events'}
            </button>
            <button
              onClick={() => setCategoryFilter('festival')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'festival' ? 'bg-amber-900 text-amber-50 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'ta' ? 'திருவிழாக்கள்' : 'Festivals'}
            </button>
            <button
              onClick={() => setCategoryFilter('pooja')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'pooja' ? 'bg-amber-900 text-amber-50 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'ta' ? 'விசேஷ பூஜைகள்' : 'Special Poojas'}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              title="Previous Month"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              title="Next Month"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Calendar Grid */}
      <div className="bg-stone-50/80 p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-inner">
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-stone-500 mb-3 font-sans">
          {(language === 'ta' ? daysOfWeekTa : daysOfWeekEn).map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
          {/* Blank leading days */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`blank-${i}`} className="min-h-[64px] sm:min-h-[80px] rounded-xl bg-transparent" />
          ))}

          {/* Days in Month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const eventOnDay = sampleCalendarEvents.find(
              (e) => e.dateStr === dateStr && (categoryFilter === 'all' || e.type === categoryFilter)
            );
            const isSelected = selectedEvent?.dateStr === dateStr;

            return (
              <button
                key={`day-${day}`}
                onClick={() => handleDateClick(eventOnDay, day)}
                className={`min-h-[64px] sm:min-h-[80px] p-2 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  eventOnDay
                    ? isSelected
                      ? 'bg-amber-100 border-amber-600 ring-2 ring-amber-500/50 shadow-md scale-102 z-10'
                      : 'bg-amber-50/90 border-amber-300 hover:bg-amber-100 hover:border-amber-500 shadow-xs'
                    : 'bg-white border-stone-200/70 hover:bg-stone-100/70 text-stone-700'
                }`}
                title={
                  eventOnDay
                    ? `${eventOnDay.titleEn} (${eventOnDay.titleTa}) - Click to view full details`
                    : `Day ${day} - Click to view darshan timings`
                }
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs sm:text-sm font-mono font-bold ${
                      eventOnDay ? 'text-amber-950 font-extrabold' : 'text-stone-700'
                    }`}
                  >
                    {day}
                  </span>
                  {eventOnDay && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-amber-300 animate-pulse" />
                  )}
                </div>

                {eventOnDay ? (
                  <div className="mt-1">
                    <span className="block text-[10px] sm:text-[11px] font-sans truncate font-semibold text-amber-900 bg-amber-200/70 px-1.5 py-0.5 rounded">
                      {language === 'ta' ? eventOnDay.badgeTa : eventOnDay.badgeEn}
                    </span>
                    <span className="hidden sm:block text-[9px] text-stone-600 truncate mt-0.5">
                      {language === 'ta' ? eventOnDay.titleTa : eventOnDay.titleEn}
                    </span>
                  </div>
                ) : (
                  <span className="text-[9px] text-stone-400 font-sans hidden sm:block">
                    {language === 'ta' ? 'தரிசனம்' : 'Darshan'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-500 font-sans gap-2">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-amber-300" />
            <span>{language === 'ta' ? 'விழா / பூஜை உள்ள நாள் (விவரம் காண கிளிக் செய்யவும்)' : 'Highlighted Event Date (Click to open details modal)'}</span>
          </span>
          <span className="font-semibold text-amber-900">
            {monthEvents.length} {language === 'ta' ? 'நிகழ்வுகள் உள்ளன' : 'events in this month'}
          </span>
        </div>
      </div>

      {/* =========================================================================
          EVENT DETAILS MODAL (Provided in BOTH English and Tamil)
          ========================================================================= */}
      {isModalOpen && selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#1b120c] via-[#24150d] to-[#120a06] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 text-amber-50 shadow-2xl space-y-6 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-600/40 transition-colors cursor-pointer z-10"
              aria-label="Close event modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sacred Event Image Banner */}
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-950 border border-amber-500/40 shadow-inner">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.titleEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-amber-900/95 text-amber-100 text-xs uppercase font-bold px-3 py-1 rounded-full backdrop-blur-xs font-sans border border-amber-400/30">
                {selectedEvent.badgeEn} · {selectedEvent.badgeTa}
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-mono text-amber-300 bg-stone-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
                <CalendarCheck2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedEvent.dateStr}</span>
              </div>
            </div>

            {/* Event Titles in BOTH English and Tamil */}
            <div className="space-y-2 border-b border-amber-500/20 pb-4">
              <div className="text-xs uppercase tracking-widest text-amber-400/90 font-sans font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auspicious Sacred Event / புண்ணிய தேவலோக உற்சவம்</span>
              </div>
              {/* English Title */}
              <h3 id="calendar-modal-title" className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100 leading-tight">
                {selectedEvent.titleEn}
              </h3>
              {/* Tamil Title */}
              <div className="font-tamil text-base sm:text-lg font-semibold text-amber-300">
                {selectedEvent.titleTa}
              </div>
            </div>

            {/* Event Timing in BOTH English and Tamil */}
            <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-sans">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Auspicious Timings / தரிசன நேரங்கள்</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                <div className="bg-amber-950/40 p-2.5 rounded-lg border border-amber-600/20">
                  <span className="text-stone-400 block text-[11px]">English:</span>
                  <span className="text-amber-100 font-semibold">{selectedEvent.timingsEn}</span>
                </div>
                <div className="bg-amber-950/40 p-2.5 rounded-lg border border-amber-600/20 font-tamil">
                  <span className="text-stone-400 block text-[11px] font-sans">தமிழ்:</span>
                  <span className="text-amber-200 font-semibold">{selectedEvent.timingsTa}</span>
                </div>
              </div>
            </div>

            {/* Event Description in BOTH English and Tamil */}
            <div className="space-y-3 font-sans">
              <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-600/20 space-y-1">
                <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                  Description (English)
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {selectedEvent.descEn}
                </p>
              </div>

              <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-600/20 space-y-1 font-tamil">
                <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider font-sans">
                  விளக்கம் (தமிழ்)
                </div>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                  {selectedEvent.descTa}
                </p>
              </div>
            </div>

            {/* Modal Action CTA Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  onNavigateToBooking();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>
                  {language === 'ta' ? 'விழா தரிசனம் பதிவு செய்க' : 'Book Festival Darshan'}
                </span>
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  onNavigateToPooja();
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-950/90 hover:bg-amber-900 border border-amber-600/50 text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>
                  {language === 'ta' ? 'விசேஷ பூஜை பதிவு செய்க' : 'Book Special Pooja'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
