import React, { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Layers, Mail, MapPin, Phone, Plus, Users } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';

type TaskCol = 'Backlog' | 'In Progress' | 'In Review' | 'Done';

interface AgencyTask {
  id: string;
  title: string;
  project: string;
  assignee: string;
  deadline: string;
  col: TaskCol;
}

const TEAM_MEMBERS = [
  { name: 'Ayesha Siddiqui', role: 'Creative Lead · Lahore', capacity: '88%', tasksDone: 18, specialty: 'Brand Systems & UI' },
  { name: 'Bilal Tariq', role: 'Full-Stack Dev · Islamabad', capacity: '92%', tasksDone: 22, specialty: 'React & Node APIs' },
  { name: 'Zainab Raza', role: 'UI/UX Designer · Karachi', capacity: '76%', tasksDone: 14, specialty: 'Design Tokens & Flows' },
  { name: 'Saad Mahmood', role: 'Motion & Brand · Lahore', capacity: '81%', tasksDone: 16, specialty: 'Showreels & 3D' },
];

const INITIAL_TASKS: AgencyTask[] = [
  {
    id: 'TS-11',
    title: 'Sweet Crumbs Festive Box Landing Wireframe',
    project: 'Bakery Launch Q4',
    assignee: 'Ayesha Siddiqui',
    deadline: '2026-11-18',
    col: 'In Progress',
  },
  {
    id: 'TS-12',
    title: 'BuildCraft PKR Estimator Edge Validation',
    project: 'BuildCraft Web Portal',
    assignee: 'Bilal Tariq',
    deadline: '2026-11-19',
    col: 'In Review',
  },
  {
    id: 'TS-13',
    title: 'GlowNest Packaging Botanical Art Direction',
    project: 'GlowNest Skincare',
    assignee: 'Zainab Raza',
    deadline: '2026-11-22',
    col: 'Backlog',
  },
  {
    id: 'TS-14',
    title: 'Spice Avenue Mobile Menu Contrast Audit',
    project: 'Spice Avenue Redesign',
    assignee: 'Saad Mahmood',
    deadline: '2026-11-15',
    col: 'Done',
  },
];

const COLUMNS: TaskCol[] = ['Backlog', 'In Progress', 'In Review', 'Done'];

const WORKSPACE_PILLARS = [
  { title: '01. Unified Sprint Sprints', desc: 'Client milestones, Kanban stages, and design reviews synced without endless WhatsApp threads.' },
  { title: '02. Multi-City Team Capacity', desc: 'Monitor workload balance across Lahore, Islamabad, and Karachi creative specialists.' },
  { title: '03. Automated Deadline Alerts', desc: 'Surface overdue handoffs 48 hours before launch day.' },
];

