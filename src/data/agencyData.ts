export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  route: string;
  image: string;
  alt: string;
}

export interface BusinessSolutionItem {
  number: string;
  category: 'Creative' | 'Business Systems' | 'Operations' | 'Growth' | 'Hospitality';
  title: string;
  description: string;
  route: string;
  image: string;
  alt: string;
}

export interface PortfolioConceptItem {
  id: string;
  category:
    | 'Business Websites'
    | 'Personal Portfolios'
    | 'Creative Landing Pages'
    | 'Agency Websites'
    | 'Educational Websites';
  title: string;
  summary: string;
  image: string;
  alt: string;
  challenge: string;
  solution: string;
  highlights: string[];
  linkedDemoRoute: string;
}

export const AGENCY_IMAGES = {
  heroBg:
    'https://images.pexels.com/photos/40068467/pexels-photo-40068467.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  aboutInterior:
    'https://images.pexels.com/photos/35203563/pexels-photo-35203563.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  whyBokeh:
    'https://images.pexels.com/photos/29735307/pexels-photo-29735307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Website Design & Development',
    description:
      'Modern, professional and responsive websites designed to build a strong online presence.',
    route: '#/demo/business',
    image:
      'https://images.pexels.com/photos/8190827/pexels-photo-8190827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Team meeting in a modern office',
  },
  {
    number: '02',
    title: 'Landing Page Design',
    description:
      'Beautiful and engaging landing pages designed to present products, services and ideas effectively.',
    route: '#/demo/landing',
    image:
      'https://images.pexels.com/photos/5088408/pexels-photo-5088408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Designer working on a laptop under warm light',
  },
  {
    number: '03',
    title: 'Portfolio Websites',
    description:
      'Professional personal and business portfolios to showcase work, skills and achievements.',
    route: '#/demo/portfolio',
    image:
      'https://images.pexels.com/photos/4875202/pexels-photo-4875202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Photographer with a camera against a dark background',
  },
  {
    number: '04',
    title: 'Website Redesign',
    description:
      'Transform outdated websites into modern, elegant and user-friendly digital experiences.',
    route: '#/demo/redesign',
    image:
      'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Team reviewing design sketches together',
  },
  {
    number: '05',
    title: '3D Website Design & Development',
    description:
      'Premium interactive 3D websites with cinematic hero sections, animated objects, mouse-responsive depth and smooth scroll-driven motion.',
    route: '#/demo/3d',
    image:
      'https://images.pexels.com/photos/29735307/pexels-photo-29735307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Soft golden light on a dark background',
  },
];

export const BUSINESS_SOLUTIONS: BusinessSolutionItem[] = [
  {
    number: '01',
    category: 'Creative',
    title: 'Portfolio',
    description:
      'A professional portfolio manager with a project gallery, skills, achievements, an experience timeline and a contact form.',
    route: '#/demo/portfolio-dashboard',
    image:
      'https://images.pexels.com/photos/4549411/pexels-photo-4549411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Creative professional using a camera and laptop in a studio setup',
  },
  {
    number: '02',
    category: 'Business Systems',
    title: 'Sales & CRM',
    description:
      'A sales command center with a pipeline board, lead management, deal tracking, customer records and revenue charts.',
    route: '#/demo/crm',
    image:
      'https://images.pexels.com/photos/39204825/pexels-photo-39204825.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Sales presentation with growth charts on screen',
  },
  {
    number: '03',
    category: 'Business Systems',
    title: 'Customer Support',
    description:
      'A support desk with a ticket queue, live chat simulation, status workflows, a searchable FAQ and feedback collection.',
    route: '#/demo/support',
    image:
      'https://images.pexels.com/photos/7709176/pexels-photo-7709176.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Headset resting on a laptop in a support workspace',
  },
  {
    number: '04',
    category: 'Business Systems',
    title: 'Team & Productivity',
    description:
      'A team workspace with task boards, project progress, member profiles, a shared calendar and personal to-do lists.',
    route: '#/demo/team',
    image:
      'https://images.pexels.com/photos/17724731/pexels-photo-17724731.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Colleagues planning projects on a whiteboard',
  },
  {
    number: '05',
    category: 'Operations',
    title: 'HR & People',
    description:
      'An HR hub with an employee directory, profiles, attendance tracking, leave approvals, recruitment and performance overviews.',
    route: '#/demo/hr',
    image:
      'https://images.pexels.com/photos/5439379/pexels-photo-5439379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Professional during a job interview at an office desk',
  },
  {
    number: '06',
    category: 'Operations',
    title: 'Finance & Legal',
    description:
      'A finance dashboard with income and expense tracking, invoices, budgets, reports and a legal document library.',
    route: '#/demo/finance-legal',
    image:
      'https://images.pexels.com/photos/17065743/pexels-photo-17065743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Calculator and folders on an office desk',
  },
  {
    number: '07',
    category: 'Operations',
    title: 'Operations & Inventory',
    description:
      'An inventory system with product records, stock levels, low-stock alerts, order tracking and supplier management.',
    route: '#/demo/inventory',
    image:
      'https://images.pexels.com/photos/4487383/pexels-photo-4487383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Workers handling packages in a stocked warehouse',
  },
  {
    number: '08',
    category: 'Growth',
    title: 'Marketing & Analytics',
    description:
      'A marketing command dashboard with traffic analytics, social performance, campaign tracking and conversion reporting.',
    route: '#/demo/marketing',
    image:
      'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Workspace with analytics graphs on a monitor',
  },
  {
    number: '09',
    category: 'Growth',
    title: 'Education & Events',
    description:
      'An education hub with course showcases, a student dashboard, progress tracking, an event calendar and registration.',
    route: '#/demo/education',
    image:
      'https://images.pexels.com/photos/5905749/pexels-photo-5905749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Teacher answering students questions during an online lesson',
  },
  {
    number: '10',
    category: 'Hospitality',
    title: 'Food & Local Business',
    description:
      'A restaurant website with a menu, online ordering, table reservations, guest reviews and location details.',
    route: '#/demo/restaurant',
    image:
      'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Dishes served on a wooden table in a modern restaurant',
  },
];

