import React, { useMemo, useState } from 'react';
import { Calendar, CheckSquare, Kanban, Plus, Users, X } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';

type TaskCol = 'Backlog' | 'In Progress' | 'Review' | 'Done';

interface TeamTask {
  id: string;
  title: string;
  project: string;
  assignee: string;
  priority: 'Urgent' | 'Normal';
  column: TaskCol;
}

const COLUMNS: TaskCol[] = ['Backlog', 'In Progress', 'Review', 'Done'];

const INITIAL_TASKS: TeamTask[] = [
  {
    id: 't1',
    title: 'Finalize Q4 design token audit',
    project: 'Core Design System',
    assignee: 'Amina K.',
    priority: 'Urgent',
    column: 'In Progress',
  },
  {
    id: 't2',
    title: 'Ship OAuth token rotation handler',
    project: 'Platform Security',
    assignee: 'Marcus R.',
    priority: 'Urgent',
    column: 'Review',
  },
  {
    id: 't3',
    title: 'Write onboarding empty-state copy',
    project: 'Mobile App v3',
    assignee: 'Sofia L.',
    priority: 'Normal',
    column: 'Backlog',
  },
  {
    id: 't4',
    title: 'Benchmark checkout API p95 latency',
    project: 'Platform Security',
    assignee: 'Marcus R.',
    priority: 'Normal',
    column: 'Done',
  },
];

const TEAM_MEMBERS = [
  { name: 'Amina Khalid', role: 'Lead Product Designer', load: 78, activeTasks: 4 },
  { name: 'Marcus Reed', role: 'Staff Backend Engineer', load: 85, activeTasks: 5 },
  { name: 'Sofia Lind', role: 'UX Content Strategist', load: 62, activeTasks: 3 },
  { name: 'Daniel Cho', role: 'Frontend Architect', load: 71, activeTasks: 4 },
];

