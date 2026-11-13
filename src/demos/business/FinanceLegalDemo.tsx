import React, { useMemo, useState } from 'react';
import { FileText, Plus, Receipt, Search, Wallet, X } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';
import { calculateInvoiceTotals, type InvoiceLineItem } from '../../utils/demoLogic';

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'Income' | 'Expense';
  amount: number;
}

interface InvoiceRecord {
  id: string;
  client: string;
  dueDate: string;
  total: number;
  status: 'Paid' | 'Pending';
}

const INITIAL_LEDGER: LedgerEntry[] = [
  {
    id: 'tx1',
    date: '2026-11-12',
    description: 'Retainer Payment — Crestline Logistics',
    category: 'Client Services',
    type: 'Income',
    amount: 14500,
  },
  {
    id: 'tx2',
    date: '2026-11-10',
    description: 'Cloud Infrastructure & Hosting',
    category: 'Software',
    type: 'Expense',
    amount: 1840,
  },
  {
    id: 'tx3',
    date: '2026-11-08',
    description: 'Enterprise License — Boreal Health',
    category: 'Subscriptions',
    type: 'Income',
    amount: 9200,
  },
  {
    id: 'tx4',
    date: '2026-11-05',
    description: 'Corporate Legal Retainer',
    category: 'Legal',
    type: 'Expense',
    amount: 3200,
  },
];

const BUDGETS = [
  { department: 'Engineering & Cloud', allocated: 28000, spent: 19400 },
  { department: 'Marketing & Acquisition', allocated: 18000, spent: 12900 },
  { department: 'Legal & Compliance', allocated: 12000, spent: 6800 },
  { department: 'Operations & Travel', allocated: 10000, spent: 4950 },
];

const LEGAL_DOCS = [
  {
    id: 'doc1',
    title: 'Master Services Agreement (MSA-2026)',
    type: 'Commercial Contract',
    updated: 'Oct 28, 2026',
    clauseSummary:
      'Governs scope of digital deliverables, 30-day net payment schedule, acceptance milestones, and mutual limitation of liability.',
  },
  {
    id: 'doc2',
    title: 'Mutual Non-Disclosure Agreement (NDA)',
    type: 'Confidentiality',
    updated: 'Sep 14, 2026',
    clauseSummary:
      'Protects proprietary designs, source repositories, pricing schedules, and customer datasets for a 3-year term.',
  },
  {
    id: 'doc3',
    title: 'IP Assignment & Licensing Addendum',
    type: 'Intellectual Property',
    updated: 'Nov 02, 2026',
    clauseSummary:
      'Transfers full copyright of bespoke client UI assets upon final invoice settlement while retaining open-source libraries.',
  },
];

