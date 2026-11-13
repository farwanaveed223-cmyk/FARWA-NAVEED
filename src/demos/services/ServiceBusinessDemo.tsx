import React, { useMemo, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, Compass, Ruler } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { calculateArchitectureEstimate } from '../../utils/demoLogic';

const ARCH_PROJECTS = [
  {
    id: 'a1',
    title: 'Big Sur Coastal Pavilion',
    type: 'Residential',
    location: 'Carmel Highlands, CA',
    area: '4,200 sq ft',
    year: '2026',
    image: DEMO_MEDIA.architectureHero,
  },
  {
    id: 'a2',
    title: 'Mercer Timber Atrium',
    type: 'Commercial',
    location: 'Portland, OR',
    area: '18,500 sq ft',
    year: '2025',
    image:
      'https://images.pexels.com/photos/35203563/pexels-photo-35203563.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'a3',
    title: 'Sora Cliffside Retreat',
    type: 'Hospitality',
    location: 'Vancouver Island',
    area: '9,800 sq ft',
    year: '2025',
    image:
      'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export function ServiceBusinessDemo({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState('All');
  const [areaSqFt, setAreaSqFt] = useState(3200);
  const [projectType, setProjectType] = useState<'Residential' | 'Commercial' | 'Hospitality'>(
    'Residential',
  );
  const [tier, setTier] = useState<'Concept' | 'Full Design' | 'Turnkey'>('Full Design');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(
    () => calculateArchitectureEstimate({ areaSqFt, projectType, tier }),
    [areaSqFt, projectType, tier],
  );

  const visibleProjects = useMemo(
    () => ARCH_PROJECTS.filter((p) => filter === 'All' || p.type === filter),
    [filter],
  );

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-[#F8F6F1] text-[#1A1917]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Website Design & Development"
        clientBrand="Alder & Stone Architecture"
        categoryLabel="Service Demo 01"
        onBack={onBack}
      />

      {/* 3-Zone Header */}
      <header className="border-b border-[#E5DFD5] bg-[#F8F6F1]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#as-top"
            className="text-xl font-semibold tracking-tight whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Alder &amp; Stone
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57524A]">
            <a href="#as-practice" className="hover:text-[#1A1917] whitespace-nowrap">
              Practice
            </a>
            <a href="#as-works" className="hover:text-[#1A1917] whitespace-nowrap">
              Selected Works
            </a>
            <a href="#as-estimator" className="hover:text-[#1A1917] whitespace-nowrap">
              Scope Estimator
            </a>
            <a href="#as-consult" className="hover:text-[#1A1917] whitespace-nowrap">
              Consultations
            </a>
          </nav>
          <a
            href="#as-consult"
            className="rounded-lg bg-[#1A1917] px-4 py-2 text-xs font-semibold text-[#F8F6F1] hover:bg-[#3A3631] whitespace-nowrap shrink-0"
          >
            Schedule Studio Call
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-20">
        {/* Hero Split */}
        <section id="as-top" className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8B5E34]">
                Pacific Northwest &amp; Coastal Architecture
              </p>
              <h1
                className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Structures shaped by timber, concrete, and coastal light.
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-[#57524A]">
                Alder &amp; Stone is an architectural practice designing private residences, timber
                commercial atriums, and hospitality retreats built for permanence.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#as-estimator"
                className="inline-flex items-center gap-2 rounded-lg bg-[#8B5E34] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#734C29]"
              >
                Estimate Project Scope <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#as-works"
                className="rounded-lg border border-[#D4CCC0] px-5 py-2.5 text-xs font-semibold hover:border-[#1A1917]"
              >
                Explore Works
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[#E5DFD5]">
              <ResilientImage
                src={DEMO_MEDIA.architectureHero}
                alt="Minimalist concrete and cedar pavilion overlooking coastal cliffs"
                className="h-full w-full object-cover"
                fallbackLabel="Alder & Stone"
              />
            </div>
          </div>
        </section>

        {/* Full-Width Metrics Strip */}
        <section
          id="as-practice"
          className="grid gap-6 rounded-2xl border border-[#E5DFD5] bg-white p-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: Building2, value: '34', label: 'Completed Commissions' },
            { icon: Compass, value: '14 yrs', label: 'Coastal Engineering' },
            { icon: Ruler, value: 'Net-Zero', label: 'Passive Solar Standard' },
            { icon: CheckCircle2, value: '98%', label: 'On-Budget Delivery' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-[#8B5E34] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xl font-bold tabular-nums">{stat.value}</p>
                  <p className="text-xs text-[#57524A]">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Selected Works */}
        <section id="as-works">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="text-3xl font-semibold"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Selected Architectural Works
              </h2>
              <p className="mt-1 text-sm text-[#57524A]">
                Filter studio commissions across residential, commercial, and hospitality typologies.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Residential', 'Commercial', 'Hospitality'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer ${
                    filter === cat
                      ? 'bg-[#1A1917] text-white'
                      : 'border border-[#E5DFD5] bg-white text-[#57524A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {visibleProjects.map((proj) => (
              <article
                key={proj.id}
                className="overflow-hidden rounded-2xl border border-[#E5DFD5] bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={proj.image}
                    alt={proj.title}
                    className="h-full w-full object-cover"
                    fallbackLabel={proj.title}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#8B5E34] font-semibold">
                    {proj.type} · {proj.year}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{proj.title}</h3>
                  <p className="mt-1 text-xs text-[#57524A]">
                    {proj.location} · {proj.area}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Scope Estimator & Consultation */}
        <section id="as-estimator" className="grid gap-10 lg:grid-cols-12">
          <div className="rounded-2xl border border-[#E5DFD5] bg-white p-7 lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B5E34]">
                Interactive Planning Tool
              </p>
              <h2
                className="mt-1 text-3xl font-semibold"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Architectural Fee &amp; Timeline Estimator
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="arch-type" className="block text-xs font-semibold text-[#57524A]">
                  Project Typology
                </label>
                <select
                  id="arch-type"
                  value={projectType}
                  onChange={(e) =>
                    setProjectType(
                      e.target.value as 'Residential' | 'Commercial' | 'Hospitality',
                    )
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#D4CCC0] px-3 py-2 text-sm"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Hospitality</option>
                </select>
              </div>
              <div>
                <label htmlFor="arch-tier" className="block text-xs font-semibold text-[#57524A]">
                  Service Tier
                </label>
                <select
                  id="arch-tier"
                  value={tier}
                  onChange={(e) =>
                    setTier(e.target.value as 'Concept' | 'Full Design' | 'Turnkey')
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#D4CCC0] px-3 py-2 text-sm"
                >
                  <option>Concept</option>
                  <option>Full Design</option>
                  <option>Turnkey</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="arch-area">Estimated Footprint</label>
                <span className="font-mono tabular-nums text-[#8B5E34]">
                  {areaSqFt.toLocaleString()} sq ft
                </span>
              </div>
              <input
                id="arch-area"
                type="range"
                min={1000}
                max={15000}
                step={250}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="mt-2 w-full accent-[#8B5E34]"
              />
            </div>

            <div className="grid gap-4 rounded-xl bg-[#F8F6F1] p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-[#57524A]">Estimated Architectural Fee Range</p>
                <p className="mt-1 font-mono text-xl font-bold tabular-nums text-[#1A1917]">
                  ${estimate.estimatedBudgetLow.toLocaleString()} – $
                  {estimate.estimatedBudgetHigh.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#57524A]">Design Phase Duration</p>
                <p className="mt-1 font-mono text-xl font-bold tabular-nums text-[#8B5E34]">
                  ~{estimate.timelineWeeks} Weeks
                </p>
              </div>
            </div>
          </div>

          <div
            id="as-consult"
            className="rounded-2xl border border-[#E5DFD5] bg-[#1A1917] p-7 text-white lg:col-span-5"
          >
            <h2
              className="text-2xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Book a Studio Consultation
            </h2>
            <p className="mt-2 text-xs text-stone-300">
              Your selected scope ({projectType}, {areaSqFt.toLocaleString()} sq ft, {tier}) will be
              attached to this demo request.
            </p>

            {submitted ? (
              <div role="status" className="mt-6 rounded-xl bg-white/10 p-5 text-sm">
                <p className="font-bold text-amber-300">Consultation Request Recorded (Demo)</p>
                <p className="mt-2 text-xs text-stone-200">
                  Thank you, {clientName}. A partner architect would review your{' '}
                  {areaSqFt.toLocaleString()} sq ft {projectType.toLowerCase()} brief.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setClientName('');
                    setClientEmail('');
                  }}
                  className="mt-4 rounded border border-white/30 px-3 py-1.5 text-xs cursor-pointer"
                >
                  Reset
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="as-name" className="block text-xs font-semibold text-stone-300">
                    Full Name
                  </label>
                  <input
                    id="as-name"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Jordan Ellis"
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label htmlFor="as-email" className="block text-xs font-semibold text-stone-300">
                    Email Address
                  </label>
                  <input
                    id="as-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="jordan@domain.com"
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#C6A875] py-2.5 text-xs font-bold text-[#090909] hover:bg-[#DCC9A3] cursor-pointer"
                >
                  Request Studio Consultation
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
