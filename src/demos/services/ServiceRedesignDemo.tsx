import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Gauge, Globe, Package, Sparkles } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';
import { calculateFreightQuote } from '../../utils/demoLogic';

export function ServiceRedesignDemo({ onBack }: { onBack: () => void }) {
  const [sliderPos, setSliderPos] = useState(48);
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split');

  const [weightKg, setWeightKg] = useState(420);
  const [distanceKm, setDistanceKm] = useState(1100);
  const [priority, setPriority] = useState<'Standard' | 'Express' | 'Cold Chain'>('Express');
  const [quoteRequested, setQuoteRequested] = useState(false);

  const quote = useMemo(
    () => calculateFreightQuote({ weightKg, distanceKm, priority }),
    [weightKg, distanceKm, priority],
  );

  const effectivePct = viewMode === 'before' ? 100 : viewMode === 'after' ? 0 : sliderPos;

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Website Redesign"
        clientBrand="Velocity Freight (Legacy -> Modern)"
        categoryLabel="Service Demo 04"
        onBack={onBack}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-14">
        {/* Redesign Overview & Controls */}
        <section className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Before &amp; After Transformation Case Study
            </p>
            <h1
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Transforming Legacy B2B Freight into a High-Converting Portal
            </h1>
          </div>

          <div className="inline-flex shrink-0 flex-wrap sm:flex-nowrap gap-1.5 rounded-xl border border-slate-200 bg-white p-1 self-start lg:self-auto">
            {(
              [
                { id: 'split', label: 'Interactive Split' },
                { id: 'before', label: '2018 Legacy Site' },
                { id: 'after', label: '2026 Redesign' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setViewMode(m.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                  viewMode === m.id ? 'bg-slate-900 text-white' : 'text-slate-600'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Interactive Before/After Comparison Stage */}
        <section className="space-y-4">
          <div className="relative h-[430px] w-full overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
            {/* AFTER LAYER (Full Background) */}
            <div className="absolute inset-0 flex flex-col justify-between bg-[#091526] p-7 text-white sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold tracking-wider text-emerald-400">
                  VELOCITY FREIGHT · 2026 REDESIGN
                </span>
                <span className="rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 whitespace-nowrap">
                  0.9s Load · Mobile First
                </span>
              </div>

              <div className="grid items-center gap-6 md:grid-cols-12">
                <div className="md:col-span-6">
                  <h2
                    className="text-2xl font-bold leading-tight sm:text-4xl"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    Predictable cross-border freight quoted in 10 seconds.
                  </h2>
                  <p className="mt-3 text-sm text-slate-300">
                    Clear service hierarchy, instant lane rate estimation, and high-contrast
                    mobile dispatch tracking.
                  </p>
                  <div className="mt-5 flex gap-3">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950">
                      Calculate Instant Rate <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Right-aligned Modern UI Panel visible in Interactive Split */}
                <div className="hidden md:block md:col-span-6">
                  <div className="ml-auto max-w-sm rounded-xl border border-emerald-400/25 bg-[#0F213B] p-5 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                          Instant Corridor Preview
                        </p>
                        <p className="text-sm font-bold text-white">Chicago → Toronto</p>
                      </div>
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                        Express
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-black/25 p-2.5">
                        <p className="text-slate-400">Quoted Rate</p>
                        <p className="mt-0.5 font-mono text-lg font-bold tabular-nums text-white">
                          $485.00
                        </p>
                      </div>
                      <div className="rounded-lg bg-black/25 p-2.5">
                        <p className="text-slate-400">Transit SLA</p>
                        <p className="mt-0.5 font-mono text-lg font-bold tabular-nums text-emerald-300">
                          18 hrs
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Live GPS telemetry
                      </span>
                      <span className="font-mono text-emerald-300">99.4% On-Time</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-4 text-xs text-slate-300">
                <span>+165% Quote Starts</span>
                <span>22% Bounce Rate</span>
                <span>WCAG AA Contrast</span>
              </div>
            </div>

            {/* BEFORE LAYER (Clipped by Slider) */}
            <div
              className="absolute inset-0 overflow-hidden bg-[#D6D3CD] text-[#333333]"
              style={{ clipPath: `inset(0 ${100 - effectivePct}% 0 0)` }}
            >
              <div className="flex h-full flex-col justify-between border-4 border-gray-500 p-8 sm:p-12 font-serif">
                <div className="flex items-center justify-between border-b-2 border-gray-500 pb-2">
                  <span className="text-base font-bold uppercase text-blue-900 underline">
                    BRAMWELL LOGISTICS INC. (EST. 1998) — OLD SITE
                  </span>
                  <span className="bg-yellow-200 px-2 py-0.5 text-xs font-mono text-red-800">
                    4.8s Load · Non-Responsive
                  </span>
                </div>
                <div className="max-w-lg space-y-3 bg-white/80 p-5 border border-gray-400">
                  <h2 className="text-2xl font-bold text-blue-950">
                    Welcome to Bramwell Trucking &amp; Freight Services Homepage!!!
                  </h2>
                  <p className="text-xs leading-normal text-gray-700">
                    Please fax or call our central office Monday-Friday 9am-4pm to request a PDF
                    shipping tariff sheet. Flash plugin required for legacy route map.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <span className="border-2 border-gray-600 bg-gray-200 px-3 py-1 text-xs font-bold">
                      Download_Tariff_2018.pdf
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-700 font-mono">
                  64% Mobile Bounce · Zero Self-Serve Pricing
                </div>
              </div>
            </div>

            {/* Divider Line */}
            {viewMode === 'split' && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                style={{ left: `${effectivePct}%` }}
              />
            )}
          </div>

          {viewMode === 'split' && (
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-3">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                Legacy (Before)
              </span>
              <input
                type="range"
                aria-label="Before and after comparison slider"
                min={0}
                max={100}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="flex-1 accent-emerald-600"
              />
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
                Redesigned (After)
              </span>
            </div>
          )}
        </section>

        {/* Measurable Redesign Impact */}
        <section className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Gauge, metric: '4.8s → 0.9s', label: 'Largest Contentful Paint' },
            { icon: Sparkles, metric: '+165%', label: 'Qualified Online Quote Requests' },
            { icon: Globe, metric: '64% → 22%', label: 'Mobile Exit Rate Reduction' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-6">
                <Icon className="h-5 w-5 text-emerald-700" />
                <p className="mt-3 font-mono text-2xl font-bold tabular-nums">{card.metric}</p>
                <p className="mt-1 text-xs text-slate-600">{card.label}</p>
              </div>
            );
          })}
        </section>

        {/* Interactive Redesigned Experience: Live Freight Quote Calculator */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Live Redesigned Tool
                </p>
                <h2
                  className="mt-1 text-2xl font-bold"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  Velocity Freight Instant Quote Calculator
                </h2>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <label htmlFor="vf-weight">Cargo Weight</label>
                  <span className="font-mono tabular-nums">{weightKg} kg</span>
                </div>
                <input
                  id="vf-weight"
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <label htmlFor="vf-dist">Route Distance</label>
                  <span className="font-mono tabular-nums">{distanceKm} km</span>
                </div>
                <input
                  id="vf-dist"
                  type="range"
                  min={100}
                  max={4000}
                  step={50}
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-600"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {(['Standard', 'Express', 'Cold Chain'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setPriority(tier)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer ${
                      priority === tier
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-[#091526] p-7 text-white lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Package className="h-4 w-4" /> Estimated Freight Rate ({priority})
                </div>
                <p className="mt-3 font-mono text-4xl font-bold tabular-nums">
                  ${quote.estimatedCost.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  Estimated transit: <strong>{quote.transitDays} business day(s)</strong> for{' '}
                  {weightKg} kg across {distanceKm} km.
                </p>
              </div>

              <div className="mt-6">
                {quoteRequested ? (
                  <div
                    role="status"
                    className="flex items-center gap-2 rounded-lg bg-emerald-500/20 p-3 text-xs text-emerald-200"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>
                      Simulated quote #VF-409 locked for demonstration. No shipment booked.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setQuoteRequested(true)}
                    className="w-full rounded-lg bg-emerald-500 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 cursor-pointer"
                  >
                    Lock Simulated Rate Quote
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
