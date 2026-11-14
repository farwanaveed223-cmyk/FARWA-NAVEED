import React, { useMemo, useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Edit3,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Users,
  X,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import {
  calculatePipelineSummary,
  formatPkr,
  moveDealStage,
  type CrmDeal,
  type CrmStage,
} from '../../utils/demoLogic';

interface PropertyListing {
  id: string;
  title: string;
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi';
  area: string;
  size: string;
  specs: string;
  type: 'Residential' | 'Commercial' | 'Plot';
  pricePkr: number;
  status: 'Available' | 'Under Offer' | 'Sold';
  image: string;
  summary: string;
}

interface InquiryLead {
  id: string;
  clientName: string;
  phone: string;
  propertyInterest: string;
  budgetPkr: number;
  status: 'New Inquiry' | 'Site Visit Scheduled' | 'Negotiating';
  assignedAgent: string;
}

const INITIAL_PROPERTIES: PropertyListing[] = [
  {
    id: 'P-101',
    title: 'DHA Phase 6 Contemporary 1-Kanal Villa',
    city: 'Lahore',
    area: 'DHA Phase 6, Block H',
    size: '1 Kanal',
    specs: '5 Bedrooms · Designer Kitchen · Courtyard Pool',
    type: 'Residential',
    pricePkr: 92500000,
    status: 'Available',
    image: DEMO_MEDIA.estateflowDhaVilla,
    summary:
      'Brand-new architect-designed 1-Kanal residence featuring travertine cladding, cantilevered Burma teak louvers, servant quarters, and dual basement parking.',
  },
  {
    id: 'P-102',
    title: 'Clifton Block 2 Sea-Facing Penthouse',
    city: 'Karachi',
    area: 'Clifton Block 2',
    size: '3,400 Sq.Ft',
    specs: '4 Bedrooms · Private Terrace · 24/7 Backup',
    type: 'Residential',
    pricePkr: 78000000,
    status: 'Under Offer',
    image: DEMO_MEDIA.hunarInteriorsSalon,
    summary:
      'Elevated Arabian Sea vista apartment with floor-to-ceiling thermal glazing, custom walnut millwork, and dedicated resident valet lobby.',
  },
  {
    id: 'P-103',
    title: 'Blue Area Harmony Corporate Tower Floor',
    city: 'Islamabad',
    area: 'Jinnah Avenue, Blue Area',
    size: '5,200 Sq.Ft',
    specs: '8th Level · 45 Workstations · Margalla View',
    type: 'Commercial',
    pricePkr: 145000000,
    status: 'Available',
    image: DEMO_MEDIA.estateflowCommercialPlaza,
    summary:
      'Grade-A corporate floor along Jinnah Avenue equipped with high-speed dual fiber risers, double-glazed curtain wall, and private executive boardroom.',
  },
  {
    id: 'P-104',
    title: 'Sector F-7 Modern Courtyard Residence',
    city: 'Islamabad',
    area: 'Sector F-7/2',
    size: '2 Kanal',
    specs: '6 Bedrooms · Home Theater · Landscaped Lawn',
    type: 'Residential',
    pricePkr: 215000000,
    status: 'Available',
    image: DEMO_MEDIA.architectureHero,
    summary:
      'Corner foothills estate combining fair-face concrete architecture with serene indoor-outdoor limestone courtyards minutes from Kohsar Market.',
  },
  {
    id: 'P-105',
    title: 'Gulberg III Boutique Commercial Building',
    city: 'Lahore',
    area: 'MM Alam Road, Gulberg III',
    size: '2 Kanal',
    specs: 'G+5 Mixed Retail · 8.4% Rental Yield',
    type: 'Commercial',
    pricePkr: 260000000,
    status: 'Sold',
    image: DEMO_MEDIA.editorialGallery,
    summary:
      'High-visibility flagship showroom and corporate office plaza anchored on MM Alam Road with basement parking for 32 vehicles.',
  },
];

const INITIAL_DEALS: CrmDeal[] = [
  {
    id: 'D-201',
    title: 'DHA Phase 6 1-Kanal Villa',
    company: 'Chaudhry Family Trust',
    city: 'Lahore',
    valuePkr: 92500000,
    probability: 55,
    stage: 'Viewing',
    owner: 'Usman Tariq',
    closeDate: '2026-12-04',
  },
  {
    id: 'D-202',
    title: 'Clifton Block 2 Penthouse',
    company: 'Habib Textile Directors',
    city: 'Karachi',
    valuePkr: 78000000,
    probability: 80,
    stage: 'Negotiation',
    owner: 'Sana Malik',
    closeDate: '2026-11-28',
  },
  {
    id: 'D-203',
    title: 'Blue Area Corporate Floor',
    company: 'Zayd Fintech Ltd',
    city: 'Islamabad',
    valuePkr: 145000000,
    probability: 25,
    stage: 'Qualified',
    owner: 'Hamza Raza',
    closeDate: '2027-01-12',
  },
  {
    id: 'D-204',
    title: 'Gulberg III Commercial Building',
    company: 'Al-Noor Retail Group',
    city: 'Lahore',
    valuePkr: 260000000,
    probability: 100,
    stage: 'Closed Won',
    owner: 'Usman Tariq',
    closeDate: '2026-11-09',
  },
];

const INITIAL_INQUIRIES: InquiryLead[] = [
  {
    id: 'INQ-88',
    clientName: 'Salman Javed',
    phone: '+92 300 841 2201',
    propertyInterest: 'DHA Phase 6 Contemporary 1-Kanal Villa',
    budgetPkr: 95000000,
    status: 'Site Visit Scheduled',
    assignedAgent: 'Usman Tariq',
  },
  {
    id: 'INQ-89',
    clientName: 'Dr. Mahnoor Siddiqui',
    phone: '+92 333 219 4410',
    propertyInterest: 'Clifton Block 2 Sea-Facing Penthouse',
    budgetPkr: 80000000,
    status: 'Negotiating',
    assignedAgent: 'Sana Malik',
  },
  {
    id: 'INQ-90',
    clientName: 'Faisal Nadeem',
    phone: '+92 345 910 3388',
    propertyInterest: 'Blue Area Harmony Corporate Tower Floor',
    budgetPkr: 148000000,
    status: 'New Inquiry',
    assignedAgent: 'Hamza Raza',
  },
];

const MONTHLY_REVENUE_PKR = [
  { month: 'Jul', amountM: 120 },
  { month: 'Aug', amountM: 185 },
  { month: 'Sep', amountM: 160 },
  { month: 'Oct', amountM: 210 },
  { month: 'Nov', amountM: 260 },
];

const FAQS = [
  {
    q: 'Are all DHA, CDA, and Bahria Town property files verified before listing?',
    a: 'Every residential and commercial mandate undergoes NDA/NDC verification, biometric allotment checks, and physical site inspection prior to activation.',
  },
  {
    q: 'Can overseas Pakistani buyers book viewings and close transfers remotely?',
    a: 'Yes — EstateFlow CRM coordinates live video walkthroughs, Power of Attorney attestation guidance, and escrow-backed closing milestones.',
  },
];

const STAGES: CrmStage[] = ['Qualified', 'Viewing', 'Negotiation', 'Closed Won'];

export function CrmDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'properties' | 'pipeline' | 'leads'>('properties');
  const [deals, setDeals] = useState<CrmDeal[]>(INITIAL_DEALS);
  const [properties, setProperties] = useState<PropertyListing[]>(INITIAL_PROPERTIES);
  const [inquiries, setInquiries] = useState<InquiryLead[]>(INITIAL_INQUIRIES);

  const [cityFilter, setCityFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [detailProperty, setDetailProperty] = useState<PropertyListing | null>(null);

  // Property Add/Edit Modal
  const [showPropModal, setShowPropModal] = useState(false);
  const [editingPropId, setEditingPropId] = useState<string | null>(null);
  const [propTitle, setPropTitle] = useState('');
  const [propCity, setPropCity] = useState<'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi'>('Lahore');
  const [propArea, setPropArea] = useState('');
  const [propSize, setPropSize] = useState('1 Kanal');
  const [propType, setPropType] = useState<'Residential' | 'Commercial' | 'Plot'>('Residential');
  const [propPrice, setPropPrice] = useState('65000000');
  const [propStatus, setPropStatus] = useState<'Available' | 'Under Offer' | 'Sold'>('Available');

  // Inquiry Add Form
  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqProperty, setInqProperty] = useState(INITIAL_PROPERTIES[0].title);
  const [inqBudget, setInqBudget] = useState('92500000');
  const [inqSuccess, setInqSuccess] = useState(false);

  const summary = useMemo(() => calculatePipelineSummary(deals), [deals]);

  const filteredProperties = useMemo(() => {
    const q = search.trim().toLowerCase();
    return properties.filter((p) => {
      const cityOk = cityFilter === 'All' || p.city === cityFilter;
      if (!cityOk) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    });
  }, [properties, cityFilter, search]);

  const openNewPropertyModal = () => {
    setEditingPropId(null);
    setPropTitle('');
    setPropCity('Lahore');
    setPropArea('');
    setPropSize('10 Marla');
    setPropType('Residential');
    setPropPrice('45000000');
    setPropStatus('Available');
    setShowPropModal(true);
  };

  const openEditPropertyModal = (p: PropertyListing) => {
    setEditingPropId(p.id);
    setPropTitle(p.title);
    setPropCity(p.city);
    setPropArea(p.area);
    setPropSize(p.size);
    setPropType(p.type);
    setPropPrice(String(p.pricePkr));
    setPropStatus(p.status);
    setShowPropModal(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle.trim() || !propArea.trim()) return;
    const priceNum = Math.max(1000000, Number(propPrice) || 45000000);
    if (editingPropId) {
      setProperties((prev) =>
        prev.map((item) =>
          item.id === editingPropId
            ? {
                ...item,
                title: propTitle.trim(),
                city: propCity,
                area: propArea.trim(),
                size: propSize.trim() || '10 Marla',
                type: propType,
                pricePkr: priceNum,
                status: propStatus,
              }
            : item,
        ),
      );
    } else {
      setProperties((prev) => [
        {
          id: `P-${106 + prev.length}`,
          title: propTitle.trim(),
          city: propCity,
          area: propArea.trim(),
          size: propSize.trim() || '10 Marla',
          specs: `${propSize.trim() || '10 Marla'} · ${propType} Mandate`,
          type: propType,
          pricePkr: priceNum,
          status: propStatus,
          image:
            propType === 'Commercial'
              ? DEMO_MEDIA.estateflowCommercialPlaza
              : DEMO_MEDIA.estateflowDhaVilla,
          summary: `Verified ${propCity} ${propType.toLowerCase()} listing located in ${propArea.trim()}.`,
        },
        ...prev,
      ]);
    }
    setShowPropModal(false);
  };

  const handleAdvanceDeal = (deal: CrmDeal) => {
    const idx = STAGES.indexOf(deal.stage);
    const nextStage = STAGES[(idx + 1) % STAGES.length];
    setDeals((prev) => moveDealStage(prev, deal.id, nextStage));
  };

  const handleAddInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName.trim() || !inqPhone.trim()) return;
    setInquiries((prev) => [
      {
        id: `INQ-${91 + prev.length}`,
        clientName: inqName.trim(),
        phone: inqPhone.trim(),
        propertyInterest: inqProperty,
        budgetPkr: Math.max(1000000, Number(inqBudget) || 50000000),
        status: 'New Inquiry',
        assignedAgent: 'Usman Tariq',
      },
      ...prev,
    ]);
    setInqName('');
    setInqPhone('');
    setInqSuccess(true);
  };

  const formatCrore = (val: number) => `PKR ${(val / 10000000).toFixed(2)} Cr`;

  return (
    <div
      className="min-h-screen bg-[#F5F7FA] text-[#0B1B35]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Real Estate CRM"
        clientBrand="EstateFlow CRM"
        categoryLabel="Business Demo 02"
        onBack={onBack}
      />

      {/* Navy & Gold Header */}
      <header className="bg-[#0B1B35] text-white border-b border-[#C89D54]/30">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C89D54] text-[#0B1B35]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">EstateFlow CRM</span>
              <p className="text-xs text-[#C89D54]">Pakistan Luxury Property &amp; Sales Advisory</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 max-w-full">
            <div className="flex flex-wrap gap-1 rounded-lg bg-white/10 p-1 max-w-full">
              {(
                [
                  { id: 'properties', label: 'Property Listings' },
                  { id: 'pipeline', label: 'Pipeline & Revenue' },
                  { id: 'leads', label: 'Buyer Inquiries' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                    tab === t.id ? 'bg-[#C89D54] text-[#0B1B35]' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={openNewPropertyModal}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C89D54] px-4 py-2 text-xs font-bold text-[#0B1B35] hover:bg-[#D8B26E] cursor-pointer whitespace-nowrap"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add Property
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-12">
        {/* Featured Luxury Real Estate Hero Split */}
        <section className="grid items-stretch gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6F27]">
                DHA Lahore · Clifton Karachi · Blue Area Islamabad
              </p>
              <h1
                className="mt-2 text-3xl font-bold leading-tight text-[#0B1B35] sm:text-4xl"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Verified Residences, Commercial Towers &amp; Real-Time Sales Pipeline
              </h1>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                Built for Pakistani real estate brokerages and developers to showcase curated
                property photography, qualify buyer budgets in PKR Crore, and close mandates with
                full transparency.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl bg-[#F5F7FA] p-4 border border-slate-200/80">
                <p className="text-[11px] text-slate-500">Active Pipeline Value</p>
                <p className="mt-1 font-mono text-xl font-bold tabular-nums text-[#0B1B35]">
                  {formatCrore(summary.totalPipeline)}
                </p>
              </div>
              <div className="rounded-xl bg-[#F5F7FA] p-4 border border-slate-200/80">
                <p className="text-[11px] text-slate-500">Q4 Closed Volume</p>
                <p className="mt-1 font-mono text-xl font-bold tabular-nums text-emerald-700">
                  {formatCrore(summary.closedWonValue)}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 overflow-hidden rounded-xl border border-slate-200 min-h-[260px]">
            <ResilientImage
              src={DEMO_MEDIA.estateflowDhaVilla}
              alt="Luxury 1-Kanal residence in DHA Phase 6 Lahore"
              className="h-full w-full object-cover"
              fallbackLabel="DHA Lahore Flagship Villa"
            />
          </div>
        </section>

        {/* Visual Property Listings Grid */}
        {tab === 'properties' && (
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  aria-label="Search properties"
                  placeholder="Search DHA, Clifton, Blue Area..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs focus:border-[#C89D54] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCityFilter(c)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                      cityFilter === c
                        ? 'bg-[#0B1B35] text-white'
                        : 'border border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#C89D54]"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <ResilientImage
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover"
                        fallbackLabel={p.title}
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-[#9A6F27]">
                          {p.type} · {p.city}
                        </span>
                        <span
                          className={
                            p.status === 'Available'
                              ? 'text-emerald-700'
                              : p.status === 'Under Offer'
                                ? 'text-amber-700'
                                : 'text-slate-500'
                          }
                        >
                          {p.status}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-[#0B1B35]">{p.title}</h2>
                      <p className="text-xs text-slate-500">
                        {p.area} · {p.specs}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">{p.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 bg-slate-50/70">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Demand Price</p>
                      <p className="font-mono text-sm font-bold tabular-nums text-[#0B1B35]">
                        {formatCrore(p.pricePkr)}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDetailProperty(p)}
                        className="inline-flex items-center gap-1 rounded-md bg-[#0B1B35] px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-[#162C52] cursor-pointer"
                      >
                        <Eye className="h-3 w-3" /> Details
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditPropertyModal(p)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#0B1B35] hover:border-[#C89D54] cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {tab === 'pipeline' && (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Kanban Deals Pipeline */}
            <section className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0B1B35]">
                  Sales Pipeline (Click a deal to advance stage)
                </h2>
                <span className="text-xs text-slate-500">
                  Forecast: <strong className="font-mono">{formatCrore(summary.weightedForecast)}</strong>
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {STAGES.map((stage) => {
                  const stageDeals = deals.filter((d) => d.stage === stage);
                  return (
                    <div
                      key={stage}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-[#0B1B35]">{stage}</span>
                        <span className="font-mono text-xs text-[#9A6F27] tabular-nums">
                          {stageDeals.length}
                        </span>
                      </div>
                      {stageDeals.map((deal) => (
                        <button
                          key={deal.id}
                          type="button"
                          onClick={() => handleAdvanceDeal(deal)}
                          className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] p-3 text-left transition-colors hover:border-[#C89D54] cursor-pointer"
                        >
                          <p className="text-[11px] font-semibold text-[#9A6F27]">{deal.city}</p>
                          <p className="mt-0.5 text-xs font-bold text-[#0B1B35]">{deal.title}</p>
                          <p className="mt-1 text-[11px] text-slate-500">{deal.company}</p>
                          <div className="mt-2.5 flex items-center justify-between font-mono text-[11px]">
                            <span className="font-bold tabular-nums text-[#0B1B35]">
                              {formatCrore(deal.valuePkr)}
                            </span>
                            <span className="text-slate-500">{deal.probability}%</span>
                          </div>
                        </button>
                      ))}
                      {stageDeals.length === 0 && (
                        <p className="py-4 text-center text-[11px] text-slate-400">No deals in stage</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Revenue Analytics */}
            <section className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0B1B35]">Closed Deal Revenue (PKR)</h2>
                <p className="mt-1 text-xs text-slate-500">Monthly property transaction volume</p>
                <div className="mt-6 flex items-end gap-3 h-44 border-b border-slate-200 pb-2">
                  {MONTHLY_REVENUE_PKR.map((m) => (
                    <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold text-slate-600 tabular-nums">
                        {m.amountM}M
                      </span>
                      <div
                        className="w-full rounded-t-md bg-[#0B1B35] hover:bg-[#C89D54] transition-colors"
                        style={{ height: `${Math.round((m.amountM / 280) * 120)}px` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
                  {MONTHLY_REVENUE_PKR.map((m) => (
                    <span key={m.month} className="flex-1 text-center">{m.month}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-600 flex justify-between">
                <span>Top Territory: Lahore DHA</span>
                <span className="font-mono font-bold text-[#0B1B35]">61% Share</span>
              </div>
            </section>
          </div>
        )}

        {tab === 'leads' && (
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#C89D54]" />
                <h2 className="text-base font-bold text-[#0B1B35]">Customer &amp; Inquiry Records</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {inquiries.map((lead) => (
                  <div key={lead.id} className="flex flex-wrap items-center justify-between gap-4 py-3.5">
                    <div>
                      <p className="text-sm font-bold text-[#0B1B35]">{lead.clientName}</p>
                      <p className="text-xs text-slate-500">
                        {lead.phone} · Interest: {lead.propertyInterest}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs font-bold tabular-nums text-[#9A6F27]">
                        Budget: {formatCrore(lead.budgetPkr)}
                      </p>
                      <p className="text-[11px] text-slate-600">
                        {lead.status} · Agent: {lead.assignedAgent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-bold text-[#0B1B35]">Log New Property Inquiry</h2>
              <form onSubmit={handleAddInquiry} className="mt-4 space-y-3">
                <div>
                  <label htmlFor="inq-name" className="text-xs font-semibold text-slate-600">
                    Buyer Name
                  </label>
                  <input
                    id="inq-name"
                    type="text"
                    required
                    placeholder="Kamran Qureshi"
                    value={inqName}
                    onChange={(e) => setInqName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="inq-phone" className="text-xs font-semibold text-slate-600">
                    Mobile Number
                  </label>
                  <input
                    id="inq-phone"
                    type="tel"
                    required
                    placeholder="+92 301 776 5512"
                    value={inqPhone}
                    onChange={(e) => setInqPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="inq-prop" className="text-xs font-semibold text-slate-600">
                    Target Listing
                  </label>
                  <select
                    id="inq-prop"
                    value={inqProperty}
                    onChange={(e) => setInqProperty(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="inq-budget" className="text-xs font-semibold text-slate-600">
                    Budget (PKR)
                  </label>
                  <input
                    id="inq-budget"
                    type="number"
                    value={inqBudget}
                    onChange={(e) => setInqBudget(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#0B1B35] py-2.5 text-xs font-bold text-white hover:bg-[#162C52] cursor-pointer"
                >
                  Save Customer Inquiry
                </button>
                {inqSuccess && (
                  <p role="status" className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Inquiry logged in CRM pipeline!
                  </p>
                )}
              </form>
            </section>
          </div>
        )}

        {/* Commercial Advisory Showcase + FAQ */}
        <section className="grid gap-6 lg:grid-cols-12 border-t border-slate-200 pt-10">
          <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-[16/9] overflow-hidden">
              <ResilientImage
                src={DEMO_MEDIA.estateflowCommercialPlaza}
                alt="Harmony Corporate Tower in Blue Area Islamabad"
                className="h-full w-full object-cover"
                fallbackLabel="Blue Area Commercial Tower"
              />
            </div>
            <div className="p-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9A6F27]">
                Commercial Advisory · Sample Testimonial
              </p>
              <blockquote className="text-xs leading-relaxed text-slate-700">
                &ldquo;EstateFlow CRM structured our multi-floor acquisition in Blue Area with clean
                PKR cashflow tracking and verified NDC documentation. (Sample Content)&rdquo;
              </blockquote>
              <p className="text-xs font-bold text-[#0B1B35]">— Zayd Fintech Pakistan, Islamabad</p>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#0B1B35]" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Property Buyer &amp; Brokerage FAQ
            </h2>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <div key={f.q} className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-xs">
                  <p className="font-bold text-[#0B1B35]">{f.q}</p>
                  <p className="mt-1 leading-relaxed text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Corporate Real Estate Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-[#0B1B35] text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 text-xs">
          <div className="space-y-2">
            <p className="text-base font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              EstateFlow CRM
            </p>
            <p className="text-slate-400">
              End-to-end luxury residential &amp; commercial property management across Pakistan.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-[#C89D54]">Offices</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#C89D54]" /> Phase 6 Main Boulevard, DHA Lahore</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#C89D54]" /> Jinnah Avenue, Blue Area, Islamabad</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-[#C89D54]">Advisory Desk</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#C89D54]" /> +92 42 3718 5520 (Sample)</p>
            <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-[#C89D54]" /> advisory@estateflow.pk (Sample)</p>
          </div>
        </div>
      </footer>

      {/* Property Detail Modal */}
      {detailProperty && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setDetailProperty(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-slate-100">
              <ResilientImage
                src={detailProperty.image}
                alt={detailProperty.title}
                className="h-full w-full object-cover"
                fallbackLabel={detailProperty.title}
              />
              <button
                type="button"
                onClick={() => setDetailProperty(null)}
                aria-label="Close property detail"
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-900 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-[#9A6F27]">
                  {detailProperty.type} · {detailProperty.area}, {detailProperty.city}
                </p>
                <span className="font-mono text-lg font-bold text-[#0B1B35]">
                  {formatPkr(detailProperty.pricePkr)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1B35]">{detailProperty.title}</h3>
              <p className="text-xs font-semibold text-slate-500">{detailProperty.specs}</p>
              <p className="text-xs leading-relaxed text-slate-600">{detailProperty.summary}</p>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setInqProperty(detailProperty.title);
                    setDetailProperty(null);
                    setTab('leads');
                  }}
                  className="rounded-lg bg-[#0B1B35] px-4 py-2 text-xs font-bold text-white cursor-pointer"
                >
                  Log Buyer Inquiry for Property
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Property Modal */}
      {showPropModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={editingPropId ? 'Edit property listing' : 'Add property listing'}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowPropModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#0B1B35]">
                {editingPropId ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h3>
              <button
                type="button"
                onClick={() => setShowPropModal(false)}
                aria-label="Close property modal"
                className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSaveProperty} className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="prop-title" className="text-xs font-semibold text-slate-600">
                  Property Title
                </label>
                <input
                  id="prop-title"
                  type="text"
                  required
                  placeholder="E.g. DHA Phase 8 1-Kanal Modern Villa"
                  value={propTitle}
                  onChange={(e) => setPropTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label htmlFor="prop-city" className="text-xs font-semibold text-slate-600">
                  City
                </label>
                <select
                  id="prop-city"
                  value={propCity}
                  onChange={(e) => setPropCity(e.target.value as PropertyListing['city'])}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                >
                  <option>Lahore</option>
                  <option>Karachi</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                </select>
              </div>
              <div>
                <label htmlFor="prop-area" className="text-xs font-semibold text-slate-600">
                  Sector / Phase
                </label>
                <input
                  id="prop-area"
                  type="text"
                  required
                  placeholder="DHA Phase 8"
                  value={propArea}
                  onChange={(e) => setPropArea(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label htmlFor="prop-size" className="text-xs font-semibold text-slate-600">
                  Plot / Covered Size
                </label>
                <input
                  id="prop-size"
                  type="text"
                  value={propSize}
                  onChange={(e) => setPropSize(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label htmlFor="prop-price" className="text-xs font-semibold text-slate-600">
                  Demand Price (PKR)
                </label>
                <input
                  id="prop-price"
                  type="number"
                  value={propPrice}
                  onChange={(e) => setPropPrice(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
                />
              </div>
              <div>
                <label htmlFor="prop-type" className="text-xs font-semibold text-slate-600">
                  Category
                </label>
                <select
                  id="prop-type"
                  value={propType}
                  onChange={(e) => setPropType(e.target.value as PropertyListing['type'])}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Plot</option>
                </select>
              </div>
              <div>
                <label htmlFor="prop-status" className="text-xs font-semibold text-slate-600">
                  Listing Status
                </label>
                <select
                  id="prop-status"
                  value={propStatus}
                  onChange={(e) => setPropStatus(e.target.value as PropertyListing['status'])}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                >
                  <option>Available</option>
                  <option>Under Offer</option>
                  <option>Sold</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPropModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0B1B35] px-5 py-2 text-xs font-bold text-white hover:bg-[#162C52] cursor-pointer"
                >
                  {editingPropId ? 'Update Listing' : 'Save Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