export const PORTFOLIO_CONCEPTS: PortfolioConceptItem[] = [
  {
    id: 'northline',
    category: 'Business Websites',
    title: 'Northline Consulting',
    summary: 'A clean corporate site that turns visitors into consultation requests.',
    image:
      'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Business professionals in a collaborative meeting',
    challenge:
      'Advisory firms often overwhelm prospects with dense whitepapers before explaining how engagements actually begin.',
    solution:
      'A clear service hierarchy paired with interactive scope estimators and direct consultation booking.',
    highlights: ['Interactive Scope Estimator', 'Case Study Metrics', 'Instant Consultation Booking'],
    linkedDemoRoute: '#/demo/business',
  },
  {
    id: 'lens-light',
    category: 'Personal Portfolios',
    title: 'Lens & Light Studio',
    summary: 'A moody personal portfolio that lets the work speak first.',
    image:
      'https://images.pexels.com/photos/4875202/pexels-photo-4875202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Photographer with a DSLR camera against a dark background',
    challenge:
      'Photographers need generous negative space and zero visual clutter so editorial series hold full attention.',
    solution:
      'A gallery-first layout with EXIF metadata drawers, keyboard-navigable lightbox, and edition inquiries.',
    highlights: ['Fullscreen Lightbox', 'EXIF Camera Telemetry', 'Archival Print Inquiries'],
    linkedDemoRoute: '#/demo/portfolio',
  },
  {
    id: 'ember-launch',
    category: 'Creative Landing Pages',
    title: 'Ember Launch Page',
    summary: 'A single-page campaign built to introduce a product with impact.',
    image:
      'https://images.pexels.com/photos/149897/pexels-photo-149897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Moody workspace with a laptop and warm ambient light',
    challenge:
      'Flagship hardware launches require tactile colorway switching and immediate clarity around technical specs.',
    solution:
      'A conversion-focused product launch page with live finish selection, spec comparisons, and pre-order simulation.',
    highlights: ['Live Finish Selector', 'Technical Spec Matrix', 'Pre-Order Simulation'],
    linkedDemoRoute: '#/demo/landing',
  },
  {
    id: 'halo-creative',
    category: 'Agency Websites',
    title: 'Halo Creative Agency',
    summary: 'An agency site that showcases process, people and selected work.',
    image:
      'https://images.pexels.com/photos/3688759/pexels-photo-3688759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Top view of a design workspace with sketches and laptops',
    challenge:
      'Showing how an agency transforms legacy digital properties without relying on abstract buzzwords.',
    solution:
      'An interactive before-and-after redesign showcase paired with measurable Core Web Vitals and conversion data.',
    highlights: ['Interactive Before/After Slider', 'Performance Audit Breakdown', 'Live Redesigned Preview'],
    linkedDemoRoute: '#/demo/redesign',
  },
  {
    id: 'learn-bright',
    category: 'Educational Websites',
    title: 'Learn Bright Academy',
    summary: 'A learning platform homepage with course discovery at its core.',
    image:
      'https://images.pexels.com/photos/5934556/pexels-photo-5934556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Student studying online on a laptop with learning materials',
    challenge:
      'Students abandon course portals when schedules, progress tracking, and live events live in separate tools.',
    solution:
      'A unified education hub combining course enrollment, interactive lesson progress, and event RSVPs.',
    highlights: ['Course Enrollment', 'Interactive Lesson Tracker', 'Event Calendar & RSVP'],
    linkedDemoRoute: '#/demo/education',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: "Understand the client's vision and requirements.",
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Develop a clear website structure and strategy.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Create a beautiful and professional visual experience.',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Build a responsive and functional website.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deliver the finished website.',
  },
];

export const WHY_PILLARS = [
  {
    number: '01',
    title: 'Creative Thinking',
    description:
      'Every project starts with an original idea, shaped around your brand rather than a template.',
  },
  {
    number: '02',
    title: 'Modern Design',
    description:
      'Refined typography, considered spacing and cinematic detail that feel current and lasting.',
  },
  {
    number: '03',
    title: 'Responsive Websites',
    description:
      'Every layout is built to look and perform beautifully on phones, tablets and desktops.',
  },
  {
    number: '04',
    title: 'Attention to Detail',
    description:
      'Careful polish in every transition, hover state and line of copy, because the small things matter.',
  },
];
