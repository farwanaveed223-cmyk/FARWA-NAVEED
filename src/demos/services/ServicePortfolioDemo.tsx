import React, { useMemo, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';

interface PhotoWork {
  id: string;
  title: string;
  series: 'Monochrome' | 'Civic Space' | 'Studies';
  location: string;
  camera: string;
  lens: string;
  exposure: string;
  image: string;
}

const WORKS: PhotoWork[] = [
  {
    id: 'ph1',
    title: 'Helix Concrete Atrium IV',
    series: 'Monochrome',
    location: 'Basel, Switzerland',
    camera: 'Leica SL2-S',
    lens: '24mm f/2 Summicron',
    exposure: '1/250s · f/5.6 · ISO 100',
    image: DEMO_MEDIA.editorialGallery,
  },
  {
    id: 'ph2',
    title: 'Pacific Timber Threshold',
    series: 'Civic Space',
    location: 'Carmel, California',
    camera: 'Hasselblad X2D 100C',
    lens: '38mm f/2.5V',
    exposure: '1/125s · f/8.0 · ISO 64',
    image: DEMO_MEDIA.architectureHero,
  },
  {
    id: 'ph3',
    title: 'Portrait in Limestone Studio',
    series: 'Studies',
    location: 'Lyon, France',
    camera: 'Leica M11',
    lens: '50mm f/1.4 Summilux',
    exposure: '1/500s · f/2.0 · ISO 160',
    image: DEMO_MEDIA.creativeDirector,
  },
  {
    id: 'ph4',
    title: 'Twilight Candle Study',
    series: 'Studies',
    location: 'Copenhagen, Denmark',
    camera: 'Leica SL2-S',
    lens: '35mm APO',
    exposure: '1/60s · f/2.8 · ISO 800',
    image: DEMO_MEDIA.restaurantHero,
  },
];

export function ServicePortfolioDemo({ onBack }: { onBack: () => void }) {
  const [seriesFilter, setSeriesFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [printInquirySent, setPrintInquirySent] = useState(false);
  const [collectorEmail, setCollectorEmail] = useState('');

  const filtered = useMemo(
    () => WORKS.filter((w) => seriesFilter === 'All' || w.series === seriesFilter),
    [seriesFilter],
  );

  const activePhoto = lightboxIndex !== null ? filtered[lightboxIndex] ?? null : null;

  return (
    <div
      className="min-h-screen bg-[#0D0D0D] text-[#F5F5F4]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Portfolio Websites"
        clientBrand="Julian Mercer Photography"
        categoryLabel="Service Demo 03"
        onBack={onBack}
        theme="dark"
      />

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-5">
          <a
            href="#jm-top"
            className="text-xl font-semibold tracking-tight whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Julian Mercer
          </a>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-neutral-400">
            <a href="#jm-gallery" className="hover:text-white whitespace-nowrap">
              Archive
            </a>
            <a href="#jm-editions" className="hover:text-white whitespace-nowrap">
              Editions
            </a>
          </nav>
          <a
            href="#jm-editions"
            className="rounded-lg border border-amber-500/60 px-4 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500 hover:text-black whitespace-nowrap shrink-0"
          >
            Print Inquiries
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        <section id="jm-top" className="grid items-end gap-8 border-b border-white/10 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-400">
              Architectural &amp; Editorial Photography
            </p>
            <h1
              className="mt-4 text-4xl font-semibold leading-[1.06] sm:text-6xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Quiet geometry in concrete, timber, and natural shadow.
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400 lg:col-span-4">
            Select any plate below to open the fullscreen exhibition viewer with full medium-format
            EXIF camera telemetry.
          </p>
        </section>

        <section id="jm-gallery" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {['All', 'Monochrome', 'Civic Space', 'Studies'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSeriesFilter(s);
                    setLightboxIndex(null);
                  }}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer ${
                    seriesFilter === s
                      ? 'bg-amber-500 text-black'
                      : 'border border-white/15 text-neutral-300 hover:border-white/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs text-neutral-400">{filtered.length} Plates</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((work, idx) => (
              <button
                key={work.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141414] text-left cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={work.image}
                    alt={work.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackLabel={work.title}
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs text-amber-400">
                      {work.series} · {work.location}
                    </p>
                    <h2
                      className="mt-1 text-xl font-semibold text-white"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {work.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">{work.camera}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Collector Edition Inquiry */}
        <section
          id="jm-editions"
          className="grid gap-8 rounded-2xl border border-white/10 bg-[#141414] p-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <h2
              className="text-3xl font-semibold"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Archival Pigment Editions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              All exhibition plates are printed on Hahnemühle Photo Rag Baryta in signed editions of
              15. Request a sample collector dossier below.
            </p>
          </div>
          <div className="lg:col-span-6 flex items-center">
            {printInquirySent ? (
              <div role="status" className="w-full rounded-xl border border-amber-500/40 bg-black/40 p-5 text-xs">
                <p className="font-bold text-amber-300">Collector Dossier Request Logged (Demo)</p>
                <p className="mt-1 text-neutral-300">
                  Recorded for {collectorEmail} in this interactive showcase.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!collectorEmail.trim()) return;
                  setPrintInquirySent(true);
                }}
                className="flex w-full flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  aria-label="Collector email"
                  value={collectorEmail}
                  onChange={(e) => setCollectorEmail(e.target.value)}
                  placeholder="collector@gallery.org"
                  className="flex-1 rounded-lg border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-amber-400 cursor-pointer whitespace-nowrap"
                >
                  Request Edition Sheet
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-[#121212] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 rounded-lg bg-black/60 p-2 text-white hover:text-amber-400 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-black">
              <ResilientImage
                src={activePhoto.image}
                alt={activePhoto.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {activePhoto.title}
                </h3>
                <p className="mt-1 flex items-center gap-2 font-mono text-xs text-neutral-400">
                  <Camera className="h-3.5 w-3.5 text-amber-400" />
                  <span>
                    {activePhoto.camera} · {activePhoto.lens} · {activePhoto.exposure}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous photograph"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
                  }
                  className="rounded-lg border border-white/15 p-2 text-white hover:border-amber-400 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next photograph"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % filtered.length)}
                  className="rounded-lg border border-white/15 p-2 text-white hover:border-amber-400 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
