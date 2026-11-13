import React, { useState } from 'react';
import { BarChart2, Megaphone, Plus, Share2, TrendingUp, X } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';

type RangeKey = '7D' | '30D' | '90D';

const TRAFFIC_DATA: Record<
  RangeKey,
  {
    sessions: string;
    conversions: string;
    rate: string;
    cac: string;
    series: { label: string; visits: number; signups: number }[];
  }
> = {
  '7D': {
    sessions: '24,820',
    conversions: '1,142',
    rate: '4.60%',
    cac: '$31.40',
    series: [
      { label: 'Mon', visits: 3100, signups: 140 },
      { label: 'Tue', visits: 3580, signups: 168 },
      { label: 'Wed', visits: 3920, signups: 185 },
      { label: 'Thu', visits: 3740, signups: 171 },
      { label: 'Fri', visits: 4120, signups: 194 },
      { label: 'Sat', visits: 3180, signups: 141 },
      { label: 'Sun', visits: 3180, signups: 143 },
    ],
  },
  '30D': {
    sessions: '108,450',
    conversions: '4,880',
    rate: '4.50%',
    cac: '$29.80',
    series: [
      { label: 'Wk 1', visits: 22400, signups: 980 },
      { label: 'Wk 2', visits: 26100, signups: 1180 },
      { label: 'Wk 3', visits: 28900, signups: 1320 },
      { label: 'Wk 4', visits: 31050, signups: 1400 },
    ],
  },
  '90D': {
    sessions: '312,900',
    conversions: '13,760',
    rate: '4.40%',
    cac: '$28.10',
    series: [
      { label: 'Sep', visits: 94000, signups: 4020 },
      { label: 'Oct', visits: 105200, signups: 4650 },
      { label: 'Nov', visits: 113700, signups: 5090 },
    ],
  },
};

const SOCIAL_CHANNELS = [
  { platform: 'LinkedIn Organic & Ads', reach: '142.8K', ctr: '3.9%', leads: 612 },
  { platform: 'Instagram Reels & Carousel', reach: '218.4K', ctr: '2.7%', leads: 418 },
  { platform: 'YouTube Product Walkthroughs', reach: '89.2K', ctr: '4.8%', leads: 384 },
  { platform: 'Search (Google & Bing)', reach: '164.0K', ctr: '5.4%', leads: 790 },
];

