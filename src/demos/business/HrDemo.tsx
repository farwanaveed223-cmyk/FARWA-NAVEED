import React, { useMemo, useState } from 'react';
import { Briefcase, CalendarCheck, Clock, Search, UserCheck, Users } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: 'Engineering' | 'Design' | 'Operations' | 'Finance';
  location: string;
  attendanceStatus: 'Clocked In' | 'Remote' | 'On Leave';
  ptoRemaining: number;
  rating: string;
}

interface LeaveRequest {
  id: string;
  employee: string;
  type: 'Annual Leave' | 'Sick Leave' | 'Parental';
  dates: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Declined';
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer';
  experience: string;
}

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    name: 'Zara Siddiqui',
    role: 'Principal Frontend Engineer',
    department: 'Engineering',
    location: 'Toronto',
    attendanceStatus: 'Clocked In',
    ptoRemaining: 14,
    rating: '4.9 / 5.0',
  },
  {
    id: 'e2',
    name: 'Lucas Meyer',
    role: 'Product Design Lead',
    department: 'Design',
    location: 'Berlin',
    attendanceStatus: 'Remote',
    ptoRemaining: 11,
    rating: '4.8 / 5.0',
  },
  {
    id: 'e3',
    name: 'Priya Nair',
    role: 'Operations Manager',
    department: 'Operations',
    location: 'London',
    attendanceStatus: 'Clocked In',
    ptoRemaining: 16,
    rating: '4.7 / 5.0',
  },
  {
    id: 'e4',
    name: 'David Morales',
    role: 'Senior Financial Controller',
    department: 'Finance',
    location: 'Chicago',
    attendanceStatus: 'On Leave',
    ptoRemaining: 9,
    rating: '4.8 / 5.0',
  },
];

const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'lr1',
    employee: 'Lucas Meyer',
    type: 'Annual Leave',
    dates: 'Nov 24 – Nov 26',
    days: 3,
    status: 'Pending',
  },
  {
    id: 'lr2',
    employee: 'Priya Nair',
    type: 'Annual Leave',
    dates: 'Dec 04 – Dec 05',
    days: 2,
    status: 'Pending',
  },
  {
    id: 'lr3',
    employee: 'David Morales',
    type: 'Annual Leave',
    dates: 'Nov 12 – Nov 14',
    days: 3,
    status: 'Approved',
  },
];

const INITIAL_CANDIDATES: Candidate[] = [
  { id: 'cd1', name: 'Nora Jensen', role: 'Staff UX Researcher', stage: 'Interview', experience: '7 yrs' },
  { id: 'cd2', name: 'Arjun Kapoor', role: 'Full-Stack Engineer', stage: 'Offer', experience: '5 yrs' },
  { id: 'cd3', name: 'Chloe Bernard', role: 'People Operations Partner', stage: 'Screening', experience: '4 yrs' },
  { id: 'cd4', name: 'Samir Haddad', role: 'Cloud Reliability Engineer', stage: 'Applied', experience: '6 yrs' },
];

