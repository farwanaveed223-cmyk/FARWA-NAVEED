import React, { useMemo, useState } from 'react';
import { Award, Briefcase, CheckCircle2, Mail, MapPin, Plus, X } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';

interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  discipline: 'Brand Systems' | 'Product Design' | 'Editorial' | 'Web Architecture';
  year: string;
  impact: string;
  summary: string;
  image: string;
}

const INITIAL_PROJECTS: PortfolioProject[] = [
  {
    id: 'p1',
    title: 'Solstice Botanicals Rebrand',
    client: 'Solstice Apothecary',
    discipline: 'Brand Systems',
    year: '2026',
    impact: '+48% Direct Online Revenue',
    summary:
      'Complete visual identity, tactile packaging typography, and direct-to-consumer storefront architecture.',
    image:
      'https://images.pexels.com/photos/4549411/pexels-photo-4549411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'p2',
    title: 'Kestrel Financial Design System',
    client: 'Kestrel Treasury',
    discipline: 'Product Design',
    year: '2026',
    impact: '38% Faster Onboarding Flow',
    summary:
      'Unified multi-product UI tokens, accessible data tables, and treasury approval workflows for 140k users.',
    image:
      'https://images.pexels.com/photos/3688759/pexels-photo-3688759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'p3',
    title: 'Monolith Architectural Monograph',
    client: 'Tate & Partner Press',
    discipline: 'Editorial',
    year: '2025',
    impact: 'Featured in Print Annual',
    summary:
      'Digital exhibition catalog and print companion celebrating brutalist concrete civic landmarks.',
    image: DEMO_MEDIA.editorialGallery,
  },
  {
    id: 'p4',
    title: 'Verve Hospitality Flagship',
    client: 'Verve Hotels Group',
    discipline: 'Web Architecture',
    year: '2025',
    impact: '2.4x Direct Suite Bookings',
    summary:
      'Multilingual reservation platform and editorial property guides across 11 boutique European locations.',
    image: DEMO_MEDIA.architectureHero,
  },
];

const SKILLS = [
  { name: 'Design Systems & UI Architecture', level: 96, group: 'Product' },
  { name: 'Brand Identity & Art Direction', level: 94, group: 'Brand' },
  { name: 'React, TypeScript & Motion Systems', level: 89, group: 'Engineering' },
  { name: 'Editorial Typography & Print', level: 92, group: 'Brand' },
  { name: 'Design Research & Prototyping', level: 90, group: 'Product' },
  { name: 'Accessibility & WCAG Audits', level: 88, group: 'Engineering' },
];

const TIMELINE = [
  {
    period: '2023 — Present',
    role: 'Principal Creative Director',
    org: 'Elena Vance Studio (Independent Practice)',
    detail: 'Leading brand and product engagements for Series A–C software and lifestyle founders.',
  },
  {
    period: '2020 — 2023',
    role: 'Design Director, Digital Flagships',
    org: 'Morrow & Co., London',
    detail: 'Directed cross-functional teams of 14 designers and front-end engineers across global launches.',
  },
  {
    period: '2017 — 2020',
    role: 'Senior Product Designer',
    org: 'Latticework Labs',
    detail: 'Designed core analytics dashboards and collaborative workflow tools.',
  },
];

