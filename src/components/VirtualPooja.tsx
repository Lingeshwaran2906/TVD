import React, { useState } from 'react';
import { Flame, Flower2, RotateCcw, Sparkles } from 'lucide-react';

const flowers = [
  { id: 'lotus', label: 'Lotus', tamil: 'தாமரை', emoji: '🪷' },
  { id: 'jasmine', label: 'Jasmine', tamil: 'மல்லிகை', emoji: '🤍' },
  { id: 'marigold', label: 'Marigold', tamil: 'சாமந்தி', emoji: '🌼' },
  { id: 'rose', label: 'Rose', tamil: 'ரோஜா', emoji: '🌹' },
];

export const VirtualPooja: React.FC = () => {
  const [offerings, setOfferings] = useState<string[]>([]);
  const [lampLit, setLampLit] = useState(false);
  const [message, setMessage] = useState('Begin your offering with a peaceful heart.');

  const offerFlower = (id: string) => {
    setOfferings((current) => [...current, id]);
    setMessage('Your flower offering has been placed with devotion.');
  };

  const reset = () => {
    setOfferings([]);
    setLampLit(false);
    setMessage('Begin your offering with a peaceful heart.');
  };

  return (
    <section className="virtual-pooja relative overflow-hidden mx-auto max-w-7xl rounded-[2rem] border border-amber-700/30 bg-[#1d100b] px-5 py-10 text-amber-50 shadow-2xl sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[.22em] text-amber-300">
          <Sparkles size={14} /> Digital devotional experience
        </span>
        <h2 className="mt-5 font-cinzel text-2xl font-bold text-white sm:text-4xl">Virtual Pooja</h2>
        <p className="mt-2 font-tamil text-lg text-amber-200">மனமுருகி மலர் சமர்ப்பித்து தீபம் ஏற்றுங்கள்</p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-amber-100/70">
          Offer a flower or light a digital lamp in a peaceful, interactive moment of devotion to Thilaga Vishnu.
        </p>

        <div className="relative mx-auto mt-9 flex min-h-[250px] max-w-xl items-center justify-center overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#3a1c0d] to-[#160b07] px-4 py-8">
          <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,.18),transparent_70%)]" />
          <div className="relative text-center">
            <div className="text-7xl drop-shadow-[0_0_24px_rgba(251,191,36,.35)] sm:text-8xl">🛕</div>
            <div className="mt-3 font-tamil text-2xl font-bold text-amber-300">திலகா விஷ்ணு</div>
            <div className="mt-1 text-xs tracking-[.25em] text-amber-100/70">ஓம் திலகாய நமஹா</div>
            <div className="mt-5 flex min-h-12 flex-wrap items-center justify-center gap-2" aria-live="polite">
              {offerings.slice(-12).map((id, index) => {
                const flower = flowers.find((item) => item.id === id);
                return <span key={`${id}-${index}`} className="pooja-flower text-2xl" title={flower?.label}>{flower?.emoji}</span>;
              })}
            </div>
            <div className={`mx-auto mt-3 transition-all duration-500 ${lampLit ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
              <span className={`inline-block text-5xl ${lampLit ? 'lamp-flame' : ''}`} aria-label={lampLit ? 'Lamp lit' : 'Lamp unlit'}>🪔</span>
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {flowers.map((flower) => (
            <button key={flower.id} onClick={() => offerFlower(flower.id)} className="group rounded-2xl border border-amber-500/25 bg-white/5 px-3 py-4 transition hover:-translate-y-1 hover:border-amber-300/70 hover:bg-amber-400/10 focus:outline-none focus:ring-2 focus:ring-amber-300">
              <span className="block text-3xl transition group-hover:scale-125">{flower.emoji}</span>
              <span className="mt-2 block text-sm font-semibold text-amber-100">{flower.label}</span>
              <span className="font-tamil text-xs text-amber-300/80">{flower.tamil}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => { setLampLit((value) => !value); setMessage(lampLit ? 'The digital lamp has been gently dimmed.' : 'Your digital diya is glowing. May peace be with you.'); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 px-6 py-3 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 active:scale-95">
            <Flame size={17} /> {lampLit ? 'Dim the lamp' : 'Light the lamp'}
          </button>
          <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:bg-white/10">
            <RotateCcw size={16} /> Reset pooja
          </button>
        </div>
        <p className="mt-5 text-sm text-amber-200/80" aria-live="polite">{message}</p>
        <p className="mt-2 text-[11px] text-amber-100/40">{offerings.length} flower offering{offerings.length === 1 ? '' : 's'} · Digital interaction only</p>
      </div>
    </section>
  );
};
