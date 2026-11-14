import React, { useMemo, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, MapPin, Phone, X } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { calculateConstructionEstimatePkr, formatPkr } from '../../utils/demoLogic';

interface BuildProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial';
  location: string;
  area: string;
  budgetPkr: string;
  image: string;
  summary: string;
  specs: string;
}

const PROJECTS: BuildProject[] = [
  {
    id: 'bc-1',
    title: 'DHA Phase 8 Courtyard 1-Kanal Villa',
    category: 'Residential',
    location: 'Lahore',
    area: '4,800 Sq.Ft Turnkey',
    budgetPkr: 'PKR 4.2 Crore',
    image: DEMO_MEDIA.estateflowDhaVilla,
    summary: 'Cantilevered fair-face concrete, Burma teak louvers, and double-height natural atrium.',
    specs: 'Grade-60 Rebar · Double-Glazed Low-E Windows · Solar Hybrid Ready',
  },
  {
    id: 'bc-2',
    title: 'Gulberg III Corporate Business Plaza',
    category: 'Commercial',
    location: 'Lahore',
    area: '28,000 Sq.Ft · G+6',
    budgetPkr: 'PKR 16.5 Crore',
    image: DEMO_MEDIA.estateflowCommercialPlaza,
    summary: 'Energy-efficient curtain glass facade engineered for tech offices and ground-floor retail.',
    specs: '2 Basement Levels · Schindler High-Speed Lifts · LDA Approved',
  },
  {
    id: 'bc-3',
    title: 'Sector F-6 Architectural Concrete Site',
    category: 'Residential',
    location: 'Islamabad',
    area: '6,200 Sq.Ft Turnkey',
    budgetPkr: 'PKR 5.8 Crore',
    image: DEMO_MEDIA.buildcraftConstruction,
    summary: 'Margalla-view stone residence integrating seismic Zone-2B reinforcement and radiant floor heating.',
    specs: 'CDA Seismic Compliance · Travertine Stone Cladding · Smart BMS',
  },
];

