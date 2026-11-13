import React, { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, PackageCheck, Plus, Truck, X } from 'lucide-react';
import { DemoReturnBar } from '../../components/DemoChrome';
import {
  getStockHealth,
  summarizeInventory,
  type InventorySku,
} from '../../utils/demoLogic';

interface OrderItem {
  id: string;
  customer: string;
  itemsSummary: string;
  total: number;
  status: 'Pending' | 'Packed' | 'Shipped' | 'Delivered';
}

const INITIAL_SKUS: InventorySku[] = [
  {
    id: 's1',
    sku: 'ATL-401',
    name: 'Industrial Thermal Label Printer',
    category: 'Hardware',
    stock: 6,
    reorderPoint: 10,
    unitCost: 245,
    supplier: 'Kova Precision Ltd.',
  },
  {
    id: 's2',
    sku: 'ATL-209',
    name: 'Wireless 2D Barcode Scanner',
    category: 'Hardware',
    stock: 28,
    reorderPoint: 12,
    unitCost: 118,
    supplier: 'Kova Precision Ltd.',
  },
  {
    id: 's3',
    sku: 'ATL-884',
    name: 'Heavy-Duty Shipping Cartons (50pk)',
    category: 'Packaging',
    stock: 0,
    reorderPoint: 15,
    unitCost: 42,
    supplier: 'PackPro Materials',
  },
  {
    id: 's4',
    sku: 'ATL-112',
    name: 'RFID Pallet Tracking Tags (100pk)',
    category: 'Tracking',
    stock: 19,
    reorderPoint: 8,
    unitCost: 95,
    supplier: 'Vektor IoT',
  },
];

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ORD-7821',
    customer: 'Harborview Fulfillment',
    itemsSummary: '4x Thermal Printer, 10x Cartons',
    total: 1400,
    status: 'Pending',
  },
  {
    id: 'ORD-7820',
    customer: 'Crestline Cold Storage',
    itemsSummary: '6x RFID Tag Packs',
    total: 570,
    status: 'Packed',
  },
  {
    id: 'ORD-7819',
    customer: 'Meridian Grocers',
    itemsSummary: '8x Barcode Scanners',
    total: 944,
    status: 'Shipped',
  },
];

const SUPPLIERS = [
  { name: 'Kova Precision Ltd.', leadTime: '4 business days', reliability: '99.2%', category: 'Hardware' },
  { name: 'PackPro Materials', leadTime: '2 business days', reliability: '97.8%', category: 'Packaging' },
  { name: 'Vektor IoT', leadTime: '6 business days', reliability: '98.5%', category: 'Tracking' },
];

