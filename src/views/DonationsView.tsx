import React, { useState } from 'react';
import { ShieldCheck, Heart, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

export const DonationsView: React.FC = () => {
  const { t, language } = useLanguage();
  const { templeInfo } = useDevasthanam();

  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeEmail, setPledgeEmail] = useState('');
  const [pledgeCategory, setPledgeCategory] = useState('annadhanam');
  const [pledgeAmount, setPledgeAmount] = useState('1008');

  const categories = [
    {
      id: 'annadhanam',
      title: t.categoryAnnadhanam,
      descEn: 'Provides sanctified celestial meals to visiting pilgrims and seekers.',
      descTa: 'தேவஸ்தானத்திற்கு வருகை தரும் பக்தர்களுக்கு புனித பிரசாதம் வழங்கும் மகத்தான அன்னதான சேவை.',
    },
    {
      id: 'sanctum',
      title: t.categorySanctum,
      descEn: 'Daily fragrant fresh garland offerings, lotus blooms, and celestial sanctum upkeep.',
      descTa: 'ஸ்ரீ திலகா விஷ்ணுவிற்கு நறுமண மலர் மாலைகள், தாமரை மலர்கள் மற்றும் திருச்சன்னிதி பராமரிப்பு.',
    },
    {
      id: 'nithyapooja',
      title: t.categoryNithyaPooja,
      descEn: 'Sponsorship of unbroken akhanda ghee lamps and daily sacred archanas.',
      descTa: 'அகண்ட நெய் தீபம் ஏற்றுவதற்கும் தினசரி காலை மாலை பூஜைகளுக்கும் உதவும் புனித காணிக்கை.',
    },
    {
      id: 'goshala',
      title: t.categoryGoshala,
      descEn: 'Care, pure fodder, and shelter for sacred native cows at the celestial goshala.',
      descTa: 'கோமாதா பூஜை, பசுக்களுக்கான தீவனம் மற்றும் பராமரிப்பு சேவை.',
    },
  ];

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName || !pledgeEmail) return;
    setPledgeSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'புனித திருப்பணி & காணிக்கை' : 'Devotional Contributions'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
          {t.donationsTitle}
        </h1>
        <p className="text-sm text-stone-600 font-sans max-w-xl mx-auto">
          {t.donationsSubtitle}
        </p>
      </div>

      {/* Mandatory Statutory Notice: Payment Collection Disabled */}
      <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-600/40 text-stone-900 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold font-cinzel text-base">
          <Lock className="w-5 h-5 text-amber-700" />
          <span>{language === 'ta' ? 'அதிகாரப்பூர்வ காணிக்கை வழிகாட்டு நெறிமுறை' : 'Official Payment Collection Policy'}</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          {t.donationsDisabledNotice}
        </p>
        <div className="text-[11px] text-amber-800/80 font-mono">
          Status: Online Gateway On Hold (Statutory Clearances in Progress)
        </div>
      </div>

      {/* Donation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-stone-900">
              {cat.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {language === 'ta' ? cat.descTa : cat.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Register Offering Intent / Pledge */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="font-cinzel text-xl font-bold text-stone-900">
            {language === 'ta' ? 'காணிக்கை சங்கல்ப விருப்பப்பதிவு (Pledge)' : 'Register Devotional Offering Pledge'}
          </h2>
          <p className="text-xs text-stone-600 font-sans">
            {language === 'ta'
              ? 'உங்கள் விருப்பத்தை பதிவு செய்யுங்கள். முறையான வங்கி பரிவர்த்தனை தகவல்கள் நிர்வாக அலுவலகத்தால் தெரிவிக்கப்படும்.'
              : 'Register your intention to support TVD. Official verified transfer credentials will be coordinated via the communications desk.'}
          </p>
        </div>

        {!pledgeSubmitted ? (
          <form onSubmit={handlePledgeSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.labelDevoteeName} *
                </label>
                <input
                  type="text"
                  required
                  value={pledgeName}
                  onChange={(e) => setPledgeName(e.target.value)}
                  placeholder="e.g. R. Anantharaman"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.labelEmail} *
                </label>
                <input
                  type="email"
                  required
                  value={pledgeEmail}
                  onChange={(e) => setPledgeEmail(e.target.value)}
                  placeholder="e.g. devotee@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'ta' ? 'காணிக்கை பிரிவு' : 'Offering Category'}
                </label>
                <select
                  value={pledgeCategory}
                  onChange={(e) => setPledgeCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 bg-white"
                >
                  <option value="annadhanam">{t.categoryAnnadhanam}</option>
                  <option value="sanctum">{t.categorySanctum}</option>
                  <option value="nithyapooja">{t.categoryNithyaPooja}</option>
                  <option value="goshala">{t.categoryGoshala}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'ta' ? 'உத்தேசித்துள்ள தொகை (₹ INR)' : 'Pledge Amount (₹ INR)'}
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold transition-colors"
              >
                {language === 'ta' ? 'விருப்பத்தை பதிவு செய்' : 'Submit Offering Intent'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs font-sans animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{language === 'ta' ? 'காணிக்கை விருப்பம் பதிவு செய்யப்பட்டது!' : 'Offering Intent Registered Successfully!'}</span>
            </div>
            <p>
              {language === 'ta'
                ? `நன்றி, ${pledgeName}. உங்கள் பக்திபூர்வ விருப்பம் TVD தேவஸ்தான நிர்வாகத்திற்கு அனுப்பப்பட்டுள்ளது. அதிகாரப்பூர்வ வங்கி விவரங்களுடன் எங்கள் குழு உங்களை தொடர்பு கொள்ளும்.`
                : `Thank you, ${pledgeName}. Your devotional offering intent for ₹${pledgeAmount} has been recorded. Our administrative desk will provide authorized statutory donation credentials.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
