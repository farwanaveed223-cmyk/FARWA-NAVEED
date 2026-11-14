import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { calculateFoodOrderTotals, formatPkr, type CartEntry } from '../../utils/demoLogic';

interface BakeryItem {
  id: string;
  name: string;
  category: 'Fresh Cakes & Cupcakes' | 'Custom Birthday Cakes' | 'Wedding Cakes' | 'Cookies & Pastries';
  description: string;
  pricePkr: number;
  tag: string;
  servings: string;
  image: string;
}

const BAKERY_MENU: BakeryItem[] = [
  {
    id: 'sc-1',
    name: 'Pistachio Rose-Petal Tier Cake',
    category: 'Fresh Cakes & Cupcakes',
    description: 'Two-pound Iranian pistachio sponge layered with cardamom mascarpone and dried Damask rose.',
    pricePkr: 3850,
    tag: 'Signature Bestseller',
    servings: '10–12 Guests',
    image: DEMO_MEDIA.sweetCrumbsCakes,
  },
  {
    id: 'sc-2',
    name: 'Belgian Dark Chocolate Truffle Cupcakes (Box of 6)',
    category: 'Fresh Cakes & Cupcakes',
    description: '70% couverture chocolate ganache topped with gold leaf and toasted hazelnut praline.',
    pricePkr: 2400,
    tag: 'Baked Fresh Hourly',
    servings: 'Box of 6',
    image: DEMO_MEDIA.sweetCrumbsCupcakes,
  },
  {
    id: 'sc-3',
    name: 'Lotus Biscoff Custom Birthday Cake (3 lb)',
    category: 'Custom Birthday Cakes',
    description: 'Personalized fondant plaque, caramelized speculoos drip, and custom celebration message.',
    pricePkr: 6500,
    tag: 'Custom Inscription',
    servings: '16–20 Guests',
    image: DEMO_MEDIA.sweetCrumbsCakes,
  },
  {
    id: 'sc-4',
    name: 'Belgian Malt & Hazelnut Birthday Cake (2.5 lb)',
    category: 'Custom Birthday Cakes',
    description: 'Roasted hazelnut praline crunch wrapped in silky Belgian milk chocolate ganache.',
    pricePkr: 5400,
    tag: '24-Hour Custom Prep',
    servings: '12–15 Guests',
    image: DEMO_MEDIA.sweetCrumbsCupcakes,
  },
  {
    id: 'sc-5',
    name: 'Three-Tier Nikah & Walima Floral Cake',
    category: 'Wedding Cakes',
    description: 'Vanilla bean and lemon curd tiers finished in ivory buttercream and fresh seasonal florals.',
    pricePkr: 28500,
    tag: 'Feeds 60–75 Guests',
    servings: '60–75 Guests',
    image: DEMO_MEDIA.sweetCrumbsCakes,
  },
  {
    id: 'sc-6',
    name: 'Almond Butter Croissants & Sea-Salt Cookies (Box)',
    category: 'Cookies & Pastries',
    description: 'Four flaky twice-baked almond croissants paired with four brown-butter chocolate chunk cookies.',
    pricePkr: 2150,
    tag: 'Morning Batch',
    servings: '8-Piece Patisserie Box',
    image: DEMO_MEDIA.sweetCrumbsCupcakes,
  },
];

const SAMPLE_REVIEWS = [
  {
    author: 'Fatima Zahra · Gulberg III, Lahore',
    note: 'Ordered the Pistachio Rose cake for my parents anniversary — balanced sweetness and arrived chilled on time. (Sample Content)',
  },
  {
    author: 'Saad Bin Tariq · Clifton Block 5, Karachi',
    note: 'Our 3-tier Nikah floral cake looked breathtaking in photos and every guest asked for the bakery name. (Sample Content)',
  },
];

const BAKERY_FAQS = [
  {
    q: 'How far in advance should custom wedding or Nikah cakes be booked?',
    a: 'We recommend booking multi-tier wedding cakes 5 to 7 days in advance so florals and tier tastings can be scheduled.',
  },
  {
    q: 'Do you deliver chilled cakes safely across Lahore and Karachi?',
    a: 'Yes — every cake travels inside temperature-controlled insulated vans with complimentary delivery above PKR 5,000.',
  },
];

