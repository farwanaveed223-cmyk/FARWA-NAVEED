import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Phone,
  Users,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr } from '../../utils/demoLogic';

interface Course {
  id: string;
  title: string;
  track: 'Computer Science' | 'Web Development' | 'Python' | 'AI & Technology';
  duration: string;
  feePkr: number;
  instructor: string;
  campus: string;
  image: string;
}

const COURSES: Course[] = [
  {
    id: 'EDU-CS',
    title: 'BS Foundations: Algorithms & Systems Design',
    track: 'Computer Science',
    duration: '16 Weeks',
    feePkr: 48000,
    instructor: 'Dr. Usman Farooq',
    campus: 'Lahore & Live Hybrid',
    image: DEMO_MEDIA.edusphereCampusLab,
  },
  {
    id: 'EDU-WEB',
    title: 'Full-Stack Web Development (React, TypeScript & Node)',
    track: 'Web Development',
    duration: '14 Weeks',
    feePkr: 42000,
    instructor: 'Engr. Kamran Ali',
    campus: 'Islamabad & Online',
    image: DEMO_MEDIA.teamsyncWorkspace,
  },
  {
    id: 'EDU-PY',
    title: 'Python Programming & Backend Automation',
    track: 'Python',
    duration: '10 Weeks',
    feePkr: 32000,
    instructor: 'Prof. Sana Javed',
    campus: 'Lahore Gulberg Campus',
    image: DEMO_MEDIA.marketpulseStudio,
  },
  {
    id: 'EDU-AI',
    title: 'Applied Artificial Intelligence & Machine Learning',
    track: 'AI & Technology',
    duration: '16 Weeks',
    feePkr: 58000,
    instructor: 'Dr. Usman Farooq',
    campus: 'Islamabad F-8 & Online',
    image: DEMO_MEDIA.nexatechSpatialLab,
  },
];

const FACULTY = [
  { name: 'Dr. Usman Farooq', title: 'Dean of AI & Computer Science', cred: 'PhD CS (NUST) · 12 Years Teaching' },
  { name: 'Engr. Kamran Ali', title: 'Head of Full-Stack Engineering', cred: 'Ex-Systems Architect · 9 Years Industry' },
  { name: 'Prof. Sana Javed', title: 'Lead Python & Data Instructor', cred: 'MS Data Science (LUMS) · 8 Years' },
];

const SCHEDULE = [
  { day: 'Monday & Wednesday', time: '6:30 PM – 8:30 PM', course: 'Full-Stack Web Development', room: 'Lab 02 · Lahore' },
  { day: 'Tuesday & Thursday', time: '7:00 PM – 9:00 PM', course: 'Python Programming', room: 'Zoom + Lab 01' },
  { day: 'Saturday', time: '11:00 AM – 2:30 PM', course: 'Applied AI & Machine Learning', room: 'Auditorium B · Islamabad' },
];

const INITIAL_MODULES = [
  { id: 'm1', title: 'Week 01: Memory Models, Data Structures & Complexity', done: true },
  { id: 'm2', title: 'Week 02: Python FastAPI & REST Architecture', done: true },
  { id: 'm3', title: 'Week 03: React TypeScript State Systems', done: false },
  { id: 'm4', title: 'Week 04: Capstone AI Pipeline Deployment', done: false },
];

