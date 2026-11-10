import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Users,
  CheckCircle2,
  AlertCircle,
  Search,
  Printer,
  ChevronRight,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';
import { DarshanBooking } from '../types.ts';
import { DemoPaymentModal } from '../components/DemoPaymentModal.tsx';

export const DarshanBookingView: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    darshanCategories,
    darshanSlots,
    createDarshanBooking,
    findBookingByRef,
    cancelDarshanBooking,
  } = useDevasthanam();

  // Active sub-tab: 'book' or 'track'
  const [activeTab, setActiveTab] = useState<'book' | 'track'>('book');

  // Multi-step booking state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    darshanCategories[0]?.id || ''
  );
  
  // Default to tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr);
  const [selectedSlotId, setSelectedSlotId] = useState<string>(darshanSlots[0]?.id || '');
  const [devoteeCount, setDevoteeCount] = useState<number>(2);

  // Form Fields
  const [devoteeName, setDevoteeName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [specialReq, setSpecialReq] = useState('');

  // Status and Confirmation
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<DarshanBooking | null>(null);

  // Tracker state
  const [trackRef, setTrackRef] = useState('');
  const [trackResult, setTrackResult] = useState<DarshanBooking | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState<{ success: boolean; msg: string } | null>(
    null
  );

  const selectedCategory = darshanCategories.find((c) => c.id === selectedCategoryId);
  const selectedSlot = darshanSlots.find((s) => s.id === selectedSlotId);

  const handleStep1Next = () => {
    if (!selectedCategoryId) {
      setFormError('Please select a Darshan category.');
      return;
    }
    setFormError(null);
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!selectedDate) {
      setFormError('Please select a preferred darshan date.');
      return;
    }
    if (!selectedSlotId) {
      setFormError('Please select a darshan time slot.');
      return;
    }
    const slot = darshanSlots.find((s) => s.id === selectedSlotId);
    if (!slot || slot.capacity - slot.bookedCount < devoteeCount) {
      setFormError('The selected slot does not have sufficient remaining seats for your group.');
      return;
    }
    setFormError(null);
    setCurrentStep(3);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const result = createDarshanBooking({
      devoteeName,
      email,
      phone,
      city,
      date: selectedDate,
      slotId: selectedSlotId,
      timeSlot: selectedSlot?.timeSlot || '',
      categoryId: selectedCategoryId,
      categoryName: selectedCategory
        ? language === 'ta'
          ? selectedCategory.nameTa
          : selectedCategory.nameEn
        : 'Darshan',
      devoteeCount,
      specialRequirements: specialReq,
    });

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
      setCurrentStep(4);
    } else {
      setFormError(result.error || 'Failed to submit booking request.');
    }
  };

  const handleSearchBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setCancelFeedback(null);
    if (!trackRef.trim()) return;

    const res = findBookingByRef(trackRef);
    setTrackResult(res.darshan || null);
    setTrackSearched(true);
  };

  const handleCancelBooking = (refCode: string) => {
    const res = cancelDarshanBooking(refCode);
    setCancelFeedback({ success: res.success, msg: res.message });
    if (res.success) {
      const refreshed = findBookingByRef(refCode);
      setTrackResult(refreshed.darshan || null);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setConfirmedBooking(null);
    setDevoteeName('');
    setEmail('');
    setPhone('');
    setCity('');
    setSpecialReq('');
    setFormError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'தேவஸ்தான ஆன்லைன் சேவை' : 'Official Portal'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
          {t.bookingDarshanTitle}
        </h1>
        <p className="text-sm text-stone-600 font-sans max-w-xl mx-auto leading-relaxed">
          {t.bookingDarshanSubtitle}
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
            {language === 'ta' ? 'புதிய முன்பதிவு' : 'New Darshan Booking'}
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'track'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            {t.btnSearchBooking}
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: BOOKING FLOW
          ========================================================================= */}
      {activeTab === 'book' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8">
          {/* Step Indicator */}
          <div className="grid grid-cols-4 gap-2 text-xs font-semibold pb-4 border-b border-stone-100">
            {[
              { num: 1, label: t.stepCategory },
              { num: 2, label: t.stepDateTime },
              { num: 3, label: t.stepDevoteeDetails },
              { num: 4, label: t.stepConfirmation },
            ].map((s) => (
              <div
                key={s.num}
                className={`text-center py-2 rounded-lg ${
                  currentStep === s.num
                    ? 'bg-amber-100 text-amber-950 font-bold'
                    : currentStep > s.num
                    ? 'text-amber-800'
                    : 'text-stone-400'
                }`}
              >
                <div className="truncate">{s.label}</div>
              </div>
            ))}
          </div>

          {formError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* STEP 1: Select Category */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-cinzel text-lg font-bold text-stone-900">
                {language === 'ta' ? 'தரிசன வகையை தேர்வு செய்யவும்' : 'Choose Darshan Category'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {darshanCategories.map((cat) => {
                  const isSelected = selectedCategoryId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/50 ring-2 ring-amber-600/30 shadow-xs'
                          : 'border-stone-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-2">
                        <span>{language === 'ta' ? cat.badgeTa : cat.badgeEn}</span>
                        <span className="font-mono text-stone-500">{cat.durationMinutes}m</span>
                      </div>
                      <h3 className="font-cinzel font-bold text-base text-stone-900 mb-1">
                        {language === 'ta' ? cat.nameTa : cat.nameEn}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        {language === 'ta' ? cat.descTa : cat.descEn}
                      </p>
                      <div className="text-xs font-semibold text-amber-950 pt-3 border-t border-stone-100">
                        {language === 'ta' ? cat.priceNoteTa : cat.priceNoteEn}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <span>{language === 'ta' ? 'அடுத்த நிலை' : 'Continue to Date & Slot'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Time Slot */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-cinzel text-lg font-bold text-stone-900">
                  {language === 'ta' ? 'தேதி மற்றும் நேரப்பிரிவை தேர்வு செய்யவும்' : 'Select Date & Slot'}
                </h2>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  {language === 'ta' ? 'பின்செல்க' : 'Back to Category'}
                </button>
              </div>

              {/* Date Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {language === 'ta' ? 'தரிசன நாள் (தேதி)' : 'Darshan Date'}
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t.labelDevoteeCount}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={devoteeCount}
                    onChange={(e) => setDevoteeCount(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                    required
                  />
                </div>
              </div>

              {/* Real Database Slot Availability */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-stone-700">
                  {language === 'ta' ? 'கிடைக்கும் நேரப்பிரிவுகள்' : 'Available Time Slots'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {darshanSlots.map((slot) => {
                    const remaining = slot.capacity - slot.bookedCount;
                    const isFull = remaining < devoteeCount || !slot.isAvailable;
                    const isSelected = selectedSlotId === slot.id;

                    return (
                      <div
                        key={slot.id}
                        onClick={() => !isFull && setSelectedSlotId(slot.id)}
                        className={`p-4 rounded-xl border transition-all ${
                          isFull
                            ? 'bg-stone-100 border-stone-200 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-600/30 cursor-pointer'
                            : 'border-stone-200 hover:border-amber-400 bg-white cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-1.5 text-stone-900 font-mono">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            <span>{slot.timeSlot}</span>
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                              isFull
                                ? 'bg-red-100 text-red-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isFull
                              ? language === 'ta'
                                ? 'இடமில்லை'
                                : 'Slot Full'
                              : `${remaining} ${language === 'ta' ? 'இடங்கள் உள்ளன' : 'seats left'}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  {language === 'ta' ? 'முந்தைய நிலை' : 'Back'}
                </button>
                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <span>{language === 'ta' ? 'பக்தர் விவரங்கள்' : 'Devotee Information'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Enter Devotee Information */}
          {currentStep === 3 && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-cinzel text-lg font-bold text-stone-900">
                  {language === 'ta' ? 'பக்தர் தகவல்களை உள்ளிடவும்' : 'Primary Devotee Details'}
                </h2>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  {language === 'ta' ? 'பின்செல்க' : 'Back to Date & Slot'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.labelCity} *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Chennai / Madurai / Singapore"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.labelSpecialReq}
                  </label>
                  <textarea
                    rows={2}
                    value={specialReq}
                    onChange={(e) => setSpecialReq(e.target.value)}
                    placeholder="e.g. Elderly pilgrim assistance or pram facility"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Order summary note */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="font-semibold">
                  {language === 'ta' ? 'முன்பதிவு சுருக்கம்' : 'Booking Summary'}:
                </div>
                <div>
                  {selectedCategory?.nameEn} · {selectedDate} · {selectedSlot?.timeSlot} · {devoteeCount} {language === 'ta' ? 'நபர்கள்' : 'persons'}
                </div>
                <div className="text-[11px] text-amber-800/80">
                  {language === 'ta'
                    ? 'விதிமுறை: சமர்ப்பிக்கப்பட்ட விண்ணப்பம் நிர்வாகியின் உறுதிப்படுத்தல் வரை நிலுவையில் (Pending) இருக்கும்.'
                    : 'Notice: Request will be registered as "Pending Admin Approval" per temple regulatory procedures.'}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  {language === 'ta' ? 'முந்தைய நிலை' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>{t.btnSubmit}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Verified Pass / Confirmation */}
          {currentStep === 4 && confirmedBooking && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border-2 border-amber-600/40 text-stone-900 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                      {language === 'ta' ? 'தரிசன அனுமதிச் சீட்டு' : 'Darshan Registration Pass'}
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-amber-950">
                      {confirmedBooking.categoryName}
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
                    <span className="text-stone-500 block">{language === 'ta' ? 'தரிசன தேதி' : 'Date'}</span>
                    <strong className="text-stone-900">{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{language === 'ta' ? 'நேரம்' : 'Slot'}</span>
                    <strong className="text-stone-900">{confirmedBooking.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{language === 'ta' ? 'பக்தர்கள்' : 'Devotees'}</span>
                    <strong className="text-stone-900 font-mono">{confirmedBooking.devoteeCount} persons</strong>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="p-4 rounded-xl bg-amber-100/60 border border-amber-300/50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-amber-950">
                      {language === 'ta' ? 'முன்பதிவு நிலை' : 'Current Status'}:{' '}
                    </span>
                    <span className="font-bold text-amber-800">
                      {language === 'ta' ? 'நிர்வாக ஒப்புதலுக்கு காத்திருக்கிறது (Pending)' : 'Pending Admin Confirmation'}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-600 font-sans">
                    {language === 'ta' ? 'பதிவான நேரம்' : 'Registered'}: {confirmedBooking.createdAt.substring(0, 10)}
                  </span>
                </div>

                {/* Print and action controls */}
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
                    {language === 'ta' ? 'மற்றொரு முன்பதிவு செய்ய' : 'Book Another Darshan'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: TRACK & CANCEL BOOKING STATUS
          ========================================================================= */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-cinzel text-lg font-bold text-stone-900">
              {t.trackerTitle}
            </h2>
            <p className="text-xs text-stone-600 font-sans">
              {language === 'ta'
                ? 'உங்கள் முன்பதிவு நிலையை சரிபார்க்க அல்லது தகுதியுள்ள முன்பதிவை ரத்து செய்ய குறிப்பு எண்ணை உள்ளிடவும்.'
                : 'Enter your verified booking reference code to check current confirmation status or cancel eligible bookings.'}
            </p>
          </div>

          <form onSubmit={handleSearchBooking} className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={trackRef}
                onChange={(e) => setTrackRef(e.target.value)}
                placeholder="e.g. TVD-DAR-109245"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm font-mono focus:ring-2 focus:ring-amber-600 uppercase"
              />
            </div>
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
                  <div className="text-xs text-stone-600">{trackResult.categoryName}</div>
                </div>

                {/* Status Badge */}
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
                  <span className="text-stone-500 block">{language === 'ta' ? 'நேரம்' : 'Slot'}</span>
                  <strong>{trackResult.timeSlot}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">{language === 'ta' ? 'பக்தர்கள்' : 'Devotees'}</span>
                  <strong className="font-mono">{trackResult.devoteeCount} persons</strong>
                </div>
              </div>

              {/* Devotee Cancel Action if eligible */}
              {(trackResult.status === 'pending' || trackResult.status === 'approved') && (
                <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between">
                  <span className="text-xs text-stone-600">
                    {language === 'ta' ? 'முன்பதிவு மாற்றம் செய்ய வேண்டுமா?' : 'Need to cancel this reservation?'}
                  </span>
                  <button
                    onClick={() => handleCancelBooking(trackResult.refCode)}
                    className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'முன்பதிவை ரத்து செய்க' : 'Cancel My Booking'}</span>
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
