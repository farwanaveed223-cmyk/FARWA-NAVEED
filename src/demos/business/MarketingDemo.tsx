import React, { useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Globe,
  MapPin,
  Phone,
  TrendingUp,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr } from '../../utils/demoLogic';

interface Campaign {
  id: string;
  name: string;
  channel: 'Meta & Instagram' | 'Google Search' | 'TikTok Shop';
  spendPkr: number;
  conversions: number;
  roas: string;
  active: boolean;
}

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'MP-1',
    name: 'Festive Lawn Collection Launch — Lahore & Karachi',
    channel: 'Meta & Instagram',
    spendPkr: 420000,
    conversions: 384,
    roas: '5.4x',
    active: true,
  },
  {
    id: 'MP-2',
    name: 'High-Intent Real Estate Search Ads — DHA',
    channel: 'Google Search',
    spendPkr: 310000,
    conversions: 142,
    roas: '4.1x',
    active: true,
  },
  {
    id: 'MP-3',
    name: 'Skincare Reels & Creator Whitelisting',
    channel: 'TikTok Shop',
    spendPkr: 195000,
    conversions: 260,
    roas: '4.8x',
    active: false,
  },
];

const TRAFFIC_DATA = [
  { month: 'Jul', visitsK: 84, convRate: 2.9 },
  { month: 'Aug', visitsK: 112, convRate: 3.3 },
  { month: 'Sep', visitsK: 138, convRate: 3.8 },
  { month: 'Oct', visitsK: 164, convRate: 4.2 },
  { month: 'Nov', visitsK: 196, convRate: 4.6 },
];

const CASE_STUDIES = [
  {
    brand: 'Gulnar Pret · Lahore',
    result: '5.4x Blended ROAS Across Eid Campaigns',
    summary: 'Reduced COD return rates by 22% via WhatsApp order confirmation triggers and targeted Karachi/Lahore lookalikes.',
    image: DEMO_MEDIA.stockpilotLawn,
  },
  {
    brand: 'GlowNest Botanicals · Islamabad',
    result: '+148% Organic Search Growth in 6 Months',
    summary: 'Built bilingual search landing pages and creator UGC spark ads converting at 4.6% across nationwide mobile buyers.',
    image: DEMO_MEDIA.glownestSkincare,
  },
];

