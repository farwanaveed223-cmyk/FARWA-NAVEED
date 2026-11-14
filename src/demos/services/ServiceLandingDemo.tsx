import React, { useState } from 'react';
import { CheckCircle2, Droplets, Leaf, MapPin, Phone, Sparkles } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr } from '../../utils/demoLogic';

const PACKAGES = [
  {
    id: 'single',
    name: 'Single Luminance Drops (30ml)',
    subtitle: 'Starter · 60-day supply',
    pricePkr: 3450,
  },
  {
    id: 'duo',
    name: 'Morning & Night Glow Duo',
    subtitle: 'Most Popular · Save 10%',
    pricePkr: 6200,
  },
  {
    id: 'bridal',
    name: 'Bridal Radiance 4-Piece Ritual',
    subtitle: 'Complete Gift Trunk · Free Delivery',
    pricePkr: 11500,
  },
];

const INGREDIENTS = [
  {
    name: 'Kashmiri Saffron Extract',
    benefit: 'Visibly brightens uneven skin tone and post-blemish marks without harsh bleaching.',
  },
  {
    name: 'Multani Rosewater Hydrosol',
    benefit: 'Soothes heat sensitivity and deeply hydrates across dry Islamabad winters or humid Karachi summers.',
  },
  {
    name: '5% Niacinamide (Vitamin B3)',
    benefit: 'Refines pore texture, strengthens skin barrier, and balances T-zone shine.',
  },
];

const SAMPLE_REVIEWS = [
  {
    author: 'Ayesha Kamran · Lahore',
    text: 'Absorbs cleanly in humid weather without feeling sticky under sunscreen. My skin looked calm within 3 weeks. (Sample Content)',
  },
  {
    author: 'Zainab Tariq · Islamabad',
    text: 'Finally a Pakistani skincare serum formulated cleanly without heavy synthetic fragrance. (Sample Content)',
  },
];

const FAQS = [
  {
    q: 'Is GlowNest safe for sensitive & acne-prone Pakistani skin?',
    a: 'Yes. All formulas are paraben-free, steroid-free, non-comedogenic, and dermatologist-tested.',
  },
  {
    q: 'Do you offer Cash on Delivery across Pakistan?',
    a: 'Yes — nationwide Cash on Delivery with free shipping on bundles above PKR 5,000.',
  },
];