export function FinanceLegalDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'ledger' | 'invoices' | 'budgets' | 'legal'>('ledger');
  const [entries, setEntries] = useState<LedgerEntry[]>(INITIAL_LEDGER);
  const [txFilter, setTxFilter] = useState<'All' | 'Income' | 'Expense'>('All');

  const [txDesc, setTxDesc] = useState('');
  const [txType, setTxType] = useState<'Income' | 'Expense'>('Income');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('Client Services');

  const [invoices, setInvoices] = useState<InvoiceRecord[]>([
    { id: 'INV-2041', client: 'Kestrel Partners', dueDate: '2026-11-25', total: 8800, status: 'Pending' },
    { id: 'INV-2040', client: 'Crestline Logistics', dueDate: '2026-11-10', total: 14500, status: 'Paid' },
  ]);
  const [invClient, setInvClient] = useState('');
  const [invTax, setInvTax] = useState(10);
  const [invItems, setInvItems] = useState<InvoiceLineItem[]>([
    { description: 'Website Architecture & UI System', quantity: 1, unitPrice: 4800 },
  ]);

  const [docSearch, setDocSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<(typeof LEGAL_DOCS)[number] | null>(null);

  const totals = useMemo(() => {
    const income = entries.filter((e) => e.type === 'Income').reduce((s, e) => s + e.amount, 0);
    const expense = entries.filter((e) => e.type === 'Expense').reduce((s, e) => s + e.amount, 0);
    return { income, expense, net: income - expense };
  }, [entries]);

  const filteredEntries = useMemo(
    () => entries.filter((e) => txFilter === 'All' || e.type === txFilter),
    [entries, txFilter],
  );

  const invoiceTotals = useMemo(
    () => calculateInvoiceTotals(invItems, invTax),
    [invItems, invTax],
  );

  const filteredDocs = useMemo(() => {
    const q = docSearch.trim().toLowerCase();
    return LEGAL_DOCS.filter(
      (d) => !q || d.title.toLowerCase().includes(q) || d.type.toLowerCase().includes(q),
    );
  }, [docSearch]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(txAmount);
    if (!txDesc.trim() || !Number.isFinite(num) || num <= 0) return;
    setEntries((prev) => [
      {
        id: `tx-${Date.now()}`,
        date: '2026-11-13',
        description: txDesc.trim(),
        category: txCategory,
        type: txType,
        amount: num,
      },
      ...prev,
    ]);
    setTxDesc('');
    setTxAmount('');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invClient.trim() || invoiceTotals.total <= 0) return;
    setInvoices((prev) => [
      {
        id: `INV-${2042 + prev.length}`,
        client: invClient.trim(),
        dueDate: '2026-12-13',
        total: invoiceTotals.total,
        status: 'Pending',
      },
      ...prev,
    ]);
    setInvClient('');
  };

  return (
    <div
      className="min-h-screen bg-[#FCFBF8] text-[#111827]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Finance & Legal Management"
        clientBrand="Meridian Ledger"
        categoryLabel="Operations"
        onBack={onBack}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
              Meridian Advisory &amp; Treasury
            </p>
            <h1
              className="mt-1 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Financial Ledger &amp; Legal Vault
            </h1>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl border border-stone-200 bg-white p-1">
            {(
              [
                { id: 'ledger', label: 'Income & Expense', icon: Wallet },
                { id: 'invoices', label: 'Invoice Builder', icon: Receipt },
                { id: 'budgets', label: 'Budgets & Reports', icon: Plus },
                { id: 'legal', label: 'Legal Library', icon: FileText },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    tab === item.id
                      ? 'bg-[#111827] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary KPI Strip */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-medium text-stone-500">Total Income</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-700">
              +${totals.income.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-medium text-stone-500">Total Expenses</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-red-700">
              -${totals.expense.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-medium text-stone-500">Net Operating Cashflow</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-stone-900">
              ${totals.net.toLocaleString()}
            </p>
          </div>
        </div>

        {/* LEDGER */}
        {tab === 'ledger' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleAddEntry}
              className="rounded-xl border border-stone-200 bg-white p-6 space-y-4 lg:col-span-4"
            >
              <h2 className="text-base font-bold">Record Transaction</h2>
              <div>
                <label htmlFor="fl-desc" className="block text-xs font-semibold text-stone-700">
                  Description
                </label>
                <input
                  id="fl-desc"
                  required
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  placeholder="Design Retainer Payment"
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="fl-type" className="block text-xs font-semibold text-stone-700">
                    Type
                  </label>
                  <select
                    id="fl-type"
                    value={txType}
                    onChange={(e) => setTxType(e.target.value as 'Income' | 'Expense')}
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  >
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fl-amt" className="block text-xs font-semibold text-stone-700">
                    Amount ($)
                  </label>
                  <input
                    id="fl-amt"
                    type="number"
                    min={1}
                    required
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    placeholder="2400"
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="fl-cat" className="block text-xs font-semibold text-stone-700">
                  Category
                </label>
                <select
                  id="fl-cat"
                  value={txCategory}
                  onChange={(e) => setTxCategory(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                >
                  <option>Client Services</option>
                  <option>Subscriptions</option>
                  <option>Software</option>
                  <option>Legal</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#111827] py-2.5 text-xs font-semibold text-white hover:bg-stone-800 cursor-pointer"
              >
                Add Entry
              </button>
            </form>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Recent Ledger Entries</h2>
                <div className="flex gap-1.5">
                  {(['All', 'Income', 'Expense'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setTxFilter(f)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                        txFilter === f
                          ? 'bg-amber-800 text-white'
                          : 'border border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-xs uppercase text-stone-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Date</th>
                      <th className="px-5 py-3 font-semibold">Description</th>
                      <th className="px-5 py-3 font-semibold">Category</th>
                      <th className="px-5 py-3 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredEntries.map((tx) => (
                      <tr key={tx.id}>
                        <td className="px-5 py-3 font-mono text-xs text-stone-500">{tx.date}</td>
                        <td className="px-5 py-3 font-medium text-stone-900">{tx.description}</td>
                        <td className="px-5 py-3 text-stone-600">{tx.category}</td>
                        <td
                          className={`px-5 py-3 text-right font-mono font-semibold tabular-nums ${
                            tx.type === 'Income' ? 'text-emerald-700' : 'text-red-700'
                          }`}
                        >
                          {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* INVOICES */}
        {tab === 'invoices' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleCreateInvoice}
              className="rounded-xl border border-stone-200 bg-white p-6 space-y-4 lg:col-span-6"
            >
              <h2 className="text-base font-bold">Interactive Invoice Builder</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="inv-client" className="block text-xs font-semibold text-stone-700">
                    Bill To Client
                  </label>
                  <input
                    id="inv-client"
                    required
                    value={invClient}
                    onChange={(e) => setInvClient(e.target.value)}
                    placeholder="Solis Energy Ltd."
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="inv-tax" className="block text-xs font-semibold text-stone-700">
                    Tax Rate (%)
                  </label>
                  <input
                    id="inv-tax"
                    type="number"
                    min={0}
                    max={30}
                    value={invTax}
                    onChange={(e) => setInvTax(Number(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-stone-700">Line Items</p>
                {invItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2">
                    <input
                      aria-label={`Item ${idx + 1} description`}
                      value={item.description}
                      onChange={(e) =>
                        setInvItems((prev) =>
                          prev.map((x, i) => (i === idx ? { ...x, description: e.target.value } : x)),
                        )
                      }
                      className="col-span-7 rounded-lg border border-stone-300 px-2.5 py-1.5 text-xs"
                    />
                    <input
                      type="number"
                      min={1}
                      aria-label={`Item ${idx + 1} quantity`}
                      value={item.quantity}
                      onChange={(e) =>
                        setInvItems((prev) =>
                          prev.map((x, i) =>
                            i === idx ? { ...x, quantity: Number(e.target.value) || 1 } : x,
                          ),
                        )
                      }
                      className="col-span-2 rounded-lg border border-stone-300 px-2 py-1.5 text-xs"
                    />
                    <input
                      type="number"
                      min={0}
                      aria-label={`Item ${idx + 1} price`}
                      value={item.unitPrice}
                      onChange={(e) =>
                        setInvItems((prev) =>
                          prev.map((x, i) =>
                            i === idx ? { ...x, unitPrice: Number(e.target.value) || 0 } : x,
                          ),
                        )
                      }
                      className="col-span-3 rounded-lg border border-stone-300 px-2 py-1.5 text-xs"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setInvItems((prev) => [
                      ...prev,
                      { description: 'QA & Launch Support', quantity: 1, unitPrice: 1200 },
                    ])
                  }
                  className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
                >
                  + Add Line Item
                </button>
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-1 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">
                    ${invoiceTotals.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Tax ({invTax}%)</span>
                  <span className="font-mono tabular-nums">
                    ${invoiceTotals.taxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900">
                  <span>Invoice Total</span>
                  <span className="font-mono tabular-nums">
                    ${invoiceTotals.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#111827] py-2.5 text-xs font-semibold text-white hover:bg-stone-800 cursor-pointer"
              >
                Generate Draft Invoice (Demo)
              </button>
            </form>

            <div className="space-y-4 lg:col-span-6">
              <h2 className="text-base font-bold">Issued Invoices</h2>
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="rounded-xl border border-stone-200 bg-white p-5 flex items-center justify-between"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold text-amber-800">{inv.id}</p>
                    <h3 className="text-sm font-bold text-stone-900">{inv.client}</h3>
                    <p className="text-xs text-stone-500">Due {inv.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-base font-bold tabular-nums">
                      ${inv.total.toLocaleString()}
                    </p>
                    {inv.status === 'Pending' ? (
                      <button
                        type="button"
                        onClick={() =>
                          setInvoices((prev) =>
                            prev.map((x) => (x.id === inv.id ? { ...x, status: 'Paid' } : x)),
                          )
                        }
                        className="mt-1 text-xs font-semibold text-emerald-700 underline cursor-pointer"
                      >
                        Mark as Paid
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700">Paid</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUDGETS & REPORTS */}
        {tab === 'budgets' && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {BUDGETS.map((b) => {
              const pct = Math.round((b.spent / b.allocated) * 100);
              return (
                <div key={b.department} className="rounded-xl border border-stone-200 bg-white p-6">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{b.department}</span>
                    <span className="font-mono tabular-nums text-amber-800">{pct}% used</span>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-amber-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-3 font-mono text-xs tabular-nums text-stone-500">
                    ${b.spent.toLocaleString()} spent of ${b.allocated.toLocaleString()} Q4 budget
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* LEGAL DOCUMENT LIBRARY */}
        {tab === 'legal' && (
          <div className="mt-8 space-y-5">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Search NDA, MSA, IP contracts..."
                className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-xl border border-stone-200 bg-white p-5 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-amber-800">{doc.type}</p>
                    <h3 className="mt-1.5 text-base font-bold text-stone-900">{doc.title}</h3>
                    <p className="mt-2 text-xs text-stone-500">Updated {doc.updated}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="mt-5 text-left text-xs font-semibold text-stone-900 underline underline-offset-4 hover:text-amber-800 cursor-pointer"
                  >
                    Inspect Clauses
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-amber-800">{selectedDoc.type}</p>
                <h3 className="mt-1 text-xl font-bold">{selectedDoc.title}</h3>
              </div>
              <button
                type="button"
                aria-label="Close legal preview"
                onClick={() => setSelectedDoc(null)}
                className="rounded p-1 hover:bg-stone-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-700">
              {selectedDoc.clauseSummary}
            </p>
            <p className="mt-4 rounded-lg bg-stone-50 p-3 text-xs text-stone-500">
              Template clause summary for demonstration purposes only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
