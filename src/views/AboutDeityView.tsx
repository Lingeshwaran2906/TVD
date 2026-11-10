import React from 'react';
import { Sparkles, Shield, Heart, Info, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface AboutDeityViewProps {
  onNavigate: (view: string) => void;
}

export const AboutDeityView: React.FC<AboutDeityViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { templeInfo } = useDevasthanam();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'அருள்மிகு மூலவர் அறிமுகம்' : 'Sacred Divine Identity'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {templeInfo.deityNameEn}
        </h1>
        <div className="font-tamil text-2xl sm:text-3xl font-extrabold text-amber-900">
          {templeInfo.deityTamilName}
        </div>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto">
          {language === 'ta'
            ? 'தேவலோக திருச்சன்னிதியில் ஆதிசேஷன் மேல் அருளும் முழுமுதற் பெருமான் ஸ்ரீ திலகா விஷ்ணுவின் தெய்வீக சாந்நித்தியம்.'
            : 'The authoritative divine presence of Sri Thilaga Vishnu, reclining in cosmic serenity upon the celestial serpent couch.'}
        </p>
      </div>

      {/* Main Authoritative Portrait Presentation */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Official Photograph - STRICTLY PRESERVED WITHOUT MODIFICATION */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 rounded-3xl blur-md opacity-30" />
              <div className="relative rounded-2xl overflow-hidden bg-stone-950 border-2 border-amber-500/60 shadow-2xl">
                <img
                  src="/assets/aistudio/image_3d04f7b1.png"
                  alt="Sri Thilaga Vishnu - The Authoritative Original Deity Photograph"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-stone-950/90 text-center border-t border-amber-500/30">
                  <span className="font-cinzel text-xs font-semibold text-amber-300 block">
                    {templeInfo.deityNameEn}
                  </span>
                  <span className="font-tamil text-[11px] text-amber-200/80 block">
                    {templeInfo.deityTamilName} · {templeInfo.mantraTa}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Sacred Identity Prose */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 font-sans">
                {language === 'ta' ? 'அதிகாரப்பூர்வ திருவுருவ சாந்நித்தியம்' : 'Authoritative Visual Identity'}
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-stone-900 leading-snug">
                {language === 'ta'
                  ? 'ஸ்ரீ திலகா விஷ்ணு – ஆனந்த அமைதியின் திருவுருவம்'
                  : 'Sri Thilaga Vishnu – The Embodiment of Celestial Tranquility'}
              </h2>
            </div>

            <div className="space-y-4 text-sm text-stone-700 leading-relaxed font-sans">
              <p>
                {language === 'ta'
                  ? 'திலகவிஷ்ணு தேவஸ்தானத்தின் (TVD) மூல மூர்த்தியாக விளங்குபவர் ஸ்ரீ திலகா விஷ்ணு ஆவார். இந்த திருவுருவமே தேவஸ்தானத்தின் பிரதான ஆன்மீக அடையாளமாகும்.'
                  : 'Sri Thilaga Vishnu is the authoritative supreme deity of TVD – Thilagavishnu Devasthanam. This original photograph serves as the sacred, immutable visual identity around which the entire digital sanctuary is established.'}
              </p>
              <p>
                {language === 'ta'
                  ? 'தேவலோக பாற்கடல் பரப்பில், ஐந்து தலை ஆதிசேஷன் மேல் ஆனந்த சயன திருக்கோலத்தில் அருள்பாலிக்கும் தெய்வீக திருக்கோலம் பக்தர்களுக்கு எல்லையற்ற மன அமைதியையும், ஆன்மீக பலத்தையும் அருள்கிறது.'
                  : 'Depicted in the celestial realm resting serenely upon the coils of the multi-hooded divine serpent amid floating celestial lotuses and golden domes, Sri Thilaga Vishnu represents eternal peace, cosmic grace, and spiritual protection.'}
              </p>
              <p>
                {language === 'ta'
                  ? 'தேவஸ்தானத்தின் புனித திரு மந்திரமான "ஓம் திலகாய நமஹா" உச்சரித்து வழிபடப்படும் பொழுது, மன சஞ்சலங்கள் நீங்கி ஆனந்த சுபிட்சம் உண்டாகிறது.'
                  : 'Through the continuous chanting of the sacred mantra "OM THILAGAYA NAMAHA", seekers invite clarity, auspicious vibrations, and profound internal tranquility.'}
              </p>
            </div>

            {/* Sacred Mantra Callout */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 font-sans">
                {language === 'ta' ? 'புனித திரு மந்திரம்' : 'Official Divine Mantra'}
              </span>
              <div className="font-tamil text-2xl font-bold text-amber-900">
                {templeInfo.mantraTa}
              </div>
              <div className="font-cinzel text-sm font-semibold text-amber-950">
                {templeInfo.mantraEn}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('darshan-booking')}
                className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>{t.btnBookDarshan}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Identity Integrity Notice */}
      <div className="p-6 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 space-y-2 font-sans">
        <div className="flex items-center gap-2 text-stone-800 font-semibold">
          <Info className="w-4 h-4 text-amber-800" />
          <span>{language === 'ta' ? 'அதிகாரப்பூர்வ பக்தி விதிமுறை' : 'Authoritative Identity Standard'}</span>
        </div>
        <p className="leading-relaxed">
          {language === 'ta'
            ? 'TVD தேவஸ்தானம் ஸ்ரீ திலகா விஷ்ணுவின் அசல் திருவுருவ புகைப்படத்தை முழுமையாக பாதுகாக்கிறது. வேறு எந்த மாற்றுக் கதாபாத்திரங்களுடனும் அல்லது ஊகிக்கப்பட்ட புராணக் கதைகளுடனும் தொடர்புபடுத்தாமல், முழுமையான பக்தி உணர்வுடன் இந்த தளம் நிர்வகிக்கப்படுகிறது.'
            : 'TVD – Thilagavishnu Devasthanam preserves and honors the uploaded authentic photograph as the definitive visual reality of Sri Thilaga Vishnu without substituting or conflating with other characters or unverified mythological claims.'}
        </p>
      </div>
    </div>
  );
};
