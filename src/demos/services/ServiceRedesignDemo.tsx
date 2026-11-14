import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Gauge,
  Globe,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  UtensilsCrossed,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { calculateFoodOrderTotals, formatPkr, type CartEntry } from '../../utils/demoLogic';

interface SpiceMenuItem {
  id: string;
  name: string;
  category: 'Karahi & Handi' | 'Biryani & Pulao' | 'BBQ & Tandoor' | 'Desserts & Chai';
  pricePkr: number;
  spiceNote: string;
  description: string;
  image: string;
}

const MENU_ITEMS: SpiceMenuItem[] = [
  {
    id: 'sa-1',
    name: 'Shinwari Mutton Karahi (1 kg)',
    category: 'Karahi & Handi',
    pricePkr: 3450,
    spiceNote: 'Medium-Hot · Iron Wok',
    description: 'Bone-in Chiniot mutton wok-seared over open flame with vine tomatoes, green chilies, and fresh julienne ginger.',
    image: DEMO_MEDIA.spiceAvenueKarahi,
  },
  {
    id: 'sa-2',
    name: 'Mughlai Malai Chicken Handi',
    category: 'Karahi & Handi',
    pricePkr: 2150,
    spiceNote: 'Rich & Mild · Clay Pot',
    description: 'Slow-simmered boneless chicken in toasted almond-cream gravy finished with white pepper and fenugreek.',
    image: DEMO_MEDIA.spiceAvenueCuisine,
  },
  {
    id: 'sa-3',
    name: 'Lahori Chicken Dum Biryani',
    category: 'Biryani & Pulao',
    pricePkr: 1350,
    spiceNote: 'Saffron & Mint',
    description: 'Aged long-grain basmati steamed under dough seal with saffron milk, crispy onions, and house mint raita.',
    image: DEMO_MEDIA.spiceAvenueBiryani,
  },
  {
    id: 'sa-4',
    name: 'Peshawari Kabuli Lamb Pulao',
    category: 'Biryani & Pulao',
    pricePkr: 1950,
    spiceNote: 'Aromatic Spices',
    description: 'Tender slow-braised lamb shank nestled in caramelized carrot, black raisin, and cardamom-infused yakhni rice.',
    image: DEMO_MEDIA.spiceAvenueBiryani,
  },
  {
    id: 'sa-5',
    name: 'Reshmi Seekh Kebab Platter',
    category: 'BBQ & Tandoor',
    pricePkr: 1850,
    spiceNote: 'Charcoal Grill',
    description: 'Four hand-minced chicken & beef kebabs skewered over glowing acacia charcoal with tamarind chutney and 2 roghan naans.',
    image: DEMO_MEDIA.spiceAvenueHearth,
  },
  {
    id: 'sa-6',
    name: 'Shahi Gajar Halwa & Kashmiri Chai',
    category: 'Desserts & Chai',
    pricePkr: 880,
    spiceNote: 'Pistachio & Khoya',
    description: 'Warm winter red-carrot pudding topped with khoya and slivered almonds, paired with pink pistachio noon chai.',
    image: DEMO_MEDIA.spiceAvenueCuisine,
  },
];

const SAMPLE_REVIEWS = [
  {
    author: 'Bilal & Sana Raza',
    city: 'Gulberg III, Lahore',
    rating: 5,
    quote: 'Booked our anniversary dinner online in 30 seconds—the Shinwari Karahi and courtyard seating were memorable.',
  },
  {
    author: 'Tariq Mehmood',
    city: 'Model Town, Lahore',
    rating: 5,
    quote: 'Huge improvement over the old site. Ordering Kabuli Pulao and Seekh Kebabs for family pickup is effortless on mobile.',
  },
];

