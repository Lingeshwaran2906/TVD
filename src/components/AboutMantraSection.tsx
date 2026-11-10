import React from 'react';
import { Sparkles, Heart, Shield, Sun, Volume2, Flame, Feather, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useMantraAudio } from '../context/MantraAudioContext.tsx';

export const AboutMantraSection: React.FC = () => {
  const { language } = useLanguage();
  const { isPlaying, isMuted, handleTopRightAudioTap } = useMantraAudio();

  const mantraTamilMeaning =
    "பிரார்த்தனைகள் மற்றும் வேண்டுதல்கள் கடவுளின் கிருபையைத் தேடுகின்றன மற்றும் பிரார்த்தனையின் பக்தியையும் உடையவை. நமது ஆன்மைகளுக்கு அமைதி, காதல் மற்றும் கருணையை வழங்குவதாக வேண்டுகிறோம், எதிர்கால சோதனைகளை கடக்க உதவும். வழிபாடு, பிரார்த்தனை மற்றும் உடல் மற்றும் மனதை சுத்திகரிப்பதன் மூலம், நாங்கள் நம்மை மேம்படுத்துவோம். எப்போதும் அவனுடைய அவதாரம், ஆசீர்வாதங்கள் மற்றும் பாதுகாப்பை நாடுங்கள். ஒற்றுமை, காதல் மற்றும் ஒழுங்கான மனதுடன், நமது வாழ்க்கைகள் வளமுறையடையும்.";

  const mantraEnglishMeaning =
    "Prayers and supplications seek the supreme divine grace of God, imbued with deep reverent devotion. We pray for tranquility, pure unconditional love, and boundless compassion to bless our souls, granting us resilience to transcend future trials. Through sanctified worship, heartfelt prayer, and the purification of body and mind, we elevate our spiritual being. Always seek His divine manifestation, sacred blessings, and perpetual celestial protection. With sacred unity, boundless love, and a serene, disciplined mind, our lives blossom in eternal prosperity and peace.";

  return (
    <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Outer Decorative Celestial Border Card */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 shadow-2xl">
        {/* Inner Container with Celestial Deep Maroon Background */}
        <div className="relative rounded-[22px] bg-gradient-to-b from-[#1c1109] via-[#24130a] to-[#140a05] p-6 sm:p-10 md:p-12 text-amber-50 overflow-hidden border border-amber-500/30">
          
          {/* Ornate Corner Accents */}
          <div className="absolute top-3 left-3 text-amber-400/40 pointer-events-none select-none text-xl font-serif">
            ❖ ━━
          </div>
          <div className="absolute top-3 right-3 text-amber-400/40 pointer-events-none select-none text-xl font-serif">
            ━━ ❖
          </div>
          <div className="absolute bottom-3 left-3 text-amber-400/40 pointer-events-none select-none text-xl font-serif">
            ❖ ━━
          </div>
          <div className="absolute bottom-3 right-3 text-amber-400/40 pointer-events-none select-none text-xl font-serif">
            ━━ ❖
          </div>

          {/* Ambient Glow Rays */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none golden-light-pulse" />

          {/* Header */}
          <div className="relative z-10 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[11px] font-sans uppercase tracking-widest text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'ta' ? 'புனித திலகாய மந்திரத்தின் தத்துவ விளக்கம்' : 'Inner Meaning & Philosophy of Sacred Mantra'}
              </span>
            </div>

            <h2 className="font-tamil text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 drop-shadow-md">
              ஓம் திலகாய நமஹா
            </h2>
            <div className="font-cinzel text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-amber-100">
              OM THILAGAYA NAMAHA
            </div>

            <p className="text-xs sm:text-sm text-amber-200/80 font-sans max-w-xl mx-auto">
              {language === 'ta'
                ? 'ஸ்ரீ திலகா விஷ்ணுவின் திருநாமம் ஓதி ஆன்ம அமைதியும், இறையருளும் பெறும் புண்ணிய விளக்கம்.'
                : 'The sacred spiritual contemplation on seeking divine grace, mental peace, and righteous prosperity.'}
            </p>
          </div>

          {/* Central Decorative Sacred Border with Provided Explanations */}
          <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tamil Explanation Card */}
            <div className="relative bg-gradient-to-b from-amber-950/60 to-stone-950/80 rounded-2xl p-6 sm:p-7 border border-amber-500/40 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <span className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-sans">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>மந்திரத்தின் ஆன்மீக விளக்கம் (தமிழ்)</span>
                </span>
                <span className="text-[10px] bg-amber-900/80 text-amber-200 px-2 py-0.5 rounded-full font-mono">
                  Tamil
                </span>
              </div>

              <p className="font-tamil text-sm sm:text-base leading-relaxed text-amber-100/90 text-justify">
                "{mantraTamilMeaning}"
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/80 font-tamil">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>உள்ளத் தூய்மை, கருணை மற்றும் குடும்ப சுபிட்சம் தரும் தேவலோக மந்திரம்.</span>
              </div>
            </div>

            {/* English Explanation Card */}
            <div className="relative bg-gradient-to-b from-amber-950/60 to-stone-950/80 rounded-2xl p-6 sm:p-7 border border-amber-500/40 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <span className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-sans">
                  <Feather className="w-4 h-4 text-amber-400" />
                  <span>Spiritual Philosophical Exposition (English)</span>
                </span>
                <span className="text-[10px] bg-amber-900/80 text-amber-200 px-2 py-0.5 rounded-full font-mono">
                  English
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm leading-relaxed text-stone-200 text-justify">
                "{mantraEnglishMeaning}"
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/80 font-sans">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Purity of mind, inner peace, and divine celestial guidance.</span>
              </div>
            </div>
          </div>

          {/* Pillars of Spiritual Elevation Ribbon */}
          <div className="relative z-10 mt-8 pt-6 border-t border-amber-500/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-stone-950/50 border border-amber-500/20 space-y-1">
              <Sun className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="font-cinzel text-xs font-bold text-amber-200">அமைதி / Peace</div>
              <div className="text-[11px] text-stone-400 font-sans">Tranquility of Soul</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/50 border border-amber-500/20 space-y-1">
              <Heart className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="font-cinzel text-xs font-bold text-amber-200">காதல் / Love</div>
              <div className="text-[11px] text-stone-400 font-sans">Universal Compassion</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/50 border border-amber-500/20 space-y-1">
              <Shield className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="font-cinzel text-xs font-bold text-amber-200">பாதுகாப்பு / Grace</div>
              <div className="text-[11px] text-stone-400 font-sans">Celestial Protection</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/50 border border-amber-500/20 space-y-1">
              <Sparkles className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="font-cinzel text-xs font-bold text-amber-200">வளம் / Prosperity</div>
              <div className="text-[11px] text-stone-400 font-sans">Spiritual Abundance</div>
            </div>
          </div>

          {/* Quick Play Audio Button inside the About Mantra card */}
          <div className="relative z-10 mt-6 text-center">
            <button
              onClick={handleTopRightAudioTap}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>
                {isPlaying && !isMuted
                  ? language === 'ta'
                    ? 'மந்திரத்தை ஒலியடக்க (Mute)'
                    : 'Mute Chanting Mantra'
                  : language === 'ta'
                  ? 'மந்திரப் பாடலை ஒலிக்கச் செய்க (Listen Now)'
                  : 'Listen to the Sacred Mantra'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
