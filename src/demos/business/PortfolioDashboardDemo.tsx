import React, { useMemo, useState } from 'react';
import { Calendar, Camera, CheckCircle2, Mail, MapPin, Phone, X } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr } from '../../utils/demoLogic';

interface PhotoSeries {
  id: string;
  title: string;
  category: 'Wedding' | 'Portrait' | 'Event';
  location: string;
  date: string;
  cameraSpec: string;
  story: string;
  image: string;
}

const PHOTO_SERIES: PhotoSeries[] = [
  {
    id: 'pm-1',
    title: 'Shahi Qila Courtyard Baraat',
    category: 'Wedding',
    location: 'Walled City, Lahore',
    date: 'November 2026',
    cameraSpec: 'Leica Q3 · 28mm f/1.7 · ISO 400',
    story:
      'Editorial dusk portraiture capturing heritage sandstone arches, hand-embroidered emerald attire, and candlelit courtyards.',
    image: DEMO_MEDIA.pixelMomentsBridal,
  },
  {
    id: 'pm-2',
    title: 'Mehndi & Sangeet Lanterns',
    category: 'Event',
    location: 'Margalla Foothills, Islamabad',
    date: 'October 2026',
    cameraSpec: 'Sony A7R V · 50mm f/1.2 · ISO 640',
    story:
      'Candid documentary coverage of outdoor dholki celebrations, marigold floral canopies, and family performances.',
    image: DEMO_MEDIA.pixelMomentsMehndi,
  },
  {
    id: 'pm-3',
    title: 'Founder Studio Monograph',
    category: 'Portrait',
    location: 'Clifton Studio, Karachi',
    date: 'September 2026',
    cameraSpec: 'Hasselblad X2D · 80mm f/1.9 · ISO 100',
    story:
      'Natural-light executive and creative director portraits crafted for editorial magazines and annual brand lookbooks.',
    image: DEMO_MEDIA.creativeDirector,
  },
  {
    id: 'pm-4',
    title: 'Faisal Mosque Morning Nikah',
    category: 'Wedding',
    location: 'Sector E-7, Islamabad',
    date: 'August 2026',
    cameraSpec: 'Canon R5 · 85mm f/1.4 · ISO 200',
    story:
      'Intimate daytime nikah storytelling anchored around white travertine geometry and serene family vows.',
    image: DEMO_MEDIA.editorialGallery,
  },
  {
    id: 'pm-5',
    title: 'Karachi Fashion Week Backstage',
    category: 'Event',
    location: 'Beach Luxury Hotel, Karachi',
    date: 'July 2026',
    cameraSpec: 'Leica SL3 · 35mm f/1.4 · ISO 800',
    story:
      'Fast-paced backstage runway documentation spotlighting Pakistani textile designers, tailoring, and spotlight choreography.',
    image: DEMO_MEDIA.stockpilotApparel,
  },
  {
    id: 'pm-6',
    title: 'Architect at Golden Hour',
    category: 'Portrait',
    location: 'Gulberg III, Lahore',
    date: 'June 2026',
    cameraSpec: 'Sony A7R V · 35mm f/1.4 · ISO 160',
    story:
      'Environmental portrait series framed inside concrete and timber courtyard residences across Lahore.',
    image: DEMO_MEDIA.architectureHero,
  },
];

const PACKAGES = [
  {
    id: 'nikah',
    name: 'Nikah & Couple Portrait',
    pricePkr: 85000,
    duration: '5 Hours · 1 Lead Photographer',
    deliverables: [
      '180 color-graded high-resolution images',
      '1 handcrafted linen photo album (25 spreads)',
      'Private online gallery delivered in 10 days',
    ],
  },
  {
    id: 'signature',
    name: 'Signature Baraat / Walima',
    pricePkr: 185000,
    duration: 'Full Day · 2 Photographers + Assistant',
    deliverables: [
      '450+ edited documentary & editorial frames',
      'Same-night 20 sneak-peek frames on WhatsApp',
      'Premium 40-spread Italian leather coffee-table book',
    ],
  },
  {
    id: 'heritage',
    name: 'Complete 3-Day Bridal Story',
    pricePkr: 340000,
    duration: 'Mehndi, Baraat & Walima · Full Crew',
    deliverables: [
      '1,100+ curated archival images + 4K highlight film',
      'Two parent keepsake albums & bespoke wooden box',
      'Travel covered across Lahore, Islamabad & Karachi',
    ],
  },
];