export function EducationDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'portal' | 'student'>('portal');
  const [trackFilter, setTrackFilter] = useState<string>('All');
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [rsvpedEvents, setRsvpedEvents] = useState<string[]>([]);

  // Admission Form
  const [stuName, setStuName] = useState('');
  const [stuPhone, setStuPhone] = useState('');
  const [stuCourse, setStuCourse] = useState(COURSES[1].title);
  const [stuCampus, setStuCampus] = useState('Lahore Campus');
  const [admitted, setAdmitted] = useState(false);

  const visibleCourses = useMemo(
    () => (trackFilter === 'All' ? COURSES : COURSES.filter((c) => c.track === trackFilter)),
    [trackFilter],
  );

  const progressPct = Math.round(
    (modules.filter((m) => m.done).length / modules.length) * 100,
  );

  const toggleModule = (id: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  };

  const toggleRsvp = (ev: string) => {
    setRsvpedEvents((prev) =>
      prev.includes(ev) ? prev.filter((x) => x !== ev) : [...prev, ev],
    );
  };

  return (
    <div
      className="min-h-screen bg-[#F6F8FC] text-slate-900"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Education & Events"
        clientBrand="EduSphere"
        categoryLabel="Business Demo 09"
        onBack={onBack}
      />

      {/* Academic Identity Header */}
      <header className="bg-[#0F1E3D] text-white border-b border-blue-400/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-[#0F1E3D]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight whitespace-nowrap" style={{ fontFamily: '"Outfit", sans-serif' }}>
              EDUSPHERE INSTITUTE
            </span>
          </div>

          <div className="inline-flex rounded-lg bg-white/10 p-1">
            <button
              type="button"
              onClick={() => setTab('portal')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                tab === 'portal' ? 'bg-amber-400 text-[#0F1E3D]' : 'text-slate-200'
              }`}
            >
              Institute &amp; Admissions
            </button>
            <button
              type="button"
              onClick={() => setTab('student')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                tab === 'student' ? 'bg-amber-400 text-[#0F1E3D]' : 'text-slate-200'
              }`}
            >
              Student Dashboard ({progressPct}%)
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-14">
        {tab === 'portal' ? (
          <>
            {/* Campus & AI Lab Hero */}
            <section className="grid items-stretch gap-8 lg:grid-cols-12">
              <div className="flex flex-col justify-between py-2 lg:col-span-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                    Computer Science, Python, Web &amp; AI Academy · Lahore &amp; Islamabad
                  </p>
                  <h1
                    className="mt-3 text-3xl font-bold leading-[1.08] tracking-tight text-[#0F1E3D] sm:text-5xl"
                    style={{ fontFamily: '"Outfit", sans-serif', textWrap: 'balance' }}
                  >
                    Launch a career in software engineering and applied AI.
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    Practical studio labs, small cohort mentorship with PhD faculty, and real-world
                    capstone projects aligned with Pakistan&apos;s top technology employers.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#edu-admission"
                    className="rounded-lg bg-[#0F1E3D] px-5 py-3 text-xs font-bold text-white hover:bg-blue-900"
                  >
                    Apply for Spring 2027 Cohort
                  </a>
                  <button
                    type="button"
                    onClick={() => setTab('student')}
                    className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-[#0F1E3D] cursor-pointer"
                  >
                    Preview Student Portal
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <ResilientImage
                    src={DEMO_MEDIA.edusphereCampusLab}
                    alt="Pakistani university students working in EduSphere AI and Computer Science lab"
                    className="h-full w-full object-cover"
                    fallbackLabel="EduSphere Computer Science Lab"
                  />
                </div>
              </div>
            </section>

            {/* Course Catalog */}
            <section className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                    Spring 2027 Cohort Admissions Open
                  </p>
                  <h2 className="mt-1 text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    Accredited IT &amp; Computer Science Programs
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(['All', 'Computer Science', 'Web Development', 'Python', 'AI & Technology'] as const).map(
                    (t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTrackFilter(t)}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                          trackFilter === t
                            ? 'bg-blue-700 text-white'
                            : 'border border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        {t}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {visibleCourses.map((c) => (
                  <article
                    key={c.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                        <ResilientImage
                          src={c.image}
                          alt={c.title}
                          className="h-full w-full object-cover"
                          fallbackLabel={c.title}
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-semibold text-blue-700">
                          {c.track} · {c.duration} · {c.campus}
                        </p>
                        <h3 className="mt-1.5 text-lg font-bold text-slate-900">{c.title}</h3>
                        <p className="mt-2 text-xs text-slate-600">Faculty Lead: {c.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                      <span className="font-mono text-base font-bold text-[#0F1E3D]">
                        {formatPkr(c.feePkr)}
                      </span>
                      <a
                        href="#edu-admission"
                        onClick={() => setStuCourse(c.title)}
                        className="rounded-lg bg-[#0F1E3D] px-4 py-2 text-xs font-bold text-white hover:bg-blue-900"
                      >
                        Apply Now
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Faculty Profiles & Online Admission Form */}
            <div className="grid gap-6 lg:grid-cols-12">
              <section className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-700" />
                    <h2 className="text-base font-bold">Distinguished Faculty</h2>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {FACULTY.map((f) => (
                      <div key={f.name} className="py-3">
                        <p className="text-sm font-bold text-slate-900">{f.name}</p>
                        <p className="text-xs font-semibold text-blue-700">{f.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{f.cred}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <h2 className="text-base font-bold">Upcoming Tech Events</h2>
                  </div>
                  {[
                    'Pakistan National AI Hackathon — Dec 06, Islamabad',
                    'Full-Stack Career Fair — Dec 14, Lahore Campus',
                  ].map((ev) => {
                    const joined = rsvpedEvents.includes(ev);
                    return (
                      <div key={ev} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs">
                        <span className="font-semibold text-slate-800">{ev}</span>
                        <button
                          type="button"
                          onClick={() => toggleRsvp(ev)}
                          className={`rounded px-3 py-1 font-bold cursor-pointer whitespace-nowrap ${
                            joined ? 'bg-emerald-600 text-white' : 'bg-[#0F1E3D] text-white'
                          }`}
                        >
                          {joined ? 'Registered' : 'RSVP'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section id="edu-admission" className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                  Merit &amp; Evening Batches
                </p>
                <h2 className="mt-1 text-xl font-bold">Online Admission Form</h2>
                <p className="mt-1 text-xs text-slate-500">
                  100% Need-Based Tech Scholarships available for qualifying Pakistani students.
                </p>

                {admitted ? (
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-xs text-emerald-900 space-y-2" role="status">
                    <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                    <p className="text-sm font-bold">Admission Application Submitted (Demo)</p>
                    <p>
                      Applicant <strong>{stuName}</strong> registered for <strong>{stuCourse}</strong> ({stuCampus}).
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!stuName.trim() || !stuPhone.trim()) return;
                      setAdmitted(true);
                    }}
                    className="mt-5 grid gap-4 sm:grid-cols-2 text-xs"
                  >
                    <div>
                      <label htmlFor="edu-name" className="font-semibold text-slate-600">Student Full Name</label>
                      <input
                        id="edu-name"
                        type="text"
                        required
                        placeholder="Ali Raza"
                        value={stuName}
                        onChange={(e) => setStuName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="edu-phone" className="font-semibold text-slate-600">Mobile Number</label>
                      <input
                        id="edu-phone"
                        type="tel"
                        required
                        placeholder="+92 312 440 1982"
                        value={stuPhone}
                        onChange={(e) => setStuPhone(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="edu-course" className="font-semibold text-slate-600">Selected Program</label>
                      <select
                        id="edu-course"
                        value={stuCourse}
                        onChange={(e) => setStuCourse(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                      >
                        {COURSES.map((c) => <option key={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edu-campus" className="font-semibold text-slate-600">Preferred Campus</label>
                      <select
                        id="edu-campus"
                        value={stuCampus}
                        onChange={(e) => setStuCampus(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                      >
                        <option>Lahore Campus</option>
                        <option>Islamabad Campus</option>
                        <option>Live Online Evening</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 cursor-pointer"
                      >
                        Submit Online Admission Application
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </div>
          </>
        ) : (
          /* Student Dashboard + Schedule */
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-700" />
                  <h2 className="text-base font-bold">Student Learning Progress</h2>
                </div>
                <span className="font-mono text-sm font-bold text-blue-700">{progressPct}% Complete</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-700 transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {modules.map((m) => (
                  <label key={m.id} className="flex items-center gap-3 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={m.done}
                      onChange={() => toggleModule(m.id)}
                      className="h-4 w-4 accent-blue-700"
                    />
                    <span className={m.done ? 'line-through text-slate-400' : 'font-semibold text-slate-800'}>
                      {m.title}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-base font-bold">Weekly Class Schedule</h2>
              <div className="space-y-3 text-xs">
                {SCHEDULE.map((s) => (
                  <div key={s.course} className="rounded-lg border border-slate-200 p-3.5">
                    <p className="font-bold text-slate-900">{s.course}</p>
                    <p className="mt-1 text-blue-700 font-semibold">{s.day} · {s.time}</p>
                    <p className="text-slate-500">{s.room}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Academic Testimonials & Admissions FAQ */}
        <section className="grid gap-6 lg:grid-cols-2 border-t border-slate-200 pt-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <h2 className="text-xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Graduate Outcomes
              </h2>
              <span className="text-slate-500">Sample Content</span>
            </div>
            <blockquote className="rounded-xl border border-slate-200 bg-white p-5 text-xs space-y-2">
              <p className="leading-relaxed text-slate-700">
                &ldquo;EduSphere&apos;s evening TypeScript &amp; FastAPI lab helped me transition from
                university coursework to a full-stack role at a Lahore software export firm within
                six weeks of graduation.&rdquo;
              </p>
              <footer className="font-bold text-blue-700">— Zainab Tariq, Cohort 2026</footer>
            </blockquote>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Admissions FAQ
            </h2>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs">
              <p className="font-bold text-slate-900">Are evening &amp; weekend lab slots available for working professionals?</p>
              <p className="mt-1 text-slate-600">Yes — evening classes start after 6:30 PM with recorded lecture access and weekend mentorship.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F1E3D] text-slate-300 border-t border-blue-400/20 mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              EDUSPHERE INSTITUTE
            </p>
            <p className="max-w-sm leading-relaxed text-slate-400">
              Pakistan&apos;s applied computer science, Python, web engineering, and AI institute
              across Lahore and Islamabad campuses.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Programs</p>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#edu-admission" className="hover:text-amber-300">Apply for Admission</a></li>
              <li><button type="button" onClick={() => setTab('student')} className="hover:text-amber-300 cursor-pointer">Student Dashboard</button></li>
            </ul>
          </div>
          <div className="space-y-2 text-slate-400">
            <p className="font-semibold text-white">Campuses</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-amber-400" /> Gulberg II, Lahore · F-8, Islamabad</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-amber-400" /> +92 42 3575 2020</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-slate-400">
          EduSphere · Interactive Institute &amp; Student Portal Demo (Sample Content)
        </div>
      </footer>
    </div>
  );
}