export function HrDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'directory' | 'attendance' | 'leave' | 'recruitment'>('directory');
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [clockedInSelf, setClockedInSelf] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);

  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [leaveEmployee, setLeaveEmployee] = useState('Zara Siddiqui');
  const [leaveType, setLeaveType] = useState<LeaveRequest['type']>('Annual Leave');
  const [leaveDates, setLeaveDates] = useState('');
  const [leaveDays, setLeaveDays] = useState('2');

  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);

  const filteredEmployees = useMemo(() => {
    const q = search.trim().toLowerCase();
    return employees.filter((e) => {
      const matchDept = deptFilter === 'All' || e.department === deptFilter;
      const matchQ =
        !q || e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
      return matchDept && matchQ;
    });
  }, [employees, search, deptFilter]);

  const handleToggleClock = () => {
    setClockedInSelf((prev) => {
      const next = !prev;
      setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      return next;
    });
  };

  const handleLeaveDecision = (id: string, status: 'Approved' | 'Declined') => {
    const target = leaves.find((l) => l.id === id);
    if (!target || target.status !== 'Pending') return;
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (status === 'Approved') {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.name === target.employee
            ? { ...emp, ptoRemaining: Math.max(0, emp.ptoRemaining - target.days) }
            : emp,
        ),
      );
    }
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveDates.trim()) return;
    setLeaves((prev) => [
      {
        id: `lr-${Date.now()}`,
        employee: leaveEmployee,
        type: leaveType,
        dates: leaveDates.trim(),
        days: Math.max(1, Number(leaveDays) || 1),
        status: 'Pending',
      },
      ...prev,
    ]);
    setLeaveDates('');
  };

  const advanceCandidate = (id: string, stage: Candidate['stage']) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, stage } : c)));
  };

  return (
    <div
      className="min-h-screen bg-[#F7F7F5] text-[#14332B]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="HR & People Operations Hub"
        clientBrand="Kinetix People"
        categoryLabel="Operations"
        onBack={onBack}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Kinetix People Suite
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#14332B] sm:text-3xl">
              Workforce, Attendance &amp; Hiring
            </h1>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl border border-stone-200 bg-white p-1">
            {(
              [
                { id: 'directory', label: 'Directory', icon: Users },
                { id: 'attendance', label: 'Attendance', icon: Clock },
                { id: 'leave', label: 'Leave Requests', icon: CalendarCheck },
                { id: 'recruitment', label: 'Recruitment', icon: Briefcase },
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
                      ? 'bg-[#14332B] text-white'
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

        {/* DIRECTORY */}
        {tab === 'directory' && (
          <div className="mt-8 space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employees or roles..."
                  className="w-full rounded-lg border border-stone-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-emerald-700 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['All', 'Engineering', 'Design', 'Operations', 'Finance'].map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setDeptFilter(dept)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                      deptFilter === dept
                        ? 'bg-emerald-700 text-white'
                        : 'border border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="rounded-xl border border-stone-200 bg-white p-5 flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      {emp.department} · {emp.location}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-stone-900">{emp.name}</h2>
                    <p className="text-sm text-stone-600">{emp.role}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
                      <span>PTO Left: <strong className="tabular-nums text-stone-900">{emp.ptoRemaining}d</strong></span>
                      <span>Review: <strong className="tabular-nums text-stone-900">{emp.rating}</strong></span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap ${
                      emp.attendanceStatus === 'Clocked In'
                        ? 'text-emerald-700'
                        : emp.attendanceStatus === 'Remote'
                          ? 'text-sky-700'
                          : 'text-amber-700'
                    }`}
                  >
                    {emp.attendanceStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTENDANCE */}
        {tab === 'attendance' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-stone-200 bg-white p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">Daily Shift Check-In</h2>
                <p className="mt-1 text-sm text-stone-600">
                  {clockedInSelf
                    ? `You are clocked in (last event at ${clockTime}).`
                    : 'Not clocked in yet for today’s shift.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleClock}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold text-white cursor-pointer ${
                  clockedInSelf ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                <UserCheck className="h-4 w-4" />
                <span>{clockedInSelf ? 'Clock Out' : 'Clock In Now'}</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-xs uppercase text-stone-500">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Team Member</th>
                    <th className="px-6 py-3 font-semibold">Department</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {employees.map((emp, idx) => (
                    <tr key={emp.id}>
                      <td className="px-6 py-3.5 font-semibold text-stone-900">{emp.name}</td>
                      <td className="px-6 py-3.5 text-stone-600">{emp.department}</td>
                      <td className="px-6 py-3.5 text-xs font-semibold text-emerald-700">
                        {emp.attendanceStatus}
                      </td>
                      <td className="px-6 py-3.5 text-right font-mono tabular-nums">
                        {emp.attendanceStatus === 'On Leave' ? '16.0h' : `${38 + idx}.5h`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEAVE REQUESTS */}
        {tab === 'leave' && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleSubmitLeave}
              className="rounded-xl border border-stone-200 bg-white p-6 space-y-4 lg:col-span-4"
            >
              <h2 className="text-base font-bold text-stone-900">Submit Leave Request</h2>
              <div>
                <label htmlFor="hr-emp" className="block text-xs font-semibold text-stone-700">
                  Employee
                </label>
                <select
                  id="hr-emp"
                  value={leaveEmployee}
                  onChange={(e) => setLeaveEmployee(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                >
                  {employees.map((e) => (
                    <option key={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="hr-type" className="block text-xs font-semibold text-stone-700">
                    Leave Type
                  </label>
                  <select
                    id="hr-type"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as LeaveRequest['type'])}
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  >
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Parental</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="hr-days" className="block text-xs font-semibold text-stone-700">
                    Days
                  </label>
                  <input
                    id="hr-days"
                    type="number"
                    min={1}
                    max={20}
                    value={leaveDays}
                    onChange={(e) => setLeaveDays(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hr-dates" className="block text-xs font-semibold text-stone-700">
                  Date Range
                </label>
                <input
                  id="hr-dates"
                  required
                  value={leaveDates}
                  onChange={(e) => setLeaveDates(e.target.value)}
                  placeholder="Dec 14 – Dec 16"
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#14332B] py-2.5 text-xs font-semibold text-white hover:bg-[#0d241e] cursor-pointer"
              >
                Request Time Off
              </button>
            </form>

            <div className="space-y-3 lg:col-span-8">
              <h2 className="text-base font-bold text-stone-900">Approval Queue</h2>
              {leaves.map((req) => (
                <div
                  key={req.id}
                  className="rounded-xl border border-stone-200 bg-white p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-stone-900">
                      {req.employee} · <span className="font-normal text-stone-500">{req.type}</span>
                    </p>
                    <p className="mt-1 text-xs text-stone-600">
                      {req.dates} ({req.days} days)
                    </p>
                  </div>

                  {req.status === 'Pending' ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleLeaveDecision(req.id, 'Approved')}
                        className="rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLeaveDecision(req.id, 'Declined')}
                        className="rounded-lg border border-stone-300 px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-bold ${
                        req.status === 'Approved' ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECRUITMENT */}
        {tab === 'recruitment' && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {(['Applied', 'Screening', 'Interview', 'Offer'] as const).map((stage) => {
              const list = candidates.filter((c) => c.stage === stage);
              return (
                <div
                  key={stage}
                  className="rounded-xl border border-stone-200 bg-stone-100/70 p-4"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                    <h2 className="text-sm font-bold text-stone-900">{stage}</h2>
                    <span className="font-mono text-xs font-semibold text-emerald-700">
                      {list.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {list.map((c) => (
                      <div key={c.id} className="rounded-lg border border-stone-200 bg-white p-4">
                        <h3 className="text-sm font-bold text-stone-900">{c.name}</h3>
                        <p className="text-xs text-stone-600">{c.role}</p>
                        <p className="mt-1 text-[11px] text-stone-400">Experience: {c.experience}</p>
                        <select
                          aria-label={`Move ${c.name} stage`}
                          value={c.stage}
                          onChange={(e) =>
                            advanceCandidate(c.id, e.target.value as Candidate['stage'])
                          }
                          className="mt-3 w-full rounded border border-stone-200 bg-stone-50 px-2 py-1 text-xs font-medium"
                        >
                          <option>Applied</option>
                          <option>Screening</option>
                          <option>Interview</option>
                          <option>Offer</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
