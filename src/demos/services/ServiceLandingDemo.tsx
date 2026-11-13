import React, { useState } from 'react';
import { BatteryCharging, Check, ChevronDown, Headphones, ShieldCheck, Volume2 } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';

const FINISHES = [
  {
    id: 'titanium',
    name: 'Brushed Titanium',
    swatch: '#9CA3AF',
    accent: '#1D4ED8',
    summary: 'Raw bead-blasted Grade 5 titanium yokes with slate lambskin cushions.',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Anodized',
    swatch: '#18181B',
    accent: '#0F172A',
    summary: 'Matte DLC-coated aluminum shell with deep charcoal acoustic fabric.',
  },
  {
    id: 'sandstone',
    name: 'Sandstone Gold',
    swatch: '#C6A875',
    accent: '#92400E',
    summary: 'Warm champagne anodized frame paired with travertine neutral leather.',
  },
] as const;

const MODES = [
  {
    id: 'anc',
    label: 'Adaptive ANC',
    metric: '-46 dB Isolation',
    detail: 'Eight beamforming microphones sample room resonance 48,000 times per second.',
  },
  {
    id: 'transparent',
    label: 'Natural Transparency',
    metric: '0.4 ms Pass-Through',
    detail: 'Zero-phase acoustic pass-through preserves natural vocal timbre in studio rooms.',
  },
  {
    id: 'lossless',
    label: 'USB-C Lossless',
    metric: '24-bit / 192 kHz',
    detail: 'Direct internal DAC playback bypasses wireless compression for mastering work.',
  },
] as const;

const LANDING_FAQS = [
  {
    q: 'What is included in the Kairo Studio One box?',
    a: 'Studio One headphones, molded travel folio, braided USB-C lossless cable, and balanced 3.5mm studio cord.',
  },
  {
    q: 'Are ear cushions replaceable?',
    a: 'Yes. Magnetic memory-foam lambskin ear pads snap off in seconds for effortless replacement.',
  },
  {
    q: 'How long does the battery last with Adaptive ANC active?',
    a: 'Up to 44 hours of continuous wireless playback, with a 10-minute USB-C fast charge delivering 6 hours.',
  },
];

