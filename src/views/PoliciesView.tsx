import React, { useState } from 'react';
import { Shield, FileText, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export const PoliciesView: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cancellation'>('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'அதிகாரப்பூர்வ நெறிமுறைகள்' : 'Official Guidelines'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
          {language === 'ta' ? 'தேவஸ்தான கொள்கைகள் & வழிகாட்டுதல்கள்' : 'Devotional Policies & Terms'}
        </h1>
        <p className="text-sm text-stone-600 font-sans max-w-xl mx-auto">
          {language === 'ta'
            ? 'பக்தர்களின் தனிநபர் பாதுகாப்பு, கோயில் விதிமுறைகள் மற்றும் முன்பதிவு ரத்து வழிகாட்டு நெறிமுறைகள்.'
            : 'Devotee privacy protection, sanctum guidelines, and booking cancellation terms.'}
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex flex-wrap p-1 bg-stone-200/80 rounded-xl mt-4 gap-1">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{t.privacyTitle}</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.termsTitle}</span>
          </button>
          <button
            onClick={() => setActiveTab('cancellation')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'cancellation'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>{t.cancellationTitle}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed font-sans">
        {/* 1. Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-cinzel text-xl font-bold text-stone-900">
              {t.privacyTitle}
            </h2>
            <p>
              {language === 'ta'
                ? 'TVD – திலகவிஷ்ணு தேவஸ்தானம் தங்களின் தனிநபர் தகவல்களின் பாதுகாப்பை முதன்மையாக கருதுகிறது. ஆன்லைன் தரிசனம் மற்றும் பூஜை முன்பதிவுகளுக்காக பெறப்படும் தகவல்கள் строго ரகசியமாக வைக்கப்படும்.'
                : 'TVD – Thilagavishnu Devasthanam strictly protects the personal confidentiality of pilgrims and seekers. Devotee details provided during online darshan or pooja booking are used exclusively for verification and scheduling.'}
            </p>
            <h3 className="font-bold text-stone-900 pt-2">
              {language === 'ta' ? 'தகவல் பயன்பாடு' : 'Data Usage Policy'}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-stone-600">
              <li>
                {language === 'ta'
                  ? 'பக்தர்களின் மின்னஞ்சல் மற்றும் தொலைபேசி எண் தரிசன அனுமதிச் சீட்டு தகவல்களுக்கு மட்டுமே பயன்படுத்தப்படும்.'
                  : 'Contact details (email and mobile) are solely used for pass generation and important seva notifications.'}
              </li>
              <li>
                {language === 'ta'
                  ? 'எக்காரணம் கொண்டும் மூன்றாம் தரப்பினருக்கு விளம்பர நோக்கங்களுக்காக தகவல்கள் பகிரப்படாது.'
                  : 'We never sell, rent, or distribute devotee records to commercial third-party marketing services.'}
              </li>
              <li>
                {language === 'ta'
                  ? 'நிர்வாக தரவுத்தளத்தில் அனைத்து பதிவுகளும் பாதுகாப்பான நெறிமுறைகளுடன் சேமிக்கப்படுகின்றன.'
                  : 'All electronic data is safeguarded with robust administrative access controls and encrypted storage.'}
              </li>
            </ul>
          </div>
        )}

        {/* 2. Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-cinzel text-xl font-bold text-stone-900">
              {t.termsTitle}
            </h2>
            <p>
              {language === 'ta'
                ? 'TVD தேவஸ்தான தளத்தைப் பயன்படுத்தும் அனைத்து பக்தர்களும் கீழ்க்கண்ட ஆன்மீக விதிமுறைகளையும் வழிகாட்டுதல்களையும் பின்பற்ற கடமைப்பட்டுள்ளனர்.'
                : 'By registering for darshan or seva via the TVD portal, devotees agree to uphold the following devotional guidelines and standards.'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-stone-600">
              <li>
                {language === 'ta'
                  ? 'அடையாள அசல் திருவுருவம்: பதிவேற்றப்பட்ட அசல் புகைப்படமே ஸ்ரீ திலகா விஷ்ணுவின் அதிகாரப்பூர்வ அடையாளமாகும். இதனை பிற தெய்வங்களுடன் குழப்பவோ மாற்றி அமைக்கவோ கூடாது.'
                  : 'Authoritative Identity: The uploaded photograph represents the official visual identity of Sri Thilaga Vishnu. It must not be conflated with other characters.'}
              </li>
              <li>
                {language === 'ta'
                  ? 'தேவலோக கருத்தாக்கம்: TVD ஒரு ஆன்மீக வடிவமைப்பு கருத்தாக்கத்தை (Celestial Realm) பிரதிபலிக்கிறது. இது ஒரு புவியியல் முகவரியாகாது.'
                  : 'Celestial Concept: The Devasthanam represents a celestial world concept for meditation and prayer, not a physically bound land registry address.'}
              </li>
              <li>
                {language === 'ta'
                  ? 'ஒழுங்கு & அமைதி: முன்பதிவு செய்யப்பட்ட நேரப்பிரிவுக்கு 15 நிமிடங்கள் முன்னதாக வருகை தர வேண்டும்.'
                  : 'Decorum & Punctuality: Devotees must adhere to their selected slot times and arrive with devotional decorum.'}
              </li>
            </ul>
          </div>
        )}

        {/* 3. Cancellation Policy */}
        {activeTab === 'cancellation' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-cinzel text-xl font-bold text-stone-900">
              {t.cancellationTitle}
            </h2>
            <p>
              {language === 'ta'
                ? 'பக்தர்கள் தங்கள் பயணத் திட்டங்களில் எதிர்பாராத மாற்றங்கள் ஏற்படும் பட்சத்தில், முன்பதிவை ரத்து செய்வதற்கான எளிய வழிமுறைகளை தேவஸ்தானம் வழங்குகிறது.'
                : 'To ensure optimal queue management and fair availability for other pilgrims, TVD provides a transparent, easy cancellation process.'}
            </p>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 space-y-2">
              <div className="font-bold text-amber-950">
                {language === 'ta' ? 'முன்பதிவு ரத்து விதிமுறைகள்' : 'Cancellation Terms'}:
              </div>
              <ul className="list-disc list-inside space-y-1 text-stone-700">
                <li>
                  {language === 'ta'
                    ? 'தரிசன நாளுக்கு முன்னர் எந்த நேரத்திலும் ஆன்லைனில் குறிப்பு எண்ணை உள்ளிட்டு சுலபமாக ரத்து செய்யலாம்.'
                    : 'Devotees can cancel pending or approved bookings anytime prior to the scheduled darshan date via the Track Booking tab.'}
                </li>
                <li>
                  {language === 'ta'
                    ? 'முன்பதிவு ரத்து செய்யப்பட்டவுடன், அந்த இடங்கள் உடனடியாக பிற பக்தர்களின் பயன்பாட்டிற்காக விடுவிக்கப்படும்.'
                    : 'Upon cancellation, the reserved capacity is immediately released back to the general slot pool.'}
                </li>
                <li>
                  {language === 'ta'
                    ? 'ஏற்கனவே கடந்த தேதிகளுக்கான தரிசன சீட்டுகளை ரத்து செய்ய இயலாது.'
                    : 'Past or expired booking dates cannot be retroactively cancelled.'}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
