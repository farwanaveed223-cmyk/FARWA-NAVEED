import React, { useMemo, useState } from 'react';
import { HelpCircle, MessageSquare, Plus, Search, Send, Star, Ticket } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';

type TicketStatus = 'Open' | 'In Progress' | 'Resolved';

interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  priority: 'High' | 'Medium' | 'Low';
  status: TicketStatus;
  updated: string;
}

interface ChatMsg {
  id: string;
  sender: 'customer' | 'agent';
  text: string;
  time: string;
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TK-1048',
    subject: 'SSO SAML metadata certificate renewal',
    customer: 'Kestrel Partners',
    priority: 'High',
    status: 'Open',
    updated: '12m ago',
  },
  {
    id: 'TK-1047',
    subject: 'Export monthly invoice batch as CSV',
    customer: 'Harborview Retail',
    priority: 'Medium',
    status: 'In Progress',
    updated: '42m ago',
  },
  {
    id: 'TK-1046',
    subject: 'Add 6 team member seats to workspace',
    customer: 'Silveroak Media',
    priority: 'Low',
    status: 'Resolved',
    updated: '3h ago',
  },
];

const FAQS = [
  {
    q: 'How do I update billing contacts or download VAT receipts?',
    a: 'Navigate to Workspace Settings -> Billing Contacts. All paid invoices generate downloadable PDFs automatically.',
  },
  {
    q: 'What is the SLA response time for Priority High tickets?',
    a: 'Enterprise workspaces receive a guaranteed first response within 30 minutes, 24/7.',
  },
  {
    q: 'Can we enable two-factor authentication across all staff accounts?',
    a: 'Yes. Security Administrators can enforce TOTP or SAML SSO from Security -> Authentication Policy.',
  },
  {
    q: 'How long are support chat transcripts archived?',
    a: 'All ticket threads and live chat transcripts are retained for 36 months with full audit exports.',
  },
];