export function ServiceLandingDemo({ onBack }: { onBack: () => void }) {
  const [selectedFinish, setSelectedFinish] = useState<(typeof FINISHES)[number]>(FINISHES[0]);
  const [activeMode, setActiveMode] = useState<(typeof MODES)[number]['id']>('anc');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [reserveEmail, setReserveEmail] = useState('');
  const [reserved, setReserved] = useState(false);

  const currentMode = MODES.find((m) => m.id === activeMode) || MODES[0];

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reserveEmail.trim())) return;
    setReserved(true);
  };

  return (
    <div
      className="min-h-screen bg-[#F4F5F7] text-[#111827]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Landing Page Design"
        clientBrand="Kairo Acoustics"
        categoryLabel="Service Demo 02"
        onBack={onBack}
      />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#kl-top"
            className="text-lg font-bold tracking-tight whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            KAIRO ACOUSTICS
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#kl-finishes" className="hover:text-slate-950 whitespace-nowrap">
              Finishes
            </a>
            <a href="#kl-acoustics" className="hover:text-slate-950 whitespace-nowrap">
              Acoustics
            </a>
            <a href="#kl-specs" className="hover:text-slate-950 whitespace-nowrap">
              Specifications
            </a>
            <a href="#kl-faq" className="hover:text-slate-950 whitespace-nowrap">
              FAQ
            </a>
          </nav>
          <a
            href="#kl-reserve"
            className="rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
          >
            Reserve First Batch
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-20">
        {/* Product Launch Hero */}
        <section id="kl-top" className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              Studio One Wireless · Flagship Release
            </p>
            <h1
              className="mt-3 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Reference studio clarity without the tether.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Custom 45mm beryllium-coated dynamic drivers machined inside an acoustic titanium
              chassis. Engineered for mastering rooms, flights, and focused deep work.
            </p>

            {/* Interactive Finish Switcher */}
            <div id="kl-finishes" className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Selected Finish: <strong className="text-slate-900">{selectedFinish.name}</strong>
                </span>
                <span className="font-mono text-sm font-bold tabular-nums text-slate-900">$549</span>
              </div>
              <div className="mt-3 flex gap-3">
                {FINISHES.map((fin) => (
                  <button
                    key={fin.id}
                    type="button"
                    aria-label={`Select ${fin.name} finish`}
                    onClick={() => setSelectedFinish(fin)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer ${
                      selectedFinish.id === fin.id
                        ? 'border-blue-700 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/15"
                      style={{ backgroundColor: fin.swatch }}
                    />
                    <span>{fin.name}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600">{selectedFinish.summary}</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <ResilientImage
                src={DEMO_MEDIA.headphonesStudio}
                alt="Kairo Studio One brushed titanium wireless headphones"
                className="h-full w-full object-cover"
                fallbackLabel="Kairo Studio One"
              />
            </div>
          </div>
        </section>

        {/* Interactive Acoustic Modes */}
        <section id="kl-acoustics" className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Three Acoustic Architectures
              </h2>
              <p className="text-sm text-slate-600">Switch modes to inspect acoustic tuning.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1">
              {MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveMode(mode.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold cursor-pointer ${
                    activeMode === mode.id ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 border-t border-slate-100 pt-6 md:grid-cols-12 items-center">
            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Measured Benchmark
              </p>
              <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-slate-900">
                {currentMode.metric}
              </p>
            </div>
            <p className="md:col-span-8 text-sm leading-relaxed text-slate-600">
              {currentMode.detail}
            </p>
          </div>
        </section>

        {/* Specs Grid */}
        <section id="kl-specs" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Headphones, title: '45mm Beryllium', sub: '6 Hz – 40 kHz frequency response' },
            { icon: Volume2, title: 'AptX Lossless', sub: 'Bit-perfect wireless streaming' },
            { icon: BatteryCharging, title: '44h Playback', sub: '10-min charge adds 6 hours' },
            { icon: ShieldCheck, title: '3-Year Warranty', sub: 'Modular replaceable ear pads' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <Icon className="h-5 w-5 text-blue-700" />
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{item.sub}</p>
              </div>
            );
          })}
        </section>

        {/* Pre-order Simulation & FAQ */}
        <section className="grid gap-10 lg:grid-cols-12">
          <div
            id="kl-reserve"
            className="rounded-2xl bg-[#111827] p-8 text-white lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Batch 01 Reservation (Demo)
            </p>
            <h2 className="mt-2 text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Reserve {selectedFinish.name}
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Simulated launch waitlist — no payment or real reservation is processed.
            </p>

            {reserved ? (
              <div role="status" className="mt-6 rounded-xl bg-white/10 p-4 text-xs text-slate-100">
                <p className="flex items-center gap-2 font-bold text-emerald-300">
                  <Check className="h-4 w-4" /> Reservation Queued (Simulation)
                </p>
                <p className="mt-1.5">
                  Confirmation preview logged for {reserveEmail} ({selectedFinish.name}).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReserved(false);
                    setReserveEmail('');
                  }}
                  className="mt-3 underline cursor-pointer"
                >
                  Change Selection
                </button>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="mt-6 space-y-3">
                <label htmlFor="kl-email" className="block text-xs font-semibold text-slate-300">
                  Notification Email
                </label>
                <input
                  id="kl-email"
                  type="email"
                  required
                  value={reserveEmail}
                  onChange={(e) => setReserveEmail(e.target.value)}
                  placeholder="listener@studio.com"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 cursor-pointer"
                >
                  Reserve Unit — $549 (Demo)
                </button>
              </form>
            )}
          </div>

          <div id="kl-faq" className="space-y-3 lg:col-span-7">
            <h2 className="text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {LANDING_FAQS.map((item, idx) => (
                <div key={item.q} className="p-5">
                  <button
                    type="button"
                    aria-expanded={openFaq === idx}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between text-left text-sm font-bold cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <p className="mt-2.5 text-sm text-slate-600">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
