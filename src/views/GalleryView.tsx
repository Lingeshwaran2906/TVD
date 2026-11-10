import React, { useState } from 'react';
import { Sparkles, Eye, Film, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

export const GalleryView: React.FC = () => {
  const { t, language } = useLanguage();
  const { templeInfo } = useDevasthanam();
  const [activeMedia, setActiveMedia] = useState<{ src: string; title: string; desc: string; type: 'image' | 'video' } | null>(null);

  const galleryItems = [
    {
      id: 'gal-deity',
      type: 'image' as const,
      src: '/assets/aistudio/image_3d04f7b1.png',
      titleEn: 'Sri Thilaga Vishnu – Authoritative Sacred Deity Photograph',
      titleTa: 'ஸ்ரீ திலகா விஷ்ணு – அதிகாரப்பூர்வ மூலவர் திருவுருவம்',
      descEn: 'The authoritative, authentic photograph of Sri Thilaga Vishnu resting upon the celestial serpent in the heavenly sanctuary.',
      descTa: 'தேவலோக பாற்கடலில் ஆதிசேஷன் மேல் ஆனந்த சயனத்தில் அருளும் ஸ்ரீ திலகா விஷ்ணுவின் அதிகாரப்பூர்வ திருவுருவம்.',
      tag: 'Authoritative Deity',
    },
    {
      id: 'gal-gopuram',
      type: 'image' as const,
      src: '/assets/images/celestial_temple_gopuram_1794329927490.jpg',
      titleEn: 'Celestial Temple Gopuram in Heavenly Clouds',
      titleTa: 'தேவலோக பொன் கோபுர தரிசனம்',
      descEn: 'Architectural representation of the celestial Dravidian temple palace amidst radiant golden clouds.',
      descTa: 'வெண்மேக கூட்டங்களின் மேல் ஒளிரும் தேவலோக திராவிட பொற்கோயில் கோபுரங்களின் தெய்வீக தோற்றம்.',
      tag: 'Temple Realm',
    },
    {
      id: 'gal-sanctum',
      type: 'image' as const,
      src: '/assets/images/celestial_golden_sanctum_1794329926895.jpg',
      titleEn: 'Celestial Golden Sanctum & Sacred Lotus Hall',
      titleTa: 'தேவலோக பொன் மண்டபம் & தாமரை தடாகம்',
      descEn: 'Inner sanctum corridor adorned with golden pillars and floating divine lotus blossoms.',
      descTa: 'தங்க தூண்களும், தெய்வீக தாமரை மலர்களும் மிளிரும் தேவலோக திருச்சன்னிதி பிரகாரம்.',
      tag: 'Sanctum View',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'புனித புகைப்பட & வீடியோ அரங்கம்' : 'Sacred Visual Archive'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {t.navGallery}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl mx-auto">
          {language === 'ta'
            ? 'ஸ்ரீ திலகா விஷ்ணுவின் அசல் திருவுருவப்படம் மற்றும் தேவலோக திருக்கோயில் காட்சிகள்.'
            : 'Explore high-resolution contemplation of Sri Thilaga Vishnu and celestial temple realms.'}
        </p>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
            onClick={() =>
              setActiveMedia({
                src: item.src,
                title: language === 'ta' ? item.titleTa : item.titleEn,
                desc: language === 'ta' ? item.descTa : item.descEn,
                type: 'image',
              })
            }
          >
            <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
              <img
                src={item.src}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-3 rounded-full bg-stone-900/80 text-amber-300">
                  <Eye className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 font-sans">
                {item.tag}
              </span>
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                {language === 'ta' ? item.titleTa : item.titleEn}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 font-sans">
                {language === 'ta' ? item.descTa : item.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Darshan Experience Card */}
      <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 text-amber-50 border border-amber-800/40 shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-sans">
          <Film className="w-4 h-4" />
          <span>{language === 'ta' ? 'வீடியோ தரிசனம் & தியானம்' : 'Contemplative Video Darshan'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-stone-950 border border-amber-500/30 relative aspect-16/9 flex items-center justify-center">
            {/* Ambient video darshan simulation with animated subtle golden aura */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-stone-950 to-stone-950" />
            <img
              src="/assets/aistudio/image_3d04f7b1.png"
              alt="Sri Thilaga Vishnu Sacred Darshan Video"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent flex items-end p-6">
              <div>
                <div className="font-tamil text-xl font-bold text-amber-200">
                  {templeInfo.deityTamilName}
                </div>
                <div className="font-cinzel text-xs text-amber-300">
                  {templeInfo.mantraEn} · {templeInfo.mantraTa}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              {language === 'ta' ? 'தேவலோக ஏகாந்த தியான வீடியோ' : 'Celestial Meditative Contemplation'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              {language === 'ta'
                ? 'தினசரி பூஜையின் போது ஒலிக்கும் தேவலோக நாதஸ்வரம், கோயில் மணி ஓசை மற்றும் புனித மந்திரத்துடன் இணைந்த அமைதியான தியான தரிசனம்.'
                : 'Immerse in the peaceful ambience of the sanctum with the gentle resonant tones of temple bells and the sacred vibration of "OM THILAGAYA NAMAHA".'}
            </p>
            <div className="pt-2">
              <div className="p-3 rounded-xl bg-stone-800/80 border border-amber-500/20 text-xs text-amber-300 font-sans">
                ✨ {language === 'ta' ? 'முகப்பில் உள்ள ஆடியோ பிளேயரை இயக்கி மந்திரத்தை கேளுங்கள்' : 'Use the Audio Player on the Home page to listen to the sacred mantra drone.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lightbox */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-950 rounded-2xl overflow-hidden border border-amber-600/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeMedia.src}
              alt={activeMedia.title}
              className="w-full max-h-[70vh] object-contain bg-black"
              referrerPolicy="no-referrer"
            />

            <div className="p-6 bg-stone-950 space-y-2 border-t border-stone-800">
              <h4 className="font-cinzel text-lg font-bold text-amber-200">
                {activeMedia.title}
              </h4>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                {activeMedia.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
