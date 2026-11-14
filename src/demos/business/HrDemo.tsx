import React, { useMemo, useState } from 'react';
import { Briefcase, CheckCircle2, Mail, MapPin, Phone, Search, ShieldCheck, Users } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr } from '../../utils/demoLogic';

interface Employee {
  id: string;
  name: string;
  role: string;
  dept: 'Engineering' | 'Talent Advisory' | 'Operations' | 'Finance';
  city: 'Islamabad' | 'Lahore' | 'Karachi';
  attendance: 'Present' | 'Remote' | 'On Leave';
  email: string;
}

interface LeaveReq {
  id: string;
  employee: string;
  dates: string;
  type: string;
  status: 'Pending' | 'Approved' | 'Declined';
}

interface CandidateApp {
  id: string;
  candidate: string;
  role: string;
  city: string;
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Offer Extended';
}

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'PF-01',
    name: 'Amna Qureshi',
    role: 'Principal Talent Partner',
    dept: 'Talent Advisory',
    city: 'Islamabad',
    attendance: 'Present',
    email: 'amna@peoplefirsthr.pk',
  },
  {
    id: 'PF-02',
    name: 'Usman Farooq',
    role: 'Lead Payroll Specialist',
    dept: 'Finance',
    city: 'Lahore',
    attendance: 'Present',
    email: 'usman@peoplefirsthr.pk',
  },
  {
    id: 'PF-03',
    name: 'Hina Waqar',
    role: 'HRIS Implementation Engineer',
    dept: 'Engineering',
    city: 'Karachi',
    attendance: 'Remote',
    email: 'hina@peoplefirsthr.pk',
  },
  {
    id: 'PF-04',
    name: 'Omer Hayat',
    role: 'Compliance & Labor Law Advisor',
    dept: 'Operations',
    city: 'Islamabad',
    attendance: 'On Leave',
    email: 'omer@peoplefirsthr.pk',
  },
];

const VACANCIES = [
  { title: 'Senior React & Node.js Engineer', city: 'Lahore · Hybrid', salaryPkr: 380000, dept: 'Engineering' },
  { title: 'Executive Recruiter — Banking & Fintech', city: 'Karachi', salaryPkr: 240000, dept: 'Talent Advisory' },
  { title: 'People Operations Generalist', city: 'Islamabad', salaryPkr: 165000, dept: 'Operations' },
];

const INITIAL_LEAVES: LeaveReq[] = [
  { id: 'LV-12', employee: 'Omer Hayat', dates: 'Nov 14 – Nov 16', type: 'Annual Leave', status: 'Pending' },
  { id: 'LV-13', employee: 'Hina Waqar', dates: 'Nov 21', type: 'Casual Leave', status: 'Approved' },
];

const INITIAL_APPLICATIONS: CandidateApp[] = [
  { id: 'CAN-41', candidate: 'Zohaib Akram', role: 'Senior React & Node.js Engineer', city: 'Lahore', stage: 'Interview' },
  { id: 'CAN-42', candidate: 'Mehak Fatima', role: 'Executive Recruiter — Banking & Fintech', city: 'Karachi', stage: 'Shortlisted' },
  { id: 'CAN-43', candidate: 'Daniyal Ahmed', role: 'People Operations Generalist', city: 'Islamabad', stage: 'Offer Extended' },
];

