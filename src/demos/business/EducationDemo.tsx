import React, { useMemo, useState } from 'react';
import { BookOpen, CalendarDays, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';

interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrolled: boolean;
  lessons: { id: string; title: string; completed: boolean }[];
}

interface CampusEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  type: 'Workshop' | 'Live Q&A' | 'Bootcamp';
  seatsLeft: number;
  registered: boolean;
}

const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'Design Systems & Accessible UI Architecture',
    instructor: 'Dr. Clara Vance',
    level: 'Intermediate',
    duration: '6 Weeks',
    enrolled: true,
    lessons: [
      { id: 'l1', title: '01. Semantic Token Foundations & Color Contrast', completed: true },
      { id: 'l2', title: '02. Multi-Brand Component Primitives', completed: true },
      { id: 'l3', title: '03. Keyboard Navigation & ARIA Patterns', completed: false },
      { id: 'l4', title: '04. Automated Visual Regression Workflows', completed: false },
    ],
  },
  {
    id: 'c2',
    title: 'Applied TypeScript for Web Applications',
    instructor: 'Prof. Tariq Mahmood',
    level: 'Beginner',
    duration: '4 Weeks',
    enrolled: true,
    lessons: [
      { id: 'l5', title: '01. Strict Types, Unions & Type Narrowing', completed: true },
      { id: 'l6', title: '02. Generics & Reusable State Hooks', completed: false },
      { id: 'l7', title: '03. API Contracts & Schema Validation', completed: false },
    ],
  },
  {
    id: 'c3',
    title: '3D WebGL Storytelling with Three.js',
    instructor: 'Hana Takahashi',
    level: 'Advanced',
    duration: '5 Weeks',
    enrolled: false,
    lessons: [
      { id: 'l8', title: '01. PBR Materials & Studio Lighting Rigs', completed: false },
      { id: 'l9', title: '02. Procedural Geometry & Camera Damping', completed: false },
      { id: 'l10', title: '03. Performance Budgets on Mobile GPUs', completed: false },
    ],
  },
];

const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'ev1',
    date: 'Nov 19, 2026',
    time: '06:00 PM EST',
    title: 'Live Critique: Portfolio Case Studies That Win Clients',
    type: 'Workshop',
    seatsLeft: 18,
    registered: false,
  },
  {
    id: 'ev2',
    date: 'Nov 24, 2026',
    time: '01:00 PM EST',
    title: 'Instructor Office Hours: React & TypeScript Architecture',
    type: 'Live Q&A',
    seatsLeft: 32,
    registered: true,
  },
  {
    id: 'ev3',
    date: 'Dec 03, 2026',
    time: '10:00 AM EST',
    title: 'Weekend Intensive: Shipping Accessible SaaS Dashboards',
    type: 'Bootcamp',
    seatsLeft: 9,
    registered: false,
  },
];

