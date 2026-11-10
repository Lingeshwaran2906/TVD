import React from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useMantraAudio } from '../context/MantraAudioContext.tsx';

export const AudioMantraPlayer: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    setVolume,
    chantCount,
    incrementChant,
    resetChant,
    playTempleBell,
  } = useMantraAudio();

  const progressPercent = Math.min(100, Math.round((chantCount / 108) * 100));

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#180f0a] via-[#24130b] to-[#120804] p-6 md:p-10 text-amber-50 shadow-2xl border border-amber-600/30">
      {/* Celestial Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />

      {/* Floating animated golden light effect */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl golden-light-pulse pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl golden-light-pulse pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Subtle Section Kicker */}
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300/80 font-sans">
          <span>{t.heroBadge}</span>
          <span>·</span>
          <span>{t.brandName}</span>
        </div>

        {/* Sacred Official Mantra Typography */}
        <div className="space-y-3 py-2">
          <div className="font-tamil text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 drop-shadow-md">
            {t.officialMantraTamil}
          </div>
          <div className="font-cinzel text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider text-amber-100">
            {t.officialMantraEnglish}
          </div>
          <div className="bg-amber-950/60 border border-amber-600/30 rounded-2xl p-4 max-w-xl mx-auto space-y-2">
            <p className="font-tamil text-sm md:text-base text-amber-200 font-medium leading-relaxed">
              "திருநாமம் சொல்லி உள்ளம் அமைதி பெறும்... ஒளி போல மனம் மலரும்... அருள் நிறைந்து தழுவும்... ஓம் திலகாய நமஹ"
            </p>
            <p className="text-xs text-amber-300/70 font-sans">
              {language === 'ta'
                ? 'அதிகாரப்பூர்வ தேவஸ்தான பக்தி இசைப் பாடல் · தானியங்கி இயக்கம் (Auto-playing)'
                : 'Official Sacred TVD Chanting Track · Continuous Divine Ambient Chanting'}
            </p>
          </div>
        </div>

        {/* Interactive Audio Controls Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 pb-2">
          <button
            onClick={togglePlay}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-md ${
              isPlaying && !isMuted
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold shadow-amber-600/30 ring-2 ring-amber-400/50'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40'
            }`}
            aria-label={isPlaying ? t.mantraPauseAudio : t.mantraPlayAudio}
          >
            {isPlaying && !isMuted ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current text-amber-400" />
            )}
            <span>
              {isPlaying && !isMuted
                ? language === 'ta'
                  ? 'பாடலை நிறுத்து'
                  : 'Pause Mantra'
                : language === 'ta'
                ? 'மந்திரப் பாடலை இயக்கு'
                : 'Play Sacred Mantra'}
            </span>
          </button>

          {/* Volume and Mute Controls */}
          <div className="flex items-center gap-3 bg-stone-900/90 px-4 py-2.5 rounded-xl border border-amber-500/30">
            <button
              onClick={toggleMute}
              className={`p-1 rounded-md transition-colors ${
                isMuted ? 'text-red-400 hover:text-red-300' : 'text-amber-300 hover:text-white'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              aria-label="Celestial Tanpura Volume"
            />
          </div>

          {/* Manual Temple Bell Toll Affordance */}
          <button
            onClick={() => playTempleBell(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/80 border border-amber-600/40 text-amber-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            title="Ring Temple Bronze Bell"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ta' ? 'கோயில் மணி ஒலி' : 'Ring Temple Bell'}</span>
          </button>
        </div>

        {/* 108 Sacred Japa Chanting Counter */}
        <div className="mt-6 pt-6 border-t border-amber-500/20 max-w-lg mx-auto">
          <div className="flex items-center justify-between text-xs text-amber-300/80 mb-2 font-sans">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.mantraJapaCounter}</span>
            </span>
            <span className="font-mono tabular-nums text-amber-200 font-semibold">
              {chantCount} / 108
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-800/80 h-2.5 rounded-full overflow-hidden border border-amber-500/20 mb-4">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Chant Tap Button */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={incrementChant}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold text-sm shadow-md transition-all active:scale-95"
            >
              Tap to Chant: {t.officialMantraTamil} ({chantCount}/108)
            </button>
            <button
              onClick={resetChant}
              className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/20 transition-colors"
              title={t.mantraResetCounter}
              aria-label={t.mantraResetCounter}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {chantCount === 108 && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs md:text-sm animate-fade-in font-sans">
              ✨ {t.mantraCompletedMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
