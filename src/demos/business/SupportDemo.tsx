import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Search,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';

interface Ticket {
  id: string;
  customer: string;
  city: string;
  subject: string;
  orderId: string;
  status: 'Open' | 'Investigating' | 'Resolved';
  updatedAt: string;
}

interface ChatMsg {
  id: string;
  sender: 'customer' | 'agent';
  text: string;
  time: string;
}

const SAMPLE_ORDERS: Record<
  string,
  { courier: string; city: string; codPkr: number; stage: string; eta: string }
> = {
  'PK-88412': {
    courier: 'TCS Express',
    city: 'Lahore → Islamabad',
    codPkr: 6450,
    stage: 'Out for Delivery with Rider Salman',
    eta: 'Today before 6:00 PM',
  },
  'PK-88419': {
    courier: 'Leopards COD',
    city: 'Karachi → Faisalabad',
    codPkr: 11200,
    stage: 'Arrived at Faisalabad Hub',
    eta: 'Tomorrow morning',
  },
};

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'SUP-401',
    customer: 'Hira Siddiqui',
    city: 'Lahore',
    subject: 'Exchange request for medium stitched lawn kurti',
    orderId: 'PK-88412',
    status: 'Investigating',
    updatedAt: '12 mins ago',
  },
  {
    id: 'SUP-402',
    customer: 'Fahad Mehmood',
    city: 'Karachi',
    subject: 'JazzCash refund timeline for cancelled COD parcel',
    orderId: 'PK-88305',
    status: 'Open',
    updatedAt: '35 mins ago',
  },
  {
    id: 'SUP-403',
    customer: 'Mariam Tariq',
    city: 'Islamabad',
    subject: 'Updated phone number for TCS dispatch rider',
    orderId: 'PK-88419',
    status: 'Resolved',
    updatedAt: '2 hours ago',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How long do JazzCash or Easypaisa refunds take?',
    a: 'Once a returned parcel clears quality inspection at our Lahore or Karachi warehouse, digital wallet refunds settle within 24–48 business hours.',
  },
  {
    q: 'Can I open a Cash on Delivery (COD) parcel before paying?',
    a: 'All orders above PKR 4,000 include open-parcel verification notes for TCS and Leopards riders upon request.',
  },
  {
    q: 'What are nationwide delivery charges across Pakistan?',
    a: 'Standard nationwide COD delivery is PKR 250, and completely free on shopping carts above PKR 5,000.',
  },
];

