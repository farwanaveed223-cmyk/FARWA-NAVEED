import React, { useMemo, useState } from 'react';
import { ArrowRight, BarChart3, Plus, Search, UserPlus, Users, X } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';
import {
  calculatePipelineSummary,
  moveDealStage,
  type CrmDeal,
  type CrmStage,
} from '../../utils/demoLogic';

interface CustomerRecord {
  id: string;
  company: string;
  contact: string;
  email: string;
  segment: 'Enterprise' | 'Mid-Market' | 'Growth';
  arr: number;
  status: 'Active' | 'Onboarding' | 'Expansion';
}

interface LeadRecord {
  id: string;
  name: string;
  company: string;
  source: string;
  estValue: number;
  status: 'New' | 'Contacted' | 'Converted';
}

const STAGES: CrmStage[] = ['Qualified', 'Proposal', 'Negotiation', 'Closed Won'];

const INITIAL_DEALS: CrmDeal[] = [
  {
    id: 'deal-1',
    title: 'Global Inventory Rollout',
    company: 'Harborview Retail',
    value: 68000,
    probability: 75,
    stage: 'Negotiation',
    owner: 'Nadia Patel',
    closeDate: '2026-11-28',
  },
  {
    id: 'deal-2',
    title: 'Multi-Region CRM Seat Expansion',
    company: 'Crestline Logistics',
    value: 42000,
    probability: 50,
    stage: 'Proposal',
    owner: 'Tariq Hassan',
    closeDate: '2026-12-09',
  },
  {
    id: 'deal-3',
    title: 'Analytics Suite License',
    company: 'Boreal Health',
    value: 29500,
    probability: 25,
    stage: 'Qualified',
    owner: 'Nadia Patel',
    closeDate: '2026-12-18',
  },
  {
    id: 'deal-4',
    title: 'Enterprise Platform Annual',
    company: 'Kestrel Partners',
    value: 54000,
    probability: 100,
    stage: 'Closed Won',
    owner: 'Liam Brooks',
    closeDate: '2026-11-04',
  },
  {
    id: 'deal-5',
    title: 'Wholesale Portal Integration',
    company: 'Meridian Foods',
    value: 36000,
    probability: 50,
    stage: 'Proposal',
    owner: 'Liam Brooks',
    closeDate: '2026-12-14',
  },
];

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'c1',
    company: 'Kestrel Partners',
    contact: 'Hannah Mercer',
    email: 'hannah@kestrel.example',
    segment: 'Enterprise',
    arr: 54000,
    status: 'Active',
  },
  {
    id: 'c2',
    company: 'Silveroak Media',
    contact: 'Devon Gallagher',
    email: 'devon@silveroak.example',
    segment: 'Mid-Market',
    arr: 28800,
    status: 'Expansion',
  },
  {
    id: 'c3',
    company: 'Northbridge Manufacturing',
    contact: 'Sana Al-Mansoor',
    email: 'sana@northbridge.example',
    segment: 'Enterprise',
    arr: 84000,
    status: 'Active',
  },
  {
    id: 'c4',
    company: 'Cedar BioLabs',
    contact: 'Owen Park',
    email: 'owen@cedarbio.example',
    segment: 'Growth',
    arr: 16200,
    status: 'Onboarding',
  },
];

const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'l1',
    name: 'Clara Lindqvist',
    company: 'Nordic Timber Co.',
    source: 'Inbound Demo Request',
    estValue: 32000,
    status: 'New',
  },
  {
    id: 'l2',
    name: 'Rohan Mehta',
    company: 'Veridian Freight',
    source: 'Partner Referral',
    estValue: 48000,
    status: 'Contacted',
  },
  {
    id: 'l3',
    name: 'Elena Costa',
    company: 'Solis Energy',
    source: 'Webinar Registration',
    estValue: 24500,
    status: 'New',
  },
];