export function PortfolioDashboardDemo({ onBack }: { onBack: () => void }) {
  const [projects, setProjects] = useState<PortfolioProject[]>(INITIAL_PROJECTS);
  const [activeDiscipline, setActiveDiscipline] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [skillFilter, setSkillFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDiscipline, setNewDiscipline] =
    useState<PortfolioProject['discipline']>('Brand Systems');
  const [newImpact, setNewImpact] = useState('');
  const [newSummary, setNewSummary] = useState('');

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const visibleProjects = useMemo(
    () =>
      projects.filter(
        (p) => activeDiscipline === 'All' || p.discipline === activeDiscipline,
      ),
    [projects, activeDiscipline],
  );

  const visibleSkills = useMemo(
    () => SKILLS.filter((s) => skillFilter === 'All' || s.group === skillFilter),
    [skillFilter],
  );

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClient.trim() || !newSummary.trim()) return;
    const created: PortfolioProject = {
      id: `p-${Date.now()}`,
      title: newTitle.trim(),
      client: newClient.trim(),
      discipline: newDiscipline,
      year: '2026',
      impact: newImpact.trim() || 'Client Launch Complete',
      summary: newSummary.trim(),
      image: DEMO_MEDIA.creativeDirector,
    };
    setProjects((prev) => [created, ...prev]);
    setNewTitle('');
    setNewClient('');
    setNewImpact('');
    setNewSummary('');
    setShowAddModal(false);
  };

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryError('');
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) {
      setInquiryError('Please fill in all inquiry fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryEmail.trim())) {
      setInquiryError('Please enter a valid email address.');
      return;
    }
    setInquirySent(true);
  };

  return (
    <div
      className="min-h-screen bg-[#FAF8F5] text-[#171717]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Portfolio Website Manager"
        clientBrand="Elena Vance Studio"
        categoryLabel="Creative"
        onBack={onBack}
      />

      {/* Clean 3-zone header */}
      <header className="border-b border-[#E7E2DA] bg-[#FAF8F5]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-5">
          <a
            href="#profile"
            className="text-xl font-semibold tracking-tight whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Elena Vance
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <a href="#pv-profile" className="hover:text-neutral-950 whitespace-nowrap">
              Profile
            </a>
            <a href="#pv-projects" className="hover:text-neutral-950 whitespace-nowrap">
              Projects
            </a>
            <a href="#pv-skills" className="hover:text-neutral-950 whitespace-nowrap">
              Skills
            </a>
            <a href="#pv-experience" className="hover:text-neutral-950 whitespace-nowrap">
              Experience
            </a>
          </nav>
          <a
            href="#pv-contact"
            className="rounded-lg bg-[#9A3412] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7C2D12] whitespace-nowrap shrink-0"
          >
            Book Consultation
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-20">
        {/* Profile Hero */}
        <section id="pv-profile" className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9A3412]">
                Creative Director · Brand &amp; Product Systems
              </p>
              <h1
                className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Designing enduring digital flagships for ambitious founders.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
                Sample portfolio system demonstrating how creatives present curated work,
                quantifiable project outcomes, technical capabilities, and direct booking inquiries.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[#E7E2DA] pt-6">
              <div>
                <p className="text-2xl font-bold tabular-nums text-neutral-900">9+ yrs</p>
                <p className="mt-1 text-xs text-neutral-500">Studio Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-neutral-900">42</p>
                <p className="mt-1 text-xs text-neutral-500">Shipped Systems</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-neutral-900">4</p>
                <p className="mt-1 text-xs text-neutral-500">Design Honors</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-[#E7E2DA]">
              <ResilientImage
                src={DEMO_MEDIA.creativeDirector}
                alt="Elena Vance portrait in studio"
                className="h-full w-full object-cover"
                fallbackLabel="Elena Vance"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-6 text-white">
                <p className="flex items-center gap-2 text-xs font-medium text-white/90">
                  <MapPin className="h-3.5 w-3.5" /> London &amp; Remote Worldwide
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Gallery */}
        <section id="pv-projects">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Selected Projects Gallery
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Filter by discipline, inspect case studies, or add a sample project entry.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-700 whitespace-nowrap cursor-pointer self-start"
            >
              <Plus className="h-3.5 w-3.5" /> Add Project
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {['All', 'Brand Systems', 'Product Design', 'Editorial', 'Web Architecture'].map(
              (disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setActiveDiscipline(disc)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    activeDiscipline === disc
                      ? 'bg-[#9A3412] text-white'
                      : 'border border-[#E7E2DA] bg-white text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {disc}
                </button>
              ),
            )}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-[#E7E2DA] bg-white transition-shadow hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                  <ResilientImage
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    fallbackLabel={project.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>{project.discipline}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{project.year}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-900">{project.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{project.summary}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#F0ECE4] pt-4">
                    <span className="text-xs font-semibold text-[#9A3412]">{project.impact}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-neutral-900 underline underline-offset-4 hover:text-[#9A3412] cursor-pointer"
                    >
                      View Case Study
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills & Achievements */}
        <section id="pv-skills" className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Core Capabilities
              </h2>
              <div className="flex gap-1 rounded-lg bg-[#EFEAE2] p-1">
                {['All', 'Product', 'Brand', 'Engineering'].map((grp) => (
                  <button
                    key={grp}
                    type="button"
                    onClick={() => setSkillFilter(grp)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                      skillFilter === grp ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-5 rounded-2xl border border-[#E7E2DA] bg-white p-6">
              {visibleSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-neutral-900">{skill.name}</span>
                    <span className="tabular-nums font-semibold text-[#9A3412]">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EFEAE2]">
                    <div
                      className="h-full rounded-full bg-[#9A3412] transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="pv-experience" className="lg:col-span-6">
            <h2
              className="text-3xl font-semibold tracking-tight"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Experience &amp; Recognition
            </h2>
            <div className="mt-6 space-y-6 rounded-2xl border border-[#E7E2DA] bg-white p-6">
              {TIMELINE.map((item) => (
                <div
                  key={item.period}
                  className="border-b border-[#F0ECE4] pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-[#9A3412]">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{item.period}</span>
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold text-neutral-900">{item.role}</h3>
                  <p className="text-xs font-medium text-neutral-500">{item.org}</p>
                  <p className="mt-2 text-sm text-neutral-600">{item.detail}</p>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-xl bg-[#FAF8F5] p-4 text-xs text-neutral-700">
                <Award className="h-4 w-4 text-[#9A3412] shrink-0" />
                <span>2025 European Design Award · 2024 Type Directors Club Certificate</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="pv-contact" className="rounded-2xl border border-[#E7E2DA] bg-white p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A3412]">
                Project Availability
              </p>
              <h2
                className="mt-2 text-3xl font-semibold"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Start a conversation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Currently scheduling Q1–Q2 brand systems and product architecture retainers. All
                submissions below are simulated inside this demo.
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm font-medium text-neutral-800">
                <Mail className="h-4 w-4 text-[#9A3412]" /> elena@vance-studio.example
              </p>
            </div>

            <div className="lg:col-span-7">
              {inquirySent ? (
                <div className="rounded-xl bg-[#FAF8F5] p-6" role="status">
                  <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                  <h3 className="mt-3 text-lg font-semibold">Demo Inquiry Logged</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    Thank you, {inquiryName}. Your sample inquiry has been recorded in this preview
                    session.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setInquirySent(false);
                      setInquiryName('');
                      setInquiryEmail('');
                      setInquiryMessage('');
                    }}
                    className="mt-4 rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="pv-name" className="block text-xs font-semibold text-neutral-700">
                        Your Name
                      </label>
                      <input
                        id="pv-name"
                        type="text"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Marcus Chen"
                        className="mt-1.5 w-full rounded-lg border border-[#E7E2DA] px-3.5 py-2.5 text-sm focus:border-[#9A3412] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="pv-email" className="block text-xs font-semibold text-neutral-700">
                        Work Email
                      </label>
                      <input
                        id="pv-email"
                        type="email"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="marcus@company.com"
                        className="mt-1.5 w-full rounded-lg border border-[#E7E2DA] px-3.5 py-2.5 text-sm focus:border-[#9A3412] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="pv-msg" className="block text-xs font-semibold text-neutral-700">
                      Project Brief
                    </label>
                    <textarea
                      id="pv-msg"
                      rows={4}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Scope, timeline, and goals..."
                      className="mt-1.5 w-full rounded-lg border border-[#E7E2DA] px-3.5 py-2.5 text-sm focus:border-[#9A3412] focus:outline-none"
                    />
                  </div>
                  {inquiryError && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {inquiryError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="rounded-lg bg-[#9A3412] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#7C2D12] cursor-pointer"
                  >
                    Send Inquiry (Demo)
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close project case study"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A3412]">
              {selectedProject.discipline} · {selectedProject.year}
            </p>
            <h3
              className="mt-2 text-2xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {selectedProject.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-500">Client: {selectedProject.client}</p>
            <div className="mt-4 aspect-[16/10] overflow-hidden rounded-xl">
              <ResilientImage
                src={selectedProject.image}
                alt={selectedProject.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              {selectedProject.summary}
            </p>
            <div className="mt-4 rounded-xl bg-[#FAF8F5] p-4 text-sm">
              <span className="font-semibold text-neutral-900">Outcome: </span>
              <span className="text-[#9A3412] font-semibold">{selectedProject.impact}</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <form
            onSubmit={handleAddProject}
            className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Portfolio Project</h3>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label htmlFor="new-proj-title" className="block text-xs font-semibold text-neutral-700">
                Project Title
              </label>
              <input
                id="new-proj-title"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Atelier Nine Digital Storefront"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="new-proj-client" className="block text-xs font-semibold text-neutral-700">
                  Client
                </label>
                <input
                  id="new-proj-client"
                  required
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="Atelier Nine"
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="new-proj-disc" className="block text-xs font-semibold text-neutral-700">
                  Discipline
                </label>
                <select
                  id="new-proj-disc"
                  value={newDiscipline}
                  onChange={(e) =>
                    setNewDiscipline(e.target.value as PortfolioProject['discipline'])
                  }
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                >
                  <option>Brand Systems</option>
                  <option>Product Design</option>
                  <option>Editorial</option>
                  <option>Web Architecture</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="new-proj-impact" className="block text-xs font-semibold text-neutral-700">
                Measured Outcome
              </label>
              <input
                id="new-proj-impact"
                value={newImpact}
                onChange={(e) => setNewImpact(e.target.value)}
                placeholder="+34% Conversion Rate"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="new-proj-summary" className="block text-xs font-semibold text-neutral-700">
                Summary
              </label>
              <textarea
                id="new-proj-summary"
                required
                rows={3}
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                placeholder="Project overview..."
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#9A3412] py-2.5 text-xs font-semibold text-white hover:bg-[#7C2D12] cursor-pointer"
            >
              Publish to Gallery
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
