export interface ServiceItem {
  number: string;
  title: string;
  demoBrand: string;
  description: string;
  route: string;
  image: string;
  alt: string;
}

export interface BusinessSolutionItem {
  number: string;
  category: 'Creative' | 'Business Systems' | 'Operations' | 'Growth' | 'Hospitality';
  title: string;
  subtitle: string;
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
    demoBrand: 'BuildCraft',
    description:
      'BuildCraft — Pakistani construction and architecture website featuring residential & commercial project galleries and PKR scope estimation.',
    route: '#/demo/buildcraft',
    image:
      'https://images.pexels.com/photos/8190827/pexels-photo-8190827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Construction and architecture team reviewing project blueprints',
  },
  {
    number: '02',
    title: 'Landing Page Design',
    demoBrand: 'GlowNest',
    description:
      'GlowNest — Pakistani luxury skincare landing page built with saffron-botanical storytelling, PKR bundles, reviews and demo checkout.',
    route: '#/demo/glownest',
    image:
      'https://images.pexels.com/photos/5088408/pexels-photo-5088408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Creative designer crafting a skincare brand campaign on laptop',
  },
  {
    number: '03',
    title: 'Portfolio Websites',
    demoBrand: 'Hunar Interiors',
    description:
      'Hunar Interiors — Pakistani luxury interior design studio showcase with residential & commercial rooms, lightbox galleries and consultation booking.',
    route: '#/demo/hunar-interiors',
    image:
      'https://images.pexels.com/photos/4875202/pexels-photo-4875202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Creative studio portrait and visual framing in moody lighting',
  },
  {
    number: '04',
    title: 'Website Redesign',
    demoBrand: 'Spice Avenue',
    description:
      'Spice Avenue — Traditional Pakistani restaurant before-and-after redesign showcase with interactive ordering and table reservations.',
    route: '#/demo/spice-avenue',
    image:
      'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Design team comparing wireframes and restaurant redesign concepts',
  },
  {
    number: '05',
    title: '3D Website Design & Development',
    demoBrand: 'NexaTech',
    description:
      'NexaTech — Interactive 3D WebGL technology showcase with real-time 360° orbit inspection, exploded assembly layers and material finishes.',
    route: '#/demo/nexatech',
    image:
      'https://images.pexels.com/photos/29735307/pexels-photo-29735307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Golden architectural 3D light study on obsidian surface',
  },
];

export const BUSINESS_SOLUTIONS: BusinessSolutionItem[] = [
  {
    number: '01',
    category: 'Creative',
    title: 'Pixel Moments',
    subtitle: 'Photography & Creative Portfolio',
    description:
      'Pakistani wedding, portrait and event photography studio with filterable galleries, PKR packages and booking inquiries.',
    route: '#/demo/pixel-moments',
    image:
      'https://images.pexels.com/photos/4549411/pexels-photo-4549411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Photographer preparing camera and studio portfolio in warm light',
  },
  {
    number: '02',
    category: 'Business Systems',
    title: 'EstateFlow CRM',
    subtitle: 'Real Estate CRM',
    description:
      'Pakistani real estate CRM with DHA, Clifton and Bahria Town property listings, pipeline tracking, PKR deal values and analytics.',
    route: '#/demo/estateflow-crm',
    image:
      'https://images.pexels.com/photos/39204825/pexels-photo-39204825.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Real estate advisors presenting property revenue growth analytics',
  },
  {
    number: '03',
    category: 'Business Systems',
    title: 'SupportSphere',
    subtitle: 'Customer Support',
    description:
      'Pakistani e-commerce support platform with live chat simulation, ticket tracking, courier order lookup, FAQ and agent queue.',
    route: '#/demo/supportsphere',
    image:
      'https://images.pexels.com/photos/7709176/pexels-photo-7709176.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Support headset and workstation for online shopping assistance',
  },
  {
    number: '04',
    category: 'Business Systems',
    title: 'TeamSync',
    subtitle: 'Team & Productivity',
    description:
      'Pakistani creative agency productivity workspace with Kanban boards, task assignment, deadlines, sprint calendar and team profiles.',
    route: '#/demo/teamsync',
    image:
      'https://images.pexels.com/photos/17724731/pexels-photo-17724731.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Digital agency team planning sprint milestones on whiteboard',
  },
  {
    number: '05',
    category: 'Operations',
    title: 'PeopleFirst HR',
    subtitle: 'HR & Recruitment',
    description:
      'Pakistani HR & recruitment hub with employee directory, job vacancies, application forms, attendance logs and leave approvals.',
    route: '#/demo/peoplefirst-hr',
    image:
      'https://images.pexels.com/photos/5439379/pexels-photo-5439379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'HR specialist conducting a candidate recruitment interview',
  },
  {
    number: '06',
    category: 'Operations',
    title: 'Finora',
    subtitle: 'Finance & Accounting',
    description:
      'Pakistani accounting and tax consultancy platform with PKR income/expense ledgers, invoice builder, FBR tax services and downloadable reports.',
    route: '#/demo/finora',
    image:
      'https://images.pexels.com/photos/17065743/pexels-photo-17065743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Financial calculator and tax documentation on advisory desk',
  },
  {
    number: '07',
    category: 'Operations',
    title: 'StockPilot',
    subtitle: 'Operations & Inventory',
    description:
      'Pakistani clothing & fashion brand inventory console with SKU catalog, PKR pricing, low-stock alerts, suppliers and courier orders.',
    route: '#/demo/stockpilot',
    image:
      'https://images.pexels.com/photos/4487383/pexels-photo-4487383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Fulfillment team organizing apparel inventory packages',
  },
  {
    number: '08',
    category: 'Growth',
    title: 'MarketPulse',
    subtitle: 'Marketing & Analytics',
    description:
      'Pakistani digital marketing agency showcase with SEO & social services, campaign management, conversion charts and lead capture.',
    route: '#/demo/marketpulse',
    image:
      'https://images.pexels.com/photos/8636589/pexels-photo-8636589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Digital marketing strategist reviewing conversion analytics graphs',
  },
  {
    number: '09',
    category: 'Growth',
    title: 'EduSphere',
    subtitle: 'Education & Events',
    description:
      'Pakistani Computer Science & IT institute portal with CS, Web, Python & AI courses, online admission, faculty and student dashboard.',
    route: '#/demo/edusphere',
    image:
      'https://images.pexels.com/photos/5905749/pexels-photo-5905749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Computer science instructor mentoring students during class',
  },
  {
    number: '10',
    category: 'Hospitality',
    title: 'Sweet Crumbs Bakery',
    subtitle: 'Food & Local Business',
    description:
      'Pakistani artisan bakery website with fresh cakes, custom birthday & wedding cakes, PKR cart totals, checkout simulation and reviews.',
    route: '#/demo/sweet-crumbs-bakery',
    image:
      'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Artisanal baked treats and celebratory table presentation',
  },
];