export function TeamDemo({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'board' | 'team' | 'calendar'>('board');
  const [tasks, setTasks] = useState<TeamTask[]>(INITIAL_TASKS);
  const [todos, setTodos] = useState([
    { id: 'td1', text: 'Review sprint velocity notes before 2 PM standup', done: false },
    { id: 'td2', text: 'Approve Figma component library release v2.4', done: true },
    { id: 'td3', text: 'Share Q4 roadmap slides with stakeholders', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const [events, setEvents] = useState([
    { id: 'ev1', day: 'Mon, Nov 16', time: '10:00 AM', title: 'Sprint Planning · Core System' },
    { id: 'ev2', day: 'Wed, Nov 18', time: '02:00 PM', title: 'Design Critique & QA Sync' },
    { id: 'ev3', day: 'Fri, Nov 20', time: '04:00 PM', title: 'Release Readiness Review' },
  ]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDay, setEventDay] = useState('Thu, Nov 19');

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskProject, setTaskProject] = useState('Core Design System');
  const [taskAssignee, setTaskAssignee] = useState('Amina K.');

  const projectProgress = useMemo(() => {
    const projects = ['Core Design System', 'Platform Security', 'Mobile App v3'];
    return projects.map((proj) => {
      const list = tasks.filter((t) => t.project === proj);
      const done = list.filter((t) => t.column === 'Done').length;
      const pct = list.length > 0 ? Math.round((done / list.length) * 100) : 0;
      return { name: proj, total: list.length, done, pct };
    });
  }, [tasks]);

  const moveTask = (id: string, col: TaskCol) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column: col } : t)));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setTasks((prev) => [
      {
        id: `t-${Date.now()}`,
        title: taskTitle.trim(),
        project: taskProject,
        assignee: taskAssignee,
        priority: 'Normal',
        column: 'Backlog',
      },
      ...prev,
    ]);
    setTaskTitle('');
    setShowAddTask(false);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos((prev) => [{ id: `td-${Date.now()}`, text: newTodo.trim(), done: false }, ...prev]);
    setNewTodo('');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    setEvents((prev) => [
      ...prev,
      { id: `ev-${Date.now()}`, day: eventDay, time: '11:00 AM', title: eventTitle.trim() },
    ]);
    setEventTitle('');
  };

  return (
    <div
      className="min-h-screen bg-[#0B0F17] text-[#E2E8F0]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Team & Productivity Workspace"
        clientBrand="Linearity Flow"
        categoryLabel="Business Systems"
        onBack={onBack}
        theme="dark"
      />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Linearity Workspace
            </p>
            <h1
              className="mt-1 text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Sprint Board &amp; Team Operations
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg border border-slate-800 bg-[#141A24] p-1">
              {(
                [
                  { id: 'board', label: 'Kanban & Tasks', icon: Kanban },
                  { id: 'team', label: 'Team & Progress', icon: Users },
                  { id: 'calendar', label: 'Calendar & To-Do', icon: Calendar },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setView(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                      view === item.id
                        ? 'bg-sky-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setShowAddTask(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-sky-400 cursor-pointer whitespace-nowrap"
            >
              <Plus className="h-3.5 w-3.5" /> Add Task
            </button>
          </div>
        </div>

        {/* KANBAN BOARD */}
        {view === 'board' && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((col) => {
              const colTasks = tasks.filter((t) => t.column === col);
              return (
                <div
                  key={col}
                  className="rounded-xl border border-slate-800 bg-[#111722] p-4 flex flex-col"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-bold text-white">{col}</h2>
                    <span className="font-mono text-xs tabular-nums text-sky-400">
                      {colTasks.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {colTasks.map((t) => (
                      <div
                        key={t.id}
                        className="rounded-lg border border-slate-800 bg-[#171F2E] p-4"
                      >
                        <p className="text-[11px] font-semibold text-sky-400">{t.project}</p>
                        <h3 className="mt-1 text-sm font-semibold text-white">{t.title}</h3>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                          <span>{t.assignee}</span>
                          <span
                            className={
                              t.priority === 'Urgent' ? 'text-amber-400 font-semibold' : ''
                            }
                          >
                            {t.priority}
                          </span>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-slate-800">
                          <label htmlFor={`task-col-${t.id}`} className="sr-only">
                            Move {t.title} column
                          </label>
                          <select
                            id={`task-col-${t.id}`}
                            value={t.column}
                            onChange={(e) => moveTask(t.id, e.target.value as TaskCol)}
                            className="w-full rounded border border-slate-700 bg-[#0B0F17] px-2 py-1 text-xs text-slate-200"
                          >
                            {COLUMNS.map((c) => (
                              <option key={c} value={c}>
                                Column: {c}
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

        {/* TEAM & PROJECT PROGRESS */}
        {view === 'team' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="rounded-xl border border-slate-800 bg-[#141A24] p-5"
                >
                  <h2 className="text-base font-bold text-white">{member.name}</h2>
                  <p className="text-xs text-sky-400">{member.role}</p>
                  <div className="mt-4 flex justify-between text-xs text-slate-400">
                    <span>Sprint Capacity</span>
                    <span className="tabular-nums text-white font-semibold">{member.load}%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{ width: `${member.load}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Assigned items: <strong className="text-white">{member.activeTasks}</strong>
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#141A24] p-6 lg:col-span-5">
              <h2 className="text-base font-bold text-white">Live Project Completion</h2>
              <p className="mt-1 text-xs text-slate-400">
                Updates dynamically as Kanban tasks move to Done.
              </p>
              <div className="mt-6 space-y-5">
                {projectProgress.map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-white">{p.name}</span>
                      <span className="font-mono text-xs tabular-nums text-sky-400">
                        {p.done}/{p.total} ({p.pct}%)
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CALENDAR & PERSONAL TO-DO */}
        {view === 'calendar' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="rounded-xl border border-slate-800 bg-[#141A24] p-6 lg:col-span-7">
              <h2 className="text-base font-bold text-white">Shared Sprint Calendar</h2>
              <form onSubmit={handleAddEvent} className="mt-4 flex flex-wrap gap-2">
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Schedule milestone or review..."
                  aria-label="New calendar event title"
                  className="flex-1 rounded-lg border border-slate-700 bg-[#0B0F17] px-3 py-2 text-sm text-white"
                />
                <select
                  aria-label="Event day"
                  value={eventDay}
                  onChange={(e) => setEventDay(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-[#0B0F17] px-3 py-2 text-sm text-white"
                >
                  <option>Mon, Nov 16</option>
                  <option>Tue, Nov 17</option>
                  <option>Wed, Nov 18</option>
                  <option>Thu, Nov 19</option>
                  <option>Fri, Nov 20</option>
                </select>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-sky-400 cursor-pointer"
                >
                  Add Event
                </button>
              </form>

              <ul className="mt-5 divide-y divide-slate-800">
                {events.map((ev) => (
                  <li key={ev.id} className="flex items-center justify-between py-3.5 text-sm">
                    <div>
                      <p className="font-semibold text-white">{ev.title}</p>
                      <p className="text-xs text-sky-400">{ev.day}</p>
                    </div>
                    <span className="font-mono text-xs text-slate-400">{ev.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#141A24] p-6 lg:col-span-5">
              <h2 className="flex items-center gap-2 text-base font-bold text-white">
                <CheckSquare className="h-4 w-4 text-sky-400" /> Personal To-Do List
              </h2>
              <form onSubmit={handleAddTodo} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add personal reminder..."
                  aria-label="New personal to-do"
                  className="flex-1 rounded-lg border border-slate-700 bg-[#0B0F17] px-3 py-2 text-sm text-white"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-slate-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-600 cursor-pointer"
                >
                  Add
                </button>
              </form>
              <ul className="mt-4 space-y-2.5">
                {todos.map((td) => (
                  <li key={td.id}>
                    <label className="flex items-center gap-3 rounded-lg border border-slate-800 bg-[#0B0F17] p-3 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={td.done}
                        onChange={() =>
                          setTodos((prev) =>
                            prev.map((x) => (x.id === td.id ? { ...x, done: !x.done } : x)),
                          )
                        }
                        className="h-4 w-4 accent-sky-500"
                      />
                      <span className={td.done ? 'line-through text-slate-500' : 'text-slate-200'}>
                        {td.text}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowAddTask(false)}
        >
          <form
            onSubmit={handleCreateTask}
            className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-[#141A24] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">New Workspace Task</h3>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowAddTask(false)}
                className="rounded p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label htmlFor="tm-title" className="block text-xs font-semibold text-slate-300">
                Task Title
              </label>
              <input
                id="tm-title"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Implement mobile navigation drawer"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-[#0B0F17] px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="tm-proj" className="block text-xs font-semibold text-slate-300">
                  Project
                </label>
                <select
                  id="tm-proj"
                  value={taskProject}
                  onChange={(e) => setTaskProject(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-[#0B0F17] px-3 py-2 text-sm text-white"
                >
                  <option>Core Design System</option>
                  <option>Platform Security</option>
                  <option>Mobile App v3</option>
                </select>
              </div>
              <div>
                <label htmlFor="tm-assign" className="block text-xs font-semibold text-slate-300">
                  Assignee
                </label>
                <select
                  id="tm-assign"
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-[#0B0F17] px-3 py-2 text-sm text-white"
                >
                  <option>Amina K.</option>
                  <option>Marcus R.</option>
                  <option>Sofia L.</option>
                  <option>Daniel C.</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-sky-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-sky-400 cursor-pointer"
            >
              Create Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
