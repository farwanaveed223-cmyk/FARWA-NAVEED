import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { calculateRestaurantCartTotals, type CartEntry } from '../../utils/demoLogic';

interface MenuDish {
  id: string;
  name: string;
  category: 'Starters' | 'Wood-Fired' | 'Mains' | 'Desserts';
  dietary: 'Vegetarian' | 'Gluten-Free' | 'Signature';
  price: number;
  description: string;
}

const MENU_ITEMS: MenuDish[] = [
  {
    id: 'dish-1',
    name: 'Charred Heirloom Carrots & Whipped Labneh',
    category: 'Starters',
    dietary: 'Vegetarian',
    price: 16,
    description: 'Pomegranate molasses, toasted pistachio dukkah, wild thyme oil.',
  },
  {
    id: 'dish-2',
    name: 'Wood-Fired Burrata & Fig Flatbread',
    category: 'Starters',
    dietary: 'Vegetarian',
    price: 19,
    description: '48-hour sourdough blistered in our oak oven, aged balsamic, sea salt.',
  },
  {
    id: 'dish-3',
    name: 'Cedar-Roasted Sea Bass',
    category: 'Wood-Fired',
    dietary: 'Gluten-Free',
    price: 38,
    description: 'Saffron fennel velouté, charred Meyer lemon, blistered cherry tomatoes.',
  },
  {
    id: 'dish-4',
    name: 'Hearth-Seared Ribeye (12oz)',
    category: 'Wood-Fired',
    dietary: 'Gluten-Free',
    price: 54,
    description: 'Black garlic herb butter, smoked bone marrow jus, crispy shallots.',
  },
  {
    id: 'dish-5',
    name: 'Saffron & Wild Mushroom Risotto',
    category: 'Mains',
    dietary: 'Vegetarian',
    price: 29,
    description: 'Carnaroli rice, chanterelles, aged Parmigiano-Reggiano, chive oil.',
  },
  {
    id: 'dish-6',
    name: 'Cardamom Burnt Basque Cheesecake',
    category: 'Desserts',
    dietary: 'Signature',
    price: 14,
    description: 'Caramelized honey crust, poached pear compote, Crème fraîche.',
  },
];