export function RestaurantDemo({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState<'All' | BakeryItem['category']>('All');
  const [cart, setCart] = useState<CartEntry[]>([
    { id: 'sc-1', name: 'Pistachio Rose-Petal Tier Cake', price: 3850, quantity: 1 },
  ]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BakeryItem | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cakeMessage, setCakeMessage] = useState('');
  const [checkoutDone, setCheckoutDone] = useState(false);

  // Custom Cake Order Form
  const [customName, setCustomName] = useState('');
  const [customOccasion, setCustomOccasion] = useState('Birthday Celebration');
  const [customWeight, setCustomWeight] = useState('3 Pounds (16–20 Guests)');
  const [customFlavor, setCustomFlavor] = useState('Pistachio Rose & Cardamom');
  const [customNotes, setCustomNotes] = useState('');
  const [customSent, setCustomSent] = useState(false);

  const visibleMenu = useMemo(
    () => (category === 'All' ? BAKERY_MENU : BAKERY_MENU.filter((i) => i.category === category)),
    [category],
  );

  const totals = useMemo(
    () => calculateFoodOrderTotals(cart, orderType, 5000, 250),
    [cart, orderType],
  );

  const addToCart = (item: BakeryItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: item.id, name: item.name, price: item.pricePkr, quantity: 1 }];
    });
    setCheckoutDone(false);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const submitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    setCheckoutDone(true);
  };

  return (
    <div
      className="min-h-screen bg-[#FDF8F3] text-[#3E2723]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Food & Local Business"
        clientBrand="Sweet Crumbs Bakery"
        categoryLabel="Business Demo 10"
        onBack={onBack}
      />

      {/* Warm Cream, Chocolate Brown & Soft Pink Top Nav */}
      <header className="border-b border-[#EBDAD0] bg-[#FDF8F3]/95 sticky top-11 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-6 px-4 py-4 sm:px-6">
          <span
            className="text-lg sm:text-2xl font-bold tracking-tight text-[#3E2723] whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Sweet Crumbs Bakery
          </span>
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#6D4C41]">
            <a href="#sc-menu" className="hover:text-[#C26D7E] whitespace-nowrap">Menu &amp; Cakes</a>
            <a href="#sc-custom" className="hover:text-[#C26D7E] whitespace-nowrap">Custom Cakes</a>
            <a href="#sc-delivery" className="hover:text-[#C26D7E] whitespace-nowrap">Delivery</a>
            <a href="#sc-reviews" className="hover:text-[#C26D7E] whitespace-nowrap">Reviews &amp; FAQ</a>
          </nav>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#3E2723] px-3 sm:px-4 py-2 text-xs font-bold text-[#FDF8F3] hover:bg-[#5D4037] cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-[#F4B8C4]" />
            <span>
              Cart ({totals.itemCount})<span className="hidden sm:inline"> · {formatPkr(totals.total)}</span>
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-20">
        {/* Cinematic Bakery Hero */}
        <section className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between py-2 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B55468]">
                Artisanal Patisserie · Gulberg Lahore &amp; Clifton Karachi
              </p>
              <h1
                className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-[#3E2723] sm:text-5xl"
                style={{ fontFamily: '"Playfair Display", serif', textWrap: 'balance' }}
              >
                Handcrafted celebration cakes, cupcakes &amp; warm French-inspired pastries.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#5D4037]">
                Sweet Crumbs Bakery pairs pure Pakistani dairy butter, Iranian pistachios, and
                Belgian chocolate to craft customized birthday cakes, tiered wedding centerpieces,
                and everyday patisserie boxes.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#sc-menu"
                className="rounded-lg bg-[#C26D7E] px-5 py-3 text-xs font-bold text-white hover:bg-[#AA5667]"
              >
                Order Cakes &amp; Pastries
              </a>
              <a
                href="#sc-custom"
                className="rounded-lg border border-[#3E2723]/30 px-5 py-3 text-xs font-bold text-[#3E2723]"
              >
                Book Custom Birthday / Wedding Cake
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] overflow-hidden rounded-2xl border border-[#EBDAD0] shadow-sm">
              <ResilientImage
                src={DEMO_MEDIA.sweetCrumbsCakes}
                alt="Pistachio rose-petal celebration cake and chocolate cupcakes at Sweet Crumbs Bakery"
                className="h-full w-full object-cover"
                fallbackLabel="Sweet Crumbs Bakery"
              />
            </div>
          </div>
        </section>

        {/* Interactive Menu */}
        <section id="sc-menu" className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B55468]">
                Baked Fresh Daily
              </p>
              <h2
                className="mt-1 text-3xl font-bold text-[#3E2723]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Patisserie Menu (PKR)
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  'All',
                  'Fresh Cakes & Cupcakes',
                  'Custom Birthday Cakes',
                  'Wedding Cakes',
                  'Cookies & Pastries',
                ] as const
              ).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    category === c
                      ? 'bg-[#3E2723] text-white'
                      : 'border border-[#EBDAD0] bg-white text-[#5D4037]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleMenu.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EBDAD0] bg-white"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="block w-full aspect-[4/3] overflow-hidden bg-[#F4E9E1] cursor-pointer"
                      aria-label={`Inspect ${item.name} details`}
                    >
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        fallbackLabel={item.name}
                      />
                    </button>
                    <div className="p-5">
                      <p className="text-[11px] font-semibold text-[#B55468]">
                        {item.category} · {item.tag}
                      </p>
                      <h3 className="mt-1.5 text-lg font-bold text-[#3E2723]">{item.name}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#6D4C41]">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#F4E9E1] px-5 py-4">
                    <span className="font-mono text-base font-bold tabular-nums text-[#3E2723]">
                      {formatPkr(item.pricePkr)}
                    </span>
                    {inCart ? (
                      <div className="inline-flex items-center gap-2 rounded-lg bg-[#FDF2F4] px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          aria-label={`Remove one ${item.name}`}
                          className="p-1 text-[#3E2723] cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold">{inCart.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          aria-label={`Add one ${item.name}`}
                          className="p-1 text-[#3E2723] cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="rounded-lg bg-[#C26D7E] px-4 py-2 text-xs font-bold text-white hover:bg-[#AA5667] cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Custom Cake Commission Section */}
        <section id="sc-custom" className="grid gap-8 rounded-2xl border border-[#EBDAD0] bg-white p-6 sm:p-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#EBDAD0]">
              <ResilientImage
                src={DEMO_MEDIA.sweetCrumbsCupcakes}
                alt="Artisanal cupcakes and celebration pastry box"
                className="h-full w-full object-cover"
                fallbackLabel="Custom Cakes & Cupcakes"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B55468]">
              <Sparkles className="h-4 w-4" /> Custom Celebration Studio
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: '"Playfair Display", serif' }}>
              Commission a Custom Birthday, Nikah or Corporate Cake
            </h2>

            {customSent ? (
              <div role="status" className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-xs text-emerald-900 space-y-1.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                <p className="font-bold">Custom Cake Inquiry Logged (Demo)</p>
                <p>
                  Bakers notified for <strong>{customName}</strong> — {customOccasion} ({customWeight} · {customFlavor}).
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customName.trim()) return;
                  setCustomSent(true);
                }}
                className="grid gap-3 sm:grid-cols-2 text-xs"
              >
                <input
                  type="text"
                  required
                  aria-label="Your name for custom cake"
                  placeholder="Your Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="rounded-lg border border-[#D7CCC8] px-3 py-2.5"
                />
                <select
                  aria-label="Celebration occasion"
                  value={customOccasion}
                  onChange={(e) => setCustomOccasion(e.target.value)}
                  className="rounded-lg border border-[#D7CCC8] px-3 py-2.5"
                >
                  <option>Birthday Celebration</option>
                  <option>Nikah / Walima Tier Cake</option>
                  <option>Corporate Launch Box</option>
                </select>
                <select
                  aria-label="Weight and servings"
                  value={customWeight}
                  onChange={(e) => setCustomWeight(e.target.value)}
                  className="rounded-lg border border-[#D7CCC8] px-3 py-2.5"
                >
                  <option>2 Pounds (10–12 Guests)</option>
                  <option>3 Pounds (16–20 Guests)</option>
                  <option>3-Tier Wedding (65 Guests)</option>
                </select>
                <select
                  aria-label="Signature cake flavor"
                  value={customFlavor}
                  onChange={(e) => setCustomFlavor(e.target.value)}
                  className="rounded-lg border border-[#D7CCC8] px-3 py-2.5"
                >
                  <option>Pistachio Rose &amp; Cardamom</option>
                  <option>Belgian Dark Chocolate Malt</option>
                  <option>Lotus Biscoff Crunch</option>
                </select>
                <input
                  type="text"
                  aria-label="Fondant message or theme notes"
                  placeholder="Color palette or inscription message..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="sm:col-span-2 rounded-lg border border-[#D7CCC8] px-3 py-2.5"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 rounded-lg bg-[#3E2723] py-3 font-bold text-white hover:bg-[#5D4037] cursor-pointer"
                >
                  Request Custom Cake Quote (Demo)
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Delivery Info, Reviews & FAQ */}
        <section id="sc-delivery" className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-2xl border border-[#EBDAD0] bg-[#3E2723] p-7 text-[#FDF8F3] space-y-4">
            <div className="flex items-center gap-2 text-[#F4B8C4] text-xs font-bold uppercase tracking-widest">
              <Truck className="h-4 w-4" /> Chilled Van Delivery
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>
              90-Minute Lahore &amp; Karachi Patisserie Delivery
            </h2>
            <p className="text-xs leading-relaxed text-[#E6D6CE]">
              Free refrigerated delivery on all orders over <strong>PKR 5,000</strong> (flat PKR 250 below
              threshold). Custom fondant birthday cakes require 24 hours advance notice.
            </p>
            <div className="space-y-2 border-t border-white/15 pt-4 text-xs">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F4B8C4]" /> Lahore: Main Boulevard Gulberg II · Karachi: Block 5 Clifton
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#F4B8C4]" /> +92 42 3578 9012 (Sample Bakery Hotline)
              </p>
            </div>
          </div>

          <div id="sc-reviews" className="lg:col-span-7 rounded-2xl border border-[#EBDAD0] bg-white p-7 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>
                Guest Reviews &amp; Bakery FAQ
              </h2>
              <span className="text-xs text-[#8D6E63]">Sample Content</span>
            </div>
            <div className="grid gap-3">
              {SAMPLE_REVIEWS.map((r) => (
                <blockquote key={r.author} className="rounded-xl bg-[#FDF8F3] border border-[#EBDAD0] p-4 text-xs">
                  <p className="leading-relaxed text-[#4E342E]">&ldquo;{r.note}&rdquo;</p>
                  <footer className="mt-2 font-bold text-[#B55468]">{r.author}</footer>
                </blockquote>
              ))}
              {BAKERY_FAQS.map((f) => (
                <div key={f.q} className="rounded-xl border border-[#EBDAD0] p-4 text-xs">
                  <p className="font-bold text-[#3E2723]">{f.q}</p>
                  <p className="mt-1 text-[#6D4C41]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#3E2723] text-[#E6D6CE] border-t border-[#5D4037] mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-2xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              Sweet Crumbs Bakery
            </p>
            <p className="max-w-sm leading-relaxed">
              Fresh French-inspired patisserie, pistachio rose wedding cakes, and chilled celebration
              delivery across Lahore and Karachi.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Order &amp; Patisserie</p>
            <ul className="space-y-1.5">
              <li><a href="#sc-menu" className="hover:text-[#F4B8C4]">Daily Bakery Menu</a></li>
              <li><a href="#sc-custom" className="hover:text-[#F4B8C4]">Custom Celebration Cakes</a></li>
              <li><button type="button" onClick={() => setCartOpen(true)} className="hover:text-[#F4B8C4] cursor-pointer">Open Shopping Bag</button></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Flagship Boutiques</p>
            <p>Main Boulevard, Gulberg II, Lahore</p>
            <p>Block 5, Clifton, Karachi</p>
            <p className="text-[#F4B8C4]">orders@sweetcrumbs.pk</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-[#C8B2A6]">
          Sweet Crumbs Bakery · Interactive Local Business Demo (Sample Content)
        </div>
      </footer>

      {/* Cake Detail Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#EBDAD0] bg-[#FDF8F3] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10]">
              <ResilientImage src={selectedItem.image} alt={selectedItem.name} className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Close product modal"
                onClick={() => setSelectedItem(null)}
                className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <p className="font-semibold text-[#B55468]">{selectedItem.category} · {selectedItem.servings}</p>
              <h3 className="text-2xl font-bold text-[#3E2723]" style={{ fontFamily: '"Playfair Display", serif' }}>
                {selectedItem.name}
              </h3>
              <p className="leading-relaxed text-[#5D4037]">{selectedItem.description}</p>
              <div className="flex items-center justify-between border-t border-[#EBDAD0] pt-4">
                <span className="font-mono text-lg font-bold text-[#3E2723]">{formatPkr(selectedItem.pricePkr)}</span>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedItem);
                    setSelectedItem(null);
                    setCartOpen(true);
                  }}
                  className="rounded-lg bg-[#C26D7E] px-5 py-2.5 font-bold text-white cursor-pointer"
                >
                  Add &amp; Open Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart & Simulated Checkout Drawer */}
      {cartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sweet Crumbs Bakery Shopping Cart"
          className="fixed inset-0 z-[70] flex justify-end bg-black/50"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-md flex-col justify-between bg-[#FDF8F3] p-6 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#EBDAD0] pb-4">
                <h2 className="text-xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Your Bakery Bag ({totals.itemCount})
                </h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="p-1 text-[#3E2723] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 inline-flex w-full rounded-lg bg-[#EFE4DA] p-1">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold cursor-pointer ${
                    orderType === 'delivery' ? 'bg-[#3E2723] text-white' : 'text-[#5D4037]'
                  }`}
                >
                  Chilled Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold cursor-pointer ${
                    orderType === 'pickup' ? 'bg-[#3E2723] text-white' : 'text-[#5D4037]'
                  }`}
                >
                  Bakery Pickup
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="py-10 text-center text-xs text-[#6D4C41]">
                  Your bakery bag is empty. Add a cake or pastry box from the menu.
                </p>
              ) : (
                <div className="mt-4 divide-y divide-[#EBDAD0]">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 py-3 text-xs">
                      <div>
                        <p className="font-bold text-[#3E2723]">{item.name}</p>
                        <p className="font-mono text-[#8D6E63]">{formatPkr(item.price)} each</p>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          aria-label={`Decrease quantity for ${item.name}`}
                          className="h-6 w-6 rounded border border-[#D7CCC8] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          aria-label={`Increase quantity for ${item.name}`}
                          className="h-6 w-6 rounded border border-[#D7CCC8] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-6 border-t border-[#EBDAD0] pt-4 space-y-4">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold">{formatPkr(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PST / Tax (5%)</span>
                    <span className="font-mono">{formatPkr(totals.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee (Free &ge; PKR 5,000)</span>
                    <span className="font-mono">
                      {totals.deliveryFee === 0 ? 'Free' : formatPkr(totals.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#EBDAD0] pt-2 text-sm font-bold">
                    <span>Total (PKR)</span>
                    <span className="font-mono">{formatPkr(totals.total)}</span>
                  </div>
                </div>

                {checkoutDone ? (
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-900" role="status">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                    <p className="mt-1.5 font-bold">Simulated Bakery Order Placed!</p>
                    <p className="mt-1">
                      Demo confirmation for <strong>{customerName}</strong> — {formatPkr(totals.total)} (Cash on Delivery simulation; no real charge).
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitCheckout} className="space-y-2.5 text-xs">
                    <input
                      type="text"
                      required
                      aria-label="Full Name for checkout"
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-lg border border-[#D7CCC8] bg-white px-3 py-2"
                    />
                    <input
                      type="tel"
                      required
                      aria-label="Mobile number for checkout"
                      placeholder="Mobile (+92 3XX XXXXXXX)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full rounded-lg border border-[#D7CCC8] bg-white px-3 py-2"
                    />
                    {orderType === 'delivery' && (
                      <input
                        type="text"
                        aria-label="Delivery address"
                        placeholder="Delivery Address (Lahore / Karachi)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full rounded-lg border border-[#D7CCC8] bg-white px-3 py-2"
                      />
                    )}
                    <input
                      type="text"
                      aria-label="Cake plaque message"
                      placeholder="Optional Cake Plaque Message (e.g. Happy Birthday)"
                      value={cakeMessage}
                      onChange={(e) => setCakeMessage(e.target.value)}
                      className="w-full rounded-lg border border-[#D7CCC8] bg-white px-3 py-2"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[#3E2723] py-3 font-bold text-white hover:bg-[#5D4037] cursor-pointer"
                    >
                      Simulate Checkout · {formatPkr(totals.total)}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
