import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Search,
  Printer,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';
import { PoojaBooking } from '../types.ts';

export const PoojaBookingView: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    poojaCategories,
    createPoojaBooking,
    findBookingByRef,
    cancelPoojaBooking,
  } = useDevasthanam();

  const [activeTab, setActiveTab] = useState<'book' | 'track'>('book');

  // Form Fields
  const [selectedPoojaId, setSelectedPoojaId] = useState<string>(
    poojaCategories[0]?.id || ''
  );
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [devoteeName, setDevoteeName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gothram, setGothram] = useState('');
  const [rasi, setRasi] = useState('');
  const [nakshatram, setNakshatram] = useState('');
  const [sankalpamPrayer, setSankalpamPrayer] = useState('');
  const [prasadamDelivery, setPrasadamDelivery] = useState(false);
  const [postalAddress, setPostalAddress] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<PoojaBooking | null>(null);

  // Tracker state
  const [trackRef, setTrackRef] = useState('');
  const [trackResult, setTrackResult] = useState<PoojaBooking | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState<{ success: boolean; msg: string } | null>(
    null
  );

  const selectedPooja = poojaCategories.find((p) => p.id === selectedPoojaId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!selectedPooja) {
      setFormError('Please select a Pooja category.');
      return;
    }

    const result = createPoojaBooking({
      devoteeName,
      email,
      phone,
      poojaId: selectedPoojaId,
      poojaName: language === 'ta' ? selectedPooja.nameTa : selectedPooja.nameEn,
      date,
      timeSlot: language === 'ta' ? selectedPooja.timingTa : selectedPooja.timingEn,
      gothram: gothram || 'Self / Shiva/Vishnu Gothram',
      rasi: rasi || 'Devotee Rasi',
      nakshatram: nakshatram || 'Devotee Star',
      sankalpamPrayer: sankalpamPrayer || 'Family well-being and spiritual peace.',
      prasadamDelivery,
      postalAddress: prasadamDelivery ? postalAddress : undefined,
    });

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
    } else {
      setFormError(result.error || 'Failed to submit pooja registration.');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCancelFeedback(null);
    if (!trackRef.trim()) return;

    const res = findBookingByRef(trackRef);
    setTrackResult(res.pooja || null);
    setTrackSearched(true);
  };

  const handleCancel = (refCode: string) => {
    const res = cancelPoojaBooking(refCode);
    setCancelFeedback({ success: res.success, msg: res.message });
    if (res.success) {
      const refreshed = findBookingByRef(refCode);
      setTrackResult(refreshed.pooja || null);
    }
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setDevoteeName('');
    setEmail('');
    setPhone('');
    setGothram('');
    setRasi('');
    setNakshatram('');
    setSankalpamPrayer('');
    setPostalAddress('');
    setPrasadamDelivery(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'புனித வழிபாட்டு சேவை' : 'Sacred Seva Portal'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
          {t.bookingPoojaTitle}
        </h1>
        <p className="text-sm text-stone-600 font-sans max-w-xl mx-auto leading-relaxed">
          {t.bookingPoojaSubtitle}
        </p>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-stone-200/80 rounded-xl mt-4">
          <button
            onClick={() => setActiveTab('book')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'book'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            {language === 'ta' ? 'புதிய பூஜை பதிவு' : 'Register New Pooja'}
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'track'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            {language === 'ta' ? 'பூஜை நிலை அறிய' : 'Track Pooja Status'}
          </button>
        </div>
      </div>

      {activeTab === 'book' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8">
          {formError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {!confirmedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Pooja Category */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  {language === 'ta' ? 'பூஜை வகையை தேர்வு செய்யவும்' : 'Select Sacred Pooja / Seva'} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {poojaCategories.map((p) => {
                    const isSelected = selectedPoojaId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPoojaId(p.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-600/30'
                            : 'border-stone-200 hover:border-amber-400 bg-white'
                        }`}
                      >
                        <div className="font-bold text-sm text-stone-900 font-cinzel">
                          {language === 'ta' ? p.nameTa : p.nameEn}
                        </div>
                        <div className="text-xs text-amber-800 font-medium mt-1">
                          {language === 'ta' ? p.timingTa : p.timingEn}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          {language === 'ta' ? p.descTa : p.descEn}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Devotee Primary Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.labelDevoteeName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder="e.g. S. Ramanathan"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. devotee@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.labelPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98401 23456"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Date of Pooja */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'ta' ? 'பூஜை நடத்த விரும்பும் நாள்' : 'Preferred Pooja Date'} *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Sankalpam Details */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {language === 'ta' ? 'சங்கல்ப விவரங்கள்' : 'Sankalpam Astrological Details'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.labelGothram}
                    </label>
                    <input
                      type="text"
                      value={gothram}
                      onChange={(e) => setGothram(e.target.value)}
                      placeholder="e.g. Koushika / Bharadwaja / Kashyapa"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.labelRasi}
                    </label>
                    <input
                      type="text"
                      value={rasi}
                      onChange={(e) => setRasi(e.target.value)}
                      placeholder="e.g. Mesham / Rishabham / Simham"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.labelNakshatram}
                    </label>
                    <input
                      type="text"
                      value={nakshatram}
                      onChange={(e) => setNakshatram(e.target.value)}
                      placeholder="e.g. Rohini / Ashwini / Thiruvonam"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.labelSankalpamPrayer}
                  </label>
                  <textarea
                    rows={2}
                    value={sankalpamPrayer}
                    onChange={(e) => setSankalpamPrayer(e.target.value)}
                    placeholder="e.g. Family peace, good health, education and spiritual growth"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Prasadam Delivery Option */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={prasadamDelivery}
                    onChange={(e) => setPrasadamDelivery(e.target.checked)}
                    className="rounded text-amber-800 focus:ring-amber-600 w-4 h-4"
                  />
                  <span>{t.labelPrasadamDelivery}</span>
                </label>

                {prasadamDelivery && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.labelPostalAddress} *
                    </label>
                    <textarea
                      rows={2}
                      required={prasadamDelivery}
                      value={postalAddress}
                      onChange={(e) => setPostalAddress(e.target.value)}
                      placeholder="Full postal address with door number, street, city, state and PIN code"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.btnSubmit}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Pass */
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border-2 border-amber-600/40 text-stone-900 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                      {language === 'ta' ? 'பூஜை பதிவு அனுமதிச் சீட்டு' : 'Pooja Registration Pass'}
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-amber-950">
                      {confirmedBooking.poojaName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 uppercase font-sans">
                      {language === 'ta' ? 'குறிப்பு எண்' : 'Reference ID'}
                    </span>
                    <div className="font-mono text-lg font-bold text-amber-900">
                      {confirmedBooking.refCode}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 block">{t.labelDevoteeName}</span>
                    <strong className="text-stone-900">{confirmedBooking.devoteeName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{language === 'ta' ? 'தேதி' : 'Date'}</span>
                    <strong className="text-stone-900">{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{t.labelGothram}</span>
                    <strong className="text-stone-900">{confirmedBooking.gothram}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{t.labelNakshatram}</span>
                    <strong className="text-stone-900">{confirmedBooking.nakshatram}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-100/60 border border-amber-300/50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-amber-950">
                      {language === 'ta' ? 'பூஜை பதிவு நிலை' : 'Status'}:{' '}
                    </span>
                    <span className="font-bold text-amber-800">
                      {language === 'ta' ? 'நிர்வாக ஒப்புதலுக்கு காத்திருக்கிறது (Pending)' : 'Pending Admin Confirmation'}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-600 font-sans">
                    {language === 'ta' ? 'பதிவான நேரம்' : 'Registered'}: {confirmedBooking.createdAt.substring(0, 10)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 text-amber-50 text-xs font-semibold hover:bg-amber-800 transition-colors shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t.btnPrintPass}</span>
                  </button>

                  <button
                    onClick={resetForm}
                    className="text-xs text-amber-900 hover:text-amber-700 font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    {language === 'ta' ? 'மற்றொரு பூஜை பதிவு செய்ய' : 'Book Another Pooja'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Track Tab */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              {language === 'ta' ? 'பூஜை பதிவு நிலையை சரிபார்க்க' : 'Check Pooja Booking Status'}
            </h2>
            <p className="text-xs text-stone-600 font-sans">
              {language === 'ta'
                ? 'உங்கள் பூஜை பதிவு நிலையை அறிய குறிப்பு எண்ணை உள்ளிடவும்.'
                : 'Enter your verified pooja reference code (e.g. TVD-POO-642109).'}
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              required
              value={trackRef}
              onChange={(e) => setTrackRef(e.target.value)}
              placeholder="e.g. TVD-POO-642109"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm font-mono focus:ring-2 focus:ring-amber-600 uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>{t.trackerBtn}</span>
            </button>
          </form>

          {cancelFeedback && (
            <div
              className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
                cancelFeedback.success
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {cancelFeedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{cancelFeedback.msg}</span>
            </div>
          )}

          {trackSearched && !trackResult && (
            <div className="p-8 text-center rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-xs font-sans">
              {t.trackerNotFound}
            </div>
          )}

          {trackResult && (
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-300 text-stone-900 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                <div>
                  <span className="font-mono text-sm font-bold text-amber-950">
                    {trackResult.refCode}
                  </span>
                  <div className="text-xs text-stone-600">{trackResult.poojaName}</div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      trackResult.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : trackResult.status === 'pending'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : trackResult.status === 'cancelled'
                        ? 'bg-stone-200 text-stone-700'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {trackResult.status === 'approved'
                      ? t.statusApproved
                      : trackResult.status === 'pending'
                      ? t.statusPending
                      : trackResult.status === 'cancelled'
                      ? t.statusCancelled
                      : t.statusRejected}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block">{t.labelDevoteeName}</span>
                  <strong>{trackResult.devoteeName}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">{language === 'ta' ? 'தேதி' : 'Date'}</span>
                  <strong>{trackResult.date}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">{t.labelGothram}</span>
                  <strong>{trackResult.gothram}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">{t.labelNakshatram}</span>
                  <strong>{trackResult.nakshatram}</strong>
                </div>
              </div>

              {(trackResult.status === 'pending' || trackResult.status === 'approved') && (
                <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between">
                  <span className="text-xs text-stone-600">
                    {language === 'ta' ? 'பூஜை பதிவை ரத்து செய்ய வேண்டுமா?' : 'Need to cancel this pooja registration?'}
                  </span>
                  <button
                    onClick={() => handleCancel(trackResult.refCode)}
                    className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'பூஜையை ரத்து செய்' : 'Cancel Pooja'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