const SAMPLE_TESTIMONIALS = [
  {
    quote:
      'Pixel Moments captured our Shahi Qila Nikah with such calm poise. Every frame feels like a timeless painting.',
    author: 'Zoya & Bilal Mansoor',
    event: 'Lahore Wedding · Sample Testimonial',
  },
  {
    quote:
      'Our entire executive leadership portrait shoot in Clifton wrapped on schedule with remarkable editorial clarity.',
    author: 'Tariq Mahmood, Partner at Indus Ventures',
    event: 'Karachi Portrait Commission · Sample Testimonial',
  },
];

export function PortfolioDashboardDemo({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState<'All' | 'Wedding' | 'Portrait' | 'Event'>('All');
  const [lightboxItem, setLightboxItem] = useState<PhotoSeries | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<string>('Signature Baraat / Walima');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [city, setCity] = useState('Lahore');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const visibleGallery = useMemo(
    () =>
      category === 'All'
        ? PHOTO_SERIES
        : PHOTO_SERIES.filter((item) => item.category === category),
    [category],
  );

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !phone.trim() || !eventDate) {
      setError('Please enter your name, phone number, and preferred event date.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-[#0E0D0C] text-[#F7F4EF]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Photography & Creative Portfolio"
        clientBrand="Pixel Moments"
        categoryLabel="Business Demo 01"
        onBack={onBack}
        theme="dark"
      />

      {/* Top Navigation Bar */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-5 sm:px-6">
          <span
            className="text-xl font-semibold tracking-tight text-[#D4AF37] whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Pixel Moments
          </span>
          <nav aria-label="Studio navigation" className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-300">
            <a href="#pm-about" className="hover:text-[#D4AF37] whitespace-nowrap shrink-0">Photographer</a>
            <a href="#pm-gallery" className="hover:text-[#D4AF37] whitespace-nowrap shrink-0">Galleries</a>
            <a href="#pm-packages" className="hover:text-[#D4AF37] whitespace-nowrap shrink-0">PKR Packages</a>
            <a href="#pm-book" className="hover:text-[#D4AF37] whitespace-nowrap shrink-0">Contact</a>
          </nav>
          <a
            href="#pm-book"
            className="rounded-lg bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#0E0D0C] hover:bg-[#E3C45B] whitespace-nowrap shrink-0"
          >
            Book a Shoot
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-20">
        {/* Cinematic Hero Split */}
        <section className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between py-2 lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#D4AF37]">
                Lahore · Islamabad · Karachi
              </p>
              <h1
                className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl"
                style={{ fontFamily: '"Cormorant Garamond", serif', textWrap: 'balance' }}
              >
                Timeless Pakistani weddings, portraits &amp; visual stories.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-300">
                Founded by Hamza Qureshi, Pixel Moments crafts fine-art wedding stories, intimate
                studio portraits, and cultural event photography rooted in natural light and human
                emotion.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#pm-gallery"
                className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-xs font-bold text-[#0E0D0C] hover:bg-[#E3C45B]"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Explore Galleries
              </a>
              <a
                href="#pm-packages"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-xs font-semibold text-white hover:border-[#D4AF37]"
              >
                View PKR Packages
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] overflow-hidden rounded-2xl border border-white/10">
              <ResilientImage
                src={DEMO_MEDIA.pixelMomentsBridal}
                alt="Editorial bridal portrait in historic Lahore courtyard"
                className="h-full w-full object-cover"
                fallbackLabel="Pixel Moments Lahore"
              />
            </div>
          </div>
        </section>

        {/* Full-Width Metrics Row */}
        <section className="grid grid-cols-2 gap-6 border-y border-white/10 py-8 sm:grid-cols-4">
          <div>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#D4AF37]">240+</p>
            <p className="mt-1 text-xs text-neutral-400">Weddings Documented</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold tabular-nums text-white">9 Years</p>
            <p className="mt-1 text-xs text-neutral-400">Editorial Craft</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold tabular-nums text-white">72 Hours</p>
            <p className="mt-1 text-xs text-neutral-400">Sneak-Peek Delivery</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold tabular-nums text-white">3 Cities</p>
            <p className="mt-1 text-xs text-neutral-400">LHE · ISB · KHI</p>
          </div>
        </section>

        {/* Photographer Introduction */}
        <section id="pm-about" className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <ResilientImage
                src={DEMO_MEDIA.creativeDirector}
                alt="Hamza Qureshi — Lead Photographer at Pixel Moments"
                className="h-full w-full object-cover"
                fallbackLabel="Hamza Qureshi"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[#D4AF37]">
              Meet The Lead Photographer
            </p>
            <h2
              className="text-3xl font-semibold sm:text-4xl"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Hamza Qureshi — Seeing heritage with quiet honesty.
            </h2>
            <p className="text-sm leading-relaxed text-neutral-300">
              Trained in documentary visual arts in Lahore, Hamza leads a six-person team across
              Punjab, Islamabad, and Sindh. Rather than forced poses, Pixel Moments observes fleeting
              smiles during a morning Nikah, intricate zardozi craftsmanship, and candid embraces on
              the mehndi floor.
            </p>
            <div className="grid gap-4 pt-2 sm:grid-cols-3 text-xs text-neutral-300">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-semibold text-[#D4AF37]">Wedding Storytelling</p>
                <p className="mt-1 text-neutral-400">Mayoun, Mehndi, Nikah, Baraat &amp; Walima coverage.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-semibold text-[#D4AF37]">Studio Portraits</p>
                <p className="mt-1 text-neutral-400">Editorial lookbooks, family heirlooms &amp; leadership.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-semibold text-[#D4AF37]">Cultural Events</p>
                <p className="mt-1 text-neutral-400">Brand launches, exhibitions &amp; private galas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Galleries */}
        <section id="pm-gallery" className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#D4AF37]">
                Curated Portfolios
              </p>
              <h2
                className="mt-2 text-3xl font-semibold sm:text-4xl"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Selected Photo Series
              </h2>
            </div>

            <div className="inline-flex gap-1 rounded-lg bg-white/5 p-1">
              {(['All', 'Wedding', 'Portrait', 'Event'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                    category === cat
                      ? 'bg-[#D4AF37] text-[#0E0D0C]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleGallery.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151412]"
              >
                <button
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  className="block w-full text-left cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackLabel={item.title}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="text-[#D4AF37]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-neutral-400">{item.story}</p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* PKR Photography Packages */}
        <section id="pm-packages" className="space-y-8 border-t border-white/10 pt-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#D4AF37]">
              Transparent Investment
            </p>
            <h2
              className="mt-2 text-3xl font-semibold sm:text-4xl"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Photography Packages (PKR)
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPkg === pkg.name;
              return (
                <div
                  key={pkg.id}
                  className={`flex flex-col justify-between rounded-2xl border p-7 transition-colors ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#191611]'
                      : 'border-white/10 bg-[#151412]'
                  }`}
                >
                  <div>
                    <p className="text-xs text-neutral-400">{pkg.duration}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{pkg.name}</h3>
                    <p className="mt-4 font-mono text-2xl font-bold tabular-nums text-[#D4AF37]">
                      {formatPkr(pkg.pricePkr)}
                    </p>
                    <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-xs text-neutral-300">
                      {pkg.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#pm-book"
                    onClick={() => setSelectedPkg(pkg.name)}
                    className={`mt-7 block rounded-lg py-2.5 text-center text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#0E0D0C]'
                        : 'border border-white/20 text-white hover:border-[#D4AF37]'
                    }`}
                  >
                    {isSelected ? 'Selected for Inquiry' : 'Choose Package'}
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sample Customer Testimonials */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl font-semibold sm:text-3xl"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Client Reflections
            </h2>
            <span className="text-xs text-neutral-400">Sample Content · Demonstration Reviews</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {SAMPLE_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.author}
                className="rounded-2xl border border-white/10 bg-[#151412] p-6"
              >
                <p className="text-sm leading-relaxed text-neutral-200">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-4 text-xs text-neutral-400">
                  <strong className="text-white">{item.author}</strong> · {item.event}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Booking Inquiry Form & Studio Contact */}
        <section
          id="pm-book"
          className="grid gap-10 rounded-2xl border border-white/10 bg-[#151412] p-7 lg:grid-cols-12 sm:p-10"
        >
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[#D4AF37]">
              Reserve Your Date
            </p>
            <h2
              className="text-3xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Pixel Moments Booking Inquiry
            </h2>
            <p className="text-sm leading-relaxed text-neutral-300">
              Share your event date and venue city. Our studio coordinator responds within 24 hours
              with date availability and custom album add-ons.
            </p>
            <div className="space-y-3 border-t border-white/10 pt-5 text-xs text-neutral-300">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#D4AF37]" /> Studio 14-B, MM Alam Road, Gulberg III, Lahore
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#D4AF37]" /> +92 300 412 8890 (Sample Studio Line)
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#D4AF37]" /> bookings@pixelmoments.pk (Sample)
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-xl border border-[#D4AF37]/40 bg-[#0E0D0C] p-6" role="status">
                <CheckCircle2 className="h-7 w-7 text-[#D4AF37]" />
                <h3 className="mt-3 text-xl font-semibold text-white">
                  Simulated Booking Inquiry Recorded
                </h3>
                <p className="mt-2 text-sm text-neutral-300">
                  Thank you, <strong>{name}</strong>. Your simulated inquiry for{' '}
                  <strong>{selectedPkg}</strong> in <strong>{city}</strong> on{' '}
                  <strong>{eventDate}</strong> has been logged in this demo preview.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setNotes('');
                  }}
                  className="mt-5 rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                >
                  Submit Another Demo Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pm-name" className="text-xs font-medium text-neutral-300">
                    Full Name
                  </label>
                  <input
                    id="pm-name"
                    type="text"
                    placeholder="Ayesha Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0E0D0C] px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="pm-phone" className="text-xs font-medium text-neutral-300">
                    WhatsApp / Phone
                  </label>
                  <input
                    id="pm-phone"
                    type="tel"
                    placeholder="+92 321 555 0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0E0D0C] px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="pm-pkg" className="text-xs font-medium text-neutral-300">
                    Package
                  </label>
                  <select
                    id="pm-pkg"
                    value={selectedPkg}
                    onChange={(e) => setSelectedPkg(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0E0D0C] px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {formatPkr(p.pricePkr)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="pm-city" className="text-xs font-medium text-neutral-300">
                      City
                    </label>
                    <select
                      id="pm-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0E0D0C] px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option>Lahore</option>
                      <option>Islamabad</option>
                      <option>Karachi</option>
                      <option>Multan</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pm-date" className="text-xs font-medium text-neutral-300">
                      Event Date
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        id="pm-date"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-[#0E0D0C] px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pm-notes" className="text-xs font-medium text-neutral-300">
                    Venue &amp; Story Notes
                  </label>
                  <textarea
                    id="pm-notes"
                    rows={3}
                    placeholder="Share venue name, event timings, or custom portrait requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0E0D0C] px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                {error && (
                  <p role="alert" className="sm:col-span-2 text-xs text-rose-400">
                    {error}
                  </p>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3 text-xs font-bold text-[#0E0D0C] hover:bg-[#E3C45B] cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Send Booking Inquiry (Demo)
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Photography FAQ */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Booking &amp; Delivery Guide
            </p>
            <h2
              className="mt-1 text-3xl font-semibold text-white"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: 'How far ahead should we reserve Lahore or Islamabad wedding dates?',
                a: 'Winter Barat and Walima dates (November–February) typically book 3 to 5 months in advance.',
              },
              {
                q: 'How soon do we receive color-graded digital galleries?',
                a: 'Sneak-peek highlights arrive within 72 hours, with the full high-resolution gallery delivered in 3 weeks.',
              },
              {
                q: 'Do you travel for destination weddings outside Lahore?',
                a: 'Yes — we cover Islamabad, Karachi, Swat, and Bhurban with transparent nationwide travel logistics.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-white/10 bg-[#141311] p-5 space-y-2">
                <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                <p className="text-xs leading-relaxed text-neutral-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Studio Footer */}
      <footer className="border-t border-white/10 bg-[#080807] text-neutral-400">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p
              className="text-2xl font-semibold text-white"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              PIXEL MOMENTS
            </p>
            <p className="max-w-sm leading-relaxed">
              Editorial wedding, portrait, and cultural event photography studio serving families
              and creative brands across Lahore, Islamabad, and Karachi.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Studio Navigation</p>
            <ul className="space-y-1.5">
              <li><a href="#pm-gallery" className="hover:text-[#D4AF37]">Photography Galleries</a></li>
              <li><a href="#pm-packages" className="hover:text-[#D4AF37]">PKR Packages</a></li>
              <li><a href="#pm-booking" className="hover:text-[#D4AF37]">Check Date Availability</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Studios &amp; Contact</p>
            <p>18-K Gulberg II, Lahore</p>
            <p>F-7 Markaz, Islamabad</p>
            <p className="text-[#D4AF37]">bookings@pixelmoments.pk</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-neutral-500">
          Pixel Moments Studio · Interactive Client Demonstration Website (Sample Content)
        </div>
      </footer>

      {/* Lightbox Viewer */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-white/15 bg-[#121110] p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Close lightbox"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#D4AF37] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs text-[#D4AF37]">
              {lightboxItem.category} · {lightboxItem.location} · {lightboxItem.date}
            </p>
            <h3
              className="mt-1 text-2xl font-semibold text-white"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {lightboxItem.title}
            </h3>
            <div className="mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
              <ResilientImage
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="h-full w-full object-cover"
                fallbackLabel={lightboxItem.title}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
              <p className="max-w-xl">{lightboxItem.story}</p>
              <p className="font-mono text-[#D4AF37]">{lightboxItem.cameraSpec}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
