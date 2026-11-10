import React, { useState } from 'react';
import {
  ShieldCheck,
  QrCode,
  CreditCard,
  Building,
  CheckCircle2,
  X,
  Sparkles,
  Lock,
  ArrowRight,
  Download,
  Printer,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface DemoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (txnId: string) => void;
  title: string;
  amount: number;
  bookingRef?: string;
  devoteeName?: string;
}

export const DemoPaymentModal: React.FC<DemoPaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  amount,
  bookingRef = `DAR-${Date.now().toString().slice(-6)}`,
  devoteeName = 'Devotee',
}) => {
  const { language } = useLanguage();
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('devotee@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [txnId, setTxnId] = useState('');

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxn = `TVD-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(generatedTxn);
      setIsProcessing(false);
      setIsCompleted(true);
      onSuccess(generatedTxn);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1c120a] via-[#24150c] to-[#120a06] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 text-amber-50 shadow-2xl space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-600/40 transition-colors cursor-pointer"
          aria-label="Close Payment Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!isCompleted ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-amber-400 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {language === 'ta' ? 'பாதுகாப்பான தேவஸ்தான கட்டண தளம்' : 'Secure Devasthanam Gateway'}
                </span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {title}
              </h3>
              <p className="text-xs text-stone-300 font-sans">
                {language === 'ta'
                  ? 'பக்தர்: ' + devoteeName + ' · முன்பதிவு எண்: ' + bookingRef
                  : 'Devotee: ' + devoteeName + ' · Ref: ' + bookingRef}
              </p>
            </div>

            {/* Amount Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-900/60 to-stone-900 border border-amber-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300/80 font-sans block">
                  {language === 'ta' ? 'செலுத்த வேண்டிய தொகை' : 'Offering / Seva Amount'}
                </span>
                <span className="font-mono text-2xl font-bold text-amber-200">
                  ₹{amount > 0 ? amount.toFixed(2) : '100.00'}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Demo Sandbox
                </span>
              </div>
            </div>

            {/* Demo Notice Banner */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-[11px] text-amber-200/90 font-sans leading-relaxed">
              ℹ️ <strong>{language === 'ta' ? 'மாதிரி கட்டண அறிவிப்பு:' : 'Demo Sandbox Notice:'}</strong>{' '}
              {language === 'ta'
                ? 'இது மாதிரி கட்டண முறை மட்டுமே. உண்மையான பணம் எதுவும் வசூலிக்கப்படாது. நேரடி முன்பதிவு ரசீது வழங்கப்படும்.'
                : 'This is a simulated realistic payment gateway. No real money will be charged. Instant verified pass will be issued.'}
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  method === 'upi'
                    ? 'bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-md'
                    : 'bg-stone-900/80 text-amber-200 border-amber-500/30 hover:bg-stone-800'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-xs">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  method === 'card'
                    ? 'bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-md'
                    : 'bg-stone-900/80 text-amber-200 border-amber-500/30 hover:bg-stone-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  method === 'netbanking'
                    ? 'bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-md'
                    : 'bg-stone-900/80 text-amber-200 border-amber-500/30 hover:bg-stone-800'
                }`}
              >
                <Building className="w-4 h-4" />
                <span className="text-xs">Net Banking</span>
              </button>
            </div>

            {/* Method Specific UI */}
            {method === 'upi' && (
              <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <QrCode className="w-4 h-4" />
                    <span>Scan TVD QR or enter VPA</span>
                  </span>
                  <span className="text-[10px] text-stone-400">GPay · PhonePe · Paytm</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="devotee@upi"
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs text-emerald-400 font-bold">Verified ✓</span>
                </div>
              </div>
            )}

            {method === 'card' && (
              <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-500/20 space-y-2 text-xs">
                <div className="text-stone-400">Demo Sacred Card:</div>
                <div className="font-mono text-amber-200 tracking-wider">
                  •••• •••• •••• 4242 (Valid Thru 12/28)
                </div>
              </div>
            )}

            {method === 'netbanking' && (
              <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-500/20 space-y-2 text-xs">
                <div className="text-stone-400">Select Bank (Simulated):</div>
                <select className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-amber-100">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Canara Bank</option>
                  <option>Indian Overseas Bank</option>
                </select>
              </div>
            )}

            {/* Action CTA */}
            <button
              disabled={isProcessing}
              onClick={handleSimulatePayment}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 hover:from-amber-500 hover:to-yellow-300 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>
                    {language === 'ta' ? 'வங்கியுடன் இணைகிறது...' : 'Simulating Bank Verification...'}
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {language === 'ta'
                      ? `மாதிரி கட்டணம் செலுத்து (₹${amount > 0 ? amount : 100})`
                      : `Complete Demo Payment (₹${amount > 0 ? amount : 100})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success & Receipt View */
          <div className="space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-widest text-emerald-400 font-bold">
                {language === 'ta' ? 'கட்டணம் வெற்றிகரமாக முடிந்தது' : 'Payment Verified Successfully'}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {language === 'ta' ? 'தேவஸ்தான பக்தி ரசீது' : 'Official Devasthanam Receipt'}
              </h3>
              <p className="text-xs text-amber-200/80 font-sans">
                {language === 'ta'
                  ? 'ஸ்ரீ திலகா விஷ்ணுவின் அருளால் தங்களின் பதிவு உறுதி செய்யப்பட்டது.'
                  : 'Your booking has been sanctified and confirmed under divine grace.'}
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-stone-800 pb-1.5">
                <span className="text-stone-400">Transaction ID:</span>
                <span className="text-amber-300 font-bold">{txnId}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-1.5">
                <span className="text-stone-400">Booking Ref:</span>
                <span className="text-white font-bold">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-1.5">
                <span className="text-stone-400">Devotee Name:</span>
                <span className="text-stone-200">{devoteeName}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-1.5">
                <span className="text-stone-400">Offering:</span>
                <span className="text-emerald-400 font-bold">₹{amount > 0 ? amount.toFixed(2) : '100.00'}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-400">Status:</span>
                <span className="text-emerald-400 font-bold">DEMO APPROVED ✓</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="py-3 px-3 rounded-xl bg-amber-950 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'ta' ? 'அச்சு செய்' : 'Print Pass'}</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <span>{language === 'ta' ? 'நிறைவு செய்க' : 'Done / View Pass'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
