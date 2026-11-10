import React from 'react';
import { Sparkles, Calendar, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface HistoryViewProps {
  onNavigate: (view: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { templeInfo } = useDevasthanam();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'தேவலோக வரலாறு & சாந்நித்தியம்' : 'Chronicle & Celestial Realm'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {language === 'ta' ? 'தேவலோக திருச்சன்னிதியின் தோற்றம்' : 'The Celestial Sanctuary of TVD'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto">
          {language === 'ta'
            ? 'ஆன்மீக அமைதியை நாடும் பக்தர்களுக்காக விண் உலக கருத்தாக்கத்தில் அமைக்கப்பட்ட தெய்வீக திருத்தலம்.'
            : 'Understanding the celestial architectural symbolism and the peaceful presence of Sri Thilaga Vishnu.'}
        </p>
      </div>

      {/* Narrative Section with Generated Celestial Temple Architecture */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md space-y-8">
        <div className="rounded-2xl overflow-hidden border border-stone-200">
          <img
            src="/assets/images/celestial_temple_gopuram_1794329927490.jpg"
            alt="TVD Celestial Temple Realm"
            className="w-full h-72 sm:h-96 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
          <h2 className="font-cinzel text-2xl font-bold text-stone-900">
            {language === 'ta'
              ? 'பொன்னொளிர் தேவலோக கோபுரங்களும் மேக மண்டலங்களும்'
              : 'Golden Towers in the Heavenly Ether'}
          </h2>
          <p>
            {language === 'ta'
              ? 'தென்னிந்திய திராவிட பாரம்பரிய திருக்கோயில் கலை நயமும், தேவலோக பொற்கோயில் தத்துவமும் ஒன்றிணைந்து இந்த டிஜிட்டல் ஆலயத்தில் காட்சிப்படுத்தப்பட்டுள்ளது. தங்க கோபுரங்கள் வெண்மேகக் கூட்டங்களுக்கு இடையே எழுந்து நிற்பது, மனதை உலகியல் மாயைகளில் இருந்து உயர்த்தி ஆன்மீக ஒளிக்கு கொண்டு செல்லும் அடையாளமாகும்.'
              : 'Inspired by classical South Indian temple architecture blended with celestial golden palaces, the imagery of majestic gopurams rising through radiant clouds evokes an atmosphere of cosmic peace and timeless grandeur. Here, architectural motifs transcend earthly gravity, inviting contemplative focus.'}
          </p>
          <p>
            {language === 'ta'
              ? 'ஸ்ரீ திலகா விஷ்ணு ஆதிசேஷனின் ஆனந்த சயனத்தில் துயில்வது, உலக உயிர்களின் அமைதிக்காகவும், சஞ்சலமற்ற பேரமைதிக்காகவும் தியானிக்கும் உன்னத நிலையை குறிக்கிறது.'
              : 'Sri Thilaga Vishnu is envisioned resting serenely in Anantha Sayana pose upon the sacred multi-headed serpent, representing eternal preservation, unwavering balance, and quiet grace amid the ever-moving cosmic waters.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
          <div className="font-semibold text-amber-950 font-cinzel text-lg">
            {language === 'ta' ? 'அதிகாரப்பூர்வ திரு மந்திர மகிமை' : 'The Sacred Power of the Official Mantra'}
          </div>
          <div className="font-tamil text-2xl font-bold text-amber-900">
            {templeInfo.mantraTa}
          </div>
          <div className="font-cinzel text-sm font-semibold text-amber-800">
            {templeInfo.mantraEn}
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            {language === 'ta'
              ? 'இந்த மந்திரத்தை தினமும் 108 முறை தியானித்து ஓதுவோருக்கு மன அமைதி, குடும்ப நலம் மற்றும் ஆன்மீக ஞானம் கிட்டும் என்பது நம்பிக்கையாகும்.'
              : 'Chanting this official mantra with a serene mind invites internal tranquility, dispelling worries and filling the devotee with harmonious divine energy.'}
          </p>
        </div>

        <div className="flex justify-end pt-4">
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
  );
};