export function ServiceBusinessDemo({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [selectedProject, setSelectedProject] = useState<BuildProject | null>(null);
  const [areaSqFt, setAreaSqFt] = useState(4500);
  const [projectType, setProjectType] = useState<'Residential Villa' | 'Commercial Plaza' | 'Corporate Fit-Out'>('Residential Villa');
  const [finishTier, setFinishTier] = useState<'Grey Structure' | 'A-Class Finish' | 'Turnkey Luxury'>('A-Class Finish');

  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqCity, setInqCity] = useState('Lahore');
  const [inqSent, setInqSent] = useState(false);

  const visibleProjects = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const estimate = useMemo(
    () => calculateConstructionEstimatePkr({ areaSqFt, projectType, finishTier }),
    [areaSqFt, projectType, finishTier],
  );

  return (
    <div
      className="min-h-screen bg-white text-[#18181B]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Business Website Development"
        clientBrand="BuildCraft"
        categoryLabel="Service Demo 11"
        onBack={onBack}
      />

      {/* Charcoal, White & Gold Header */}
      <header className="bg-[#18181B] text-white border-b border-[#C6A875]/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
          <span
            className="text-xl font-bold tracking-tight text-[#C6A875] whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            BuildCraft
          </span>
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-300">
            <a href="#bc-services" className="hover:text-[#C6A875] whitespace-nowrap">Services</a>
            <a href="#bc-projects" className="hover:text-[#C6A875] whitespace-nowrap">Projects</a>
            <a href="#bc-estimator" className="hover:text-[#C6A875] whitespace-nowrap">PKR Estimator</a>
            <a href="#bc-faq" className="hover:text-[#C6A875] whitespace-nowrap">Testimonials &amp; FAQ</a>
          </nav>
          <a
            href="#bc-contact"
            className="rounded-lg bg-[#C6A875] px-4 py-2 text-xs font-bold text-[#18181B] hover:bg-[#DCC9A3] whitespace-nowrap shrink-0"
          >
            Request Site Visit
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-20">
        {/* Hero Split */}
        <section className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between py-2 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9A7B48]">
                PEC-Licensed Architecture &amp; Construction · Lahore · Islamabad · Karachi
              </p>
              <h1
                className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-[#18181B] sm:text-5xl"
                style={{ fontFamily: '"Outfit", sans-serif', textWrap: 'balance' }}
              >
                Engineered grey structure, commercial plazas &amp; turnkey luxury homes.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                BuildCraft is a PEC-licensed Pakistani construction and architectural practice
                delivering structural engineering, DHA/CDA approvals, and fixed-timeline turnkey
                execution with itemized BOQ transparency.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#bc-estimator"
                className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-5 py-3 text-xs font-bold text-white hover:bg-zinc-800"
              >
                Estimate Construction Cost (PKR) <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#bc-projects"
                className="rounded-lg border border-zinc-300 px-5 py-3 text-xs font-bold text-[#18181B]"
              >
                View Built Projects
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] overflow-hidden rounded-2xl border border-zinc-200">
              <ResilientImage
                src={DEMO_MEDIA.buildcraftConstruction}
                alt="BuildCraft modern concrete and glass corporate building under precision structural engineering"
                className="h-full w-full object-cover"
                fallbackLabel="BuildCraft Engineering"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="bc-services" className="grid gap-6 md:grid-cols-3 border-t border-zinc-200 pt-14">
          {[
            {
              title: '01. Architectural & 3D Planning',
              desc: 'DHA, CDA, and Bahria Town by-law compliant architectural drawings, MEP schematics, and BIM modeling.',
            },
            {
              title: '02. Grey Structure Execution',
              desc: 'Grade-60 steel reinforcement, batching-plant concrete, damp proofing, and daily engineer site audits.',
            },
            {
              title: '03. Turnkey Commercial & Villas',
              desc: 'Complete joinery, Italian tilework, VRF HVAC automation, and handover with defect liability warranty.',
            },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-6">
              <Building2 className="h-5 w-5 text-[#9A7B48]" />
              <h2 className="mt-3 text-base font-bold text-[#18181B]">{s.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* Project Gallery with Clickable Detail Modal */}
        <section id="bc-projects" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9A7B48]">Built Portfolio</p>
              <h2 className="mt-1 text-3xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Residential &amp; Commercial Landmarks
              </h2>
            </div>
            <div className="inline-flex rounded-lg bg-zinc-100 p-1">
              {(['All', 'Residential', 'Commercial'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer ${
                    filter === cat ? 'bg-[#18181B] text-[#C6A875]' : 'text-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {visibleProjects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProject(p)}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left hover:border-[#C6A875] cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackLabel={p.title}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-[#9A7B48]">
                    {p.category} · {p.location} · {p.area}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[#18181B]">{p.title}</h3>
                  <p className="mt-2 text-xs text-zinc-600">{p.summary}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Interactive PKR Estimator & Contact Inquiry */}
        <section id="bc-estimator" className="grid gap-8 rounded-2xl border border-zinc-200 bg-[#18181B] p-8 text-white lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A875]">
                Interactive Scope Tool
              </p>
              <h2 className="mt-1 text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Construction Cost Estimator (PKR)
              </h2>
            </div>

            <div>
              <div className="flex justify-between text-xs">
                <label htmlFor="bc-area">Covered Area</label>
                <span className="font-mono font-bold text-[#C6A875]">{areaSqFt.toLocaleString()} Sq.Ft</span>
              </div>
              <input
                id="bc-area"
                type="range"
                min={1500}
                max={20000}
                step={250}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="mt-2 w-full accent-[#C6A875]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-zinc-400 mb-1.5">Project Type</p>
                <select
                  aria-label="Project Type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as typeof projectType)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
                >
                  <option>Residential Villa</option>
                  <option>Commercial Plaza</option>
                  <option>Corporate Fit-Out</option>
                </select>
              </div>
              <div>
                <p className="text-zinc-400 mb-1.5">Execution Tier</p>
                <select
                  aria-label="Execution Tier"
                  value={finishTier}
                  onChange={(e) => setFinishTier(e.target.value as typeof finishTier)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
                >
                  <option>Grey Structure</option>
                  <option>A-Class Finish</option>
                  <option>Turnkey Luxury</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-[#C6A875]/30 bg-black/40 p-5">
              <p className="text-xs text-zinc-400">Estimated Budget Range ({finishTier})</p>
              <p className="mt-1 font-mono text-xl font-bold text-[#C6A875] tabular-nums">
                {formatPkr(estimate.estimatedBudgetLow)} – {formatPkr(estimate.estimatedBudgetHigh)}
              </p>
              <p className="mt-1 text-xs text-zinc-300">
                Estimated Delivery: <strong>{estimate.timelineMonths} Months</strong>
              </p>
            </div>
          </div>

          <div id="bc-contact" className="lg:col-span-6 rounded-xl bg-white p-6 text-[#18181B]">
            <h3 className="text-lg font-bold">Request Engineering Consultation</h3>
            <p className="mt-1 text-xs text-zinc-500">
              <MapPin className="inline h-3.5 w-3.5 text-[#9A7B48]" /> 42-C Main Boulevard, Gulberg III, Lahore ·{' '}
              <Phone className="inline h-3.5 w-3.5 text-[#9A7B48]" /> +92 42 3511 0909
            </p>
            {inqSent ? (
              <div className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-900" role="status">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                <p className="mt-2 font-bold">Site Consultation Request Recorded (Demo)</p>
                <p>Thank you, {inqName}. Project estimate attached for {inqCity}.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!inqName.trim() || !inqPhone.trim()) return;
                  setInqSent(true);
                }}
                className="mt-4 space-y-3 text-xs"
              >
                <input
                  type="text"
                  required
                  aria-label="Client or Plot Owner Name"
                  placeholder="Client / Plot Owner Name"
                  value={inqName}
                  onChange={(e) => setInqName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2.5"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    aria-label="Phone number"
                    placeholder="Phone (+92 3XX...)"
                    value={inqPhone}
                    onChange={(e) => setInqPhone(e.target.value)}
                    className="rounded-lg border border-zinc-200 px-3 py-2.5"
                  />
                  <select
                    aria-label="Plot city"
                    value={inqCity}
                    onChange={(e) => setInqCity(e.target.value)}
                    className="rounded-lg border border-zinc-200 px-3 py-2.5"
                  >
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Karachi</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#18181B] py-3 font-bold text-[#C6A875] hover:bg-zinc-800 cursor-pointer"
                >
                  Schedule BuildCraft Site Visit (Demo)
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Testimonials & Engineering FAQ */}
        <section id="bc-faq" className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <h2 className="text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Client Endorsement
              </h2>
              <span className="text-zinc-500">Sample Content</span>
            </div>
            <blockquote className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-xs space-y-2">
              <p className="text-sm leading-relaxed text-zinc-700">
                &ldquo;BuildCraft completed our 1-Kanal DHA Phase 8 grey structure in 5.5 months with
                certified cube-strength concrete test reports at every slab pour.&rdquo;
              </p>
              <footer className="font-bold text-[#9A7B48]">— Brig. (R) Sohail Ahmed, Lahore</footer>
            </blockquote>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Construction FAQ
            </h2>
            {[
              {
                q: 'Do your contracts specify material brands in the BOQ?',
                a: 'Yes — steel grade, cement, wiring, waterproofing, and sanitary fixtures are itemised upfront before mobilization.',
              },
              {
                q: 'Does BuildCraft assist with DHA / CDA building plan approvals?',
                a: 'Our architectural team handles submission drawings, soil tests, and structural vetting clearances.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-zinc-200 bg-white p-4 text-xs">
                <p className="font-bold">{item.q}</p>
                <p className="mt-1 text-zinc-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#18181B] text-zinc-400 border-t border-[#C6A875]/20 mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-xl font-bold text-[#C6A875]" style={{ fontFamily: '"Outfit", sans-serif' }}>
              BUILDCRAFT ENGINEERING
            </p>
            <p className="max-w-sm leading-relaxed">
              PEC-registered Pakistani civil engineering, architectural planning, and turnkey luxury
              villa &amp; commercial plaza builders.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Navigation</p>
            <ul className="space-y-1.5">
              <li><a href="#bc-services" className="hover:text-[#C6A875]">Engineering Services</a></li>
              <li><a href="#bc-projects" className="hover:text-[#C6A875]">Project Gallery</a></li>
              <li><a href="#bc-estimator" className="hover:text-[#C6A875]">PKR Budget Tool</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Regional Desks</p>
            <p>42-C Gulberg III, Lahore</p>
            <p>Sector F-6 Markaz, Islamabad</p>
            <p className="text-[#C6A875]">projects@buildcraft.pk</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-zinc-500">
          BuildCraft · Interactive Client Website Demonstration (Sample Data Only)
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9]">
              <ResilientImage src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Close project detail"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 rounded-full bg-black/75 p-2 text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <p className="font-semibold text-[#9A7B48]">
                {selectedProject.category} · {selectedProject.location} · {selectedProject.area}
              </p>
              <h3 className="text-2xl font-bold text-[#18181B]" style={{ fontFamily: '"Outfit", sans-serif' }}>
                {selectedProject.title}
              </h3>
              <p className="leading-relaxed text-zinc-600">{selectedProject.summary}</p>
              <p className="font-mono text-zinc-700">{selectedProject.specs}</p>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                <span className="font-mono text-base font-bold text-[#18181B]">{selectedProject.budgetPkr}</span>
                <a
                  href="#bc-contact"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg bg-[#18181B] px-4 py-2 font-bold text-[#C6A875]"
                >
                  Request Similar BOQ
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
