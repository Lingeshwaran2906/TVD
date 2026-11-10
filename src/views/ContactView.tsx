import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useDevasthanam } from '../context/DevasthanamContext.tsx';

export const ContactView: React.FC = () => {
  const { t, language } = useLanguage();
  const { templeInfo, submitContactEnquiry } = useDevasthanam();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please provide all mandatory fields.');
      return;
    }

    submitContactEnquiry({ name, email, phone, message });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 font-sans">
          {language === 'ta' ? 'ஆன்மீக தொடர்பு மையம்' : 'Communications & Devotee Desk'}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
          {t.contactTitle}
        </h1>
        <p className="text-sm text-stone-600 font-sans max-w-xl mx-auto">
          {t.contactSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Contact Particulars (5 cols) */}
        <div className="md:col-span-5 bg-stone-900 text-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-800/40 shadow-md space-y-6">
          <div className="space-y-1">
            <h2 className="font-cinzel text-lg font-bold text-white">
              {templeInfo.organizationNameEn}
            </h2>
            <div className="font-tamil text-xs text-amber-400">
              {templeInfo.organizationNameTa}
            </div>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block">{language === 'ta' ? 'அதிகாரப்பூர்வ மின்னஞ்சல்' : 'Email Address'}</span>
                <span className="font-mono text-amber-200">{templeInfo.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block">{language === 'ta' ? 'தகவல் மையம்' : 'Helpline'}</span>
                <span className="font-mono text-amber-200">{templeInfo.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block">{language === 'ta' ? 'அமைவிடம்' : 'Realm Concept'}</span>
                <span className="text-amber-200 leading-relaxed block">
                  {language === 'ta' ? templeInfo.locationConceptTa : templeInfo.locationConceptEn}
                </span>
                <span className="text-[11px] text-stone-400 block mt-1">
                  {t.contactAddressNote}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-600/30 text-[11px] text-amber-300/80 leading-relaxed">
            {language === 'ta'
              ? 'பக்தர்கள் தங்களின் தரிசன சீட்டு அல்லது பூஜை தொடர்பான ஆலோசனைகளுக்கு இந்த உதவி மையத்தை தொடர்பு கொள்ளலாம்.'
              : 'Our spiritual communications desk assists pilgrims with verification, seva scheduling, and festival guidance.'}
          </div>
        </div>

        {/* Right Column: Devotee Enquiry Form (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-cinzel text-xl font-bold text-stone-900">
              {language === 'ta' ? 'தகவல் படிவம்' : 'Send an Inquiry'}
            </h2>
            <p className="text-xs text-stone-600 font-sans">
              {language === 'ta'
                ? 'உங்கள் வினாக்களை கீழே உள்ள படிவத்தில் சமர்ப்பிக்கவும்.'
                : 'Submit your message to the Devasthanam spiritual desk.'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.labelDevoteeName} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. S. Ramanathan"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    {t.labelPhone}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98401 23456"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'ta' ? 'தங்களின் செய்தி / கருத்து' : 'Your Message / Inquiry'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter details of your inquiry or darshan coordination needs..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.formSendMessage}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs font-sans animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{language === 'ta' ? 'செய்தி பெறப்பட்டது!' : 'Inquiry Received!'}</span>
              </div>
              <p>{t.formSuccessMsg}</p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="mt-2 text-amber-900 font-semibold underline underline-offset-4 cursor-pointer"
              >
                {language === 'ta' ? 'மற்றொரு செய்தி அனுப்ப' : 'Send Another Inquiry'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
