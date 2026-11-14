import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Edit3,
  MapPin,
  Package,
  Phone,
  Plus,
  Search,
  Truck,
  X,
} from 'lucide-react';
import { DEMO_MEDIA } from '../../assets/demoMedia';
import { DemoReturnBar, ResilientImage } from '../../components/DemoChrome';
import { formatPkr, getStockHealth, summarizeInventory, type InventorySku } from '../../utils/demoLogic';

interface FashionInventorySku extends InventorySku {
  image: string;
}

const INITIAL_FASHION_SKUS: FashionInventorySku[] = [
  {
    id: 'sp-1',
    sku: 'SP-LN-101',
    name: 'Gulnar Embroidered 3-Piece Lawn',
    category: 'Unstitched Lawn',
    stock: 42,
    reorderPoint: 15,
    unitPricePkr: 6850,
    supplier: 'Faisalabad Looms Co.',
    image: DEMO_MEDIA.stockpilotLawn,
  },
  {
    id: 'sp-2',
    sku: 'SP-MN-204',
    name: 'Royal Navy Raw Silk Waistcoat',
    category: 'Menswear',
    stock: 6,
    reorderPoint: 10,
    unitPricePkr: 14500,
    supplier: 'Lahore Tailoring Guild',
    image: DEMO_MEDIA.stockpilotApparel,
  },
  {
    id: 'sp-3',
    sku: 'SP-PT-309',
    name: 'Ivory Chikankari Cotton Kurta',
    category: 'Pret & Kurtas',
    stock: 28,
    reorderPoint: 12,
    unitPricePkr: 4400,
    supplier: 'Karachi Stitch House',
    image: DEMO_MEDIA.editorialGallery,
  },
  {
    id: 'sp-4',
    sku: 'SP-FS-412',
    name: 'Pashmina Velvet Winter Shawl',
    category: 'Festive & Shawls',
    stock: 0,
    reorderPoint: 8,
    unitPricePkr: 18900,
    supplier: 'Swat Handloom Craft',
    image: DEMO_MEDIA.pixelMomentsBridal,
  },
];

const SUPPLIERS = [
  { name: 'Faisalabad Looms Co.', city: 'Faisalabad', specialty: 'Digital Printed & Zari Lawn', leadTime: '7 Days' },
  { name: 'Lahore Tailoring Guild', city: 'Lahore', specialty: 'Menswear Waistcoats & Sherwanis', leadTime: '5 Days' },
  { name: 'Swat Handloom Craft', city: 'Mingora', specialty: 'Pure Wool & Velvet Shawls', leadTime: '10 Days' },
];

const ORDERS = [
  { id: 'ORD-771', customer: 'Nadia Tariq · Lahore', items: '2x Gulnar 3-Piece Lawn', totalPkr: 13700, courier: 'TCS · Dispatched' },
  { id: 'ORD-772', customer: 'Salman Raza · Karachi', items: '1x Raw Silk Waistcoat', totalPkr: 14500, courier: 'Leopards · Delivered' },
  { id: 'ORD-773', customer: 'Zara Mansoor · Islamabad', items: '3x Chikankari Kurta', totalPkr: 13200, courier: 'M&P · Packing' },
];