const MONTHLY_REVENUE = [
  { month: 'Jun', closed: 62000, forecast: 70000 },
  { month: 'Jul', closed: 74000, forecast: 78000 },
  { month: 'Aug', closed: 69000, forecast: 82000 },
  { month: 'Sep', closed: 88000, forecast: 90000 },
  { month: 'Oct', closed: 96000, forecast: 95000 },
  { month: 'Nov', closed: 112000, forecast: 118000 },
];

export function CrmDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'pipeline' | 'customers' | 'leads' | 'revenue'>('pipeline');
  const [deals, setDeals] = useState<CrmDeal[]>(INITIAL_DEALS);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);

  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [showAddDeal, setShowAddDeal] = useState(false);

  const [dealTitle, setDealTitle] = useState('');
  const [dealCompany, setDealCompany] = useState('');
  const [dealValue, setDealValue] = useState('25000');
  const [dealStage, setDealStage] = useState<CrmStage>('Qualified');

  const summary = useMemo(() => calculatePipelineSummary(deals), [deals]);

  const filteredCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    return customers.filter(
      (c) =>
        !q ||
        c.company.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q) ||
        c.segment.toLowerCase().includes(q),
    );
  }, [customers, customerSearch]);

  const handleMoveDeal = (dealId: string, nextStage: CrmStage) => {
    setDeals((prev) => moveDealStage(prev, dealId, nextStage));
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(dealValue);
    if (!dealTitle.trim() || !dealCompany.trim() || !Number.isFinite(numeric) || numeric <= 0) {
      return;
    }
    const probMap: Record<CrmStage, number> = {
      Qualified: 25,
      Proposal: 50,
      Negotiation: 75,
      'Closed Won': 100,
    };
    setDeals((prev) => [
      {
        id: `deal-${Date.now()}`,
        title: dealTitle.trim(),
        company: dealCompany.trim(),
        value: numeric,
        probability: probMap[dealStage],
        stage: dealStage,
        owner: 'Farwa Studio Rep',
        closeDate: '2026-12-20',
      },
      ...prev,
    ]);
    setDealTitle('');
    setDealCompany('');
    setDealValue('25000');
    setShowAddDeal(false);
  };

  const handleConvertLead = (lead: LeadRecord) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: 'Converted' } : l)),
    );
    setDeals((prev) => [
      {
        id: `deal-${Date.now()}`,
        title: `${lead.company} Platform Deal`,
        company: lead.company,
        value: lead.estValue,
        probability: 25,
        stage: 'Qualified',
        owner: 'Nadia Patel',
        closeDate: '2026-12-28',
      },
      ...prev,
    ]);
    setCustomers((prev) => [
      {
        id: `cust-${Date.now()}`,
        company: lead.company,
        contact: lead.name,
        email: `${lead.name.toLowerCase().replace(/\s+/g, '.')}@client.example`,
        segment: lead.estValue >= 40000 ? 'Enterprise' : 'Mid-Market',
        arr: lead.estValue,
        status: 'Onboarding',
      },
      ...prev,
    ]);
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Sales & CRM Command Center"
        clientBrand="Vanguard Cloud CRM"
        categoryLabel="Business Systems"
        onBack={onBack}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Vanguard Revenue OS
            </p>
            <h1
              className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Sales Pipeline &amp; Customer Directory
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg border border-slate-200 bg-white p-1">
              {(
                [
                  { id: 'pipeline', label: 'Pipeline' },
                  { id: 'leads', label: 'Leads' },
                  { id: 'customers', label: 'Customers' },
                  { id: 'revenue', label: 'Revenue' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    tab === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAddDeal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer whitespace-nowrap"
            >
              <Plus className="h-3.5 w-3.5" /> New Deal
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Active Pipeline</p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">
              ${summary.totalPipeline.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Weighted Forecast</p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-indigo-600">
              ${summary.weightedForecast.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Closed Won</p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-emerald-700">
              ${summary.closedWonValue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Deal Win Rate</p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">
              {summary.winRate}%
            </p>
          </div>
        </div>

        {/* PIPELINE BOARD */}
        {tab === 'pipeline' && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {STAGES.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              return (
                <div
                  key={stage}
                  className="flex flex-col rounded-xl border border-slate-200 bg-slate-100/70 p-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">{stage}</h2>
                      <p className="text-xs tabular-nums text-slate-500">
                        ${summary.stageTotals[stage].toLocaleString()} · {stageDeals.length} deals
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-3">
                    {stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="rounded-lg border border-slate-200 bg-white p-4 shadow-2xs"
                      >
                        <p className="text-xs font-semibold text-indigo-600">{deal.company}</p>
                        <h3 className="mt-1 text-sm font-bold text-slate-900">{deal.title}</h3>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                          <span className="font-mono font-semibold tabular-nums text-slate-900">
                            ${deal.value.toLocaleString()}
                          </span>
                          <span className="tabular-nums">{deal.probability}% prob.</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500">
                          Owner: {deal.owner} · Close {deal.closeDate}
                        </p>

                        <div className="mt-3 border-t border-slate-100 pt-2.5">
                          <label htmlFor={`stage-${deal.id}`} className="sr-only">
                            Move {deal.title} stage
                          </label>
                          <select
                            id={`stage-${deal.id}`}
                            value={deal.stage}
                            onChange={(e) => handleMoveDeal(deal.id, e.target.value as CrmStage)}
                            className="w-full rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>
                                Move to: {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LEADS */}
        {tab === 'leads' && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <UserPlus className="h-4 w-4 text-indigo-600" /> Inbound &amp; Partner Leads
              </h2>
              <span className="text-xs text-slate-500">Click Convert to create a Pipeline Deal</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Lead</th>
                    <th className="px-6 py-3 font-semibold">Company</th>
                    <th className="px-6 py-3 font-semibold">Source</th>
                    <th className="px-6 py-3 font-semibold text-right">Est. Value</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-3.5 font-semibold text-slate-900">{lead.name}</td>
                      <td className="px-6 py-3.5 text-slate-600">{lead.company}</td>
                      <td className="px-6 py-3.5 text-slate-500">{lead.source}</td>
                      <td className="px-6 py-3.5 text-right font-mono tabular-nums font-semibold">
                        ${lead.estValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-3.5 text-xs font-semibold">
                        <span
                          className={
                            lead.status === 'Converted'
                              ? 'text-emerald-700'
                              : lead.status === 'Contacted'
                                ? 'text-amber-700'
                                : 'text-indigo-700'
                          }
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        {lead.status === 'Converted' ? (
                          <span className="text-xs text-slate-400">In Pipeline</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleConvertLead(lead)}
                            className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
                          >
                            Convert to Deal <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CUSTOMERS */}
        {tab === 'customers' && (
          <div className="mt-8 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <Users className="h-4 w-4 text-indigo-600" /> Customer Accounts (
                {filteredCustomers.length})
              </h2>
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search companies or contacts..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Company</th>
                    <th className="px-6 py-3 font-semibold">Primary Contact</th>
                    <th className="px-6 py-3 font-semibold">Segment</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Annual ARR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCustomer(c)}
                      className="cursor-pointer hover:bg-indigo-50/40"
                    >
                      <td className="px-6 py-3.5 font-semibold text-slate-900">{c.company}</td>
                      <td className="px-6 py-3.5 text-slate-600">
                        {c.contact} · <span className="text-xs text-slate-400">{c.email}</span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600">{c.segment}</td>
                      <td className="px-6 py-3.5 text-xs font-semibold text-emerald-700">
                        {c.status}
                      </td>
                      <td className="px-6 py-3.5 text-right font-mono tabular-nums font-semibold">
                        ${c.arr.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REVENUE CHARTS */}
        {tab === 'revenue' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-base font-bold">
                    <BarChart3 className="h-4 w-4 text-indigo-600" /> Monthly Closed Revenue vs.
                    Target
                  </h2>
                  <p className="text-xs text-slate-500">June – November 2026 (USD)</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-xs bg-indigo-600" /> Closed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-xs bg-slate-300" /> Forecast
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-6 items-end gap-4 h-56 border-b border-slate-200 pb-2">
                {MONTHLY_REVENUE.map((item) => {
                  const closedH = Math.round((item.closed / 125000) * 100);
                  const forecastH = Math.round((item.forecast / 125000) * 100);
                  return (
                    <div key={item.month} className="flex h-full flex-col items-center justify-end">
                      <div className="flex w-full max-w-[54px] items-end justify-center gap-1.5 h-full">
                        <div
                          className="w-5 rounded-t bg-indigo-600 transition-all"
                          style={{ height: `${closedH}%` }}
                          title={`Closed: $${item.closed.toLocaleString()}`}
                        />
                        <div
                          className="w-5 rounded-t bg-slate-200 transition-all"
                          style={{ height: `${forecastH}%` }}
                          title={`Forecast: $${item.forecast.toLocaleString()}`}
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-slate-600">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-4">
              <h3 className="text-base font-bold">Pipeline Distribution</h3>
              <div className="mt-5 space-y-4">
                {STAGES.map((stage) => {
                  const totalAll = Math.max(
                    1,
                    Object.values(summary.stageTotals).reduce((a, b) => a + b, 0),
                  );
                  const pct = Math.round((summary.stageTotals[stage] / totalAll) * 100);
                  return (
                    <div key={stage}>
                      <div className="flex justify-between text-xs font-medium">
                        <span>{stage}</span>
                        <span className="font-mono tabular-nums">
                          ${summary.stageTotals[stage].toLocaleString()} ({pct}%)
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customer Drawer Modal */}
      {selectedCustomer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-indigo-600">
                  {selectedCustomer.segment}
                </p>
                <h3 className="mt-1 text-xl font-bold">{selectedCustomer.company}</h3>
              </div>
              <button
                type="button"
                aria-label="Close customer record"
                onClick={() => setSelectedCustomer(null)}
                className="rounded p-1 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Primary Contact</dt>
                <dd className="font-semibold">{selectedCustomer.contact}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Email</dt>
                <dd>{selectedCustomer.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Account Status</dt>
                <dd className="font-semibold text-emerald-700">{selectedCustomer.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Annual Contract Value</dt>
                <dd className="font-mono font-bold tabular-nums">
                  ${selectedCustomer.arr.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {showAddDeal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowAddDeal(false)}
        >
          <form
            onSubmit={handleCreateDeal}
            className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Create Pipeline Deal</h3>
              <button
                type="button"
                aria-label="Close new deal modal"
                onClick={() => setShowAddDeal(false)}
                className="rounded p-1 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label htmlFor="crm-deal-title" className="block text-xs font-semibold text-slate-700">
                Deal Title
              </label>
              <input
                id="crm-deal-title"
                required
                value={dealTitle}
                onChange={(e) => setDealTitle(e.target.value)}
                placeholder="Annual Enterprise License"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="crm-deal-comp" className="block text-xs font-semibold text-slate-700">
                Company Name
              </label>
              <input
                id="crm-deal-comp"
                required
                value={dealCompany}
                onChange={(e) => setDealCompany(e.target.value)}
                placeholder="Northstar Logistics"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="crm-deal-val" className="block text-xs font-semibold text-slate-700">
                  Value (USD)
                </label>
                <input
                  id="crm-deal-val"
                  type="number"
                  min={500}
                  required
                  value={dealValue}
                  onChange={(e) => setDealValue(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="crm-deal-stage" className="block text-xs font-semibold text-slate-700">
                  Initial Stage
                </label>
                <select
                  id="crm-deal-stage"
                  value={dealStage}
                  onChange={(e) => setDealStage(e.target.value as CrmStage)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
            >
              Add to Pipeline
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
