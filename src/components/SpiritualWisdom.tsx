import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Sparkles, Pause, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface WisdomQuote {
  id: string;
  quoteTa: string;
  quoteEn: string;
  sourceTa: string;
  sourceEn: string;
  themeTa: string;
  themeEn: string;
}

const wisdomQuotes: WisdomQuote[] = [
  {
    id: 'w-1',
    quoteTa: 'திருநாமம் சொல்லி உள்ளம் அமைதி பெறும்; அலைபாயும் மனம் அடங்கி இறையருள் ஒளிரும்.',
    quoteEn: 'Uttering the sacred name brings tranquility to the soul; the wandering mind stills as divine grace shines through.',
    sourceTa: 'திலகாய தேவலோக உபதேசம்',
    sourceEn: 'TVD Celestial Teaching',
    themeTa: 'மன அமைதி',
    themeEn: 'Inner Stillness',
  },
  {
    id: 'w-2',
    quoteTa: 'ஒற்றுமை, அன்பு மற்றும் ஒழுங்கான மனதுடன் செய்யும் பிரார்த்தனை சகல சோதனைகளையும் வெல்லும் சக்தியை அளிக்கிறது.',
    quoteEn: 'Prayer offered with unity, boundless love, and a disciplined heart grants the resilience to triumph over every trial.',
    sourceTa: 'திலகாய தத்துவ ரகசியம்',
    sourceEn: 'Philosophy of Thilaga Vishnu',
    themeTa: 'பக்தி & வலிமை',
    themeEn: 'Devotion & Fortitude',
  },
  {
    id: 'w-3',
    quoteTa: 'உடல் மற்றும் மனதை தூய்மை செய்து அன்பை அனைவரிடமும் செலுத்துவதே உண்மையான தேவலோக வழிபாடு.',
    quoteEn: 'Purifying the body and mind while radiating unconditional compassion to all beings is true celestial worship.',
    sourceTa: 'தேவஸ்தான பக்தி நெறி',
    sourceEn: 'Sacred Path of Devasthanam',
    themeTa: 'அன்பும் தூய்மையும்',
    themeEn: 'Love & Purification',
  },
  {
    id: 'w-4',
    quoteTa: 'எப்போதும் அவனுடைய அவதாரம், ஆசீர்வாதங்கள் மற்றும் தெய்வீக பாதுகாப்பை நாடுங்கள்; வாழ்க்கை சுபிட்சமடையும்.',
    quoteEn: 'Ever seek His divine presence, sacred blessings, and perpetual protection; your journey shall blossom in eternal grace.',
    sourceTa: 'ஓம் திலகாய நமஹா போதனை',
    sourceEn: 'Wisdom of OM THILAGAYA NAMAHA',
    themeTa: 'இறையருள்',
    themeEn: 'Divine Grace',
  },
];

export const SpiritualWisdom: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-rotate every 7 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wisdomQuotes.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? wisdomQuotes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wisdomQuotes.length);
  };

  const currentQuote = wisdomQuotes[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative max-w-4xl mx-auto px-4 sm:px-6 my-10 animate-fade-in"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d120a] via-[#2a160d] to-[#160c06] p-6 sm:p-10 border border-amber-600/40 shadow-xl text-amber-50">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Top Header & Indicator */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Quote className="w-4 h-4 fill-current" />
            </span>
            <div>
              <div className="text-[10px] uppercase font-sans tracking-widest text-amber-400 font-bold">
                {language === 'ta' ? 'ஞான அமுதம் · ஆன்மீக சிந்தனை' : 'Spiritual Wisdom · Daily Contemplation'}
              </div>
              <div className="text-xs text-amber-200/80 font-sans">
                {language === 'ta' ? currentQuote.themeTa : currentQuote.themeEn}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg border border-amber-500/30 text-amber-300 hover:bg-amber-950/80 transition-colors text-xs"
              title={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
            >
              {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
            </button>
            <span className="text-xs font-mono text-amber-400 font-bold">
              {currentIndex + 1} / {wisdomQuotes.length}
            </span>
          </div>
        </div>

        {/* Active Quote Content */}
        <div className="relative z-10 min-h-[140px] flex flex-col justify-center space-y-4">
          {/* Tamil Quote */}
          <p className="font-tamil text-base sm:text-lg md:text-xl font-medium leading-relaxed text-amber-100 italic">
            "{currentQuote.quoteTa}"
          </p>

          {/* English Quote */}
          <p className="font-cinzel text-xs sm:text-sm text-stone-300 leading-relaxed">
            "{currentQuote.quoteEn}"
          </p>

          {/* Source Attribution */}
          <div className="pt-2 flex items-center justify-between text-xs text-amber-300/80 font-sans">
            <span className="flex items-center gap-1.5 font-tamil">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{language === 'ta' ? currentQuote.sourceTa : currentQuote.sourceEn}</span>
            </span>
            <span className="text-[11px] text-stone-400">
              TVD – Thilagavishnu Devasthanam
            </span>
          </div>
        </div>

        {/* Controls and Pagination Dots */}
        <div className="relative z-10 mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {wisdomQuotes.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-7 bg-amber-400 shadow-xs'
                    : 'w-2 bg-amber-500/30 hover:bg-amber-500/60'
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-stone-900/80 hover:bg-amber-900 border border-amber-500/30 text-amber-300 transition-colors cursor-pointer"
              aria-label="Previous Quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-stone-900/80 hover:bg-amber-900 border border-amber-500/30 text-amber-300 transition-colors cursor-pointer"
              aria-label="Next Quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
