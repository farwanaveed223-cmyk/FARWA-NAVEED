import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileText,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { calculateInvoiceTotals, formatPkr, type InvoiceLineItem } from '../../utils/demoLogic';

interface FinoraEntry {
  id: string;
  date: string;
  client: string;
  category: 'Audit Retainer' | 'FBR Tax Filing' | 'Office Rent' | 'Software & Payroll';
  type: 'Income' | 'Expense';
  amountPkr: number;
}

const INITIAL_ENTRIES: FinoraEntry[] = [
  { id: 'FIN-01', date: '2026-11-12', client: 'Crescent Textiles Ltd', category: 'Audit Retainer', type: 'Income', amountPkr: 450000 },
  { id: 'FIN-02', date: '2026-11-10', client: 'PakAgro Exports Pvt', category: 'FBR Tax Filing', type: 'Income', amountPkr: 185000 },
  { id: 'FIN-03', date: '2026-11-08', client: 'Blue Area Office Lease', category: 'Office Rent', type: 'Expense', amountPkr: 220000 },
  { id: 'FIN-04', date: '2026-11-04', client: 'Advisory Team Payroll', category: 'Software & Payroll', type: 'Expense', amountPkr: 310000 },
];

const TAX_SERVICES = [
  {
    title: '01. FBR NTN & Active Taxpayer Filing',
    desc: 'Annual corporate & AOP income tax returns, wealth reconciliation, and SRB/PRA statutory compliance.',
  },
  {
    title: '02. SECP Corporate Incorporation',
    desc: 'Private limited registration, MOA/AOA drafting, board resolution filings, and statutory external audits.',
  },
  {
    title: '03. Monthly Sales Tax & Payroll Withholding',
    desc: 'Automated GST input/output reconciliation, PSID challan generation, and employee EOBI/tax schedules.',
  },
];

const RETAINER_PLANS = [
  {
    tier: 'Startup Compliance',
    price: 45000,
    cycle: 'Per Month · PKR',
    features: ['Monthly FBR Withholding Statements', 'Bookkeeping up to 150 Vouchers', 'Quarterly Cashflow Briefing'],
  },
  {
    tier: 'SME Growth CFO',
    price: 95000,
    cycle: 'Per Month · PKR',
    features: ['Full General Ledger & GST Filing', 'Payroll & Statutory Tax Compliance', 'Dedicated Chartered Advisor'],
  },
  {
    tier: 'Enterprise Statutory Suite',
    price: 210000,
    cycle: 'Per Month · PKR',
    features: ['SECP Statutory Audit Prep', 'Multi-Branch Cost Center P&L', 'FBR Notice & Tribunal Representation'],
  },
];

