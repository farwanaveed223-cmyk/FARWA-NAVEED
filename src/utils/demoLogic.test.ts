import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateConstructionEstimatePkr,
  calculateFoodOrderTotals,
  calculateInvoiceTotals,
  calculatePipelineSummary,
  filterItemsByCategoryAndQuery,
  formatPkr,
  getStockHealth,
  moveDealStage,
  summarizeInventory,
  type CrmDeal,
  type InventorySku,
} from './demoLogic';

test('formatPkr formats Pakistani Rupee amounts cleanly', () => {
  assert.equal(formatPkr(125000), 'PKR 125,000');
});

test('EstateFlow CRM pipeline summary computes PKR totals, weighted forecast, and win rate', () => {
  const deals: CrmDeal[] = [
    {
      id: 'd1',
      title: 'DHA Phase 6 1-Kanal Villa',
      company: 'Al-Rehman Builders',
      city: 'Lahore',
      valuePkr: 85000000,
      probability: 55,
      stage: 'Viewing',
      owner: 'Usman Tariq',
      closeDate: '2026-12-01',
    },
    {
      id: 'd2',
      title: 'Clifton Block 4 Apartment',
      company: 'Siddiqui Family',
      city: 'Karachi',
      valuePkr: 40000000,
      probability: 100,
      stage: 'Closed Won',
      owner: 'Sana Malik',
      closeDate: '2026-11-10',
    },
  ];
  const summary = calculatePipelineSummary(deals);
  assert.equal(summary.totalPipeline, 85000000);
  assert.equal(summary.closedWonValue, 40000000);
  assert.equal(summary.weightedForecast, 40000000 + Math.round(85000000 * 0.55));
  assert.equal(summary.winRate, 50);

  const moved = moveDealStage(deals, 'd1', 'Closed Won');
  assert.equal(moved[0].stage, 'Closed Won');
  assert.equal(moved[0].probability, 100);
});

test('StockPilot inventory health and summary detect low stock and out-of-stock SKUs', () => {
  assert.equal(getStockHealth(0, 10), 'Out of Stock');
  assert.equal(getStockHealth(8, 10), 'Low Stock');
  assert.equal(getStockHealth(25, 10), 'Healthy');

  const skus: InventorySku[] = [
    {
      id: '1',
      sku: 'SP-LN-01',
      name: 'Zari Embroidered Lawn 3-Piece',
      category: 'Unstitched Lawn',
      stock: 5,
      reorderPoint: 10,
      unitPricePkr: 6500,
      supplier: 'Faisalabad Looms',
    },
    {
      id: '2',
      sku: 'SP-WS-02',
      name: 'Raw Silk Navy Waistcoat',
      category: 'Menswear',
      stock: 0,
      reorderPoint: 8,
      unitPricePkr: 14500,
      supplier: 'Lahore Atelier',
    },
    {
      id: '3',
      sku: 'SP-KT-03',
      name: 'Ivory Cotton Kurta',
      category: 'Pret & Kurtas',
      stock: 40,
      reorderPoint: 15,
      unitPricePkr: 4200,
      supplier: 'Karachi Stitch',
    },
  ];

  const summary = summarizeInventory(skus);
  assert.equal(summary.totalUnits, 45);
  assert.equal(summary.totalValuePkr, 5 * 6500 + 40 * 4200);
  assert.equal(summary.outOfStockCount, 1);
  assert.equal(summary.lowStockItems.length, 2);
});

test('Finora invoice builder calculates PKR subtotal, 17% tax, and total accurately', () => {
  const result = calculateInvoiceTotals(
    [
      { description: 'Annual Audit & FBR Compliance', quantity: 1, unitPrice: 120000 },
      { description: 'Monthly Sales Tax Return Filing', quantity: 2, unitPrice: 25000 },
    ],
    17,
  );
  assert.equal(result.subtotal, 170000);
  assert.equal(result.taxAmount, 28900);
  assert.equal(result.total, 198900);
});

test('Sweet Crumbs & Spice Avenue cart applies delivery fee under PKR 5,000 and free delivery above', () => {
  const smallDelivery = calculateFoodOrderTotals(
    [{ id: 'm1', name: 'Pistachio Rose Cupcakes (Box of 6)', price: 2400, quantity: 1 }],
    'delivery',
  );
  assert.equal(smallDelivery.itemCount, 1);
  assert.equal(smallDelivery.deliveryFee, 250);
  assert.equal(smallDelivery.subtotal, 2400);

  const largeDelivery = calculateFoodOrderTotals(
    [{ id: 'm2', name: 'Custom 2-Tier Celebration Cake', price: 7800, quantity: 1 }],
    'delivery',
  );
  assert.equal(largeDelivery.deliveryFee, 0);

  const pickup = calculateFoodOrderTotals(
    [{ id: 'm1', name: 'Pistachio Rose Cupcakes (Box of 6)', price: 2400, quantity: 1 }],
    'pickup',
  );
  assert.equal(pickup.deliveryFee, 0);
});

test('BuildCraft PKR construction estimator produces bounded deterministic estimates', () => {
  const estimate = calculateConstructionEstimatePkr({
    areaSqFt: 4500,
    projectType: 'Residential Villa',
    finishTier: 'A-Class Finish',
  });
  assert.ok(estimate.estimatedBudgetHigh > estimate.estimatedBudgetLow);
  assert.ok(estimate.timelineMonths >= 6);
});

test('Category and search filter matches title, description, and category', () => {
  const items = [
    { category: 'Growth', title: 'MarketPulse', description: 'SEO and analytics' },
    { category: 'Operations', title: 'PeopleFirst HR', description: 'Leave approvals' },
  ];
  assert.equal(filterItemsByCategoryAndQuery(items, 'All', '').length, 2);
  assert.equal(filterItemsByCategoryAndQuery(items, 'Growth', '').length, 1);
  assert.equal(filterItemsByCategoryAndQuery(items, 'All', 'leave').length, 1);
  assert.equal(filterItemsByCategoryAndQuery(items, 'Growth', 'leave').length, 0);
});
