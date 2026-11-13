import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Menu,
  PenTool,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  AGENCY_IMAGES,
  BUSINESS_SOLUTIONS,
  PORTFOLIO_CONCEPTS,
  PROCESS_STEPS,
  SERVICES,
  WHY_PILLARS,
  type PortfolioConceptItem,
} from '../data/agencyData';
import { filterItemsByCategoryAndQuery } from '../utils/demoLogic';
import { ResilientImage } from './DemoChrome';

interface AgencyHomeProps {
  onOpenDemo: (route: string) => void;
}

const SOLUTION_CATEGORIES = [
  'All',
  'Business Systems',
  'Creative',
  'Operations',
  'Growth',
  'Hospitality',
] as const;

const PORTFOLIO_CATEGORIES = [
  'All',
  'Business Websites',
  'Personal Portfolios',
  'Creative Landing Pages',
  'Agency Websites',
  'Educational Websites',
] as const;

export function AgencyHome({ onOpenDemo }: AgencyHomeProps) {
  const [motionOn, setMotionOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [solutionSearch, setSolutionSearch] = useState('');
  const [solutionCategory, setSolutionCategory] = useState<string>('All');
  const [portfolioCategory, setPortfolioCategory] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<PortfolioConceptItem | null>(null);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, y / docHeight) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSolutions = useMemo(
    () => filterItemsByCategoryAndQuery(BUSINESS_SOLUTIONS, solutionCategory, solutionSearch),
    [solutionCategory, solutionSearch],
  );

  const filteredConcepts = useMemo(
    () =>
      PORTFOLIO_CONCEPTS.filter(
        (item) => portfolioCategory === 'All' || item.category === portfolioCategory,
      ),
    [portfolioCategory],
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    if (!contactName.trim() || !contactEmail.trim() || !contactDetails.trim()) {
      setContactError('Please complete your name, email address, and project details.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setContactError('Please enter a valid email address.');
      return;
    }
    setContactSubmitted(true);
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: motionOn ? 'smooth' : 'auto' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#F2EFEB]">
      {/* Scroll progress indicator */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#8F7A52] via-[#C6A875] to-[#DCC9A3] transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
          scrolled
            ? 'border-b border-[#292929]/80 bg-[#090909]/90 py-4 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-6'
        }`}
      >
        <div className="section-shell flex items-center justify-between gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="group flex items-center gap-3 shrink-0"
            aria-label="FARWA'S AGENCY home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A875]/60 text-[#C6A875] transition-transform duration-700 group-hover:rotate-[20deg]">
              <PenTool className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg tracking-wider text-[#F2EFEB] uppercase whitespace-nowrap">
              FARWA&apos;S AGENCY
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-xs font-medium uppercase tracking-[0.2em] text-[#F2EFEB]/80">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Business Solutions', id: 'business-solutions' },
                { label: 'Live Demos', id: 'demos' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className="whitespace-nowrap transition-colors duration-300 hover:text-[#C6A875]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMotionOn((prev) => !prev)}
              aria-pressed={motionOn}
              aria-label={motionOn ? 'Turn motion off' : 'Turn motion on'}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#292929] bg-[#151515]/80 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F2EFEB]/80 transition-colors hover:border-[#C6A875]/60 hover:text-[#C6A875] whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#C6A875]" aria-hidden="true" />
              <span>{motionOn ? 'Motion On' : 'Motion Off'}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="btn-primary !py-2.5 !px-5 !text-xs whitespace-nowrap"
            >
              Let&apos;s Talk
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#292929] text-[#F2EFEB] lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#292929] bg-[#090909]/95 px-6 py-6 lg:hidden">
            <ul className="flex flex-col gap-4 text-sm font-medium uppercase tracking-[0.18em]">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Business Solutions', id: 'business-solutions' },
                { label: 'Live Demos', id: 'demos' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className="block py-1 text-[#F2EFEB] hover:text-[#C6A875]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex min-h-[100svh] items-end overflow-hidden pb-24 pt-32 md:pb-28"
        >
          <div className="absolute inset-0 -top-[10%] h-[120%]">
            <ResilientImage
              src={AGENCY_IMAGES.heroBg}
              alt="Black and gold sign against a dark background"
              className="h-full w-full object-cover opacity-60"
              fallbackLabel="FARWA'S AGENCY"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-[#090909]/30"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/50 to-transparent"
            aria-hidden="true"
          />

          {/* Orbital 3D Wireframe Accent matching existing agency hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] top-[18%] hidden lg:flex h-[420px] w-[420px] items-center justify-center"
          >
            <div
              className={`relative flex h-full w-full items-center justify-center rounded-full border border-[#C6A875]/25 ${
                motionOn ? 'animate-orbit-slow' : ''
              }`}
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#C6A875] shadow-[0_0_18px_rgba(198,168,117,0.8)]" />
              <div className="h-[78%] w-[78%] rounded-full border border-dashed border-[#C6A875]/20" />
            </div>

            <div
              className={`absolute h-44 w-44 ${motionOn ? 'animate-float-cube' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(-18deg) rotateY(28deg)',
              }}
            >
              <div
                className="absolute inset-0 border border-[#C6A875]/55 bg-[#C6A875]/[0.04]"
                style={{ transform: 'translateZ(88px)' }}
              />
              <div
                className="absolute inset-0 border border-[#C6A875]/35 bg-[#C6A875]/[0.02]"
                style={{ transform: 'rotateY(180deg) translateZ(88px)' }}
              />
              <div
                className="absolute inset-0 border border-[#C6A875]/45 bg-[#C6A875]/[0.03]"
                style={{ transform: 'rotateY(90deg) translateZ(88px)' }}
              />
              <div
                className="absolute inset-0 border border-[#C6A875]/45 bg-[#C6A875]/[0.03]"
                style={{ transform: 'rotateY(-90deg) translateZ(88px)' }}
              />
              <div
                className="absolute inset-0 border border-[#C6A875]/50 bg-[#C6A875]/[0.05]"
                style={{ transform: 'rotateX(90deg) translateZ(88px)' }}
              />
              <div
                className="absolute inset-0 border border-[#C6A875]/35 bg-[#C6A875]/[0.02]"
                style={{ transform: 'rotateX(-90deg) translateZ(88px)' }}
              />
            </div>

            <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-[#DCC9A3]/20 blur-3xl" />
          </div>

          <div className="section-shell relative z-10 w-full">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#F2EFEB]/80">
                Creative Website Studio
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A875]/35 bg-[#090909]/70 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DCC9A3]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C6A875]" aria-hidden="true" />
                Open for New Projects
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(4.2rem,12vw,9.5rem)] uppercase leading-[0.86] tracking-tight">
              <span className="block text-[#F2EFEB]">FARWA&apos;S</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: '1.5px #C6A875' }}
              >
                AGENCY
              </span>
            </h1>

            <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] uppercase leading-[1.02] text-[#F2EFEB]">
                  We Create Digital Experiences{' '}
                  <span className="text-[#C6A875]">That Inspire.</span>
                </p>
              </div>
              <div className="lg:col-span-6 lg:max-w-lg lg:justify-self-end">
                <p className="text-base leading-relaxed text-[#F2EFEB]/80">
                  Welcome to Farwa&apos;s Agency — where creativity meets technology. We create
                  modern, beautiful and impactful websites that help businesses and individuals
                  build a strong digital presence.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="#business-solutions"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('business-solutions');
                    }}
                    className="btn-primary"
                  >
                    <span>Explore Our Work</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('contact');
                    }}
                    className="btn-ghost"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-8 right-6 hidden md:flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A09C9A] [writing-mode:vertical-rl]">
            Scroll
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative py-28 md:py-40">
          <div className="section-shell grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <span className="eyebrow">
                <span className="h-px w-10 bg-[#C6A875]" aria-hidden="true" />
                About the Agency
              </span>
              <h2 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] text-[#F2EFEB]">
                Creativity <span className="text-[#C6A875]">With</span> A Purpose.
              </h2>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[#A09C9A] md:text-lg">
                Farwa&apos;s Agency is a creative digital agency focused on building modern, visually
                engaging and user-friendly websites. We believe every brand deserves a unique
                digital identity. Our goal is to transform ideas into beautiful digital experiences
                through creativity, design and technology.
              </p>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#292929] pt-8">
                <div>
                  <p className="font-display text-2xl uppercase text-[#C6A875]">Web</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#A09C9A]">
                    Design &amp; Build
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl uppercase text-[#C6A875]">Mobile</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#A09C9A]">
                    Responsive First
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl uppercase text-[#C6A875]">Brand</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#A09C9A]">
                    Unique Identity
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[#292929]">
                <ResilientImage
                  src={AGENCY_IMAGES.aboutInterior}
                  alt="Elegant interior with gold accents and dramatic lighting"
                  className="h-full w-full object-cover opacity-85"
                  fallbackLabel="Farwa's Agency Studio"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-display text-2xl uppercase tracking-wide text-[#F2EFEB]">
                    Farwa&apos;s Agency
                  </p>
                  <p className="mt-1 text-sm text-[#C6A875]">
                    Built on ideas. Shaped by design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section
          id="founder"
          className="relative overflow-hidden border-y border-[#292929] bg-[#151515]/40 py-28 md:py-40"
        >
          <div className="section-shell grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <span className="eyebrow">Meet The Founder</span>
              <h2 className="mt-6 font-display text-[clamp(5rem,16vw,13rem)] uppercase leading-[0.82] text-[#F2EFEB]">
                Farwa
              </h2>
              <div className="mt-6 flex flex-col gap-1">
                <p className="text-lg font-semibold text-[#C6A875]">Founder of Farwa&apos;s Agency</p>
                <p className="text-sm uppercase tracking-[0.2em] text-[#A09C9A]">
                  Creative Website Designer &amp; Developer
                </p>
              </div>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#F2EFEB]/80 md:text-lg">
                Hello, I&apos;m Farwa — the founder of Farwa&apos;s Agency. I believe creativity
                has the power to transform ideas into meaningful digital experiences. My vision is to
                create beautiful, modern and professional websites that help brands stand out in the
                digital world.
              </p>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative flex aspect-[4/5] w-full max-w-md items-center justify-center overflow-hidden rounded-[28px] border border-[#C6A875]/30 bg-gradient-to-br from-[#1b1812] via-[#121212] to-[#090909]">
                <div
                  aria-label="Farwa portrait placeholder"
                  role="img"
                  className="font-display text-[11rem] text-[#C6A875]/25 select-none"
                >
                  F
                </div>
                <div className="absolute inset-x-8 bottom-8 border-t border-[#C6A875]/25 pt-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#C6A875]">
                    Studio Leadership
                  </p>
                  <p className="mt-1 text-sm text-[#F2EFEB]/80">
                    Bespoke Web Design &amp; Business Software Systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION (PART 2: 5 Website Service Demos) */}
        <section id="services" className="relative py-28 md:py-40">
          <div className="section-shell">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">What We Do</span>
                <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] text-[#F2EFEB]">
                  Our <span className="text-[#C6A875]">Services</span>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-[1.5] text-[#A09C9A]">
                Five focused services, each with a live demo you can explore before we begin.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <article
                  key={service.number}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-[#292929] bg-[#151515]/60 transition-colors duration-500 hover:border-[#C6A875]/50"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                    <ResilientImage
                      src={service.image}
                      alt={service.alt}
                      className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                      fallbackLabel={service.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full border border-[#C6A875]/40 bg-[#090909]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#DCC9A3]">
                      Demo Project
                    </span>
                    <span className="absolute right-5 top-4 font-display text-3xl text-[#C6A875]/85">
                      {service.number}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-7">
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#F2EFEB]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#A09C9A]">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#292929]">
                      <a
                        href={service.route}
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenDemo(service.route);
                        }}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C6A875] transition-colors hover:text-[#DCC9A3]"
                      >
                        <span>View Live Demo</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BUSINESS SOLUTIONS SECTION (PART 1: 10 Functional Business Solution Demos) */}
        <section id="business-solutions" className="relative border-t border-[#292929] py-28 md:py-40">
          <div className="section-shell">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="eyebrow">Business Solutions</span>
                <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] text-[#F2EFEB]">
                  Industry <span className="text-[#C6A875]">Showcase</span>
                </h2>
              </div>
              <p className="max-w-md text-base leading-[1.5] text-[#A09C9A]">
                Ten business systems and industry concepts, each with its own interactive demo.
                Explore what we can build for your business.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A09C9A]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search business solutions"
                  placeholder="Search solutions (CRM, HR, Restaurant...)"
                  value={solutionSearch}
                  onChange={(e) => setSolutionSearch(e.target.value)}
                  className="w-full rounded-full border border-[#292929] bg-[#151515]/80 py-3 pl-11 pr-4 text-sm text-[#F2EFEB] placeholder-[#A09C9A]/70 focus:border-[#C6A875] focus:outline-none"
                />
              </div>

              <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
                {SOLUTION_CATEGORIES.map((cat) => {
                  const active = solutionCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSolutionCategory(cat)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#C6A875] text-[#090909]'
                          : 'border border-[#292929] bg-[#151515]/60 text-[#F2EFEB]/80 hover:border-[#C6A875]/50 hover:text-[#C6A875]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#A09C9A]">
              Showing {filteredSolutions.length} of {BUSINESS_SOLUTIONS.length} concepts
            </p>

            {filteredSolutions.length === 0 ? (
              <div className="mt-10 rounded-[24px] border border-[#292929] bg-[#151515]/40 p-10 text-center">
                <p className="text-base text-[#F2EFEB]">
                  No business solutions match &ldquo;{solutionSearch}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSolutionCategory('All');
                    setSolutionSearch('');
                  }}
                  className="mt-4 btn-ghost !py-2 !px-5 !text-xs cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredSolutions.map((item) => (
                  <article
                    key={item.number}
                    className="group flex flex-col overflow-hidden rounded-[24px] border border-[#292929] bg-[#151515]/60 transition-colors duration-500 hover:border-[#C6A875]/60"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                      <ResilientImage
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                        fallbackLabel={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full border border-[#C6A875]/40 bg-[#090909]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#DCC9A3]">
                        Concept Design
                      </span>
                      <span className="absolute right-5 top-4 font-display text-3xl text-[#C6A875]/85">
                        {item.number}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-7">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C6A875]">
                          {item.category}
                        </p>
                        <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-[#F2EFEB]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#A09C9A]">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-[#292929]">
                        <a
                          href={item.route}
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenDemo(item.route);
                          }}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C6A875] transition-colors hover:text-[#DCC9A3]"
                        >
                          <span>View Demo</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* LIVE DEMOS LIST SECTION */}
        <section
          id="demos"
          className="relative border-t border-[#292929] bg-[#151515]/30 py-28 md:py-40"
        >
          <div className="section-shell">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="eyebrow">Live Demos</span>
                <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] text-[#F2EFEB]">
                  Explore Before <span className="text-[#C6A875]">You Commit</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-[1.5] text-[#A09C9A]">
                  Each demo is a complete concept built to show our craft. They are labelled Demo
                  Projects and are not client work.
                </p>
              </div>
            </div>

            <ul className="mt-14 divide-y divide-[#292929] border-y border-[#292929]">
              {SERVICES.map((service) => (
                <li key={service.number}>
                  <a
                    href={service.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenDemo(service.route);
                    }}
                    className="group grid items-center gap-6 py-8 transition-colors hover:bg-[#151515]/60 md:grid-cols-[80px_1fr_auto] md:px-6"
                  >
                    <span className="font-display text-3xl text-[#C6A875]">{service.number}</span>
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#F2EFEB] group-hover:text-[#C6A875] transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm text-[#A09C9A]">
                        {service.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A875]/40 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#C6A875] transition-colors group-hover:bg-[#C6A875] group-hover:text-[#090909] whitespace-nowrap justify-self-start md:justify-self-end">
                      <span>Open Demo</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('services');
                }}
                className="btn-ghost"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="btn-primary"
              >
                Let&apos;s Work Together
              </a>
            </div>
          </div>
        </section>

        {/* PORTFOLIO CONCEPTS SECTION */}
        <section
          id="portfolio"
          className="relative border-t border-[#292929] bg-[#151515]/30 py-28 md:py-40"
        >
          <div className="section-shell">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="eyebrow">Selected Work</span>
                <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] text-[#F2EFEB]">
                  Portfolio <span className="text-[#C6A875]">Concepts</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-[1.5] text-[#A09C9A]">
                  Demo concepts that show the range of what we design. These are not client
                  projects.
                </p>
              </div>

              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap gap-2"
              >
                {PORTFOLIO_CATEGORIES.map((cat) => {
                  const active = portfolioCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPortfolioCategory(cat)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#C6A875] text-[#090909]'
                          : 'border border-[#292929] bg-[#090909]/60 text-[#F2EFEB]/80 hover:border-[#C6A875]/50 hover:text-[#C6A875]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredConcepts.map((concept) => (
                <li key={concept.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedConcept(concept)}
                    aria-label={`View ${concept.title} details`}
                    className="group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-[#292929] bg-[#151515]/60 text-left transition-colors hover:border-[#C6A875]/60 cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111]">
                      <ResilientImage
                        src={concept.image}
                        alt={concept.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        fallbackLabel={concept.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full border border-[#C6A875]/40 bg-[#090909]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#DCC9A3]">
                        Demo Concept
                      </span>
                    </div>

                    <div className="p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A875]">
                        {concept.category}
                      </p>
                      <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-[#F2EFEB]">
                        {concept.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#A09C9A]">{concept.summary}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C6A875]">
                        View Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="relative border-t border-[#292929] py-28 md:py-40">
          <div className="section-shell">
            <span className="eyebrow">How We Work</span>
            <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] text-[#F2EFEB]">
              Our Creative <span className="text-[#C6A875]">Process</span>
            </h2>

            <ol className="relative mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              <div
                aria-hidden="true"
                className="absolute left-0 top-[31px] hidden h-px w-full bg-gradient-to-r from-[#C6A875] via-[#C6A875] to-[#C6A875]/20 lg:block"
              />
              {PROCESS_STEPS.map((step) => (
                <li key={step.number} className="relative">
                  <div className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A875]/50 bg-[#090909]">
                    <p className="font-display text-xl text-[#C6A875]">{step.number}</p>
                  </div>
                  <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-[#F2EFEB]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A09C9A]">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHY FARWA'S AGENCY */}
        <section id="why" className="relative overflow-hidden bg-[#151515]/40 py-28 md:py-40">
          <div className="section-shell grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="relative lg:sticky lg:top-32">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[#292929]">
                  <ResilientImage
                    src={AGENCY_IMAGES.whyBokeh}
                    alt="Soft golden bokeh on a dark background"
                    className="h-full w-full object-cover opacity-80"
                    fallbackLabel="Crafted With Care"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="eyebrow">Why Farwa&apos;s Agency</span>
              <h2 className="mt-6 font-display text-[clamp(3rem,6.5vw,5.5rem)] uppercase leading-[0.9] text-[#F2EFEB]">
                Crafted With Care, <span className="text-[#C6A875]">Built To Stand Out.</span>
              </h2>

              <ul className="mt-14 divide-y divide-[#292929] border-t border-[#292929]">
                {WHY_PILLARS.map((pillar) => (
                  <li key={pillar.number} className="grid gap-4 py-8 sm:grid-cols-[72px_1fr]">
                    <span className="font-display text-3xl text-[#C6A875]">{pillar.number}</span>
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#F2EFEB]">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-[#A09C9A]">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="relative overflow-hidden py-28 md:py-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[#C6A875]/10 blur-[120px]"
          />
          <div className="section-shell grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">Get In Touch</span>
              <h2 className="mt-6 font-display text-[clamp(3rem,6.5vw,6rem)] uppercase leading-[0.9] text-[#F2EFEB]">
                Let&apos;s Create Something Exceptional.
              </h2>
              <p className="mt-6 text-lg text-[#C6A875]">
                Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
              </p>

              <div className="mt-12 border-t border-[#292929] pt-8">
                <p className="text-xs uppercase tracking-[0.22em] text-[#A09C9A]">
                  Email us directly
                </p>
                <a
                  href="mailto:farwanaveed380@gmail.com"
                  className="mt-2 inline-block text-lg font-semibold text-[#F2EFEB] transition-colors hover:text-[#C6A875]"
                >
                  farwanaveed380@gmail.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass rounded-[28px] p-8 md:p-12">
                {contactSubmitted ? (
                  <div className="py-8" role="status">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#C6A875]/20 text-[#C6A875]">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-3xl uppercase text-[#F2EFEB]">
                      Inquiry Received
                    </h3>
                    <p className="mt-3 text-base text-[#A09C9A]">
                      Thank you, <strong className="text-[#F2EFEB]">{contactName}</strong>. Your
                      project inquiry has been recorded in this studio preview. For live studio
                      correspondence, please reach out directly at{' '}
                      <span className="text-[#C6A875]">farwanaveed380@gmail.com</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactName('');
                        setContactEmail('');
                        setContactDetails('');
                      }}
                      className="mt-6 btn-ghost cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} noValidate className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="agency-contact-name"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A09C9A]"
                        >
                          Full Name
                        </label>
                        <input
                          id="agency-contact-name"
                          type="text"
                          placeholder="Jane Doe"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="agency-field"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="agency-contact-email"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A09C9A]"
                        >
                          Email Address
                        </label>
                        <input
                          id="agency-contact-email"
                          type="email"
                          placeholder="jane@company.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="agency-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="agency-contact-details"
                        className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#A09C9A]"
                      >
                        Project Details
                      </label>
                      <textarea
                        id="agency-contact-details"
                        rows={5}
                        placeholder="Tell us about your goals, timeline and what you have in mind."
                        value={contactDetails}
                        onChange={(e) => setContactDetails(e.target.value)}
                        className="agency-field"
                      />
                    </div>

                    {contactError && (
                      <p role="alert" className="text-sm text-red-300">
                        {contactError}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4">
                      <button type="submit" className="btn-primary cursor-pointer">
                        <span>Send Message</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span role="status" className="sr-only" />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-[#292929] bg-[#151515]/50 pt-20 pb-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C6A875]/50 to-transparent"
        />
        <div className="section-shell">
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
                className="inline-flex items-center gap-3"
                aria-label="FARWA'S AGENCY home"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A875]/60 text-[#C6A875]">
                  <PenTool className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-display text-xl tracking-wider text-[#F2EFEB] uppercase">
                  FARWA&apos;S AGENCY
                </span>
              </a>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#A09C9A]">
                Creative websites for businesses and individuals, designed with purpose and built to
                inspire.
              </p>
            </div>

            <nav aria-label="Footer" className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C6A875]">
                Explore
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#A09C9A]">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'About', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Business Solutions', id: 'business-solutions' },
                  { label: 'Live Demos', id: 'demos' },
                  { label: 'Contact', id: 'contact' },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id);
                      }}
                      className="transition-colors hover:text-[#F2EFEB]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C6A875]">
                Services
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#A09C9A]">
                {SERVICES.map((service) => (
                  <li key={service.number}>
                    <a
                      href={service.route}
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenDemo(service.route);
                      }}
                      className="transition-colors hover:text-[#F2EFEB]"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#292929] pt-8 text-sm text-[#A09C9A]">
            <a
              href="mailto:farwanaveed380@gmail.com"
              className="transition-colors hover:text-[#C6A875]"
            >
              farwanaveed380@gmail.com
            </a>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6A875] hover:text-[#DCC9A3]"
            >
              Back to Top
            </a>
          </div>

          <p className="mt-8 text-xs text-[#A09C9A]/70">
            © 2026 Farwa&apos;s Agency. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Portfolio Concept Detail Modal */}
      {selectedConcept && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="concept-modal-title"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedConcept(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-[#292929] bg-[#121212] p-7 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedConcept(null)}
              aria-label="Close project details"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#292929] text-[#F2EFEB] hover:border-[#C6A875] hover:text-[#C6A875] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C6A875]">
              Demo Concept · {selectedConcept.category}
            </span>
            <h3
              id="concept-modal-title"
              className="mt-2 font-display text-3xl uppercase text-[#F2EFEB] md:text-4xl"
            >
              {selectedConcept.title}
            </h3>

            <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-[#292929]">
              <ResilientImage
                src={selectedConcept.image}
                alt={selectedConcept.alt}
                className="h-full w-full object-cover"
                fallbackLabel={selectedConcept.title}
              />
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C6A875]">
                  Challenge
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#A09C9A]">
                  {selectedConcept.challenge}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C6A875]">
                  Design Approach
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#A09C9A]">
                  {selectedConcept.solution}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-[#292929] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A09C9A]">
                Key Interactive Features
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {selectedConcept.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-md border border-[#292929] bg-[#181818] px-3 py-1.5 text-xs text-[#F2EFEB]"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const route = selectedConcept.linkedDemoRoute;
                  setSelectedConcept(null);
                  onOpenDemo(route);
                }}
                className="btn-primary cursor-pointer"
              >
                <span>Open Interactive Demo</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedConcept(null)}
                className="btn-ghost cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