export function MarketingDemo({ onBack }: { onBack: () => void }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [leadName, setLeadName] = useState('');
  const [leadBrand, setLeadBrand] = useState('');
  const [leadService, setLeadService] = useState('Full-Funnel Performance & SEO');
  const [leadSent, setLeadSent] = useState(false);

  const toggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    );
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAF8] text-zinc-900"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Marketing & Analytics"
        clientBrand="MarketPulse"
        categoryLabel="Business Demo 08"
        onBack={onBack}
      />

      {/* Agency Navigation */}
      <header className="bg-[#09090B] text-white border-b border-amber-400/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a
            href="#mp-top"
            className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            MARKETPULSE
          </a>
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-300">
            <a href="#mp-services" className="hover:text-amber-400 whitespace-nowrap">Services</a>
            <a href="#mp-analytics" className="hover:text-amber-400 whitespace-nowrap">Analytics Console</a>
            <a href="#mp-cases" className="hover:text-amber-400 whitespace-nowrap">Case Studies</a>
            <a href="#mp-faq" className="hover:text-amber-400 whitespace-nowrap">FAQ</a>
          </nav>
          <a
            href="#mp-lead"
            className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-300 whitespace-nowrap shrink-0"
          >
            Request Growth Audit
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-16">
        {/* Agency Hero Split */}
        <section id="mp-top" className="grid items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between py-2 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Pakistani Digital Growth &amp; Performance Studio
              </p>
              <h1
                className="mt-3 text-3xl font-bold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl"
                style={{ fontFamily: '"Outfit", sans-serif', textWrap: 'balance' }}
              >
                Revenue-first SEO, Meta &amp; TikTok acquisition for Pakistani brands.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                MarketPulse pairs performance media buying with live analytics engineering—tracking
                true landed PKR ROAS, COD confirmation rates, and multi-channel attribution across
                Lahore, Karachi, and Islamabad.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#mp-lead"
                className="rounded-lg bg-[#09090B] px-5 py-3 text-xs font-bold text-white hover:bg-zinc-800"
              >
                Book Strategy Audit
              </a>
              <a
                href="#mp-analytics"
                className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-xs font-bold text-zinc-900"
              >
                Inspect Live Campaign Dashboard
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900">
              <ResilientImage
                src={DEMO_MEDIA.marketpulseStudio}
                alt="MarketPulse digital marketing analytics team in a contemporary Karachi studio"
                className="h-full w-full object-cover"
                fallbackLabel="MarketPulse Growth Agency"
              />
            </div>
          </div>
        </section>

        {/* Core Digital Marketing Services */}
        <section id="mp-services" className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: '01. Technical & Local SEO',
              desc: 'Organic ranking growth across Pakistani search intent for D2C retail, clinics, and SaaS portals.',
              stat: '+148% Organic Traffic in 6 Months',
            },
            {
              title: '02. Meta, TikTok & Google Ads',
              desc: 'ROAS-driven campaign architecture tailored for COD e-commerce and high-ticket real estate.',
              stat: '4.9x Blended Return on Ad Spend',
            },
            {
              title: '03. Conversion Rate Optimization',
              desc: 'Checkout friction audits, WhatsApp funnel tracking, and analytics dashboards.',
              stat: '4.6% Landing Page Conversion',
            },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-2">
              <h2 className="text-base font-bold text-zinc-900">{s.title}</h2>
              <p className="text-xs leading-relaxed text-zinc-600">{s.desc}</p>
              <p className="pt-2 font-mono text-xs font-bold text-amber-700">{s.stat}</p>
            </div>
          ))}
        </section>

        {/* Traffic Analytics & Conversion Chart + Campaign Manager */}
        <section id="mp-analytics" className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 bg-white p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-amber-600" />
                <h2 className="text-base font-bold">Traffic &amp; Conversion Growth</h2>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-700">+133% YoY</span>
            </div>

            <div className="flex items-end gap-3 h-44 border-b border-zinc-200 pb-2">
              {TRAFFIC_DATA.map((d) => (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="font-mono text-[10px] font-bold text-zinc-600">{d.visitsK}K</span>
                  <div
                    className="w-full rounded-t bg-zinc-900 hover:bg-amber-500 transition-colors"
                    style={{ height: `${Math.round((d.visitsK / 210) * 120)}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-zinc-500 font-medium">
              {TRAFFIC_DATA.map((d) => (
                <span key={d.month} className="flex-1 text-center">{d.month} · {d.convRate}%</span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-600" />
                <h2 className="text-base font-bold">Active Campaign Management (PKR)</h2>
              </div>
              <span className="text-xs text-zinc-500">Toggle status to pause/resume</span>
            </div>

            <div className="divide-y divide-zinc-100 text-xs">
              {campaigns.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                  <div>
                    <p className="font-bold text-zinc-900">{c.name}</p>
                    <p className="text-zinc-500">
                      {c.channel} · Spend: <strong className="font-mono">{formatPkr(c.spendPkr)}</strong> · {c.conversions} conversions
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-emerald-700">{c.roas} ROAS</span>
                    <button
                      type="button"
                      onClick={() => toggleCampaign(c.id)}
                      className={`rounded-md px-3 py-1 text-[11px] font-bold cursor-pointer ${
                        c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {c.active ? 'Active' : 'Paused'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="mp-cases" className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              Proven Pakistani D2C Outcomes
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Featured Growth Case Studies
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((cs) => (
              <article key={cs.brand} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="aspect-[16/9] overflow-hidden bg-zinc-100">
                  <ResilientImage
                    src={cs.image}
                    alt={cs.brand}
                    className="h-full w-full object-cover"
                    fallbackLabel={cs.brand}
                  />
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-xs font-semibold text-amber-700">{cs.brand}</p>
                  <h3 className="text-lg font-bold text-zinc-900">{cs.result}</h3>
                  <p className="text-xs leading-relaxed text-zinc-600">{cs.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Client Testimonial & FAQ */}
        <section id="mp-faq" className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Agency FAQ
            </h2>
            {[
              {
                q: 'Do you optimize campaigns specifically for Pakistani COD confirmation rates?',
                a: 'Yes — we sync Meta Conversion API events after automated WhatsApp confirmation so algorithms optimize for genuine delivered parcels.',
              },
              {
                q: 'What minimum monthly ad budget works best in Pakistan?',
                a: 'Most D2C apparel and skincare brands start effectively between PKR 250,000 and PKR 600,000 monthly media spend.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-zinc-200 bg-white p-5 text-xs">
                <p className="font-bold text-zinc-900">{item.q}</p>
                <p className="mt-1.5 text-zinc-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-700 uppercase tracking-wider">Client Feedback</span>
              <span className="text-zinc-500">Sample Content</span>
            </div>
            <blockquote className="text-sm leading-relaxed text-zinc-700">
              &ldquo;MarketPulse overhauled our Meta and TikTok creative testing cadence ahead of
              our lawn drop, lifting qualified WhatsApp and web checkout orders by 195% while
              cutting wasted ad spend.&rdquo;
            </blockquote>
            <p className="text-xs font-bold text-zinc-900">— Hina &amp; Omer Farooq, Gulnar Pret Lahore</p>
          </div>
        </section>

        {/* Lead Generation Form */}
        <section
          id="mp-lead"
          className="grid gap-8 rounded-2xl border border-zinc-200 bg-[#09090B] p-8 text-white lg:grid-cols-12"
        >
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Globe className="h-4 w-4" /> Karachi · Lahore Growth Studio
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Get a Custom Pakistani Market Campaign Audit
            </h2>
            <p className="text-sm text-zinc-300">
              Share your brand name and growth target. We prepare a channel allocation plan across
              Search, Meta, and TikTok with estimated PKR acquisition costs.
            </p>
          </div>
          <div className="lg:col-span-6">
            {leadSent ? (
              <div className="rounded-xl border border-amber-400/40 bg-zinc-900 p-5 text-xs space-y-2" role="status">
                <CheckCircle2 className="h-6 w-6 text-amber-400" />
                <p className="text-sm font-bold">Audit Request Simulated for {leadBrand}</p>
                <p className="text-zinc-300">Requested track: {leadService}.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!leadName.trim() || !leadBrand.trim()) return;
                  setLeadSent(true);
                }}
                className="grid gap-3 sm:grid-cols-2"
              >
                <input
                  type="text"
                  required
                  aria-label="Your Name"
                  placeholder="Your Name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  aria-label="Business or Store Name"
                  placeholder="Business / Store Name"
                  value={leadBrand}
                  onChange={(e) => setLeadBrand(e.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-xs text-white"
                />
                <select
                  aria-label="Requested marketing service"
                  value={leadService}
                  onChange={(e) => setLeadService(e.target.value)}
                  className="sm:col-span-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-xs text-white"
                >
                  <option>Full-Funnel Performance &amp; SEO</option>
                  <option>E-Commerce Meta &amp; TikTok Scaling</option>
                  <option>B2B Search Lead Generation</option>
                </select>
                <button
                  type="submit"
                  className="sm:col-span-2 rounded-lg bg-amber-400 py-2.5 text-xs font-bold text-zinc-950 hover:bg-amber-300 cursor-pointer"
                >
                  Generate Growth Audit Request
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#09090B] text-zinc-400 border-t border-zinc-800 mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              MARKETPULSE DIGITAL
            </p>
            <p className="max-w-sm leading-relaxed">
              Full-funnel SEO, paid social creative scaling, and analytics infrastructure built for
              high-growth Pakistani D2C and B2B brands.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Growth Services</p>
            <ul className="space-y-1.5">
              <li><a href="#mp-services" className="hover:text-amber-400">Performance Media</a></li>
              <li><a href="#mp-analytics" className="hover:text-amber-400">Analytics Console</a></li>
              <li><a href="#mp-cases" className="hover:text-amber-400">Case Studies</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Studios</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-amber-400" /> Clifton Block 9, Karachi · Gulberg Lahore</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-amber-400" /> +92 21 3530 7788</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-4 text-center text-[11px] text-zinc-500">
          MarketPulse · Interactive Marketing &amp; Analytics Demo (Sample Content)
        </div>
      </footer>
    </div>
  );
}