export function MarketingDemo({ onBack }: { onBack: () => void }) {
  const [range, setRange] = useState<RangeKey>('7D');
  const [campaigns, setCampaigns] = useState([
    { id: 'cmp1', name: 'Q4 B2B SaaS Decision Makers', channel: 'LinkedIn Ads', spend: 6400, roas: '4.2x', active: true },
    { id: 'cmp2', name: 'Product Launch Retargeting', channel: 'Meta & IG', spend: 3800, roas: '3.6x', active: true },
    { id: 'cmp3', name: 'High-Intent Search Brand Terms', channel: 'Google Search', spend: 4200, roas: '5.1x', active: false },
  ]);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [cmpName, setCmpName] = useState('');
  const [cmpChannel, setCmpChannel] = useState('LinkedIn Ads');
  const [cmpSpend, setCmpSpend] = useState('3500');

  const current = TRAFFIC_DATA[range];
  const maxVisits = Math.max(...current.series.map((s) => s.visits));

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmpName.trim()) return;
    setCampaigns((prev) => [
      {
        id: `cmp-${Date.now()}`,
        name: cmpName.trim(),
        channel: cmpChannel,
        spend: Math.max(500, Number(cmpSpend) || 2500),
        roas: '3.4x',
        active: true,
      },
      ...prev,
    ]);
    setCmpName('');
    setShowNewCampaign(false);
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] text-[#0F172A]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Marketing & Analytics Command"
        clientBrand="PulseMetrics Growth"
        categoryLabel="Growth"
        onBack={onBack}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
              PulseMetrics Attribution
            </p>
            <h1
              className="mt-1 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Traffic, Campaigns &amp; Conversion Funnels
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg border border-slate-200 bg-white p-1">
              {(['7D', '30D', '90D'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    range === r ? 'bg-rose-600 text-white' : 'text-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              Executive Report
            </button>
            <button
              type="button"
              onClick={() => setShowNewCampaign(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Launch Campaign
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Qualified Sessions ({range})</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums">{current.sessions}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Goal Conversions</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-rose-600">
              {current.conversions}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Conversion Rate</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-emerald-700">
              {current.rate}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Blended CAC</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums">{current.cac}</p>
          </div>
        </div>

        {/* Traffic Chart & Conversion Funnel */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <TrendingUp className="h-4 w-4 text-rose-600" /> Traffic Volume ({range})
            </h2>
            <div
              className="mt-6 grid items-end gap-3 h-52 border-b border-slate-200 pb-2"
              style={{ gridTemplateColumns: `repeat(${current.series.length}, minmax(0, 1fr))` }}
            >
              {current.series.map((pt) => {
                const pct = Math.max(15, Math.round((pt.visits / maxVisits) * 100));
                return (
                  <div key={pt.label} className="flex h-full flex-col items-center justify-end">
                    <span className="mb-1 font-mono text-[10px] text-slate-500 tabular-nums">
                      {(pt.visits / 1000).toFixed(1)}k
                    </span>
                    <div
                      className="w-full max-w-[44px] rounded-t bg-rose-600/90 transition-all"
                      style={{ height: `${pct}%` }}
                    />
                    <span className="mt-2 text-xs font-medium text-slate-600">{pt.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-5">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <BarChart2 className="h-4 w-4 text-rose-600" /> Conversion Funnel
            </h2>
            <div className="mt-5 space-y-4">
              {[
                { stage: 'Landing Page Impressions', pct: 100, count: '108,450' },
                { stage: 'Engaged Product Views', pct: 54, count: '58,560' },
                { stage: 'Demo / Trial Initiated', pct: 16, count: '17,350' },
                { stage: 'Qualified Conversion', pct: 4.5, count: '4,880' },
              ].map((step) => (
                <div key={step.stage}>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{step.stage}</span>
                    <span className="font-mono tabular-nums">
                      {step.count} ({step.pct}%)
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{ width: `${Math.max(5, step.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaigns & Social Performance */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <Megaphone className="h-4 w-4 text-rose-600" /> Active Campaigns
            </h2>
            <div className="mt-4 divide-y divide-slate-100">
              {campaigns.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500">
                      {c.channel} · Spend ${c.spend.toLocaleString()} · ROAS {c.roas}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCampaigns((prev) =>
                        prev.map((x) => (x.id === c.id ? { ...x, active: !x.active } : x)),
                      )
                    }
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                      c.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {c.active ? 'Active' : 'Paused'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-5">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <Share2 className="h-4 w-4 text-rose-600" /> Channel Performance
            </h2>
            <div className="mt-4 space-y-3">
              {SOCIAL_CHANNELS.map((ch) => (
                <div
                  key={ch.platform}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3.5 py-2.5 text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{ch.platform}</p>
                    <p className="text-slate-500">Reach {ch.reach} · CTR {ch.ctr}</p>
                  </div>
                  <span className="font-mono font-bold text-rose-600 tabular-nums">
                    {ch.leads} leads
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showNewCampaign && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowNewCampaign(false)}
        >
          <form
            onSubmit={handleCreateCampaign}
            className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Launch Campaign</h3>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowNewCampaign(false)}
                className="rounded p-1 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label htmlFor="mkt-name" className="block text-xs font-semibold text-slate-700">
                Campaign Name
              </label>
              <input
                id="mkt-name"
                required
                value={cmpName}
                onChange={(e) => setCmpName(e.target.value)}
                placeholder="Winter Enterprise Webinar Push"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="mkt-ch" className="block text-xs font-semibold text-slate-700">
                  Channel
                </label>
                <select
                  id="mkt-ch"
                  value={cmpChannel}
                  onChange={(e) => setCmpChannel(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option>LinkedIn Ads</option>
                  <option>Google Search</option>
                  <option>Meta &amp; IG</option>
                </select>
              </div>
              <div>
                <label htmlFor="mkt-spend" className="block text-xs font-semibold text-slate-700">
                  Budget ($)
                </label>
                <input
                  id="mkt-spend"
                  type="number"
                  min={500}
                  value={cmpSpend}
                  onChange={(e) => setCmpSpend(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-rose-600 py-2.5 text-xs font-semibold text-white hover:bg-rose-700 cursor-pointer"
            >
              Launch Campaign
            </button>
          </form>
        </div>
      )}

      {showReportModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Marketing Executive Summary ({range})</h3>
              <button
                type="button"
                aria-label="Close report"
                onClick={() => setShowReportModal(false)}
                className="rounded p-1 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600">
              Across {campaigns.filter((c) => c.active).length} active campaigns, conversion rate
              holds at <strong>{current.rate}</strong> with {current.conversions} attributed
              conversions and a blended CAC of <strong>{current.cac}</strong>.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
              Top Channel: Google Search (5.4% CTR, 790 qualified leads).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