export function HrDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'overview' | 'directory' | 'recruitment' | 'leave'>('overview');
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [selectedEmp, setSelectedEmp] = useState<Employee>(INITIAL_EMPLOYEES[0]);
  const [empSearch, setEmpSearch] = useState('');

  const [leaves, setLeaves] = useState<LeaveReq[]>(INITIAL_LEAVES);
  const [applications, setApplications] = useState<CandidateApp[]>(INITIAL_APPLICATIONS);

  // Application Form
  const [candName, setCandName] = useState('');
  const [candCity, setCandCity] = useState('Lahore');
  const [candRole, setCandRole] = useState(VACANCIES[0].title);
  const [appSubmitted, setAppSubmitted] = useState(false);

  // Leave Request Form
  const [leaveEmp, setLeaveEmp] = useState(INITIAL_EMPLOYEES[0].name);
  const [leaveDates, setLeaveDates] = useState('Nov 25 – Nov 26');
  const [leaveType, setLeaveType] = useState('Annual Leave');

  const filteredEmployees = useMemo(() => {
    const q = empSearch.trim().toLowerCase();
    return q
      ? employees.filter(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.role.toLowerCase().includes(q) ||
            e.city.toLowerCase().includes(q),
        )
      : employees;
  }, [employees, empSearch]);

  const toggleAttendance = (id: string) => {
    const states: Employee['attendance'][] = ['Present', 'Remote', 'On Leave'];
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, attendance: states[(states.indexOf(e.attendance) + 1) % states.length] } : e,
      ),
    );
  };

  const handleLeaveAction = (id: string, status: 'Approved' | 'Declined') => {
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName.trim()) return;
    setApplications((prev) => [
      {
        id: `CAN-${44 + prev.length}`,
        candidate: candName.trim(),
        role: candRole,
        city: candCity,
        stage: 'Applied',
      },
      ...prev,
    ]);
    setCandName('');
    setAppSubmitted(true);
  };

  const submitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveDates.trim()) return;
    setLeaves((prev) => [
      {
        id: `LV-${14 + prev.length}`,
        employee: leaveEmp,
        dates: leaveDates.trim(),
        type: leaveType,
        status: 'Pending',
      },
      ...prev,
    ]);
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-slate-900"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="HR & Recruitment"
        clientBrand="PeopleFirst HR"
        categoryLabel="Business Demo 05"
        onBack={onBack}
      />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">PeopleFirst HR</span>
              <p className="text-xs text-slate-500">Recruitment &amp; People Consultancy Pakistan</p>
            </div>
          </div>

          <div className="inline-flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
            {(
              [
                { id: 'overview', label: 'Company & Analytics' },
                { id: 'directory', label: 'Employee Directory' },
                { id: 'recruitment', label: 'Jobs & Applicants' },
                { id: 'leave', label: 'Attendance & Leave' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                  tab === t.id ? 'bg-slate-900 text-white' : 'text-slate-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-10">
        {/* Hero Banner with Corporate Interview Photography */}
        <section className="grid items-stretch gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
                PeopleFirst HR · Islamabad · Lahore · Karachi
              </p>
              <h1
                className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Executive Recruitment, Payroll Compliance &amp; People Analytics
              </h1>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                Helping Pakistani technology startups, banks, and industrial enterprises hire vetted
                leaders, manage hybrid attendance, and automate EOBI and leave workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setTab('recruitment')}
                className="rounded-lg bg-teal-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-700 cursor-pointer"
              >
                Explore Open Vacancies ({VACANCIES.length})
              </button>
              <button
                type="button"
                onClick={() => setTab('directory')}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-800 cursor-pointer"
              >
                Browse Staff Directory
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 overflow-hidden rounded-xl border border-slate-200 min-h-[240px]">
            <ResilientImage
              src={DEMO_MEDIA.peoplefirstHrOffice}
              alt="Pakistani HR talent interview in modern corporate conference room"
              className="h-full w-full object-cover"
              fallbackLabel="PeopleFirst HR Corporate Advisory"
            />
          </div>
        </section>

        {/* HR KPI Strip */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">Active Workforce</p>
            <p className="mt-2 font-mono text-2xl font-bold tabular-nums">{employees.length} Leads</p>
            <p className="mt-1 text-xs text-slate-500">ISB · LHE · KHI offices</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">Open Job Mandates</p>
            <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-teal-700">{VACANCIES.length}</p>
            <p className="mt-1 text-xs text-slate-500">{applications.length} tracked candidates</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">Present Today</p>
            <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-emerald-700">
              {employees.filter((e) => e.attendance !== 'On Leave').length}/{employees.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Hybrid &amp; on-site verified</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">Pending Leave Requests</p>
            <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-amber-700">
              {leaves.filter((l) => l.status === 'Pending').length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Awaiting manager review</p>
          </div>
        </section>

        {tab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white flex flex-col justify-between space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                  Pakistan Corporate Staffing Partner
                </p>
                <h2 className="mt-3 text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  Structured Payroll, EOBI Compliance &amp; Executive Talent Pipelines
                </h2>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  From EOBI/provident compliance and salary benchmarking in PKR to full-cycle
                  technical hiring across Karachi, Lahore, and Islamabad, PeopleFirst HR unifies every
                  stage of the employee lifecycle.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <ShieldCheck className="h-4 w-4 text-teal-400 mb-1.5" />
                  <p className="font-bold">FBR Tax &amp; EOBI Filing</p>
                  <p className="text-slate-400 mt-1">Automated monthly salary tax deduction slabs &amp; payslips.</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <Briefcase className="h-4 w-4 text-teal-400 mb-1.5" />
                  <p className="font-bold">14-Day Hiring Turnaround</p>
                  <p className="text-slate-400 mt-1">Technical &amp; leadership shortlists across Pakistan.</p>
                </div>
              </div>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-base font-bold">HR Analytics · Department Headcount</h2>
              {[
                { dept: 'Engineering', pct: 42 },
                { dept: 'Talent Advisory', pct: 28 },
                { dept: 'Operations & Labor Compliance', pct: 18 },
                { dept: 'Payroll & Finance', pct: 12 },
              ].map((row) => (
                <div key={row.dept} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{row.dept}</span>
                    <span className="font-mono tabular-nums">{row.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-teal-600" style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </section>

            <section className="lg:col-span-12 grid gap-6 md:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={DEMO_MEDIA.teamsyncWorkspace}
                    alt="PeopleFirst HR technical panel interview session in Islamabad"
                    className="h-full w-full object-cover"
                    fallbackLabel="Technical Assessment Lab"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                    Vetted Technical Shortlists
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    Structured Engineering &amp; Product Assessment Centers
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    Candidate evaluations across Lahore, Islamabad, and Karachi backed by standardized
                    rubrics and verified salary benchmarks.
                  </p>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <ResilientImage
                    src={DEMO_MEDIA.finoraAdvisoryOffice}
                    alt="PeopleFirst HR executive boardroom advisory and labor compliance desk"
                    className="h-full w-full object-cover"
                    fallbackLabel="Executive Search & Payroll"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                    Enterprise Governance
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    Executive Leadership Search &amp; EOBI Compliance
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    Confidential C-suite recruitment paired with automated attendance, leave, and
                    monthly provident fund administration.
                  </p>
                </div>
              </article>
            </section>
          </div>
        )}

        {tab === 'directory' && (
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-700" />
                  <h2 className="text-base font-bold">Employee Directory</h2>
                </div>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Filter staff or city..."
                    value={empSearch}
                    onChange={(e) => setEmpSearch(e.target.value)}
                    className="rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-xs"
                  />
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {filteredEmployees.map((emp) => (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => setSelectedEmp(emp)}
                    className={`flex w-full items-center justify-between py-3 px-2 rounded-lg text-left cursor-pointer ${
                      selectedEmp.id === emp.id ? 'bg-teal-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                      <p className="text-xs text-slate-500">
                        {emp.role} · {emp.city}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold text-teal-700">{emp.attendance}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Employee Profile</p>
              <h3 className="text-xl font-bold">{selectedEmp.name}</h3>
              <p className="text-sm text-slate-600">{selectedEmp.role}</p>
              <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <p>Department: <strong className="text-slate-900">{selectedEmp.dept}</strong></p>
                <p>Office Location: <strong className="text-slate-900">{selectedEmp.city}, Pakistan</strong></p>
                <p>Official Email: <strong className="text-slate-900">{selectedEmp.email}</strong></p>
                <p>Current Attendance: <strong className="text-teal-700">{selectedEmp.attendance}</strong></p>
              </div>
            </section>
          </div>
        )}

        {tab === 'recruitment' && (
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-teal-700" />
                  <h2 className="text-base font-bold">Open Job Vacancies</h2>
                </div>
                <div className="space-y-3">
                  {VACANCIES.map((v) => (
                    <div key={v.title} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{v.title}</p>
                        <p className="text-xs text-slate-500">{v.dept} · {v.city}</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-teal-800">
                        {formatPkr(v.salaryPkr)} / mo
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
                <h2 className="text-base font-bold">Recruitment Pipeline Tracking</h2>
                <div className="divide-y divide-slate-100 text-xs">
                  {applications.map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-2.5">
                      <div>
                        <p className="font-bold text-slate-900">{a.candidate}</p>
                        <p className="text-slate-500">{a.role} · {a.city}</p>
                      </div>
                      <span className="font-semibold text-teal-700">{a.stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-bold">Candidate Application Form</h2>
              <form onSubmit={submitApplication} className="mt-4 space-y-3">
                <div>
                  <label htmlFor="pf-cand-name" className="text-xs font-semibold text-slate-600">Candidate Name</label>
                  <input
                    id="pf-cand-name"
                    type="text"
                    required
                    placeholder="Hamza Nawaz"
                    value={candName}
                    onChange={(e) => setCandName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="pf-cand-role" className="text-xs font-semibold text-slate-600">Applying Position</label>
                  <select
                    id="pf-cand-role"
                    value={candRole}
                    onChange={(e) => setCandRole(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                  >
                    {VACANCIES.map((v) => (
                      <option key={v.title} value={v.title}>{v.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="pf-cand-city" className="text-xs font-semibold text-slate-600">City</label>
                  <select
                    id="pf-cand-city"
                    value={candCity}
                    onChange={(e) => setCandCity(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                  >
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-teal-600 py-2.5 text-xs font-bold text-white hover:bg-teal-700 cursor-pointer"
                >
                  Submit Application (Demo)
                </button>
                {appSubmitted && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-700" role="status">
                    <CheckCircle2 className="h-4 w-4" /> Candidate added to Recruitment Pipeline!
                  </p>
                )}
              </form>
            </section>
          </div>
        )}

        {tab === 'leave' && (
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-base font-bold">Attendance Dashboard (Click status to cycle)</h2>
              <div className="divide-y divide-slate-100 text-xs">
                {employees.map((e) => (
                  <div key={e.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-bold text-slate-900">{e.name}</p>
                      <p className="text-slate-500">{e.city}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleAttendance(e.id)}
                      className="rounded-md border border-slate-200 px-3 py-1 font-semibold hover:border-teal-600 cursor-pointer"
                    >
                      {e.attendance}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-6 space-y-5">
              <h2 className="text-base font-bold">Leave Request Management</h2>
              <form onSubmit={submitLeave} className="grid grid-cols-3 gap-2">
                <select
                  value={leaveEmp}
                  onChange={(e) => setLeaveEmp(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs"
                >
                  {employees.map((e) => <option key={e.id}>{e.name}</option>)}
                </select>
                <input
                  type="text"
                  value={leaveDates}
                  onChange={(e) => setLeaveDates(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 text-xs font-bold text-white cursor-pointer"
                >
                  Request Leave
                </button>
              </form>

              <div className="divide-y divide-slate-100 text-xs">
                {leaves.map((l) => (
                  <div key={l.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div>
                      <p className="font-bold">{l.employee} · {l.type}</p>
                      <p className="text-slate-500">{l.dates}</p>
                    </div>
                    {l.status === 'Pending' ? (
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleLeaveAction(l.id, 'Approved')}
                          className="rounded bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLeaveAction(l.id, 'Declined')}
                          className="rounded bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold text-teal-700">{l.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* PeopleFirst HR Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 text-xs">
          <div className="space-y-2">
            <p className="text-base font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              PeopleFirst HR
            </p>
            <p className="text-slate-400">
              Enterprise recruitment, HRIS implementation, and statutory payroll compliance in Pakistan.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-teal-400">Regional Desks</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-teal-400" /> Blue Area F-6, Islamabad</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-teal-400" /> Clifton Block 5, Karachi</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-teal-400">Contact HR Advisory</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-teal-400" /> +92 51 280 9110 (Sample)</p>
            <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-teal-400" /> careers@peoplefirsthr.pk (Sample)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