export const PORTFOLIO_CONCEPTS: PortfolioConceptItem[] = [
  {
    id: 'buildcraft-arch',
    category: 'Business Websites',
    title: 'BuildCraft',
    summary: 'Pakistani construction & architectural firm portal with turnkey villa and commercial showcases.',
    image:
      'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Architects and engineers discussing residential construction drawings',
    challenge:
      'Property developers and homeowners across Lahore and Islamabad need transparent cost estimates and verified grey-to-turnkey portfolios.',
    solution:
      'A structured residential and commercial showcase paired with an interactive PKR construction cost estimator and site visit request.',
    highlights: ['PKR Construction Estimator', 'Residential & Commercial Gallery', 'Turnkey Inquiry Flow'],
    linkedDemoRoute: '#/demo/buildcraft',
  },
  {
    id: 'pixel-moments-studio',
    category: 'Personal Portfolios',
    title: 'Pixel Moments',
    summary: 'Fine-art Pakistani wedding, portrait, and heritage courtyard photography portfolio.',
    image:
      'https://images.pexels.com/photos/4875202/pexels-photo-4875202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Photographer with a DSLR camera against a dark background',
    challenge:
      'Bridal couples and editorial clients want immersive high-resolution galleries and clear PKR coverage tiers before booking.',
    solution:
      'An image-first gallery experience with lightbox inspection, PKR wedding packages, and instant date availability inquiry.',
    highlights: ['Wedding & Portrait Galleries', 'Transparent PKR Packages', 'Booking Inquiry Form'],
    linkedDemoRoute: '#/demo/pixel-moments',
  },
  {
    id: 'glownest-skincare',
    category: 'Creative Landing Pages',
    title: 'GlowNest',
    summary: 'Minimal luxury botanical skincare landing page tailored for Pakistani consumers.',
    image:
      'https://images.pexels.com/photos/149897/pexels-photo-149897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Creative studio desk styling product launch visuals',
    challenge:
      'Direct-to-consumer skincare launches require ingredient trust, clear bundle pricing in PKR, and frictionless COD ordering.',
    solution:
      'A cream-and-sage conversion landing page featuring saffron & rosewater formulation details, bundles, FAQs, and simulated checkout.',
    highlights: ['Ingredient Transparency', 'PKR Bundle Selector', 'COD Demo Checkout'],
    linkedDemoRoute: '#/demo/glownest',
  },
  {
    id: 'spice-avenue-redesign',
    category: 'Agency Websites',
    title: 'Spice Avenue',
    summary: 'Before-and-after digital transformation for a flagship traditional Pakistani restaurant.',
    image:
      'https://images.pexels.com/photos/3688759/pexels-photo-3688759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Designers reviewing before and after layout prototypes',
    challenge:
      'Legacy restaurant sites lose mobile diners with slow PDFs, broken menus, and missing online table reservation flows.',
    solution:
      'An interactive side-by-side comparison proving speed and conversion uplift, backed by a full PKR ordering and reservation portal.',
    highlights: ['Interactive Before/After Slider', 'Traditional Pakistani Menu', 'Table Reservations & Cart'],
    linkedDemoRoute: '#/demo/spice-avenue',
  },
  {
    id: 'edusphere-institute',
    category: 'Educational Websites',
    title: 'EduSphere',
    summary: 'Modern Pakistani Computer Science, Web Development, Python, and AI institute platform.',
    image:
      'https://images.pexels.com/photos/5934556/pexels-photo-5934556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Computer science student coding on laptop with course materials',
    challenge:
      'Prospective tech students struggle when course syllabi, faculty profiles, schedules, and admission forms live across scattered pages.',
    solution:
      'An all-in-one academic platform unifying PKR course admissions, student learning progress tracking, class timetables, and tech events.',
    highlights: ['Online Admission Form', 'Student Progress Tracker', 'Faculty & Class Schedules'],
    linkedDemoRoute: '#/demo/edusphere',
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