export function ServiceRedesignDemo({ onBack }: { onBack: () => void }) {
  const [sliderPos, setSliderPos] = useState(46);
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split');

  const [menuCategory, setMenuCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartEntry[]>([
    { id: 'sa-1', name: 'Shinwari Mutton Karahi (1 kg)', price: 3450, quantity: 1 },
  ]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState<string | null>(null);

  const [resName, setResName] = useState('');
  const [resDate, setResDate] = useState('2026-11-22');
  const [resTime, setResTime] = useState('20:30');
  const [resGuests, setResGuests] = useState('4');
  const [resZone, setResZone] = useState('Courtyard Terrace');
  const [resConfirmation, setResConfirmation] = useState<string | null>(null);

  const effectivePct = viewMode === 'before' ? 100 : viewMode === 'after' ? 0 : sliderPos;

  const filteredMenu = useMemo(
    () => MENU_ITEMS.filter((item) => menuCategory === 'All' || item.category === menuCategory),
    [menuCategory],
  );

  const totals = useMemo(() => calculateFoodOrderTotals(cart, orderType), [cart, orderType]);

  const addToCart = (item: SpiceMenuItem) => {
    setOrderConfirmation(null);
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: item.id, name: item.name, price: item.pricePkr, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName.trim() || !customerPhone.trim()) return;
    if (orderType === 'delivery' && !customerAddress.trim()) return;
    setOrderConfirmation(
      `Simulated ${orderType} order #SA-418 (${formatPkr(totals.total)}) logged for ${customerName.trim()}. Demo only—no real charge or dispatch.`,
    );
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim()) return;
    setResConfirmation(
      `Simulated table hold for ${resGuests} guests under ${resName.trim()} (${resDate} at ${resTime} · ${resZone}). Demo confirmation only.`,
    );
    setResName('');
  };

  return (
    <div
      className="min-h-screen bg-[#FBF8F3] text-[#1F1915]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Website Redesign"
        clientBrand="Spice Avenue"
        categoryLabel="Service Demo 14"
        onBack={onBack}
      />

      <header className="border-b border-[#E7DEC8] bg-[#FBF8F3]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a
            href="#sa-comparison"
            className="text-xl font-bold tracking-tight text-[#112A22] whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            SPICE AVENUE
          </a>
          <nav aria-label="Spice Avenue sections" className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#5C534A]">
            <a href="#sa-comparison" className="hover:text-[#112A22] whitespace-nowrap">2016 vs 2026 Redesign</a>
            <a href="#sa-menu" className="hover:text-[#112A22] whitespace-nowrap">PKR Menu &amp; Cart</a>
            <a href="#sa-reserve" className="hover:text-[#112A22] whitespace-nowrap">Reserve Table</a>
            <a href="#sa-faq" className="hover:text-[#112A22] whitespace-nowrap">Reviews &amp; FAQ</a>
          </nav>
          <a
            href="#sa-menu"
            className="rounded-lg bg-[#112A22] px-4 py-2 text-xs font-bold text-[#FBF8F3] hover:bg-[#1B4236] whitespace-nowrap shrink-0"
          >
            Order Online ({cart.reduce((s, c) => s + c.quantity, 0)})
          </a>
        </div>
      </header>

      <div id="sa-comparison" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-16">
        {/* Before / After Redesign Case Study Header */}
        <section className="flex flex-col gap-6 border-b border-[#E7DEC8] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9A5B13]">
              Website Redesign Transformation · Lahore Hospitality
            </p>
            <h1
              className="mt-2 text-3xl font-bold tracking-tight text-[#112A22] sm:text-5xl"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Spice Avenue: From 2016 Static Menu to Modern Ordering &amp; Reservations
            </h1>
          </div>

          <div className="inline-flex shrink-0 flex-wrap sm:flex-nowrap gap-1.5 rounded-xl border border-[#E7DEC8] bg-white p-1 self-start lg:self-auto">
            {(
              [
                { id: 'split', label: 'Interactive Split' },
                { id: 'before', label: '2016 Legacy Site' },
                { id: 'after', label: '2026 Modern Site' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setViewMode(m.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                  viewMode === m.id ? 'bg-[#112A22] text-white' : 'text-[#5C534A]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Interactive Before/After Comparison Stage */}
        <section className="space-y-4">
          <div className="relative h-[430px] w-full overflow-hidden rounded-2xl border border-[#D8CEB8] bg-white shadow-sm">
            {/* AFTER LAYER (2026 Spice Avenue Modern Redesign) */}
            <div className="absolute inset-0 flex flex-col justify-between bg-[#112A22] p-7 text-[#FBF8F3] sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold tracking-wider text-[#E2B45C]">
                  SPICE AVENUE · 2026 REDESIGN
                </span>
                <span className="rounded-md bg-[#E2B45C]/15 px-3 py-1 text-xs font-semibold text-[#F4D08A] whitespace-nowrap">
                  0.8s Load · PKR Online Ordering
                </span>
              </div>

              <div className="grid items-center gap-6 md:grid-cols-12">
                <div className="md:col-span-6">
                  <h2
                    className="text-2xl font-bold leading-tight sm:text-4xl"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    Wood-fired Shinwari &amp; royal Lahori dastarkhwan, reserved in one tap.
                  </h2>
                  <p className="mt-3 text-sm text-[#D8E2DC]">
                    High-contrast mobile dining menu, live PKR takeaway cart, and instant Gulberg
                    courtyard table booking.
                  </p>
                  <div className="mt-5 flex gap-3">
                    <a
                      href="#sa-menu"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#E2B45C] px-4 py-2 text-xs font-bold text-[#112A22]"
                    >
                      Explore Live Menu <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right-aligned Modern Preview Card */}
                <div className="hidden md:block md:col-span-6">
                  <div className="ml-auto max-w-sm rounded-xl border border-[#E2B45C]/30 bg-[#193A2F] p-5 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E2B45C]">
                          Signature Dish · Gulberg III
                        </p>
                        <p className="text-sm font-bold text-white">Shinwari Mutton Karahi</p>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#F4D08A]">
                        {formatPkr(3450)}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-black/25 p-2.5">
                        <p className="text-[#B8C7BF]">Prep &amp; Delivery</p>
                        <p className="mt-0.5 font-mono text-base font-bold text-white">35 mins</p>
                      </div>
                      <div className="rounded-lg bg-black/25 p-2.5">
                        <p className="text-[#B8C7BF]">Table Bookings</p>
                        <p className="mt-0.5 font-mono text-base font-bold text-[#F4D08A]">
                          Instant Hold
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-4 text-xs text-[#D8E2DC]">
                <span>+190% Direct Orders</span>
                <span>19% Mobile Bounce</span>
                <span>Bilingual-Ready UX</span>
              </div>
            </div>

            {/* BEFORE LAYER (2016 Legacy HTML Page) */}
            <div
              className="absolute inset-0 overflow-hidden bg-[#E6DFD1] text-[#2B2623]"
              style={{ clipPath: `inset(0 ${100 - effectivePct}% 0 0)` }}
            >
              <div className="flex h-full flex-col justify-between border-4 border-[#8B7D6B] p-8 sm:p-12 font-serif">
                <div className="flex items-center justify-between border-b-2 border-[#8B7D6B] pb-2">
                  <span className="text-base font-bold uppercase text-[#7A1C1C] underline">
                    SPICE AVENUE RESTAURANT LAHORE — 2016 SITE
                  </span>
                  <span className="bg-yellow-200 px-2 py-0.5 text-xs font-mono text-red-900">
                    4.9s Load · Desktop Only
                  </span>
                </div>
                <div className="max-w-md space-y-2.5 bg-[#FFFDF8] p-4 sm:p-5 border-2 border-gray-500">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#5C1414]">
                    WELCOME TO SPICE AVENUE LAHORE HOMEPAGE!!!
                  </h2>
                  <p className="text-xs leading-normal text-gray-700">
                    Menu available only as 18MB scanned PDF download. Please call landline between
                    1pm–4pm for dine-in enquiries. No cart or table booking supported.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <span className="border-2 border-gray-600 bg-gray-200 px-3 py-1 text-xs font-bold">
                      SpiceAvenue_Menu_Scan_2016.pdf
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-700 font-mono">
                  68% Mobile Exit Rate · Zero Online Table Reservations
                </div>
              </div>
            </div>

            {viewMode === 'split' && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#E2B45C] shadow-[0_0_12px_rgba(226,180,92,0.9)]"
                style={{ left: `${effectivePct}%` }}
              />
            )}
          </div>

          {viewMode === 'split' && (
            <div className="flex items-center gap-2 sm:gap-4 rounded-xl border border-[#E7DEC8] bg-white px-3 sm:px-5 py-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#6B5E52] whitespace-nowrap shrink-0">
                2016 <span className="hidden sm:inline">Legacy (</span>Before<span className="hidden sm:inline">)</span>
              </span>
              <input
                type="range"
                aria-label="Before and after website comparison slider"
                min={0}
                max={100}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full min-w-0 flex-1 accent-[#112A22]"
              />
              <span className="text-[11px] sm:text-xs font-bold text-[#112A22] whitespace-nowrap shrink-0">
                2026 <span className="hidden sm:inline">Redesign (</span>After<span className="hidden sm:inline">)</span>
              </span>
            </div>
          )}
        </section>

        {/* Redesign Impact Metrics */}
        <section className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Gauge, metric: '4.9s → 0.8s', label: 'Mobile Menu Load Speed' },
            { icon: Sparkles, metric: '+190%', label: 'Direct Takeaway & Table Reservations' },
            { icon: Globe, metric: '68% → 19%', label: 'Mobile Bounce Rate Reduction' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-[#E7DEC8] bg-white p-6">
                <Icon className="h-5 w-5 text-[#9A5B13]" />
                <p className="mt-3 font-mono text-2xl font-bold tabular-nums text-[#112A22]">
                  {card.metric}
                </p>
                <p className="mt-1 text-xs text-[#5C534A]">{card.label}</p>
              </div>
            );
          })}
        </section>

        {/* Redesigned Spice Avenue Brand Hero & Dining Gallery */}
        <section className="grid items-center gap-8 rounded-2xl border border-[#E7DEC8] bg-white p-7 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9A5B13]">
              Live Redesigned Restaurant Experience
            </p>
            <h2
              className="text-3xl font-bold text-[#112A22] sm:text-4xl"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Spice Avenue — Authentic Pakistani Kitchen, Reimagined
            </h2>
            <p className="text-sm leading-relaxed text-[#5C534A]">
              Serving Lahore since 2012, Spice Avenue pairs wood-fired Shinwari karahis, slow-sealed
              Lahori dum biryani, and copper-pot handis with an intuitive PKR ordering &amp; table
              reservation experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs font-semibold text-[#112A22]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#9A5B13]" /> MM Alam Road, Gulberg III, Lahore
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#9A5B13]" /> 12:30 PM – 11:45 PM Daily
              </span>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-xl bg-[#EDE6D8]">
              <ResilientImage
                src={DEMO_MEDIA.spiceAvenueCuisine}
                alt="Traditional Pakistani Karahi, Biryani and Seekh Kebabs at Spice Avenue"
                className="h-full w-full object-cover"
                fallbackLabel="Spice Avenue Lahore"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#EDE6D8]">
              <ResilientImage
                src={DEMO_MEDIA.spiceAvenueKarahi}
                alt="Sizzling Shinwari Mutton Karahi"
                className="h-full w-full object-cover"
                fallbackLabel="Shinwari Karahi"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#EDE6D8]">
              <ResilientImage
                src={DEMO_MEDIA.spiceAvenueBiryani}
                alt="Aromatic saffron chicken dum biryani"
                className="h-full w-full object-cover"
                fallbackLabel="Dum Biryani"
              />
            </div>
          </div>
        </section>

        {/* Interactive Pakistani Food Menu + Shopping Cart */}
        <section id="sa-menu" className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2
                  className="text-3xl font-bold text-[#112A22]"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  Interactive Dastarkhwan Menu
                </h2>
                <p className="text-xs text-[#5C534A]">
                  Free Lahore delivery on orders {formatPkr(5000)}+ · Sample PKR prices
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Karahi & Handi', 'Biryani & Pulao', 'BBQ & Tandoor', 'Desserts & Chai'].map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setMenuCategory(cat)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                        menuCategory === cat
                          ? 'bg-[#112A22] text-white'
                          : 'border border-[#E7DEC8] bg-white text-[#5C534A]'
                      }`}
                    >
                      {cat}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E7DEC8] bg-white"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-[#EDE6D8]">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        fallbackLabel={item.name}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#9A5B13]">
                          {item.category} · {item.spiceNote}
                        </span>
                        <span className="font-mono text-sm font-bold tabular-nums text-[#112A22]">
                          {formatPkr(item.pricePkr)}
                        </span>
                      </div>
                      <h3
                        className="mt-1.5 text-xl font-bold text-[#1F1915]"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#5C534A]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#112A22] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1A3F33] cursor-pointer"
                    >
                      <UtensilsCrossed className="h-3.5 w-3.5" /> Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart & Simulated Checkout */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#D8CEB8] bg-white p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[#EFE8DA] pb-3">
                <div className="flex items-center gap-2 font-bold text-[#112A22]">
                  <ShoppingBag className="h-4 w-4 text-[#9A5B13]" />
                  <span>Your Order ({totals.itemCount})</span>
                </div>
                <div className="inline-flex rounded-lg border border-[#E7DEC8] p-0.5 text-xs font-semibold">
                  {(['delivery', 'pickup'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setOrderType(mode)}
                      className={`rounded-md px-2.5 py-1 capitalize cursor-pointer ${
                        orderType === mode ? 'bg-[#112A22] text-white' : 'text-[#5C534A]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {cart.length === 0 ? (
                <p className="py-4 text-center text-xs text-[#78716C]">
                  Your Spice Avenue tray is empty. Select dishes from the menu.
                </p>
              ) : (
                <ul className="space-y-3">
                  {cart.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between gap-2 border-b border-[#F5F0E6] pb-2 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1F1915] truncate">{entry.name}</p>
                        <p className="font-mono text-[#78716C]">
                          {formatPkr(entry.price * entry.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${entry.name}`}
                          onClick={() => updateQty(entry.id, -1)}
                          className="rounded border border-[#D8CEB8] p-1 hover:bg-[#F5F0E6] cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-mono font-bold tabular-nums">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${entry.name}`}
                          onClick={() => updateQty(entry.id, 1)}
                          className="rounded border border-[#D8CEB8] p-1 hover:bg-[#F5F0E6] cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Remove ${entry.name}`}
                          onClick={() => updateQty(entry.id, -entry.quantity)}
                          className="rounded p-1 text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="space-y-1.5 rounded-xl bg-[#FBF8F3] p-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5C534A]">Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPkr(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C534A]">PRA GST (5%)</span>
                  <span className="font-mono tabular-nums">{formatPkr(totals.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C534A]">Delivery ({orderType})</span>
                  <span className="font-mono tabular-nums">
                    {totals.deliveryFee === 0 ? 'Free' : formatPkr(totals.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E7DEC8] pt-2 text-sm font-bold text-[#112A22]">
                  <span>Total (COD Demo)</span>
                  <span className="font-mono tabular-nums">{formatPkr(totals.total)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-3">
                <input
                  type="text"
                  required
                  aria-label="Customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name (e.g., Hamza Sheikh)"
                  className="w-full rounded-lg border border-[#D8CEB8] px-3 py-2 text-xs"
                />
                <input
                  type="tel"
                  required
                  aria-label="Phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Mobile (03XX-XXXXXXX)"
                  className="w-full rounded-lg border border-[#D8CEB8] px-3 py-2 text-xs"
                />
                {orderType === 'delivery' && (
                  <input
                    type="text"
                    required
                    aria-label="Lahore delivery address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="House / Street / Block (Lahore)"
                    className="w-full rounded-lg border border-[#D8CEB8] px-3 py-2 text-xs"
                  />
                )}
                {orderConfirmation && (
                  <div
                    role="status"
                    className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{orderConfirmation}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full rounded-lg bg-[#9A5B13] py-2.5 text-xs font-bold text-white hover:bg-[#7F490D] disabled:opacity-40 cursor-pointer"
                >
                  Place Simulated COD Order
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Table Reservation + Sample Customer Reviews + FAQ */}
        <section className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 rounded-2xl bg-[#112A22] p-7 text-white space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E2B45C]">
              <Calendar className="h-4 w-4" /> Reserve a Table
            </div>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Book Gulberg Dining Hall or Courtyard Terrace
            </h2>

            <form onSubmit={handleReservation} className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                required
                aria-label="Guest name for reservation"
                value={resName}
                onChange={(e) => setResName(e.target.value)}
                placeholder="Guest Name"
                className="sm:col-span-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/60"
              />
              <input
                type="date"
                aria-label="Reservation date"
                value={resDate}
                onChange={(e) => setResDate(e.target.value)}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white"
              />
              <input
                type="time"
                aria-label="Reservation time"
                value={resTime}
                onChange={(e) => setResTime(e.target.value)}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white"
              />
              <select
                aria-label="Number of guests"
                value={resGuests}
                onChange={(e) => setResGuests(e.target.value)}
                className="rounded-lg border border-white/15 bg-[#193A2F] px-3 py-2 text-xs text-white"
              >
                {['2', '4', '6', '8', '12 (Family Majlis)'].map((g) => (
                  <option key={g} value={g}>
                    {g} Guests
                  </option>
                ))}
              </select>
              <select
                aria-label="Seating zone"
                value={resZone}
                onChange={(e) => setResZone(e.target.value)}
                className="rounded-lg border border-white/15 bg-[#193A2F] px-3 py-2 text-xs text-white"
              >
                <option value="Courtyard Terrace">Courtyard Terrace</option>
                <option value="Main Dining Hall">Main Dining Hall</option>
                <option value="Private Family Majlis">Private Family Majlis</option>
              </select>

              {resConfirmation && (
                <div
                  role="status"
                  className="sm:col-span-2 rounded-lg bg-[#E2B45C]/15 p-3 text-xs text-[#F4D08A]"
                >
                  {resConfirmation}
                </div>
              )}

              <button
                type="submit"
                className="sm:col-span-2 rounded-lg bg-[#E2B45C] py-2.5 text-xs font-bold text-[#112A22] hover:bg-[#F0C674] cursor-pointer"
              >
                Confirm Simulated Table Hold
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2
                className="text-2xl font-bold text-[#112A22]"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Guest Impressions &amp; Dining FAQ
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9A5B13]">
                Sample Content
              </span>
            </div>

            {SAMPLE_REVIEWS.map((rev) => (
              <div key={rev.author} className="rounded-xl border border-[#E7DEC8] bg-white p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-[#D4A353]">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#78716C]">{rev.city}</span>
                </div>
                <p className="text-xs leading-relaxed text-[#44403C]">&ldquo;{rev.quote}&rdquo;</p>
                <p className="text-xs font-bold text-[#112A22]">— {rev.author}</p>
              </div>
            ))}

            <div className="rounded-xl border border-[#E7DEC8] bg-white p-4 text-xs">
              <p className="font-bold text-[#112A22]">Do you offer separate Family Majlis enclosures for groups?</p>
              <p className="mt-1 text-[#5C534A]">
                Yes — private curtains and courtyard booths seating 8–16 guests are bookable above.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Hospitality Footer */}
      <footer className="bg-[#112A22] text-[#D8E2DC] border-t border-[#193A2F] mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-2xl font-bold text-[#E2B45C]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              SPICE AVENUE LAHORE
            </p>
            <p className="max-w-sm leading-relaxed text-[#B8C7BF]">
              Wood-fired Shinwari karahis, Lahori dum biryani, and family dining hospitality—
              showcasing a full restaurant web redesign transformation.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Quick Actions</p>
            <ul className="space-y-1.5 text-[#B8C7BF]">
              <li><a href="#sa-menu" className="hover:text-[#E2B45C]">Interactive Menu</a></li>
              <li><span className="text-[#E2B45C]">PRA Tax Compliant</span></li>
            </ul>
          </div>
          <div className="space-y-2 text-[#B8C7BF]">
            <p className="font-semibold text-white">Location &amp; Hours</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#E2B45C]" /> 48-C MM Alam Road, Gulberg III, Lahore</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#E2B45C]" /> +92 42 3576 1122</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-[#9AB0A5]">
          Spice Avenue · Interactive Website Redesign Demo (Sample Content)
        </div>
      </footer>
    </div>
  );
}