export function SupportDemo({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState<'tickets' | 'chat' | 'faq' | 'feedback'>('tickets');
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [statusFilter, setStatusFilter] = useState<'All' | TicketStatus>('All');

  const [newSubject, setNewSubject] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'customer',
      text: 'Hi! Our team is seeing a 403 error when importing our Q4 contacts CSV.',
      time: '10:14 AM',
    },
    {
      id: 'm2',
      sender: 'agent',
      text: 'Hello! I can help with that right away. Does the CSV file include the required email header column?',
      time: '10:15 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const [faqQuery, setFaqQuery] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const [rating, setRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackList, setFeedbackList] = useState([
    { id: 'f1', author: 'Hannah M.', rating: 5, comment: 'Resolved our SSO certificate in under 15 minutes.' },
    { id: 'f2', author: 'Devon G.', rating: 4, comment: 'Clear step-by-step instructions from the support engineer.' },
  ]);

  const filteredTickets = useMemo(
    () => tickets.filter((t) => statusFilter === 'All' || t.status === statusFilter),
    [tickets, statusFilter],
  );

  const filteredFaqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    return FAQS.filter(
      (f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    );
  }, [faqQuery]);

  const avgCsat = useMemo(() => {
    if (feedbackList.length === 0) return '5.0';
    const sum = feedbackList.reduce((acc, f) => acc + f.rating, 0);
    return (sum / feedbackList.length).toFixed(1);
  }, [feedbackList]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newCustomer.trim()) return;
    setTickets((prev) => [
      {
        id: `TK-${1049 + prev.length}`,
        subject: newSubject.trim(),
        customer: newCustomer.trim(),
        priority: newPriority,
        status: 'Open',
        updated: 'Just now',
      },
      ...prev,
    ]);
    setNewSubject('');
    setNewCustomer('');
  };

  const handleStatusChange = (id: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, updated: 'Just now' } : t)),
    );
  };

  const sendChatMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const agentMsg: ChatMsg = {
      id: `m-${Date.now()}`,
      sender: 'agent',
      text: trimmed,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, agentMsg]);
    setChatInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-reply-${Date.now()}`,
          sender: 'customer',
          text: 'Thanks! Just tested that and the import succeeded cleanly.',
          time: 'Simulated reply',
        },
      ]);
    }, 350);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) return;
    setFeedbackList((prev) => [
      { id: `f-${Date.now()}`, author: 'Demo Visitor', rating, comment: feedbackComment.trim() },
      ...prev,
    ]);
    setFeedbackComment('');
  };

  return (
    <div
      className="min-h-screen bg-[#F9FAFB] text-[#1E293B]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Customer Support Desk"
        clientBrand="Helios Desk"
        categoryLabel="Business Systems"
        onBack={onBack}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Helios Service Suite
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Customer Support &amp; Help Center
            </h1>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-1">
            {(
              [
                { id: 'tickets', label: 'Ticket Queue', icon: Ticket },
                { id: 'chat', label: 'Live Chat', icon: MessageSquare },
                { id: 'faq', label: 'Searchable FAQ', icon: HelpCircle },
                { id: 'feedback', label: 'CSAT Feedback', icon: Star },
              ] as const
            ).map((tabItem) => {
              const Icon = tabItem.icon;
              return (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => setSection(tabItem.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    section === tabItem.id
                      ? 'bg-teal-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tabItem.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TICKET QUEUE */}
        {section === 'tickets' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <form
                onSubmit={handleCreateTicket}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-4"
              >
                <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <Plus className="h-4 w-4 text-teal-700" /> Create Support Ticket
                </h2>
                <div>
                  <label htmlFor="tk-subj" className="block text-xs font-semibold text-slate-700">
                    Subject
                  </label>
                  <input
                    id="tk-subj"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Billing invoice discrepancy"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="tk-cust" className="block text-xs font-semibold text-slate-700">
                    Customer Account
                  </label>
                  <input
                    id="tk-cust"
                    required
                    value={newCustomer}
                    onChange={(e) => setNewCustomer(e.target.value)}
                    placeholder="Northbridge Corp"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="tk-pri" className="block text-xs font-semibold text-slate-700">
                    Priority
                  </label>
                  <select
                    id="tk-pri"
                    value={newPriority}
                    onChange={(e) =>
                      setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-teal-700 py-2.5 text-xs font-semibold text-white hover:bg-teal-800 cursor-pointer"
                >
                  Submit Ticket
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-bold text-slate-900">
                  Active Queue ({filteredTickets.length})
                </h2>
                <div className="flex gap-1.5">
                  {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                        statusFilter === st
                          ? 'bg-slate-900 text-white'
                          : 'border border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {filteredTickets.map((tk) => (
                  <div
                    key={tk.id}
                    className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-semibold text-teal-700">{tk.id}</span>
                        <span>·</span>
                        <span>{tk.customer}</span>
                        <span>·</span>
                        <span
                          className={`font-semibold ${
                            tk.priority === 'High'
                              ? 'text-red-700'
                              : tk.priority === 'Medium'
                                ? 'text-amber-700'
                                : 'text-slate-600'
                          }`}
                        >
                          {tk.priority} Priority
                        </span>
                      </div>
                      <h3 className="mt-1 text-sm font-bold text-slate-900">{tk.subject}</h3>
                      <p className="mt-0.5 text-xs text-slate-400">Updated {tk.updated}</p>
                    </div>

                    <div className="shrink-0">
                      <label htmlFor={`tk-st-${tk.id}`} className="sr-only">
                        Ticket {tk.id} status
                      </label>
                      <select
                        id={`tk-st-${tk.id}`}
                        value={tk.status}
                        onChange={(e) =>
                          handleStatusChange(tk.id, e.target.value as TicketStatus)
                        }
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800"
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIVE CHAT SIMULATION */}
        {section === 'chat' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-8 flex flex-col h-[480px]">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Chat with Maya Lin (Harborview Retail)
                  </h2>
                  <p className="text-xs text-slate-500">Simulated interactive support conversation</p>
                </div>
                <span className="text-xs font-semibold text-teal-700">Active Session</span>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'agent' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === 'agent'
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="mt-1 text-[11px] text-slate-400">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendChatMessage(chatInput);
                }}
                className="mt-2 flex gap-2 border-t border-slate-100 pt-3"
              >
                <input
                  type="text"
                  aria-label="Reply to customer"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a support reply..."
                  className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-teal-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" /> Send
                </button>
              </form>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Quick Macro Replies</h3>
              {[
                'Ensure the CSV uses UTF-8 encoding and includes an "email" column header.',
                'I have refreshed your workspace import permissions—please retry now.',
                'Would you like me to escalate this to an integrations specialist?',
              ].map((macro) => (
                <button
                  key={macro}
                  type="button"
                  onClick={() => sendChatMessage(macro)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-left text-xs text-slate-700 hover:border-teal-600 cursor-pointer"
                >
                  {macro}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SEARCHABLE FAQ */}
        {section === 'faq' && (
          <div className="mt-8 max-w-3xl space-y-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                placeholder="Search help articles (billing, SLA, SSO, archive)..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {filteredFaqs.map((faq, idx) => (
                <div key={faq.q} className="p-5">
                  <button
                    type="button"
                    aria-expanded={openFaqIdx === idx}
                    onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                    className="flex w-full items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-teal-700">{openFaqIdx === idx ? '−' : '+'}</span>
                  </button>
                  {openFaqIdx === idx && (
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK */}
        {section === 'feedback' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleSubmitFeedback}
              className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 lg:col-span-5"
            >
              <h2 className="text-base font-bold text-slate-900">Rate Support Experience</h2>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} stars`}
                    onClick={() => setRating(star)}
                    className={`rounded-lg border px-3 py-2 text-xs font-bold cursor-pointer ${
                      rating >= star
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-slate-200 text-slate-400'
                    }`}
                  >
                    {star} ★
                  </button>
                ))}
              </div>
              <div>
                <label htmlFor="csat-note" className="block text-xs font-semibold text-slate-700">
                  Feedback Notes
                </label>
                <textarea
                  id="csat-note"
                  rows={3}
                  required
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Share how our support team performed..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-teal-700 py-2.5 text-xs font-semibold text-white hover:bg-teal-800 cursor-pointer"
              >
                Submit Feedback (Demo)
              </button>
            </form>

            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Average CSAT Score</span>
                <span className="text-2xl font-bold tabular-nums text-teal-700">{avgCsat} / 5.0</span>
              </div>
              <div className="space-y-3">
                {feedbackList.map((fb) => (
                  <div key={fb.id} className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{fb.author}</span>
                      <span className="font-semibold text-amber-600">{fb.rating} / 5 ★</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{fb.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
