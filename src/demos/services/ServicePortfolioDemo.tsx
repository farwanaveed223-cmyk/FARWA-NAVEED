import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Phone, X } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr } from '../../utils/demoLogic';

interface InteriorProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Hospitality';
  location: string;
  areaSqFt: string;
  materials: string;
  year: string;
  image: string;
  summary: string;
}

const PROJECTS: InteriorProject[] = [
  {
    id: 'hi-1',
    title: 'DHA Phase 6 Formal Drawing Room',
    category: 'Residential',
    location: 'Lahore',
    areaSqFt: '4,200 sq ft',
    materials: 'Sheesham Wood · Travertine Marble · Brushed Brass',
    year: '2026',
    image: DEMO_MEDIA.hunarInteriorsSalon,
    summary:
      'Custom recessed jali screens, hand-knotted Lahore wool rugs, and warm brass sconces arranged for multi-generational family entertaining.',
  },
  {
    id: 'hi-2',
    title: 'F-7 Master Suite & Walnut Sanctuary',
    category: 'Residential',
    location: 'Islamabad',
    areaSqFt: '1,450 sq ft Suite',
    materials: 'Smoked Walnut · Belgian Linen · Warm Oak Parquet',
    year: '2026',
    image: DEMO_MEDIA.hunarLuxuryBedroom,
    summary:
      'Floor-to-ceiling timber fluted paneling with indirect headboard coves designed for serene residential comfort.',
  },
  {
    id: 'hi-3',
    title: 'Gulberg Courtyard Show Kitchen',
    category: 'Residential',
    location: 'Gulberg III, Lahore',
    areaSqFt: '950 sq ft Kitchen',
    materials: 'Veined Statuario Marble · Brushed Brass · Matte Oak',
    year: '2026',
    image: DEMO_MEDIA.hunarKitchenInterior,
    summary:
      'Monolithic marble waterfall island engineered for heavy daily Pakistani entertaining alongside concealed wet-kitchen service.',
  },
  {
    id: 'hi-4',
    title: 'Clifton Heritage Design & Hospitality Lounge',
    category: 'Commercial',
    location: 'Clifton Block 4, Karachi',
    areaSqFt: '3,100 sq ft',
    materials: 'Microcement Plaster · Burnished Bronze · Track Optics',
    year: '2025',
    image: DEMO_MEDIA.editorialGallery,
    summary:
      'Minimalist exhibition and hospitality rooms sculpted with warm indirect coves to highlight Pakistani craftsmanship.',
  },
];

const SERVICES = [
  {
    title: 'Residential Architecture & Styling',
    fee: formatPkr(185000),
    unit: 'Concept & 3D Package',
    desc: 'Complete spatial planning, false ceiling engineering, custom woodwork drawings, and turnkey furniture sourcing for 1–2 Kanal homes.',
  },
  {
    title: 'Corporate & Retail Fit-Outs',
    fee: formatPkr(260000),
    unit: 'Full Commercial Suite',
    desc: 'Brand-aligned reception lounges, acoustic boardrooms, and boutique flagship retail interiors delivered on strict commercial timelines.',
  },
  {
    title: 'Bespoke Furniture & Joinery',
    fee: formatPkr(95000),
    unit: 'Custom Millwork Consultation',
    desc: 'Made-in-Pakistan sheesham, walnut, and brass statement pieces crafted alongside master artisans in Chiniot and Lahore.',
  },
];