export function FinanceLegalDemo({ onBack }: { onBack: () => void }) {
  const [entries, setEntries] = useState<FinoraEntry[]>(INITIAL_ENTRIES);
  const [tab, setTab] = useState<'ledger' | 'invoices' | 'tax'>('ledger');

  const [newClient, setNewClient] = useState('');
  const [newType, setNewType] = useState<'Income' | 'Expense'>('Income');
  const [newCategory, setNewCategory] = useState<FinoraEntry['category']>('FBR Tax Filing');
  const [newAmount, setNewAmount] = useState('95000');

  // Invoice Builder State
  const [invClient, setInvClient] = useState('Zayd Logistics (Pvt) Ltd, Lahore');
  const [taxRate, setTaxRate] = useState(17);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    { description: 'Annual Statutory Audit & SECP Review', quantity: 1, unitPrice: 140000 },
    { description: 'Monthly FBR Sales Tax Advisory', quantity: 2, unitPrice: 35000 },
  ]);
  const [downloadNote, setDownloadNote] = useState('');

  // Advisory Consultation Form
  const [consultName, setConsultName] = useState('');
  const [consultCompany, setConsultCompany] = useState('');
  const [consultScope, setConsultScope] = useState('SME Growth CFO');
  const [consultSent, setConsultSent] = useState(false);

  const totals = useMemo(() => {
    const income = entries.filter((e) => e.type === 'Income').reduce((s, e) => s + e.amountPkr, 0);
    const expense = entries.filter((e) => e.type === 'Expense').reduce((s, e) => s + e.amountPkr, 0);
    return { income, expense, net: income - expense };
  }, [entries]);

  const invTotals = useMemo(
    () => calculateInvoiceTotals(lineItems, taxRate),
    [lineItems, taxRate],
  );

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim()) return;
    setEntries((prev) => [
      {
        id: `FIN-0${prev.length + 1}`,
        date: '2026-11-14',
        client: newClient.trim(),
        category: newCategory,
        type: newType,
        amountPkr: Math.max(1000, Number(newAmount) || 50000),
      },
      ...prev,
    ]);
    setNewClient('');
  };

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      { description: 'NTN Registration & Compliance Check', quantity: 1, unitPrice: 25000 },
    ]);
  };

  const downloadSampleInvoice = () => {
    const lines = [
      'FINORA ACCOUNTING & TAX CONSULTANCY (SAMPLE INVOICE)',
      `Client: ${invClient}`,
      `Date: 2026-11-14`,
      '--------------------------------------------------',
      ...lineItems.map(
        (li) => `${li.description} x${li.quantity} = ${formatPkr(li.quantity * li.unitPrice)}`,
      ),
      '--------------------------------------------------',
      `Subtotal: ${formatPkr(invTotals.subtotal)}`,
      `GST (${taxRate}%): ${formatPkr(invTotals.taxAmount)}`,
      `TOTAL DUE: ${formatPkr(invTotals.total)}`,
      '',
      'Note: Interactive Demonstration Document Only.',
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Finora-Sample-Invoice-PKR.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadNote('Sample PKR invoice downloaded (.txt).');
  };

  return (
    <div
      className="min-h-screen bg-[#F4F7F6] text-[#0A1628]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Finance & Accounting"
        clientBrand="Finora"
        categoryLabel="Business Demo 06"
        onBack={onBack}
      />

      {/* Corporate Navigation Header */}
      <header className="bg-[#0A1628] text-white border-b border-emerald-500/25">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a
            href="#fin-top"
            className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            FINORA
          </a>
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
            <a href="#fin-workspace" className="hover:text-emerald-400 whitespace-nowrap">Financial Console</a>
            <a href="#fin-plans" className="hover:text-emerald-400 whitespace-nowrap">Retainer Plans</a>
            <a href="#fin-advisory" className="hover:text-emerald-400 whitespace-nowrap">Tax Advisory</a>
            <a href="#fin-faq" className="hover:text-emerald-400 whitespace-nowrap">FAQ</a>
          </nav>
          <a
            href="#fin-consult"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-[#0A1628] hover:bg-emerald-400 whitespace-nowrap shrink-0"
          >
            Book Tax Review
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-16">
        {/* Advisory Firm Hero Split */}
        <section id="fin-top" className="grid items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between py-2 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                Chartered Financial Advisory · Blue Area Islamabad &amp; I.I. Chundrigar Karachi
              </p>
              <h1
                className="mt-3 text-3xl font-bold leading-[1.08] tracking-tight text-[#0A1628] sm:text-5xl"
                style={{ fontFamily: '"Outfit", sans-serif', textWrap: 'balance' }}
              >
                Transparent corporate accounting, FBR tax compliance &amp; PKR invoicing.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Finora serves Pakistani exporters, SaaS founders, and family conglomerates with
                real-time bookkeeping, statutory audit readiness, and proactive withholding tax planning.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setTab('invoices')}
                className="rounded-lg bg-[#0A1628] px-5 py-3 text-xs font-bold text-white hover:bg-[#162B4D] cursor-pointer"
              >
                Open PKR Invoice Builder
              </button>
              <a
                href="#fin-plans"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-[#0A1628]"
              >
                Explore Monthly Retainers
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <ResilientImage
                src={DEMO_MEDIA.finoraAdvisoryOffice}
                alt="Finora chartered accountancy boardroom and financial advisory partners"
                className="h-full w-full object-cover"
                fallbackLabel="Finora Corporate Advisory"
              />
            </div>
          </div>
        </section>

        {/* Financial Summary KPIs & Console Tabs */}
        <section id="fin-workspace" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                Client Financial Portal
              </p>
              <h2 className="mt-1 text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Live Ledger, PKR Billing &amp; Statutory Modules
              </h2>
            </div>

            <div className="flex flex-wrap gap-1 rounded-lg bg-slate-200/80 p-1">
              {(
                [
                  { id: 'ledger', label: 'Income, Expense & Budget' },
                  { id: 'invoices', label: 'Invoice Builder' },
                  { id: 'tax', label: 'Tax Services & Clients' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    tab === t.id ? 'bg-[#0A1628] text-white' : 'text-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs text-slate-500">Total Consultancy Income</p>
              <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-emerald-700">
                {formatPkr(totals.income)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs text-slate-500">Operating Expenses</p>
              <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-[#0A1628]">
                {formatPkr(totals.expense)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs text-slate-500">Net Operating Surplus</p>
              <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-emerald-700">
                {formatPkr(totals.net)}
              </p>
            </div>
          </div>

          {tab === 'ledger' && (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <h3 className="text-base font-bold">Income &amp; Expense Ledger (PKR)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="py-2.5 pr-3">Date</th>
                        <th className="py-2.5 pr-3">Client / Description</th>
                        <th className="py-2.5 pr-3">Category</th>
                        <th className="py-2.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {entries.map((entry) => (
                        <tr key={entry.id}>
                          <td className="py-3 pr-3 font-mono text-slate-500">{entry.date}</td>
                          <td className="py-3 pr-3 font-semibold text-[#0A1628]">{entry.client}</td>
                          <td className="py-3 pr-3 text-slate-600">{entry.category}</td>
                          <td
                            className={`py-3 text-right font-mono font-bold tabular-nums ${
                              entry.type === 'Income' ? 'text-emerald-700' : 'text-slate-700'
                            }`}
                          >
                            {entry.type === 'Income' ? '+' : '-'} {formatPkr(entry.amountPkr)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-base font-bold">Record Transaction</h3>
                  <form onSubmit={addEntry} className="mt-3 space-y-3">
                    <input
                      type="text"
                      required
                      aria-label="Client or expense label"
                      placeholder="Client or Expense Label"
                      value={newClient}
                      onChange={(e) => setNewClient(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        aria-label="Transaction type"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as 'Income' | 'Expense')}
                        className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs"
                      >
                        <option>Income</option>
                        <option>Expense</option>
                      </select>
                      <select
                        aria-label="Transaction category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as FinoraEntry['category'])}
                        className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs"
                      >
                        <option>FBR Tax Filing</option>
                        <option>Audit Retainer</option>
                        <option>Office Rent</option>
                        <option>Software &amp; Payroll</option>
                      </select>
                    </div>
                    <input
                      type="number"
                      aria-label="Amount in PKR"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[#0A1628] py-2.5 text-xs font-bold text-white hover:bg-[#162B4D] cursor-pointer"
                    >
                      Add Ledger Entry
                    </button>
                  </form>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
                  <h3 className="text-sm font-bold">Quarterly Budget Utilization</h3>
                  {[
                    { label: 'Audit Operations', pct: 68 },
                    { label: 'FBR Portal Tooling', pct: 45 },
                    { label: 'SECP Secretarial Filings', pct: 82 },
                  ].map((b) => (
                    <div key={b.label} className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>{b.label}</span>
                        <span className="font-mono font-semibold">{b.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${b.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'invoices' && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold">Finora PKR Invoice Generator</h3>
                  <p className="text-xs text-slate-500">Build itemized tax consultancy invoices &amp; export sample receipts.</p>
                </div>
                <button
                  type="button"
                  onClick={downloadSampleInvoice}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Download Sample Invoice
                </button>
              </div>

              {downloadNote && (
                <p role="status" className="text-xs font-semibold text-emerald-700">
                  {downloadNote}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="inv-client" className="text-xs font-semibold text-slate-600">Billed Client</label>
                  <input
                    id="inv-client"
                    type="text"
                    value={invClient}
                    onChange={(e) => setInvClient(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="inv-gst" className="text-xs font-semibold text-slate-600">Sales Tax / GST (%)</label>
                  <input
                    id="inv-gst"
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {lineItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center text-xs">
                    <input
                      type="text"
                      aria-label={`Line item ${idx + 1} description`}
                      value={item.description}
                      onChange={(e) =>
                        setLineItems((prev) =>
                          prev.map((row, i) => (i === idx ? { ...row, description: e.target.value } : row)),
                        )
                      }
                      className="col-span-6 rounded-lg border border-slate-200 px-3 py-2"
                    />
                    <input
                      type="number"
                      aria-label={`Line item ${idx + 1} quantity`}
                      value={item.quantity}
                      onChange={(e) =>
                        setLineItems((prev) =>
                          prev.map((row, i) => (i === idx ? { ...row, quantity: Number(e.target.value) } : row)),
                        )
                      }
                      className="col-span-2 rounded-lg border border-slate-200 px-2 py-2 font-mono text-right"
                    />
                    <input
                      type="number"
                      aria-label={`Line item ${idx + 1} unit price`}
                      value={item.unitPrice}
                      onChange={(e) =>
                        setLineItems((prev) =>
                          prev.map((row, i) => (i === idx ? { ...row, unitPrice: Number(e.target.value) } : row)),
                        )
                      }
                      className="col-span-4 rounded-lg border border-slate-200 px-3 py-2 font-mono text-right"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLineItem}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline cursor-pointer pt-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Fee Line
                </button>
              </div>

              <div className="rounded-xl bg-[#0A1628] p-5 text-white flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <p className="text-slate-300">Subtotal: <strong className="font-mono">{formatPkr(invTotals.subtotal)}</strong></p>
                  <p className="text-slate-300">Tax ({taxRate}%): <strong className="font-mono">{formatPkr(invTotals.taxAmount)}</strong></p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold">Total Invoice Amount</p>
                  <p className="font-mono text-2xl font-bold tabular-nums">{formatPkr(invTotals.total)}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'tax' && (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-base font-bold">Pakistani Tax &amp; Corporate Advisory Services</h3>
                </div>
                <div className="grid gap-4">
                  {TAX_SERVICES.map((s) => (
                    <div key={s.title} className="rounded-lg border border-slate-200 p-4">
                      <h4 className="text-sm font-bold text-[#0A1628]">{s.title}</h4>
                      <p className="mt-1 text-xs text-slate-600">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-base font-bold">Retained Corporate Clients</h3>
                </div>
                <ul className="divide-y divide-slate-100 text-xs">
                  {[
                    { name: 'Crescent Textiles Ltd', city: 'Faisalabad', reg: 'NTN Active · SECP' },
                    { name: 'PakAgro Exports (Pvt) Ltd', city: 'Multan', reg: 'NTN Active · PRA' },
                    { name: 'Zayd Logistics Group', city: 'Lahore', reg: 'NTN Active · SRB' },
                  ].map((c) => (
                    <li key={c.name} className="flex justify-between py-3">
                      <div>
                        <p className="font-bold">{c.name}</p>
                        <p className="text-slate-500">{c.city}</p>
                      </div>
                      <span className="font-mono text-emerald-700 font-semibold">{c.reg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Retainer Packages */}
        <section id="fin-plans" className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Transparent Monthly Fees
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Corporate Accounting &amp; CFO Retainers (PKR)
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {RETAINER_PLANS.map((plan, idx) => (
              <div
                key={plan.tier}
                className={`flex flex-col justify-between rounded-2xl border p-6 ${
                  idx === 1 ? 'border-emerald-600 bg-[#0A1628] text-white' : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${idx === 1 ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {plan.cycle}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{plan.tier}</h3>
                  <p className="mt-3 font-mono text-2xl font-bold tabular-nums">{formatPkr(plan.price)}</p>
                  <ul className={`mt-4 space-y-2 text-xs ${idx === 1 ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.features.map((f) => (
                      <li key={f}>· {f}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#fin-consult"
                  onClick={() => setConsultScope(plan.tier)}
                  className={`mt-6 block rounded-lg py-2.5 text-center text-xs font-bold ${
                    idx === 1 ? 'bg-emerald-500 text-[#0A1628]' : 'bg-[#0A1628] text-white'
                  }`}
                >
                  Select Retainer Plan
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Regional Practice Showcase */}
        <section className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-[16/9] overflow-hidden bg-slate-100">
              <ResilientImage
                src={DEMO_MEDIA.estateflowCommercialPlaza}
                alt="Finora Karachi corporate headquarters on I.I. Chundrigar Road"
                className="h-full w-full object-cover"
                fallbackLabel="Karachi Financial Tower"
              />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                I.I. Chundrigar Road, Karachi
              </p>
              <h3 className="mt-1 text-base font-bold text-[#0A1628]">
                Banking, Treasury &amp; Export Tax Structuring
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Dedicated statutory audit and IT-export exemption teams supporting Karachi trading
                houses and logistics fleets.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-[16/9] overflow-hidden bg-slate-100">
              <ResilientImage
                src={DEMO_MEDIA.peoplefirstHrOffice}
                alt="Finora Chartered Accountants reviewing annual SECP filings with client CFOs"
                className="h-full w-full object-cover"
                fallbackLabel="Islamabad Audit Chambers"
              />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Blue Area, Islamabad
              </p>
              <h3 className="mt-1 text-base font-bold text-[#0A1628]">
                SECP Secretarial Compliance &amp; Fractional CFO Desks
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Board-ready monthly P&amp;L packs, PRA/SRB provincial sales tax filings, and FBR
                withholding statement reconciliations.
              </p>
            </div>
          </article>
        </section>

        {/* Partner Advisory + Testimonial + FAQ + Consultation */}
        <section id="fin-advisory" className="grid gap-6 lg:grid-cols-12">
          <div id="fin-faq" className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Compliance FAQ &amp; Client Perspective
            </h2>
            {[
              {
                q: 'Does Finora handle SECP private limited incorporation from scratch?',
                a: 'Yes — name reservation, digital signatures, NTN issuance, and bank resolution paperwork are handled end-to-end.',
              },
              {
                q: 'Are financial reports formatted to ICAP and IFRS standards?',
                a: 'All quarterly statements and audit working papers comply with ICAP SME/IFRS disclosures.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 text-xs">
                <p className="font-bold text-[#0A1628]">{item.q}</p>
                <p className="mt-1.5 text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}

            <blockquote className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                <span>Client Review</span>
                <span>Sample Content</span>
              </div>
              <p className="mt-2 leading-relaxed text-[#0A1628]">
                &ldquo;Finora reduced our monthly FBR sales tax closing from six days to one afternoon
                with clean vendor withholding reconciliation.&rdquo;
              </p>
              <footer className="mt-2 font-bold text-emerald-800">— Tariq Jamil, Finance Controller, Crescent Textiles</footer>
            </blockquote>
          </div>

          <div id="fin-consult" className="lg:col-span-6 rounded-2xl bg-[#0A1628] p-7 text-white space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Chartered Advisory Desk
              </p>
              <h2 className="mt-1 text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Schedule an FBR &amp; Audit Assessment
              </h2>
            </div>

            {consultSent ? (
              <div role="status" className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-xs space-y-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <p className="font-bold text-white">Advisory Consultation Logged (Demo)</p>
                <p className="text-slate-300">
                  Request recorded for {consultName} ({consultCompany}) under {consultScope}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!consultName.trim() || !consultCompany.trim()) return;
                  setConsultSent(true);
                }}
                className="space-y-3 text-xs"
              >
                <input
                  type="text"
                  required
                  aria-label="Contact full name"
                  placeholder="Your Full Name"
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-400"
                />
                <input
                  type="text"
                  required
                  aria-label="Company name"
                  placeholder="Company / Business Name (Pvt Ltd or AOP)"
                  value={consultCompany}
                  onChange={(e) => setConsultCompany(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-400"
                />
                <select
                  aria-label="Advisory package"
                  value={consultScope}
                  onChange={(e) => setConsultScope(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#11213A] px-3.5 py-2.5 text-white"
                >
                  {RETAINER_PLANS.map((p) => <option key={p.tier}>{p.tier}</option>)}
                </select>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 font-bold text-[#0A1628] hover:bg-emerald-400 cursor-pointer"
                >
                  <TrendingUp className="h-4 w-4" /> Submit Advisory Request (Demo)
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* Corporate Footer */}
      <footer className="bg-[#0A1628] text-slate-400 border-t border-emerald-500/20 mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              FINORA ACCOUNTING &amp; TAX
            </p>
            <p className="max-w-sm leading-relaxed">
              Corporate accounting, FBR taxation, SECP compliance, and automated PKR invoicing
              consultancy serving Pakistani enterprises.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Practice Areas</p>
            <ul className="space-y-1.5">
              <li><a href="#fin-workspace" className="hover:text-emerald-400">Financial Console</a></li>
              <li><a href="#fin-plans" className="hover:text-emerald-400">CFO Retainers</a></li>
              <li><a href="#fin-faq" className="hover:text-emerald-400">Compliance FAQ</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Pakistan Offices</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-emerald-400" /> Jinnah Avenue, Blue Area, Islamabad</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-emerald-400" /> +92 51 280 9944</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-slate-500">
          Finora · Interactive Business Solution Demo (Sample Data Only)
        </div>
      </footer>
    </div>
  );
}