export function ServiceLandingDemo({ onBack }: { onBack: () => void }) {
  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[1].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [ordered, setOrdered] = useState(false);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[1];

  return (
    <div
      className="min-h-screen bg-[#FAF7F0] text-[#1A2E22]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Landing Page Design"
        clientBrand="GlowNest"
        categoryLabel="Service Demo 12"
        onBack={onBack}
      />

      {/* Minimal Cream & Sage Nav */}
      <header className="border-b border-[#DCE5DD] bg-[#FAF7F0]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
          <span
            className="text-2xl font-semibold tracking-tight text-[#1A2E22] whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            GlowNest
          </span>
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#3F5949]">
            <a href="#gn-benefits" className="hover:text-[#1A2E22] whitespace-nowrap">Benefits</a>
            <a href="#gn-ingredients" className="hover:text-[#1A2E22] whitespace-nowrap">Ingredients</a>
            <a href="#gn-packages" className="hover:text-[#1A2E22] whitespace-nowrap">PKR Bundles</a>
            <a href="#gn-reviews" className="hover:text-[#1A2E22] whitespace-nowrap">Reviews</a>
          </nav>
          <a
            href="#gn-order"
            className="rounded-lg bg-[#2D5A3F] px-4 py-2 text-xs font-bold text-white hover:bg-[#234731] whitespace-nowrap shrink-0"
          >
            Order Ritual
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-20">
        {/* Product Hero */}
        <section className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between py-2 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2D5A3F]">
                Botanical Pakistani Luxury Skincare
              </p>
              <h1
                className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
                style={{ fontFamily: '"Cormorant Garamond", serif', textWrap: 'balance' }}
              >
                Saffron &amp; Niacinamide Luminance Drops crafted for South Asian skin.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#3F5949]">
                Lightweight water-gel hydration blended with pure Kashmiri saffron, Rosewater, and
                5% Niacinamide to restore glass-skin clarity in Pakistan&apos;s sunlit climate.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#gn-packages"
                className="rounded-lg bg-[#2D5A3F] px-6 py-3 text-xs font-bold text-white hover:bg-[#234731]"
              >
                Shop Serum Bundles — From PKR 3,450
              </a>
              <span className="text-xs font-semibold text-[#2D5A3F]">Dermatologist Tested · Steroid-Free</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[340px] overflow-hidden rounded-2xl border border-[#DCE5DD]">
              <ResilientImage
                src={DEMO_MEDIA.glownestSkincare}
                alt="GlowNest botanical saffron facial serum bottle on travertine stone"
                className="h-full w-full object-cover"
                fallbackLabel="GlowNest Skincare"
              />
            </div>
          </div>
        </section>

        {/* Product Benefits */}
        <section id="gn-benefits" className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Droplets, title: 'Zero-Grease Hydration', desc: 'Micro-weight absorption tailored for humid summer months and AC dryness.' },
            { icon: Sparkles, title: 'Even Tone Clarity', desc: 'Targets sun pigmentation and dullness gently with saffron + B3 synergy.' },
            { icon: Leaf, title: '100% Clean Formulation', desc: 'Zero mercury, zero hydroquinone, zero synthetic dyes or parabens.' },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="rounded-2xl border border-[#DCE5DD] bg-white p-6">
                <Icon className="h-5 w-5 text-[#2D5A3F]" />
                <h2 className="mt-3 text-base font-bold">{b.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#4E6858]">{b.desc}</p>
              </div>
            );
          })}
        </section>

        {/* Botanical Visual Story Split */}
        <section className="grid items-center gap-8 rounded-2xl border border-[#DCE5DD] bg-white p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#DCE5DD]">
              <ResilientImage
                src={DEMO_MEDIA.glownestIngredients}
                alt="Kashmiri saffron threads, rose petals and botanical apothecary extracts"
                className="h-full w-full object-cover"
                fallbackLabel="Botanical Actives"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D5A3F]">
              Cold-Infused Purity
            </p>
            <h2 className="text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Sourced from Himalayan saffron valleys &amp; Multani rose distillers.
            </h2>
            <p className="text-sm leading-relaxed text-[#3F5949]">
              Every batch of GlowNest Luminance Drops is cold-macerated in Lahore laboratory cleanrooms
              to protect fragile antioxidant potency while avoiding heavy occlusive oils.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-[#DCE5DD] pt-4 text-xs">
              <div>
                <p className="font-mono text-lg font-bold text-[#2D5A3F]">0%</p>
                <p className="text-[#4E6858]">Mercury or Steroids</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-[#2D5A3F]">5%</p>
                <p className="text-[#4E6858]">Swiss-Grade B3</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-[#2D5A3F]">48 hr</p>
                <p className="text-[#4E6858]">Nationwide COD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Ingredients & PKR Bundles */}
        <div className="grid gap-10 lg:grid-cols-12">
          <section id="gn-ingredients" className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D5A3F]">Key Actives</p>
            <h2 className="text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Pure Botanical Ingredients
            </h2>
            <div className="space-y-3">
              {INGREDIENTS.map((ing) => (
                <div key={ing.name} className="rounded-xl border border-[#DCE5DD] bg-[#EFF4EF] p-4">
                  <p className="text-sm font-bold text-[#1A2E22]">{ing.name}</p>
                  <p className="mt-1 text-xs text-[#3F5949]">{ing.benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="gn-packages" className="lg:col-span-7 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D5A3F]">Choose Your Bundle</p>
            <h2 className="text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Pricing &amp; Packages (PKR)
            </h2>
            <div className="grid gap-3">
              {PACKAGES.map((pkg) => {
                const active = pkg.id === selectedPkgId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => {
                      setSelectedPkgId(pkg.id);
                      setOrdered(false);
                    }}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left cursor-pointer transition-colors ${
                      active ? 'border-[#2D5A3F] bg-[#E7EFE9]' : 'border-[#DCE5DD] bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-[#1A2E22]">{pkg.name}</p>
                      <p className="text-xs text-[#4E6858]">{pkg.subtitle}</p>
                    </div>
                    <span className="font-mono text-base font-bold text-[#2D5A3F] tabular-nums">
                      {formatPkr(pkg.pricePkr)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div id="gn-order" className="rounded-2xl border border-[#DCE5DD] bg-white p-6">
              <h3 className="text-base font-bold">Express Demo Checkout — {selectedPkg.name}</h3>
              {ordered ? (
                <div className="mt-3 rounded-xl bg-[#E7EFE9] p-4 text-xs text-[#1A2E22]" role="status">
                  <CheckCircle2 className="h-5 w-5 text-[#2D5A3F]" />
                  <p className="mt-1.5 font-bold">
                    Simulated COD Order Confirmed for {name} ({city})
                  </p>
                  <p className="mt-1">
                    Package: {selectedPkg.name} · {formatPkr(selectedPkg.pricePkr)} (Demo only).
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!name.trim() || !phone.trim()) return;
                    setOrdered(true);
                  }}
                  className="mt-4 grid gap-3 sm:grid-cols-3 text-xs"
                >
                  <input
                    type="text"
                    required
                    aria-label="Full Name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border border-[#DCE5DD] px-3 py-2.5"
                  />
                  <input
                    type="tel"
                    required
                    aria-label="Mobile number"
                    placeholder="Mobile (+92 3XX...)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-lg border border-[#DCE5DD] px-3 py-2.5"
                  />
                  <select
                    aria-label="Delivery city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="rounded-lg border border-[#DCE5DD] px-3 py-2.5"
                  >
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                    <option>Rawalpindi</option>
                  </select>
                  <button
                    type="submit"
                    className="sm:col-span-3 rounded-lg bg-[#2D5A3F] py-3 font-bold text-white hover:bg-[#234731] cursor-pointer"
                  >
                    Place Demo COD Order · {formatPkr(selectedPkg.pricePkr)}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>

        {/* Sample Reviews & FAQ */}
        <section id="gn-reviews" className="grid gap-8 lg:grid-cols-2 border-t border-[#DCE5DD] pt-12">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Customer Reviews
              </h2>
              <span className="text-xs text-[#4E6858]">Sample Content</span>
            </div>
            {SAMPLE_REVIEWS.map((r) => (
              <blockquote key={r.author} className="rounded-xl border border-[#DCE5DD] bg-white p-4 text-xs">
                <p className="leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-2 font-bold text-[#2D5A3F]">{r.author}</footer>
              </blockquote>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Frequently Asked Questions
            </h2>
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-xl border border-[#DCE5DD] bg-white p-4 text-xs">
                <p className="font-bold text-[#1A2E22]">{f.q}</p>
                <p className="mt-1 text-[#4E6858]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1A2E22] text-[#DCE5DD] border-t border-[#2D5A3F] mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-2xl font-semibold text-white" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              GlowNest Botanicals
            </p>
            <p className="max-w-sm leading-relaxed text-[#B9CBBE]">
              Clean South Asian dermatological formulations crafted in Pakistan using pure
              Kashmiri saffron, rosewater, and active niacinamide.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Quick Links</p>
            <ul className="space-y-1.5 text-[#B9CBBE]">
              <li><a href="#gn-ingredients" className="hover:text-white">Botanical Actives</a></li>
              <li><a href="#gn-packages" className="hover:text-white">PKR Serum Bundles</a></li>
              <li><a href="#gn-reviews" className="hover:text-white">Reviews &amp; FAQ</a></li>
            </ul>
          </div>
          <div className="space-y-2 text-[#B9CBBE]">
            <p className="font-semibold text-white">Pakistan Fulfillment</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#A5D6B7]" /> Lahore &amp; Karachi Warehouses</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#A5D6B7]" /> care@glownest.pk</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-[#9BB0A2]">
          GlowNest · Interactive Product Landing Page Demo (Sample Content)
        </div>
      </footer>
    </div>
  );
}
