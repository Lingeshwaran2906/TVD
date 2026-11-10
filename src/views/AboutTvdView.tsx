import React from 'react';
import { Compass, Sparkles, Shield, Heart, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

interface AboutTvdViewProps {
  onNavigate: (view: string) => void;
}

export const AboutTvdView: React.FC<AboutTvdViewProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { templeInfo } = useDevasthanam();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'தேவஸ்தான அறிமுகம்' : 'About The Devasthanam'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {templeInfo.organizationNameEn}
        </h1>
        <div className="font-tamil text-2xl font-bold text-amber-900">
          {templeInfo.organizationNameTa}
        </div>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto">
          {language === 'ta'
            ? 'ஆன்மீக அமைதி, பக்தி ஒழுக்கம் மற்றும் தேவலோக தத்துவத்தை போற்றும் புனித டிஜிட்டல் தளம்.'
            : 'A modern digital sanctuary created to foster tranquility, transparent darshan administration, and heartfelt devotion.'}
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-cinzel text-xl font-bold text-stone-900">
            {language === 'ta' ? 'எங்கள் ஆன்மீக நோக்கம் (Vision)' : 'Our Spiritual Vision'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            {language === 'ta'
              ? 'TVD தேவஸ்தானம், உலகெங்கிலும் உள்ள பக்தர்கள் எவ்வித சிரமமுமின்றி ஸ்ரீ திலகா விஷ்ணுவின் தெய்வீக சாந்நித்தியத்தை தரிசிக்கவும், ஆன்ம அமைதியடையவும் ஒரு தூய ஆன்மீக பாலமாக செயல்படுகிறது. தேவலோக கருத்தாக்கம் மன அழுத்தத்தை குறைத்து, அமைதியான சிந்தனையை தூண்டுகிறது.'
              : 'To establish an ethereal celestial sanctuary where every devotee, regardless of geographic distance, can experience the profound peace of Sri Thilaga Vishnu through disciplined darshan slots, daily prayer, and sacred chants.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-cinzel text-xl font-bold text-stone-900">
            {language === 'ta' ? 'நிர்வாக கொள்கைகள் (Mission)' : 'Devotional Governance'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            {language === 'ta'
              ? 'அனைத்து தரிசன முன்பதிவுகளிலும் வெளிப்படைத்தன்மையை பேணுதலும், பக்தர்கள் சமர்ப்பிக்கும் விண்ணப்பங்களை முறையாக பரிசீலித்து நிர்வகிப்பதும், தேவஸ்தானத்தின் தூய்மையை கட்டிக்காப்பதும் எங்கள் தலையாய பணியாகும்.'
              : 'Upholding strict administrative transparency, ensuring verified capacity management for pilgrims, protecting devotee privacy, and preserving sacred reverence without commercial compromises.'}
          </p>
        </div>
      </div>

      {/* Concept Architecture Statement */}
      <div className="rounded-2xl bg-amber-950 text-amber-100 p-8 sm:p-10 border border-amber-800 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-400 font-sans">
          {language === 'ta' ? 'தேவலோக வடிவமைப்பு தத்துவம்' : 'The Celestial Design Concept'}
        </span>
        <h3 className="font-cinzel text-2xl font-bold text-white">
          {language === 'ta'
            ? 'விண் உலகம் / தேவலோகம் – ஒரு ஆன்மீக வடிவமைப்பு கருத்தாக்கம்'
            : 'Heaven / Celestial World – A Spiritual Concept'}
        </h3>
        <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans max-w-3xl">
          {language === 'ta'
            ? 'TVD தேவஸ்தானத்தில் சித்தரிக்கப்படும் தேவலோக சூழல் என்பது ஒரு ஆன்மீக வடிவமைப்பு கருத்தாகும் (Celestial Design Concept). இது ஒரு குறிப்பிட்ட புவியியல் அல்லது அரசாங்க அங்கீகாரம் பெற்ற முகவரியைக் குறிக்காமல், பக்தர்கள் தியானத்தில் தங்களை தேவலோக புனித சூழலில் உணர்வதற்காக உருவாக்கப்பட்ட அமைதியூட்டும் வடிவமைப்பாகும்.'
            : 'The celestial realm setting is an intentional artistic and spiritual design concept, representing a transcendent plane of light, lotus blossoms, and divine serenity rather than a physical earthbound geographical territory. This celestial atmosphere fosters meditation and reverent focus.'}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('darshan-booking')}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <span>{t.btnBookDarshan}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