export function SupportDemo({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'portal' | 'agent'>('portal');
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'agent',
      text: 'Assalam-o-Alaikum! Welcome to SupportSphere Pakistan Help Desk. Share your order ID (e.g. PK-88412) or question below.',
      time: '10:02 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Order Tracker
  const [trackingQuery, setTrackingQuery] = useState('PK-88412');
  const trackedOrder = SAMPLE_ORDERS[trackingQuery.trim().toUpperCase()] || null;

  // New Ticket Form
  const [custName, setCustName] = useState('');
  const [custCity, setCustCity] = useState('Lahore');
  const [ticketOrder, setTicketOrder] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCreated, setTicketCreated] = useState(false);

  // FAQ Search
  const [faqQuery, setFaqQuery] = useState('');

  // Customer Feedback
  const [rating, setRating] = useState(5);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const filteredFaqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    return q
      ? FAQ_ITEMS.filter(
          (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
        )
      : FAQ_ITEMS;
  }, [faqQuery]);

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const txt = chatInput.trim();
    if (!txt) return;
    const customerMsg: ChatMsg = {
      id: `c-${Date.now()}`,
      sender: 'customer',
      text: txt,
      time: 'Just now',
    };
    const replyText = txt.toUpperCase().includes('PK-')
      ? 'We located that consignment in our TCS/Leopards feed — dispatch rider details have been refreshed in the Order Tracker.'
      : 'Thank you! An Islamabad support specialist has logged your note. Average WhatsApp & portal response time is under 6 minutes.';
    const agentReply: ChatMsg = {
      id: `a-${Date.now() + 1}`,
      sender: 'agent',
      text: replyText,
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev, customerMsg, agentReply]);
    setChatInput('');
  };

  const createTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !ticketSubject.trim()) return;
    setTickets((prev) => [
      {
        id: `SUP-${404 + prev.length}`,
        customer: custName.trim(),
        city: custCity,
        subject: ticketSubject.trim(),
        orderId: ticketOrder.trim() || 'PK-88412',
        status: 'Open',
        updatedAt: 'Just now',
      },
      ...prev,
    ]);
    setTicketCreated(true);
    setCustName('');
    setTicketSubject('');
    setTicketOrder('');
  };

  const cycleTicketStatus = (id: string) => {
    const order: Ticket['status'][] = ['Open', 'Investigating', 'Resolved'];
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: order[(order.indexOf(t.status) + 1) % order.length], updatedAt: 'Updated now' }
          : t,
      ),
    );
  };

  return (
    <div
      className="min-h-screen bg-[#F4FBF9] text-[#0F172A]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Customer Support"
        clientBrand="SupportSphere"
        categoryLabel="Business Demo 03"
        onBack={onBack}
      />

      <header className="border-b border-teal-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">SupportSphere</span>
              <p className="text-xs text-slate-500">Pakistan Online Shopping Customer Care</p>
            </div>
          </div>

          <div className="inline-flex rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setView('portal')}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                view === 'portal' ? 'bg-teal-600 text-white' : 'text-slate-600'
              }`}
            >
              Customer Help Center
            </button>
            <button
              type="button"
              onClick={() => setView('agent')}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                view === 'agent' ? 'bg-teal-600 text-white' : 'text-slate-600'
              }`}
            >
              Support Agent Dashboard ({tickets.filter((t) => t.status !== 'Resolved').length})
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-10">
        {/* Support Hero Banner with Pakistani Care Team Photography */}
        <section className="grid items-stretch gap-8 rounded-2xl border border-teal-200/70 bg-white p-6 sm:p-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
                SupportSphere Pakistan · Omnichannel Help Desk
              </p>
              <h1
                className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Instant Order Help, COD Verification &amp; Ticket Resolution
              </h1>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                Designed for Pakistani retail brands handling nationwide TCS &amp; Leopards COD
                shipments, size exchanges, and instant JazzCash or Easypaisa refunds.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-xs">
              <div>
                <p className="font-mono text-lg font-bold text-teal-700">6 Mins</p>
                <p className="text-slate-500">Avg Reply SLA</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-slate-900">98.4%</p>
                <p className="text-slate-500">CSAT Score</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-slate-900">120+</p>
                <p className="text-slate-500">PK Cities</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 overflow-hidden rounded-xl border border-teal-100 min-h-[240px]">
            <ResilientImage
              src={DEMO_MEDIA.supportsphereDesk}
              alt="SupportSphere Pakistani customer care specialists assisting callers"
              className="h-full w-full object-cover"
              fallbackLabel="SupportSphere Care Team"
            />
          </div>
        </section>

        {view === 'portal' ? (
          <>
            {/* Order Tracking & Live Chat Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
              <section className="lg:col-span-5 space-y-6">
                <div className="rounded-2xl border border-teal-100 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                    Nationwide COD Tracker
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    Track Order Consignment
                  </h2>
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      aria-label="Order tracking code"
                      value={trackingQuery}
                      onChange={(e) => setTrackingQuery(e.target.value)}
                      placeholder="Try PK-88412 or PK-88419"
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setTrackingQuery('PK-88419')}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap"
                    >
                      Try PK-88419
                    </button>
                  </div>

                  {trackedOrder ? (
                    <div className="mt-4 rounded-xl bg-teal-50/70 border border-teal-100 p-4 text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span className="inline-flex items-center gap-1.5">
                          <Package className="h-3.5 w-3.5 text-teal-700" />
                          {trackedOrder.courier}
                        </span>
                        <span className="font-mono text-teal-800">COD PKR {trackedOrder.codPkr.toLocaleString()}</span>
                      </div>
                      <p className="text-slate-600">{trackedOrder.city}</p>
                      <p className="font-semibold text-teal-800">{trackedOrder.stage}</p>
                      <p className="text-slate-500">ETA: {trackedOrder.eta}</p>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-slate-500">
                      Sample consignment IDs available: <strong>PK-88412</strong> and <strong>PK-88419</strong>.
                    </p>
                  )}
                </div>

                {/* Create Ticket Form */}
                <div className="rounded-2xl border border-teal-100 bg-white p-6">
                  <h2 className="text-base font-bold text-slate-900">Open a Support Ticket</h2>
                  <form onSubmit={createTicket} className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs"
                      />
                      <select
                        value={custCity}
                        onChange={(e) => setCustCity(e.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs"
                      >
                        <option>Lahore</option>
                        <option>Karachi</option>
                        <option>Islamabad</option>
                        <option>Peshawar</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Order ID (e.g. PK-88412)"
                      value={ticketOrder}
                      onChange={(e) => setTicketOrder(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Describe issue (size exchange, COD refund...)"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-teal-600 py-2.5 text-xs font-bold text-white hover:bg-teal-700 cursor-pointer"
                    >
                      Submit Support Ticket
                    </button>
                    {ticketCreated && (
                      <p className="text-xs font-semibold text-teal-700" role="status">
                        Ticket queued! View it live inside the Support Agent Dashboard tab.
                      </p>
                    )}
                  </form>
                </div>
              </section>

              {/* Live Chat Simulation */}
              <section className="lg:col-span-7 flex flex-col rounded-2xl border border-teal-100 bg-white p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-teal-600" />
                    <h2 className="text-base font-bold text-slate-900">
                      Interactive Support Chat Simulation
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-teal-700">Agent: Sana A. (Online Demo)</span>
                </div>

                <div className="my-4 flex-1 space-y-3 overflow-y-auto max-h-[300px] pr-1">
                  {chatMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === 'customer' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                          m.sender === 'customer'
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="mt-1 text-[10px] text-slate-400">{m.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={sendChat} className="flex gap-2 border-t border-slate-100 pt-3">
                  <input
                    type="text"
                    placeholder="Ask about delivery, JazzCash refund, or PK-88412..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs focus:border-teal-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-700 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" /> Send
                  </button>
                </form>
              </section>
            </div>

            {/* Service Guarantee Pillars */}
            <section className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Clock, title: 'Same-Day Ticket Triage', desc: 'Priority escalation for urgent wedding/event orders and courier reroutes.' },
                { icon: ShieldCheck, title: 'Verified Open-Parcel Protection', desc: 'Customer-first inspection guarantee on COD apparel and electronics.' },
                { icon: Headphones, title: 'Bilingual Voice & Chat Support', desc: 'Trained Lahore & Islamabad support coordinators available 9 AM – 11 PM.' },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="rounded-xl border border-teal-100 bg-white p-5">
                    <Icon className="h-5 w-5 text-teal-600" />
                    <h3 className="mt-2.5 text-sm font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{p.desc}</p>
                  </div>
                );
              })}
            </section>

            {/* Support Operations Centres Visual Showcase */}
            <section className="grid gap-6 md:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-teal-100 bg-white">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={DEMO_MEDIA.teamsyncWorkspace}
                    alt="SupportSphere Islamabad customer resolution specialists coordinating courier escalations"
                    className="h-full w-full object-cover"
                    fallbackLabel="Islamabad Operations Hub"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                    Islamabad Sector I-9 Hub
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    Dedicated E-Commerce Escalation &amp; JazzCash Refund Desk
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    Trained resolution specialists coordinate directly with TCS and Leopards dispatch
                    riders for same-day address updates and verified returns.
                  </p>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-teal-100 bg-white">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={DEMO_MEDIA.marketpulseStudio}
                    alt="SupportSphere live SLA monitoring and CSAT reporting war room in Karachi"
                    className="h-full w-full object-cover"
                    fallbackLabel="Karachi SLA Analytics"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                    Karachi Shahrah-e-Faisal Studio
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    Real-Time Ticket Analytics &amp; First-Response SLA Tracking
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    Live queue dashboards keep average reply times under 6 minutes during peak Eid,
                    11.11, and Blessed Friday retail campaigns.
                  </p>
                </div>
              </article>
            </section>

            {/* Searchable FAQ + Feedback */}
            <div className="grid gap-6 lg:grid-cols-12">
              <section className="lg:col-span-7 rounded-2xl border border-teal-100 bg-white p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-900">Frequently Asked Questions</h2>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      placeholder="Filter FAQ..."
                      value={faqQuery}
                      onChange={(e) => setFaqQuery(e.target.value)}
                      className="rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-xs"
                    />
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {filteredFaqs.map((f) => (
                    <div key={f.q} className="py-3">
                      <p className="text-xs font-bold text-slate-900">{f.q}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="lg:col-span-5 rounded-2xl border border-teal-100 bg-white p-6">
                <h2 className="text-base font-bold text-slate-900">Customer Experience Feedback</h2>
                {feedbackSent ? (
                  <div className="mt-4 rounded-xl bg-teal-50 p-4 text-xs text-teal-900">
                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                    <p className="mt-2 font-semibold">
                      Thank you for rating SupportSphere {rating}/5! (Demo confirmation)
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFeedbackSent(true);
                    }}
                    className="mt-4 space-y-3"
                  >
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRating(n)}
                          className={`flex-1 rounded-lg border py-2 text-xs font-bold cursor-pointer ${
                            rating === n
                              ? 'border-teal-600 bg-teal-50 text-teal-800'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {n}/5
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Share quick feedback on courier or agent support..."
                      value={feedbackNote}
                      onChange={(e) => setFeedbackNote(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-slate-900 py-2.5 text-xs font-bold text-white cursor-pointer"
                    >
                      Submit Feedback
                    </button>
                  </form>
                )}
              </section>
            </div>
          </>
        ) : (
          /* Support Agent Dashboard View */
          <section className="rounded-2xl border border-teal-100 bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Support Agent Ticket Queue</h2>
                <p className="text-xs text-slate-500">Click any ticket status button to transition workflow state.</p>
              </div>
              <span className="font-mono text-xs font-bold text-teal-700">
                {tickets.length} Total Tickets
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-3 pr-4">Ticket</th>
                    <th className="py-3 pr-4">Customer · City</th>
                    <th className="py-3 pr-4">Order ID</th>
                    <th className="py-3 pr-4">Subject</th>
                    <th className="py-3 text-right">Workflow Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((t) => (
                    <tr key={t.id}>
                      <td className="py-3 pr-4 font-mono font-bold">{t.id}</td>
                      <td className="py-3 pr-4">
                        {t.customer} · <span className="text-slate-500">{t.city}</span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-teal-700">{t.orderId}</td>
                      <td className="py-3 pr-4 text-slate-700">{t.subject}</td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => cycleTicketStatus(t.id)}
                          className={`rounded-md px-3 py-1 text-[11px] font-bold cursor-pointer ${
                            t.status === 'Resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : t.status === 'Investigating'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {t.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* SupportSphere Footer */}
      <footer className="mt-16 border-t border-teal-200 bg-[#0F2929] text-teal-100">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 text-xs">
          <div className="space-y-2">
            <p className="text-base font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              SupportSphere Pakistan
            </p>
            <p className="text-teal-200/80">
              Omnichannel customer care, order tracking, and COD return automation for e-commerce brands.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-teal-300">Operations Hubs</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-teal-300" /> Sector I-9, Islamabad Tech Corridor</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-teal-300" /> Shahrah-e-Faisal, Karachi</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-teal-300">Help Desk Contact</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-teal-300" /> +92 51 844 2100 (Sample)</p>
            <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-teal-300" /> care@supportsphere.pk (Sample)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