export function ServicePortfolioDemo({ onBack }: { onBack: () => void }) {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [projectType, setProjectType] = useState('Residential Villa');
  const [notes, setNotes] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<string | null>(null);

  const filtered = useMemo(
    () => PROJECTS.filter((p) => categoryFilter === 'All' || p.category === categoryFilter),
    [categoryFilter],
  );

  const activeProject = lightboxIndex !== null ? filtered[lightboxIndex] ?? null : null;

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;
    setSubmittedInquiry(
      `Consultation inquiry logged for ${clientName.trim()} (${city} · ${projectType}). Demo record only—no booking transmitted.`,
    );
    setClientName('');
    setClientPhone('');
    setNotes('');
  };

  return (
    <div
      className="min-h-screen bg-[#F7F4EE] text-[#1C1917]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Portfolio Website"
        clientBrand="Hunar Interiors"
        categoryLabel="Service Demo 13"
        onBack={onBack}
      />

      {/* Editorial Navigation */}
      <header className="border-b border-[#E5DEC9] bg-[#F7F4EE]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-4 sm:py-5">
          <a
            href="#hi-top"
            className="text-lg sm:text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            HUNAR INTERIORS
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#57534E]">
            <a href="#hi-projects" className="hover:text-[#A67B3E] whitespace-nowrap">Projects</a>
            <a href="#hi-services" className="hover:text-[#A67B3E] whitespace-nowrap">Services</a>
            <a href="#hi-about" className="hover:text-[#A67B3E] whitespace-nowrap">Principal Designer</a>
            <a href="#hi-faq" className="hover:text-[#A67B3E] whitespace-nowrap">Process &amp; FAQ</a>
          </nav>
          <a
            href="#hi-contact"
            className="rounded-lg bg-[#1C1917] px-3 sm:px-4 py-2 text-xs font-semibold text-[#F7F4EE] hover:bg-[#A67B3E] transition-colors whitespace-nowrap shrink-0"
          >
            Book Consultation
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 space-y-20">
        {/* Hero */}
        <section id="hi-top" className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#A67B3E]">
              Lahore · Islamabad · Karachi
            </p>
            <h1
              className="text-4xl font-semibold leading-[1.06] text-[#1C1917] sm:text-6xl"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Quiet Pakistani craft shaped for contemporary living.
            </h1>
            <p className="text-sm leading-relaxed text-[#57534E] max-w-lg">
              Founded by principal architect <strong>Mehreen Qazi</strong>, Hunar Interiors composes
              warm travertine, hand-carved sheesham, and tailored natural daylight into serene
              residences and flagship commercial spaces across Pakistan.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#hi-projects"
                className="rounded-lg bg-[#1C1917] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#A67B3E]"
              >
                Explore Selected Rooms
              </a>
              <a
                href="#hi-contact"
                className="rounded-lg border border-[#D6CFC2] bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#1C1917] hover:border-[#1C1917]"
              >
                Request Studio Visit
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-[#E5DEC9] bg-[#E8E2D5]">
              <ResilientImage
                src={DEMO_MEDIA.hunarInteriorsSalon}
                alt="Hunar Interiors luxury Pakistani drawing room in Lahore"
                className="h-full w-full object-cover"
                fallbackLabel="Hunar Interiors Salon"
              />
            </div>
          </div>
        </section>

        {/* Filterable Project Gallery */}
        <section id="hi-projects" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5DEC9] pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A67B3E]">
                Curated Monograph
              </p>
              <h2
                className="mt-1 text-3xl font-semibold"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Living Rooms, Bedrooms &amp; Kitchen Interiors
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Residential', 'Commercial'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategoryFilter(cat);
                    setLightboxIndex(null);
                  }}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-[#1C1917] text-white'
                      : 'border border-[#D6CFC2] bg-white text-[#57534E] hover:border-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((project, idx) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group overflow-hidden rounded-2xl border border-[#E5DEC9] bg-white text-left transition-all hover:border-[#A67B3E] cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#EAE4D7]">
                  <ResilientImage
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackLabel={project.title}
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#A67B3E] font-semibold">
                    <span>
                      {project.category} · {project.location}
                    </span>
                    <span className="font-mono text-[#78716C]">{project.areaSqFt}</span>
                  </div>
                  <h3
                    className="text-2xl font-semibold text-[#1C1917]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#57534E]">{project.summary}</p>
                  <p className="pt-1 text-[11px] font-medium text-[#78716C]">
                    Materials: {project.materials}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Interior Services */}
        <section id="hi-services" className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A67B3E]">
              Studio Capabilities
            </p>
            <h2
              className="mt-1 text-3xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Design Scope &amp; Transparent Fee Tiers
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="flex flex-col justify-between rounded-2xl border border-[#E5DEC9] bg-white p-6"
              >
                <div>
                  <h3
                    className="text-2xl font-semibold text-[#1C1917]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {svc.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#57534E]">{svc.desc}</p>
                </div>
                <div className="mt-6 border-t border-[#F0EAE0] pt-4">
                  <p className="text-[11px] uppercase tracking-wider text-[#78716C]">{svc.unit}</p>
                  <p className="mt-0.5 font-mono text-lg font-bold tabular-nums text-[#A67B3E]">
                    From {svc.fee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Principal Designer Intro & Sample Client Note */}
        <section
          id="hi-about"
          className="grid items-center gap-8 rounded-2xl border border-[#E5DEC9] bg-white p-7 sm:p-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#EAE4D7]">
              <ResilientImage
                src={DEMO_MEDIA.creativeDirector}
                alt="Mehreen Qazi, Principal Interior Architect at Hunar Interiors"
                className="h-full w-full object-cover"
                fallbackLabel="Mehreen Qazi"
              />
            </div>
          </div>
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#A67B3E]">
              <Award className="h-4 w-4" /> Principal Designer Introduction
            </div>
            <h2
              className="text-3xl font-semibold text-[#1C1917]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Mehreen Qazi, NCA Lahore Alumna
            </h2>
            <p className="text-sm leading-relaxed text-[#57534E]">
              With over 11 years leading bespoke residential and hospitality commissions across
              Lahore, Islamabad, and Karachi, Mehreen bridges vernacular Pakistani woodwork and
              stone masonry with crisp modern architectural proportion.
            </p>
            <blockquote className="rounded-xl border border-[#E5DEC9] bg-[#FAF8F3] p-5 text-xs leading-relaxed text-[#44403C]">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#A67B3E]">
                Sample Content · Client Testimonial
              </span>
              &ldquo;Hunar Interiors transformed our 1-Kanal DHA Phase 6 residence from grey
              structure to move-in ready in six months, honoring every budget milestone.&rdquo;
              <footer className="mt-2 font-semibold text-[#1C1917]">
                — Dr. Kamran &amp; Nadia Siddiqui, Lahore
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Process & Studio FAQ */}
        <section id="hi-faq" className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A67B3E]">
              Working Together
            </p>
            <h2 className="mt-1 text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Architectural Process &amp; FAQ
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: 'Do you oversee on-site contractors and furniture artisans directly?',
                a: 'Yes — weekly supervisor site visits and Chiniot/Lahore workshop checks ensure exact finish fidelity.',
              },
              {
                q: 'Can clients commission only bedrooms or a single show kitchen remodel?',
                a: 'Yes, we take standalone kitchen, drawing room, and bridal suite renovations in Lahore and Islamabad.',
              },
              {
                q: 'Are 3D renders included prior to carpentry and stone purchasing?',
                a: 'Every project receives photorealistic daytime and evening lighting renders before procurement begins.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-[#E5DEC9] bg-white p-5 text-xs">
                <p className="font-bold text-[#1C1917]">{item.q}</p>
                <p className="mt-1.5 text-[#57534E] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Booking Form */}
        <section
          id="hi-contact"
          className="grid gap-8 rounded-2xl bg-[#1C1917] p-8 text-[#F7F4EE] lg:grid-cols-12"
        >
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4A359]">
              Studio Consultations
            </p>
            <h2
              className="text-3xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Plan Your Residence or Commercial Space
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300">
              Schedule an introductory design walk-through at our Gulberg III studio or request a
              site assessment anywhere in Lahore, Islamabad, or Karachi.
            </p>
            <div className="space-y-2 pt-2 text-xs text-neutral-300">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D4A359]" />
                <span>Suite 14, Main Boulevard Gulberg III, Lahore</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D4A359]" />
                <span>+92 300 412 8890 · studio@hunarinteriors.pk</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleConsultSubmit} className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hi-name" className="block text-xs font-medium text-neutral-300">
                Full Name
              </label>
              <input
                id="hi-name"
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Ayesha Humayun"
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label htmlFor="hi-phone" className="block text-xs font-medium text-neutral-300">
                Phone / WhatsApp
              </label>
              <input
                id="hi-phone"
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="0300-XXXXXXX"
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label htmlFor="hi-city" className="block text-xs font-medium text-neutral-300">
                City
              </label>
              <select
                id="hi-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-[#292524] px-3 py-2 text-sm text-white"
              >
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
                <option value="Multan">Multan</option>
              </select>
            </div>
            <div>
              <label htmlFor="hi-type" className="block text-xs font-medium text-neutral-300">
                Project Scope
              </label>
              <select
                id="hi-type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-[#292524] px-3 py-2 text-sm text-white"
              >
                <option value="Residential Villa">Residential Villa</option>
                <option value="Corporate Office">Corporate Office</option>
                <option value="Boutique Hospitality">Boutique Hospitality</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="hi-notes" className="block text-xs font-medium text-neutral-300">
                Project Brief
              </label>
              <textarea
                id="hi-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Plot size, timeline, or preferred aesthetic..."
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>

            {submittedInquiry && (
              <div
                role="status"
                className="sm:col-span-2 flex items-center gap-2 rounded-lg border border-[#D4A359]/40 bg-[#D4A359]/10 p-3 text-xs text-[#F5E1BE]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{submittedInquiry}</span>
              </div>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-[#D4A359] px-6 py-3 text-xs font-bold text-[#1C1917] hover:bg-[#E2B978] cursor-pointer"
              >
                Request Consultation (Demo)
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Studio Footer */}
      <footer className="bg-[#1C1917] text-neutral-400 border-t border-white/10 mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-2xl font-semibold text-white" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              HUNAR INTERIORS
            </p>
            <p className="max-w-sm leading-relaxed">
              Architectural interior studio crafting luxury drawing rooms, master suites, bespoke
              show kitchens, and commercial lounges across Pakistan.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Monograph</p>
            <ul className="space-y-1.5">
              <li><a href="#hi-projects" className="hover:text-[#D4A359]">Room Galleries</a></li>
              <li><a href="#hi-services" className="hover:text-[#D4A359]">Design Fees (PKR)</a></li>
              <li><a href="#hi-about" className="hover:text-[#D4A359]">Principal Designer</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Studio Desk</p>
            <p>Suite 14, Main Boulevard Gulberg III, Lahore</p>
            <p className="text-[#D4A359]">studio@hunarinteriors.pk</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-neutral-500">
          Hunar Interiors · Interactive Portfolio Demonstration Website (Sample Content)
        </div>
      </footer>

      {/* Lightbox Exhibition Viewer */}
      {activeProject && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-[#1C1917] p-5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close project lightbox"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 rounded-lg bg-black/60 p-2 text-white hover:text-[#D4A359] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-black">
              <ResilientImage
                src={activeProject.image}
                alt={activeProject.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-[#D4A359]">
                  {activeProject.category} · {activeProject.location} · {activeProject.areaSqFt}
                </p>
                <h3
                  className="mt-1 text-2xl font-semibold text-white"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {activeProject.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-300">{activeProject.materials}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
                  }
                  className="rounded-lg border border-white/15 p-2 text-white hover:border-[#D4A359] cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
                  className="rounded-lg border border-white/15 p-2 text-white hover:border-[#D4A359] cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
