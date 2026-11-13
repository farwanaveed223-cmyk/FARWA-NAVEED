import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateArchitectureEstimate,
  calculateFreightQuote,
  calculateInvoiceTotals,
  calculatePipelineSummary,
  calculateRestaurantCartTotals,
  filterItemsByCategoryAndQuery,
  getStockHealth,
  moveDealStage,
  summarizeInventory,
  type CrmDeal,
  type InventorySku,
} from './demoLogic';

test('CRM pipeline summary computes totals, weighted forecast, and win rate', () => {
  const deals: CrmDeal[] = [
    {
      id: 'd1',
      title: 'Enterprise Rollout',
      company: 'Apex Corp',
      value: 40000,
      probability: 50,
      stage: 'Proposal',
      owner: 'Nadia',
      closeDate: '2026-12-01',
    },
    {
      id: 'd2',
      title: 'Annual License',
      company: 'Northstar',
      value: 20000,
      probability: 100,
      stage: 'Closed Won',
      owner: 'Tariq',
      closeDate: '2026-11-10',
    },
  ];
  const summary = calculatePipelineSummary(deals);
  assert.equal(summary.totalPipeline, 40000);
  assert.equal(summary.closedWonValue, 20000);
  assert.equal(summary.weightedForecast, 40000); // 20k + 20k
  assert.equal(summary.winRate, 50);

  const moved = moveDealStage(deals, 'd1', 'Closed Won');
  assert.equal(moved[0].stage, 'Closed Won');
  assert.equal(moved[0].probability, 100);
});

test('Inventory health and summary detect low stock and out-of-stock SKUs', () => {
  assert.equal(getStockHealth(0, 10), 'Out of Stock');
  assert.equal(getStockHealth(8, 10), 'Low Stock');
  assert.equal(getStockHealth(25, 10), 'Healthy');

  const skus: InventorySku[] = [
    {
      id: '1',
      sku: 'SKU-01',
      name: 'Thermal Printer',
      category: 'Hardware',
      stock: 5,
      reorderPoint: 10,
      unitCost: 120,
      supplier: 'Kova',
    },
    {
      id: '2',
      sku: 'SKU-02',
      name: 'Barcode Scanner',
      category: 'Hardware',
      stock: 0,
      reorderPoint: 8,
      unitCost: 85,
      supplier: 'Kova',
    },
    {
      id: '3',
      sku: 'SKU-03',
      name: 'Label Rolls',
      category: 'Supplies',
      stock: 40,
      reorderPoint: 15,
      unitCost: 12.5,
      supplier: 'PackPro',
    },
  ];

  const summary = summarizeInventory(skus);
  assert.equal(summary.totalUnits, 45);
  assert.equal(summary.totalValue, 1100);
  assert.equal(summary.outOfStockCount, 1);
  assert.equal(summary.lowStockItems.length, 2);
});

test('Invoice line items compute subtotal, tax, and total accurately', () => {
  const result = calculateInvoiceTotals(
    [
      { description: 'Brand System', quantity: 1, unitPrice: 3500 },
      { description: 'Web Development', quantity: 2, unitPrice: 1250 },
    ],
    10,
  );
  assert.equal(result.subtotal, 6000);
  assert.equal(result.taxAmount, 600);
  assert.equal(result.total, 6600);
});

test('Restaurant cart applies delivery fee under $65 threshold and free delivery above', () => {
  const smallDelivery = calculateRestaurantCartTotals(
    [{ id: 'm1', name: 'Saffron Risotto', price: 28, quantity: 1 }],
    'delivery',
  );
  assert.equal(smallDelivery.itemCount, 1);
  assert.equal(smallDelivery.deliveryFee, 5.5);
  assert.equal(smallDelivery.subtotal, 28);

  const largeDelivery = calculateRestaurantCartTotals(
    [{ id: 'm1', name: 'Wagyu Ribeye', price: 70, quantity: 1 }],
    'delivery',
  );
  assert.equal(largeDelivery.deliveryFee, 0);

  const pickup = calculateRestaurantCartTotals(
    [{ id: 'm1', name: 'Saffron Risotto', price: 28, quantity: 1 }],
    'pickup',
  );
  assert.equal(pickup.deliveryFee, 0);
});

test('Architecture and freight estimators produce bounded deterministic estimates', () => {
  const arch = calculateArchitectureEstimate({
    areaSqFt: 3000,
    projectType: 'Residential',
    tier: 'Full Design',
  });
  assert.ok(arch.estimatedBudgetHigh > arch.estimatedBudgetLow);
  assert.ok(arch.timelineWeeks >= 10);

  const freight = calculateFreightQuote({
    weightKg: 500,
    distanceKm: 1200,
    priority: 'Express',
  });
  assert.ok(freight.estimatedCost > 165);
  assert.equal(freight.transitDays, 2);
});

test('Category and search filter matches title, description, and category', () => {
  const items = [
    { category: 'Growth', title: 'Marketing & Analytics', description: 'Traffic charts' },
    { category: 'Operations', title: 'HR & People', description: 'Leave requests' },
  ];
  assert.equal(filterItemsByCategoryAndQuery(items, 'All', '').length, 2);
  assert.equal(filterItemsByCategoryAndQuery(items, 'Growth', '').length, 1);
  assert.equal(filterItemsByCategoryAndQuery(items, 'All', 'leave').length, 1);
  assert.equal(filterItemsByCategoryAndQuery(items, 'Growth', 'leave').length, 0);
});