export function InventoryDemo({ onBack }: { onBack: () => void }) {
  const [skus, setSkus] = useState<FashionInventorySku[]>(INITIAL_FASHION_SKUS);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCat, setFormCat] = useState('Unstitched Lawn');
  const [formStock, setFormStock] = useState('20');
  const [formPrice, setFormPrice] = useState('5500');
  const [formSupplier, setFormSupplier] = useState('Faisalabad Looms Co.');

  const summary = useMemo(() => summarizeInventory(skus), [skus]);

  const visibleSkus = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skus.filter((s) => {
      if (categoryFilter !== 'All' && s.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.sku.toLowerCase().includes(q) ||
        s.supplier.toLowerCase().includes(q)
      );
    });
  }, [skus, categoryFilter, query]);

  const adjustStock = (id: string, delta: number) => {
    setSkus((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item,
      ),
    );
  };

  const openAdd = () => {
    setEditingId(null);
    setFormName('');
    setFormSku(`SP-NW-${500 + skus.length}`);
    setFormCat('Pret & Kurtas');
    setFormStock('25');
    setFormPrice('5200');
    setShowModal(true);
  };

  const openEdit = (item: FashionInventorySku) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormSku(item.sku);
    setFormCat(item.category);
    setFormStock(String(item.stock));
    setFormPrice(String(item.unitPricePkr));
    setFormSupplier(item.supplier);
    setShowModal(true);
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    const stockNum = Math.max(0, Number(formStock) || 0);
    const priceNum = Math.max(500, Number(formPrice) || 4000);
    if (editingId) {
      setSkus((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? {
                ...s,
                name: formName.trim(),
                sku: formSku.trim() || s.sku,
                category: formCat,
                stock: stockNum,
                unitPricePkr: priceNum,
                supplier: formSupplier,
              }
            : s,
        ),
      );
    } else {
      setSkus((prev) => [
        {
          id: `sp-${Date.now()}`,
          sku: formSku.trim() || 'SP-NEW-01',
          name: formName.trim(),
          category: formCat,
          stock: stockNum,
          reorderPoint: 10,
          unitPricePkr: priceNum,
          supplier: formSupplier,
          image: formCat === 'Unstitched Lawn' ? DEMO_MEDIA.stockpilotLawn : DEMO_MEDIA.stockpilotApparel,
        },
        ...prev,
      ]);
    }
    setShowModal(false);
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAF9] text-zinc-900"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Operations & Inventory"
        clientBrand="StockPilot"
        categoryLabel="Business Demo 07"
        onBack={onBack}
      />

      {/* Fashion Operations Navigation */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a
            href="#sp-top"
            className="text-xl font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            STOCKPILOT
          </a>
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-600">
            <a href="#sp-collections" className="hover:text-amber-800 whitespace-nowrap">Collections</a>
            <a href="#sp-catalog" className="hover:text-amber-800 whitespace-nowrap">Inventory Ledger</a>
            <a href="#sp-logistics" className="hover:text-amber-800 whitespace-nowrap">Suppliers &amp; Orders</a>
          </nav>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-700 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="h-3.5 w-3.5" /> Add Product SKU
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-14">
        {/* Hero Feature + KPI Strip */}
        <section id="sp-top" className="grid gap-8 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-1 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                Pakistani Fashion &amp; Apparel Retail Operations
              </p>
              <h1
                className="mt-2 text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
                style={{ fontFamily: '"Outfit", sans-serif', textWrap: 'balance' }}
              >
                Unified garment inventory, mill procurement &amp; courier dispatch.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Built for Pakistani unstitched lawn houses, menswear ateliers, and seasonal
                pret boutiques to sync Gulberg flagship stock, Faisalabad mills, and nationwide
                COD fulfillment.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs text-zinc-500">Inventory Valuation</p>
                <p className="mt-1.5 font-mono text-xl font-bold tabular-nums">{formatPkr(summary.totalValuePkr)}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{summary.totalUnits} total garments in stock</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs text-zinc-500">Low / Out-of-Stock Alerts</p>
                <p className="mt-1.5 font-mono text-xl font-bold tabular-nums text-amber-700">
                  {summary.lowStockItems.length} Alerts
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{summary.outOfStockCount} SKUs at zero stock</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-zinc-200">
              <ResilientImage
                src={DEMO_MEDIA.stockpilotApparel}
                alt="Pakistani embroidered kurta and waistcoat apparel showroom"
                className="h-full w-full object-cover"
                fallbackLabel="StockPilot Apparel Catalog"
              />
            </div>
          </div>
        </section>

        {/* Low Stock Alert Banner */}
        <section className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              {summary.lowStockItems.length > 0
                ? `Automated Mill Reorder Alert: ${summary.lowStockItems.map((i) => `${i.name} (${i.stock} left)`).join(' · ')}`
                : 'All seasonal apparel SKUs are well above mill reorder thresholds.'}
            </span>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="rounded-md bg-amber-800 px-3 py-1.5 text-[11px] font-bold text-white cursor-pointer whitespace-nowrap"
          >
            Raise New SKU Order
          </button>
        </section>

        {/* Visual Apparel Collection Cards */}
        <section id="sp-collections" className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                Seasonal Catalog Showcase
              </p>
              <h2 className="mt-1 text-2xl font-bold" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Live Merchandise &amp; Quick Restock Grid
              </h2>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                aria-label="Search SKUs or mills"
                placeholder="Search SKU, garment, mill..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64 rounded-lg border border-zinc-200 bg-white pl-9 pr-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Unstitched Lawn', 'Pret & Kurtas', 'Menswear', 'Festive & Shawls'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-zinc-900 text-white'
                      : 'border border-zinc-200 bg-white text-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleSkus.map((item) => {
              const health = getStockHealth(item.stock, item.reorderPoint);
              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        fallbackLabel={item.name}
                      />
                    </div>
                    <div className="p-4 space-y-1.5">
                      <p className="text-[11px] font-semibold text-amber-800">
                        {item.category} · <span className="font-mono">{item.sku}</span>
                      </p>
                      <h3 className="text-sm font-bold text-zinc-900">{item.name}</h3>
                      <p className="font-mono text-sm font-bold tabular-nums text-zinc-800">
                        {formatPkr(item.unitPricePkr)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 text-xs">
                    <span
                      className={`font-semibold ${
                        health === 'Healthy'
                          ? 'text-emerald-700'
                          : health === 'Low Stock'
                            ? 'text-amber-700'
                            : 'text-rose-700'
                      }`}
                    >
                      {health} ({item.stock})
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => adjustStock(item.id, -5)}
                        aria-label={`Decrease stock for ${item.name}`}
                        className="h-6 w-6 rounded border border-zinc-300 font-bold hover:bg-zinc-100 cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustStock(item.id, 10)}
                        aria-label={`Restock 10 units for ${item.name}`}
                        className="h-6 w-6 rounded border border-zinc-300 font-bold hover:bg-zinc-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Stock Ledger Table */}
        <section id="sp-catalog" className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-amber-800" />
            <h2 className="text-base font-bold">Warehouse Ledger &amp; SKU Thresholds</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 text-zinc-500">
                <tr>
                  <th className="py-3 pr-3">SKU</th>
                  <th className="py-3 pr-3">Product Name</th>
                  <th className="py-3 pr-3">Mill Supplier</th>
                  <th className="py-3 pr-3 text-right">Retail (PKR)</th>
                  <th className="py-3 pr-3 text-center">Units</th>
                  <th className="py-3 pr-3">Alert Status</th>
                  <th className="py-3 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {visibleSkus.map((item) => {
                  const health = getStockHealth(item.stock, item.reorderPoint);
                  return (
                    <tr key={item.id}>
                      <td className="py-3.5 pr-3 font-mono text-zinc-500">{item.sku}</td>
                      <td className="py-3.5 pr-3 font-bold text-zinc-900">{item.name}</td>
                      <td className="py-3.5 pr-3 text-zinc-600">{item.supplier}</td>
                      <td className="py-3.5 pr-3 text-right font-mono font-bold tabular-nums">
                        {formatPkr(item.unitPricePkr)}
                      </td>
                      <td className="py-3.5 pr-3 text-center font-mono font-bold tabular-nums">
                        {item.stock}
                      </td>
                      <td className="py-3.5 pr-3 font-semibold">
                        <span
                          className={
                            health === 'Healthy'
                              ? 'text-emerald-700'
                              : health === 'Low Stock'
                                ? 'text-amber-700'
                                : 'text-rose-700'
                          }
                        >
                          {health}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="inline-flex items-center gap-1 rounded border border-zinc-200 px-2.5 py-1 text-[11px] font-semibold hover:border-zinc-900 cursor-pointer"
                        >
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Suppliers & Order Tracking */}
        <section id="sp-logistics" className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4">
            <h2 className="text-base font-bold">Textile Suppliers &amp; Mill Partners</h2>
            <ul className="divide-y divide-zinc-100 text-xs">
              {SUPPLIERS.map((s) => (
                <li key={s.name} className="flex justify-between py-3">
                  <div>
                    <p className="font-bold">{s.name}</p>
                    <p className="text-zinc-500">{s.city} · {s.specialty}</p>
                  </div>
                  <span className="font-mono font-semibold text-amber-800">{s.leadTime} Lead</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-amber-800" />
              <h2 className="text-base font-bold">Recent COD Dispatch Orders</h2>
            </div>
            <ul className="divide-y divide-zinc-100 text-xs">
              {ORDERS.map((o) => (
                <li key={o.id} className="flex justify-between py-3">
                  <div>
                    <p className="font-bold">{o.id} · {o.customer}</p>
                    <p className="text-zinc-500">{o.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">{formatPkr(o.totalPkr)}</p>
                    <p className="text-emerald-700 font-semibold">{o.courier}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 mt-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-2">
            <p className="text-xl font-bold text-white" style={{ fontFamily: '"Outfit", sans-serif' }}>
              STOCKPILOT APPAREL OPS
            </p>
            <p className="max-w-sm leading-relaxed">
              Multi-warehouse apparel inventory control, Faisalabad mill procurement, and Pakistani
              courier dispatch tracking built for fashion retail houses.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Operations Modules</p>
            <ul className="space-y-1.5">
              <li><a href="#sp-collections" className="hover:text-amber-400">Apparel Showcase</a></li>
              <li><a href="#sp-catalog" className="hover:text-amber-400">Warehouse Ledger</a></li>
              <li><a href="#sp-logistics" className="hover:text-amber-400">Mill Suppliers &amp; COD</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">Distribution Hub</p>
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-amber-400" /> Kot Lakhpat &amp; Gulberg III, Lahore</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-amber-400" /> +92 42 3588 4410</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-4 text-center text-[11px] text-zinc-500">
          StockPilot · Interactive Business Operations Demo (Sample Data Only)
        </div>
      </footer>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold">{editingId ? 'Edit Apparel SKU' : 'Add Apparel Product'}</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="p-1 text-zinc-500 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={saveProduct} className="mt-4 space-y-3 text-xs">
              <input
                type="text"
                required
                aria-label="Product Name"
                placeholder="Product Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  aria-label="SKU Code"
                  placeholder="SKU"
                  value={formSku}
                  onChange={(e) => setFormSku(e.target.value)}
                  className="rounded-lg border border-zinc-200 px-3 py-2 font-mono"
                />
                <select
                  aria-label="Apparel Category"
                  value={formCat}
                  onChange={(e) => setFormCat(e.target.value)}
                  className="rounded-lg border border-zinc-200 px-3 py-2"
                >
                  <option>Unstitched Lawn</option>
                  <option>Pret &amp; Kurtas</option>
                  <option>Menswear</option>
                  <option>Festive &amp; Shawls</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  aria-label="Units in stock"
                  placeholder="Stock"
                  value={formStock}
                  onChange={(e) => setFormStock(e.target.value)}
                  className="rounded-lg border border-zinc-200 px-3 py-2 font-mono"
                />
                <input
                  type="number"
                  aria-label="Unit price in PKR"
                  placeholder="PKR Price"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  className="rounded-lg border border-zinc-200 px-3 py-2 font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-zinc-900 py-2.5 font-bold text-white cursor-pointer"
              >
                {editingId ? 'Save Changes' : 'Create Product SKU'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