export function InventoryDemo({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'products' | 'orders' | 'suppliers'>('products');
  const [skus, setSkus] = useState<InventorySku[]>(INITIAL_SKUS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [poToast, setPoToast] = useState<string | null>(null);

  const [showAddSku, setShowAddSku] = useState(false);
  const [newSkuCode, setNewSkuCode] = useState('');
  const [newSkuName, setNewSkuName] = useState('');
  const [newSkuStock, setNewSkuStock] = useState('15');
  const [newSkuCost, setNewSkuCost] = useState('85');

  const stats = useMemo(() => summarizeInventory(skus), [skus]);

  const displayedSkus = useMemo(
    () =>
      onlyLowStock
        ? skus.filter((s) => getStockHealth(s.stock, s.reorderPoint) !== 'Healthy')
        : skus,
    [skus, onlyLowStock],
  );

  const adjustStock = (id: string, delta: number) => {
    setSkus((prev) =>
      prev.map((s) => (s.id === id ? { ...s, stock: Math.max(0, s.stock + delta) } : s)),
    );
  };

  const handleAddSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkuCode.trim() || !newSkuName.trim()) return;
    setSkus((prev) => [
      {
        id: `s-${Date.now()}`,
        sku: newSkuCode.trim().toUpperCase(),
        name: newSkuName.trim(),
        category: 'Hardware',
        stock: Math.max(0, Number(newSkuStock) || 0),
        reorderPoint: 10,
        unitCost: Math.max(1, Number(newSkuCost) || 50),
        supplier: 'Kova Precision Ltd.',
      },
      ...prev,
    ]);
    setNewSkuCode('');
    setNewSkuName('');
    setShowAddSku(false);
  };

  const triggerRestock = (item: InventorySku) => {
    adjustStock(item.id, 20);
    setPoToast(`Simulated PO dispatched to ${item.supplier} (+20 units of ${item.sku}).`);
  };

  return (
    <div
      className="min-h-screen bg-[#F3F5F8] text-[#18181B]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <DemoReturnBar
        demoName="Operations & Inventory Control"
        clientBrand="Atlas Supply Chain"
        categoryLabel="Operations"
        onBack={onBack}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Atlas Warehouse System
            </p>
            <h1
              className="mt-1 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Stock Levels, Orders &amp; Suppliers
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              {(
                [
                  { id: 'products', label: 'Inventory', icon: Boxes },
                  { id: 'orders', label: 'Orders', icon: PackageCheck },
                  { id: 'suppliers', label: 'Suppliers', icon: Truck },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                      tab === item.id ? 'bg-blue-700 text-white' : 'text-slate-600'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setShowAddSku(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add SKU
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Total Units on Hand</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums">
              {stats.totalUnits}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Inventory Valuation</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-blue-700">
              ${stats.totalValue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Low / Out-of-Stock Alerts</p>
            <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-amber-700">
              {stats.lowStockItems.length} SKUs
            </p>
          </div>
        </div>

        {stats.lowStockItems.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3.5 text-sm text-amber-900">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
              <span>
                <strong>{stats.lowStockItems.length} SKU(s)</strong> need replenishment (
                {stats.outOfStockCount} out of stock).
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setTab('products');
                setOnlyLowStock((prev) => !prev);
              }}
              className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800 cursor-pointer"
            >
              {onlyLowStock ? 'Show All SKUs' : 'Filter Low Stock'}
            </button>
          </div>
        )}

        {poToast && (
          <div
            role="status"
            className="mt-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-xs font-medium text-emerald-900"
          >
            <span>{poToast}</span>
            <button type="button" onClick={() => setPoToast(null)} className="underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">SKU</th>
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-5 py-3 font-semibold">Health</th>
                  <th className="px-5 py-3 font-semibold text-right">Stock</th>
                  <th className="px-5 py-3 font-semibold text-right">Adjust</th>
                  <th className="px-5 py-3 font-semibold text-right">Replenish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedSkus.map((item) => {
                  const health = getStockHealth(item.stock, item.reorderPoint);
                  return (
                    <tr key={item.id}>
                      <td className="px-5 py-3.5 font-mono text-xs font-semibold text-blue-700">
                        {item.sku}
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-zinc-900">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          {item.supplier} · ${item.unitCost}/unit
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold">
                        <span
                          className={
                            health === 'Out of Stock'
                              ? 'text-red-700'
                              : health === 'Low Stock'
                                ? 'text-amber-700'
                                : 'text-emerald-700'
                          }
                        >
                          {health}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-bold tabular-nums">
                        {item.stock}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            aria-label={`Decrease stock for ${item.name}`}
                            onClick={() => adjustStock(item.id, -1)}
                            className="h-7 w-7 rounded border border-slate-200 font-bold hover:bg-slate-100 cursor-pointer"
                          >
                            −
                          </button>
                          <button
                            type="button"
                            aria-label={`Increase stock for ${item.name}`}
                            onClick={() => adjustStock(item.id, 1)}
                            className="h-7 w-7 rounded border border-slate-200 font-bold hover:bg-slate-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => triggerRestock(item)}
                          className="rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 cursor-pointer"
                        >
                          Restock +20
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div className="mt-6 space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-xs font-semibold text-blue-700">{ord.id}</p>
                  <h3 className="text-sm font-bold text-zinc-900">{ord.customer}</h3>
                  <p className="text-xs text-slate-500">{ord.itemsSummary}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold tabular-nums">
                    ${ord.total.toLocaleString()}
                  </span>
                  <select
                    aria-label={`Order ${ord.id} status`}
                    value={ord.status}
                    onChange={(e) =>
                      setOrders((prev) =>
                        prev.map((x) =>
                          x.id === ord.id
                            ? { ...x, status: e.target.value as OrderItem['status'] }
                            : x,
                        ),
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold"
                  >
                    <option>Pending</option>
                    <option>Packed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUPPLIERS */}
        {tab === 'suppliers' && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SUPPLIERS.map((sup) => (
              <div key={sup.name} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold text-blue-700">{sup.category}</p>
                <h3 className="mt-1 text-base font-bold text-zinc-900">{sup.name}</h3>
                <dl className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <dt>Avg Lead Time</dt>
                    <dd className="font-semibold text-zinc-900">{sup.leadTime}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>On-Time Rate</dt>
                    <dd className="font-mono font-semibold text-emerald-700">{sup.reliability}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddSku && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowAddSku(false)}
        >
          <form
            onSubmit={handleAddSku}
            className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Add Inventory SKU</h3>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowAddSku(false)}
                className="rounded p-1 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label htmlFor="sku-code" className="block text-xs font-semibold text-slate-700">
                SKU Code
              </label>
              <input
                id="sku-code"
                required
                value={newSkuCode}
                onChange={(e) => setNewSkuCode(e.target.value)}
                placeholder="ATL-502"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="sku-name" className="block text-xs font-semibold text-slate-700">
                Product Name
              </label>
              <input
                id="sku-name"
                required
                value={newSkuName}
                onChange={(e) => setNewSkuName(e.target.value)}
                placeholder="Industrial Scale Sensor"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="sku-stock" className="block text-xs font-semibold text-slate-700">
                  Initial Stock
                </label>
                <input
                  id="sku-stock"
                  type="number"
                  min={0}
                  value={newSkuStock}
                  onChange={(e) => setNewSkuStock(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="sku-cost" className="block text-xs font-semibold text-slate-700">
                  Unit Cost ($)
                </label>
                <input
                  id="sku-cost"
                  type="number"
                  min={1}
                  value={newSkuCost}
                  onChange={(e) => setNewSkuCost(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 cursor-pointer"
            >
              Save SKU
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