export function TeamDemo({ onBack }: { onBack: () => void }) {
  const [tasks, setTasks] = useState<AgencyTask[]>(INITIAL_TASKS);
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('Pakistani D2C Retainer');
  const [newAssignee, setNewAssignee] = useState(TEAM_MEMBERS[0].name);
  const [newDeadline, setNewDeadline] = useState('2026-11-26');
  const [taskAddedNotice, setTaskAddedNotice] = useState(false);

  const completionPct = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter((t) => t.col === 'Done').length / tasks.length) * 100);
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks((prev) => [
      {
        id: `TS-${15 + prev.length}`,
        title: newTitle.trim(),
        project: newProject,
        assignee: newAssignee,
        deadline: newDeadline,
        col: 'Backlog',
      },
      ...prev,
    ]);
    setNewTitle('');
    setTaskAddedNotice(true);
  };

  const advanceTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, col: COLUMNS[(COLUMNS.indexOf(t.col) + 1) % COLUMNS.length] } : t,
      ),
    );
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-slate-900"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Team & Productivity"
        clientBrand="TeamSync"
        categoryLabel="Business Demo 04"
        onBack={onBack}
      />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">TeamSync</span>
              <p className="text-xs text-slate-500">Creative Digital Agency Workspace</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#ts-board" className="hover:text-indigo-600 whitespace-nowrap">Kanban Board</a>
            <a href="#ts-team" className="hover:text-indigo-600 whitespace-nowrap">Team &amp; Studio</a>
            <a href="#ts-calendar" className="hover:text-indigo-600 whitespace-nowrap">Sprint Calendar</a>
          </nav>

          <div className="flex items-center gap-5 text-xs">
            <div>
              <p className="text-slate-500">Sprint Progress</p>
              <p className="font-mono text-base font-bold tabular-nums text-indigo-700">{completionPct}%</p>
            </div>
            <a
              href="#ts-add"
              className="rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 whitespace-nowrap"
            >
              + New Task
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-10">
        {/* Team Collaboration Studio Hero */}
        <section className="grid items-stretch gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                TeamSync · Lahore · Islamabad · Karachi Studios
              </p>
              <h1
                className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Ship Client Campaigns Faster With Zero Sprint Bottlenecks
              </h1>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                Purpose-built for digital agencies and distributed engineering teams to track
                deliverables, monitor utilization across designers and developers, and hit launch
                dates consistently.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-xs">
              <div>
                <p className="font-mono text-lg font-bold text-indigo-700">{tasks.length}</p>
                <p className="text-slate-500">Active Tasks</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-slate-900">4 Specialists</p>
                <p className="text-slate-500">Assigned Crew</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-emerald-700">{completionPct}%</p>
                <p className="text-slate-500">Sprint Done</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 overflow-hidden rounded-xl border border-slate-200 min-h-[240px]">
            <ResilientImage
              src={DEMO_MEDIA.teamsyncWorkspace}
              alt="Pakistani digital product and design team collaborating around laptops"
              className="h-full w-full object-cover"
              fallbackLabel="TeamSync Studio"
            />
          </div>
        </section>

        {/* Quick Task Creation Bar */}
        <section id="ts-add" className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Create &amp; Assign New Sprint Task</h2>
            {taskAddedNotice && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Added to Backlog
              </span>
            )}
          </div>
          <form onSubmit={addTask} className="grid gap-3 sm:grid-cols-12">
            <input
              type="text"
              required
              placeholder="Deliverable title (e.g. Finora Tax Portal Responsive QA)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="sm:col-span-4 rounded-lg border border-slate-200 px-3 py-2 text-xs"
            />
            <input
              type="text"
              placeholder="Client / Sprint Name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              className="sm:col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-xs"
            />
            <select
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
              className="sm:col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-xs"
            >
              {TEAM_MEMBERS.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="sm:col-span-1 rounded-lg border border-slate-200 px-2 py-2 text-xs font-mono"
            />
            <button
              type="submit"
              className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add Task
            </button>
          </form>
        </section>

        {/* Interactive Kanban Columns */}
        <section id="ts-board" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Kanban Board (Click any task card to advance stage)
            </h2>
            <span className="text-xs text-slate-500">4 Workflow Stages</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => {
              const items = tasks.filter((t) => t.col === col);
              return (
                <div key={col} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">{col}</span>
                    <span className="font-mono text-xs text-indigo-600 tabular-nums">{items.length}</span>
                  </div>
                  {items.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => advanceTask(t.id)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-left transition-colors hover:border-indigo-500 cursor-pointer"
                    >
                      <p className="text-[11px] font-semibold text-indigo-600">{t.project}</p>
                      <p className="mt-1 text-xs font-bold text-slate-900">{t.title}</p>
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{t.assignee}</span>
                        <span className="font-mono">{t.deadline}</span>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Profiles & Upcoming Calendar Deadlines */}
        <div className="grid gap-6 lg:grid-cols-12">
          <section id="ts-team" className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Team Member Profiles &amp; Productivity</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {TEAM_MEMBERS.map((m) => (
                <div key={m.name} className="rounded-xl border border-slate-200 p-4 space-y-2">
                  <p className="text-sm font-bold text-slate-900">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.role}</p>
                  <p className="text-[11px] font-medium text-indigo-700">{m.specialty}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono tabular-nums">
                    <span className="text-indigo-700 font-semibold">{m.capacity} Utilization</span>
                    <span className="text-slate-600">{m.tasksDone} Closed</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="ts-calendar" className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Sprint Calendar &amp; Deadlines</h2>
            </div>
            <ul className="divide-y divide-slate-100 text-xs">
              {tasks.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{t.title}</p>
                    <p className="text-slate-500">{t.assignee} · {t.col}</p>
                  </div>
                  <span className="font-mono font-bold text-indigo-700 whitespace-nowrap">{t.deadline}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Workspace Highlights + Studio Showcase */}
        <section className="grid gap-5 md:grid-cols-3">
          {WORKSPACE_PILLARS.map((w) => (
            <div key={w.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900">{w.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{w.desc}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-[16/9] overflow-hidden bg-slate-100">
              <ResilientImage
                src={DEMO_MEDIA.marketpulseStudio}
                alt="TeamSync creative review session in Lahore product studio"
                className="h-full w-full object-cover"
                fallbackLabel="Design Review Studio"
              />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                Lahore Creative Floor
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                Design Critiques &amp; Weekly Client Demo Sign-Offs
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Keep Figma prototypes, copy feedback, and launch checklists tied directly to Kanban tasks.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-[16/9] overflow-hidden bg-slate-100">
              <ResilientImage
                src={DEMO_MEDIA.edusphereCampusLab}
                alt="TeamSync engineering sprint pairing session at Islamabad NSTP"
                className="h-full w-full object-cover"
                fallbackLabel="Engineering Sprint Pod"
              />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                Islamabad Engineering Pod
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                Synchronized Full-Stack Milestones &amp; QA Audits
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Real-time sprint burnup visibility across React, API, and QA specialists in every city.
              </p>
            </div>
          </article>
        </section>
      </div>

      {/* TeamSync Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 text-xs">
          <div className="space-y-2">
            <p className="text-base font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              TeamSync Workspace
            </p>
            <p className="text-slate-400">
              Built for Pakistani software teams, creative studios, and cross-city product agencies.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-indigo-400">Studio Offices</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-indigo-400" /> Arfa Software Tech Park, Lahore</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-indigo-400" /> National Science &amp; Tech Park, Islamabad</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-indigo-400">Enterprise Support</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-indigo-400" /> +92 42 3590 7700 (Sample)</p>
            <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-indigo-400" /> hello@teamsync.pk (Sample)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