export function EducationDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'dashboard' | 'courses' | 'events'>('dashboard');
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [levelFilter, setLevelFilter] = useState<'All' | CourseItem['level']>('All');
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('ev1');
  const [regConfirmed, setRegConfirmed] = useState<string | null>(null);

  const enrolledCourses = useMemo(() => courses.filter((c) => c.enrolled), [courses]);

  const overallProgress = useMemo(() => {
    const allLessons = enrolledCourses.flatMap((c) => c.lessons);
    if (allLessons.length === 0) return 0;
    const completed = allLessons.filter((l) => l.completed).length;
    return Math.round((completed / allLessons.length) * 100);
  }, [enrolledCourses]);

  const filteredCourses = useMemo(
    () => courses.filter((c) => levelFilter === 'All' || c.level === levelFilter),
    [courses, levelFilter],
  );

  const toggleLesson = (courseId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              lessons: c.lessons.map((l) =>
                l.id === lessonId ? { ...l, completed: !l.completed } : l,
              ),
            }
          : c,
      ),
    );
  };

  const toggleEnroll = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: !c.enrolled } : c)),
    );
  };

  const handleEventRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === selectedEventId && !ev.registered
          ? { ...ev, registered: true, seatsLeft: Math.max(0, ev.seatsLeft - 1) }
          : ev,
      ),
    );
    const evObj = events.find((ev) => ev.id === selectedEventId);
    setRegConfirmed(`Seat reserved (Demo) for ${regName.trim()} in "${evObj?.title}".`);
    setRegName('');
    setRegEmail('');
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#1E1B4B]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Education & Events Hub"
        clientBrand="Luminary Academy"
        categoryLabel="Growth"
        onBack={onBack}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-indigo-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Luminary Learning Portal
            </p>
            <h1
              className="mt-1 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Student Dashboard, Courses &amp; Events
            </h1>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl border border-indigo-100 bg-white p-1">
            {(
              [
                { id: 'dashboard', label: 'Student Progress', icon: GraduationCap },
                { id: 'courses', label: 'Course Catalog', icon: BookOpen },
                { id: 'events', label: 'Event Calendar', icon: CalendarDays },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold cursor-pointer ${
                    tab === item.id ? 'bg-[#1E1B4B] text-white' : 'text-slate-600'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STUDENT DASHBOARD */}
        {tab === 'dashboard' && (
          <div className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-indigo-100 bg-white p-5">
                <p className="text-xs font-medium text-slate-500">Enrolled Courses</p>
                <p className="mt-1.5 text-2xl font-bold tabular-nums">{enrolledCourses.length}</p>
              </div>
              <div className="rounded-xl border border-indigo-100 bg-white p-5">
                <p className="text-xs font-medium text-slate-500">Overall Completion</p>
                <p className="mt-1.5 text-2xl font-bold tabular-nums text-amber-700">
                  {overallProgress}%
                </p>
              </div>
              <div className="rounded-xl border border-indigo-100 bg-white p-5">
                <p className="text-xs font-medium text-slate-500">Upcoming Live Sessions</p>
                <p className="mt-1.5 text-2xl font-bold tabular-nums">
                  {events.filter((e) => e.registered).length} Registered
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {enrolledCourses.map((course) => {
                const doneCount = course.lessons.filter((l) => l.completed).length;
                const pct = Math.round((doneCount / course.lessons.length) * 100);
                return (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-indigo-100 bg-white p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-amber-700">
                          {course.level} · {course.instructor}
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-[#1E1B4B]">{course.title}</h2>
                      </div>
                      <span className="font-mono text-sm font-bold tabular-nums text-indigo-900">
                        {doneCount}/{course.lessons.length} Lessons ({pct}%)
                      </span>
                    </div>

                    <div className="mt-3 h-2 rounded-full bg-indigo-50">
                      <div
                        className="h-full rounded-full bg-amber-600 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <ul className="mt-4 space-y-2">
                      {course.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <label className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/70 px-3.5 py-2.5 text-sm cursor-pointer hover:bg-indigo-50/40">
                            <input
                              type="checkbox"
                              checked={lesson.completed}
                              onChange={() => toggleLesson(course.id, lesson.id)}
                              className="h-4 w-4 accent-[#1E1B4B]"
                            />
                            <span
                              className={
                                lesson.completed ? 'line-through text-slate-400' : 'text-slate-800'
                              }
                            >
                              {lesson.title}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* COURSE CATALOG */}
        {tab === 'courses' && (
          <div className="mt-8 space-y-5">
            <div className="flex flex-wrap gap-2">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-[#1E1B4B] text-white'
                      : 'border border-indigo-100 bg-white text-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {filteredCourses.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-indigo-100 bg-white p-6 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-amber-700">
                      {c.level} · {c.duration}
                    </p>
                    <h2 className="mt-2 text-lg font-bold">{c.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">Instructor: {c.instructor}</p>
                    <p className="mt-3 text-xs text-slate-600">
                      {c.lessons.length} structured modules with hands-on assignments.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleEnroll(c.id)}
                    className={`mt-6 w-full rounded-lg py-2.5 text-xs font-semibold cursor-pointer ${
                      c.enrolled
                        ? 'border border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'bg-[#1E1B4B] text-white hover:bg-indigo-900'
                    }`}
                  >
                    {c.enrolled ? 'Enrolled (Click to Unenroll)' : 'Enroll in Course'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS & REGISTRATION */}
        {tab === 'events' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <h2 className="text-base font-bold">Upcoming Academy Calendar</h2>
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-xl border border-indigo-100 bg-white p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-amber-700">
                      {ev.type} · {ev.date} · {ev.time}
                    </p>
                    <h3 className="mt-1 text-base font-bold">{ev.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Users className="h-3.5 w-3.5" /> {ev.seatsLeft} seats remaining
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold whitespace-nowrap ${
                      ev.registered ? 'text-emerald-700' : 'text-indigo-900'
                    }`}
                  >
                    {ev.registered ? 'Registered ✓' : 'Open for RSVP'}
                  </span>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleEventRegister}
              className="rounded-2xl border border-indigo-100 bg-white p-6 space-y-4 lg:col-span-5 self-start"
            >
              <h2 className="text-base font-bold">Event Registration (Demo)</h2>
              <div>
                <label htmlFor="edu-ev" className="block text-xs font-semibold text-slate-700">
                  Select Event
                </label>
                <select
                  id="edu-ev"
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.date})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="edu-name" className="block text-xs font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  id="edu-name"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Amina Rahman"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="edu-email" className="block text-xs font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  id="edu-email"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="amina@university.edu"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#1E1B4B] py-2.5 text-xs font-semibold text-white hover:bg-indigo-900 cursor-pointer"
              >
                Confirm Registration
              </button>

              {regConfirmed && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{regConfirmed}</span>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