export function RestaurantDemo({ onBack }: { onBack: () => void }) {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [dietFilter, setDietFilter] = useState<string>('All');

  const [cart, setCart] = useState<CartEntry[]>([
    { id: 'dish-5', name: 'Saffron & Wild Mushroom Risotto', price: 29, quantity: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);

  const [resDate, setResDate] = useState('2026-11-21');
  const [resTime, setResTime] = useState('7:30 PM');
  const [resGuests, setResGuests] = useState('4');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resConfirmed, setResConfirmed] = useState<string | null>(null);

  const [reviews, setReviews] = useState([
    {
      id: 'rv1',
      guest: 'Sophia Hartwell',
      rating: 5,
      text: 'The wood-fired sea bass and sourdough flatbread were unforgettable. Warm candlelit service.',
    },
    {
      id: 'rv2',
      guest: 'Daniel Okafor',
      rating: 5,
      text: 'Seamless online table booking and thoughtful vegetarian tasting options.',
    },
  ]);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');

  const cartSummary = useMemo(
    () => calculateRestaurantCartTotals(cart, orderType),
    [cart, orderType],
  );

  const visibleMenu = useMemo(
    () =>
      MENU_ITEMS.filter((item) => {
        const matchCat = categoryFilter === 'All' || item.category === categoryFilter;
        const matchDiet = dietFilter === 'All' || item.dietary === dietFilter;
        return matchCat && matchDiet;
      }),
    [categoryFilter, dietFilter],
  );

  const addToCart = (dish: MenuDish) => {
    setOrderPlaced(null);
    setCart((prev) => {
      const existing = prev.find((c) => c.id === dish.id);
      if (existing) {
        return prev.map((c) => (c.id === dish.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, quantity: 1 }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || cart.length === 0) return;
    if (orderType === 'delivery' && !deliveryAddress.trim()) return;
    setOrderPlaced(
      `Simulated Order #SH-${Math.floor(1000 + Math.random() * 9000)} confirmed for ${customerName.trim()} ($${cartSummary.total.toFixed(2)}, ${orderType}). No payment was charged.`,
    );
    setCart([]);
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resPhone.trim()) return;
    setResConfirmed(
      `Simulated table hold confirmed for ${resName.trim()} — Party of ${resGuests} on ${resDate} at ${resTime}.`,
    );
    setResName('');
    setResPhone('');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    setReviews((prev) => [
      { id: `rv-${Date.now()}`, guest: reviewName.trim(), rating: 5, text: reviewText.trim() },
      ...prev,
    ]);
    setReviewName('');
    setReviewText('');
  };

  return (
    <div
      className="min-h-screen bg-[#FAF6F0] text-[#1C1714]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Food & Local Business"
        clientBrand="Saffron & Hearth"
        categoryLabel="Hospitality"
        onBack={onBack}
      />

      {/* Restaurant Top Nav */}
      <header className="border-b border-[#E8DFD3] bg-[#FAF6F0]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#sh-hero"
            className="text-2xl font-semibold tracking-tight whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Saffron &amp; Hearth
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#574C43]">
            <a href="#sh-menu" className="hover:text-[#1C1714] whitespace-nowrap">
              Menu
            </a>
            <a href="#sh-reserve" className="hover:text-[#1C1714] whitespace-nowrap">
              Reservations
            </a>
            <a href="#sh-reviews" className="hover:text-[#1C1714] whitespace-nowrap">
              Reviews
            </a>
            <a href="#sh-visit" className="hover:text-[#1C1714] whitespace-nowrap">
              Location
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#B45309] px-4 py-2 text-xs font-semibold text-white hover:bg-[#92400E] cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Order Bag ({cartSummary.itemCount})</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="sh-hero" className="relative overflow-hidden bg-[#1C1714] text-white">
        <div className="mx-auto grid max-w-6xl items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-center px-6 py-16 lg:col-span-6 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-400">
              Wood-Fired Seasonal Kitchen · Downtown Market District
            </p>
            <h1
              className="mt-4 text-4xl font-semibold leading-[1.06] sm:text-5xl"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Open-flame dining crafted around local harvests.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-300">
              Browse tonight&apos;s tasting menu, build a simulated pickup or delivery order, or
              hold a table in our candlelit dining room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#sh-menu"
                className="rounded-lg bg-[#B45309] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#92400E]"
              >
                Explore Menu &amp; Order
              </a>
              <a
                href="#sh-reserve"
                className="rounded-lg border border-white/25 px-5 py-2.5 text-xs font-semibold text-white hover:border-amber-400"
              >
                Book a Table
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 min-h-[300px]">
            <ResilientImage
              src={DEMO_MEDIA.restaurantHero}
              alt="Saffron & Hearth candlelit wood-fired dining table"
              className="h-full w-full object-cover"
              fallbackLabel="Saffron & Hearth"
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-14 space-y-20">
        {/* Interactive Menu */}
        <section id="sh-menu">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B45309]">
                Evening Service
              </p>
              <h2
                className="mt-1 text-3xl font-semibold"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Interactive Food Menu
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Starters', 'Wood-Fired', 'Mains', 'Desserts'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#1C1714] text-white'
                      : 'border border-[#E8DFD3] bg-white text-[#574C43]'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <select
                aria-label="Dietary filter"
                value={dietFilter}
                onChange={(e) => setDietFilter(e.target.value)}
                className="rounded-lg border border-[#E8DFD3] bg-white px-3 py-1.5 text-xs font-semibold text-[#574C43]"
              >
                <option value="All">All Dietary</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {visibleMenu.map((dish) => (
              <article
                key={dish.id}
                className="flex flex-col justify-between rounded-xl border border-[#E8DFD3] bg-white p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#B45309]">
                        {dish.category} · {dish.dietary}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-[#1C1714]">{dish.name}</h3>
                    </div>
                    <span className="font-mono text-base font-bold tabular-nums text-[#1C1714]">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#574C43]">{dish.description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#F4EFE8] pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(dish);
                      setCartOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#B45309] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#92400E] cursor-pointer"
                  >
                    <Utensils className="h-3.5 w-3.5" /> Add to Order
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Reservations & Reviews */}
        <section className="grid gap-10 lg:grid-cols-12">
          <div id="sh-reserve" className="rounded-2xl border border-[#E8DFD3] bg-white p-7 lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B45309]">
              Dining Room
            </p>
            <h2
              className="mt-1 text-3xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Reserve a Table
            </h2>
            <p className="mt-1 text-xs text-[#574C43]">
              Simulated booking form for client demonstration.
            </p>

            <form onSubmit={handleReservation} className="mt-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="res-date" className="block text-xs font-semibold">
                    Date
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E8DFD3] px-2.5 py-2 text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="res-time" className="block text-xs font-semibold">
                    Time
                  </label>
                  <select
                    id="res-time"
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E8DFD3] px-2.5 py-2 text-xs"
                  >
                    <option>6:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:45 PM</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="res-guests" className="block text-xs font-semibold">
                    Guests
                  </label>
                  <select
                    id="res-guests"
                    value={resGuests}
                    onChange={(e) => setResGuests(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E8DFD3] px-2.5 py-2 text-xs"
                  >
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="res-name" className="block text-xs font-semibold">
                    Guest Name
                  </label>
                  <input
                    id="res-name"
                    required
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    placeholder="Claire Bennett"
                    className="mt-1 w-full rounded-lg border border-[#E8DFD3] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="res-phone" className="block text-xs font-semibold">
                    Phone Number
                  </label>
                  <input
                    id="res-phone"
                    required
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    placeholder="(555) 234-8910"
                    className="mt-1 w-full rounded-lg border border-[#E8DFD3] px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#1C1714] py-2.5 text-xs font-semibold text-white hover:bg-stone-800 cursor-pointer"
              >
                Hold Table (Simulation)
              </button>

              {resConfirmed && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-900"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{resConfirmed}</span>
                </div>
              )}
            </form>
          </div>

          <div id="sh-reviews" className="space-y-4 lg:col-span-6">
            <h2
              className="text-3xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Guest Reviews
            </h2>
            <div className="space-y-3">
              {reviews.map((rv) => (
                <div key={rv.id} className="rounded-xl border border-[#E8DFD3] bg-white p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{rv.guest}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#B45309]">
                      <Star className="h-3.5 w-3.5 fill-current" /> {rv.rating}.0
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#574C43]">{rv.text}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleAddReview}
              className="rounded-xl border border-[#E8DFD3] bg-white p-5 space-y-3"
            >
              <p className="text-xs font-bold">Leave a Sample Review</p>
              <input
                type="text"
                required
                aria-label="Reviewer name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-[#E8DFD3] px-3 py-2 text-xs"
              />
              <input
                type="text"
                required
                aria-label="Review comment"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your favorite dish..."
                className="w-full rounded-lg border border-[#E8DFD3] px-3 py-2 text-xs"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#B45309] px-4 py-2 text-xs font-semibold text-white hover:bg-[#92400E] cursor-pointer"
              >
                Post Review
              </button>
            </form>
          </div>
        </section>

        {/* Location Details */}
        <section
          id="sh-visit"
          className="grid gap-6 rounded-2xl border border-[#E8DFD3] bg-white p-7 md:grid-cols-3"
        >
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold">Location</h3>
              <p className="mt-1 text-xs text-[#574C43]">
                418 Mercer Market Street, West Quarter (Demo Address)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold">Dinner Hours</h3>
              <p className="mt-1 text-xs text-[#574C43]">
                Tue – Sun · 5:00 PM – 10:30 PM (Closed Mondays)
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">Private Dining</h3>
            <p className="mt-1 text-xs text-[#574C43]">
              Chef&apos;s Hearth Table seats up to 14 guests for curated tasting evenings.
            </p>
          </div>
        </section>
      </main>

      {/* Slide-Over Order Cart Drawer */}
      {cartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Online Order Bag"
          className="fixed inset-0 z-[70] flex justify-end bg-black/50"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="text-lg font-bold">Online Order (Simulation)</h3>
              <button
                type="button"
                aria-label="Close order bag"
                onClick={() => setCartOpen(false)}
                className="rounded p-1 hover:bg-stone-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex gap-2 rounded-lg bg-stone-100 p-1">
              {(['pickup', 'delivery'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setOrderType(mode)}
                  className={`flex-1 rounded-md py-1.5 text-xs font-semibold capitalize cursor-pointer ${
                    orderType === mode ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="mt-5 flex-1 space-y-3">
              {cart.length === 0 ? (
                <p className="text-sm text-stone-500">Your bag is currently empty.</p>
              ) : (
                cart.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg border border-stone-200 p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{entry.name}</p>
                      <p className="font-mono text-xs text-stone-500">
                        ${(entry.price * entry.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Remove one ${entry.name}`}
                        onClick={() => updateCartQty(entry.id, -1)}
                        className="rounded border p-1 cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-xs font-bold tabular-nums">
                        {entry.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Add one ${entry.name}`}
                        onClick={() => updateCartQty(entry.id, 1)}
                        className="rounded border p-1 cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {orderPlaced && (
                <div role="status" className="rounded-xl bg-emerald-50 p-4 text-xs text-emerald-900">
                  {orderPlaced}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="mt-4 space-y-3 border-t border-stone-200 pt-4">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">${cartSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8.5%)</span>
                    <span className="font-mono tabular-nums">${cartSummary.tax.toFixed(2)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee (Free over $65)</span>
                      <span className="font-mono tabular-nums">
                        ${cartSummary.deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold pt-1">
                    <span>Estimated Total</span>
                    <span className="font-mono tabular-nums">${cartSummary.total.toFixed(2)}</span>
                  </div>
                </div>

                <input
                  type="text"
                  required
                  aria-label="Customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs"
                />
                {orderType === 'delivery' && (
                  <input
                    type="text"
                    required
                    aria-label="Delivery street address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Delivery address (Demo)"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs"
                  />
                )}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#B45309] py-2.5 text-xs font-semibold text-white hover:bg-[#92400E] cursor-pointer"
                >
                  Place Simulated Order (No Real Charge)
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
