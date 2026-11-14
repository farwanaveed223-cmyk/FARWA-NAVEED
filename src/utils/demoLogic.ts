export function formatPkr(amount: number): string {
  return `PKR ${Math.round(amount).toLocaleString('en-US')}`;
}

export type CrmStage = 'Qualified' | 'Viewing' | 'Negotiation' | 'Closed Won';

export interface CrmDeal {
  id: string;
  title: string;
  company: string;
  city: string;
  valuePkr: number;
  probability: number;
  stage: CrmStage;
  owner: string;
  closeDate: string;
}

export function calculatePipelineSummary(deals: CrmDeal[]): {
  totalPipeline: number;
  weightedForecast: number;
  closedWonValue: number;
  winRate: number;
  stageTotals: Record<CrmStage, number>;
} {
  const stageTotals: Record<CrmStage, number> = {
    Qualified: 0,
    Viewing: 0,
    Negotiation: 0,
    'Closed Won': 0,
  };

  let totalPipeline = 0;
  let weightedForecast = 0;
  let closedWonCount = 0;

  for (const deal of deals) {
    stageTotals[deal.stage] += deal.valuePkr;
    if (deal.stage === 'Closed Won') {
      closedWonCount += 1;
      weightedForecast += deal.valuePkr;
    } else {
      totalPipeline += deal.valuePkr;
      weightedForecast += Math.round(deal.valuePkr * (deal.probability / 100));
    }
  }

  const winRate = deals.length > 0 ? Math.round((closedWonCount / deals.length) * 100) : 0;

  return {
    totalPipeline,
    weightedForecast,
    closedWonValue: stageTotals['Closed Won'],
    winRate,
    stageTotals,
  };
}

export function moveDealStage(deals: CrmDeal[], dealId: string, nextStage: CrmStage): CrmDeal[] {
  const stageProbability: Record<CrmStage, number> = {
    Qualified: 25,
    Viewing: 55,
    Negotiation: 80,
    'Closed Won': 100,
  };
  return deals.map((deal) =>
    deal.id === dealId
      ? { ...deal, stage: nextStage, probability: stageProbability[nextStage] }
      : deal,
  );
}

export type StockHealth = 'Out of Stock' | 'Low Stock' | 'Healthy';

export interface InventorySku {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderPoint: number;
  unitPricePkr: number;
  supplier: string;
}

export function getStockHealth(stock: number, reorderPoint: number): StockHealth {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= reorderPoint) return 'Low Stock';
  return 'Healthy';
}

export function summarizeInventory(items: InventorySku[]): {
  totalUnits: number;
  totalValuePkr: number;
  lowStockItems: InventorySku[];
  outOfStockCount: number;
} {
  let totalUnits = 0;
  let totalValuePkr = 0;
  let outOfStockCount = 0;
  const lowStockItems: InventorySku[] = [];

  for (const item of items) {
    totalUnits += item.stock;
    totalValuePkr += item.stock * item.unitPricePkr;
    const health = getStockHealth(item.stock, item.reorderPoint);
    if (health === 'Out of Stock') {
      outOfStockCount += 1;
      lowStockItems.push(item);
    } else if (health === 'Low Stock') {
      lowStockItems.push(item);
    }
  }

  return {
    totalUnits,
    totalValuePkr: Math.round(totalValuePkr),
    lowStockItems,
    outOfStockCount,
  };
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export function calculateInvoiceTotals(
  items: InvoiceLineItem[],
  taxRatePercent: number,
): {
  subtotal: number;
  taxAmount: number;
  total: number;
} {
  const rawSubtotal = items.reduce(
    (sum, item) => sum + Math.max(0, item.quantity) * Math.max(0, item.unitPrice),
    0,
  );
  const subtotal = Math.round(rawSubtotal);
  const safeTax = Math.max(0, taxRatePercent);
  const taxAmount = Math.round(subtotal * (safeTax / 100));
  const total = subtotal + taxAmount;
  return { subtotal, taxAmount, total };
}

export interface CartEntry {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function calculateFoodOrderTotals(
  entries: CartEntry[],
  orderType: 'pickup' | 'delivery',
  freeDeliveryThresholdPkr = 5000,
  deliveryFeePkr = 250,
): {
  itemCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
} {
  const itemCount = entries.reduce((sum, e) => sum + Math.max(0, e.quantity), 0);
  const rawSubtotal = entries.reduce(
    (sum, e) => sum + Math.max(0, e.quantity) * Math.max(0, e.price),
    0,
  );
  const subtotal = Math.round(rawSubtotal);
  const tax = Math.round(subtotal * 0.05);
  const deliveryFee =
    orderType === 'delivery' && subtotal > 0 && subtotal < freeDeliveryThresholdPkr
      ? deliveryFeePkr
      : 0;
  const total = subtotal + tax + deliveryFee;
  return { itemCount, subtotal, tax, deliveryFee, total };
}

export function calculateConstructionEstimatePkr(params: {
  areaSqFt: number;
  projectType: 'Residential Villa' | 'Commercial Plaza' | 'Corporate Fit-Out';
  finishTier: 'Grey Structure' | 'A-Class Finish' | 'Turnkey Luxury';
}): {
  estimatedBudgetLow: number;
  estimatedBudgetHigh: number;
  timelineMonths: number;
} {
  const safeArea = Math.max(1000, Math.min(50000, params.areaSqFt));
  const basePerSqFt =
    params.projectType === 'Residential Villa'
      ? 4800
      : params.projectType === 'Commercial Plaza'
        ? 5400
        : 4200;
  const finishMultiplier =
    params.finishTier === 'Grey Structure' ? 0.65 : params.finishTier === 'A-Class Finish' ? 1 : 1.35;

  const baseCost = safeArea * basePerSqFt * finishMultiplier;
  const estimatedBudgetLow = Math.round((baseCost * 0.92) / 50000) * 50000;
  const estimatedBudgetHigh = Math.round((baseCost * 1.12) / 50000) * 50000;
  const timelineMonths = Math.max(
    4,
    Math.round(safeArea / 1100) + (params.finishTier === 'Grey Structure' ? 3 : params.finishTier === 'A-Class Finish' ? 7 : 10),
  );

  return { estimatedBudgetLow, estimatedBudgetHigh, timelineMonths };
}

export function filterItemsByCategoryAndQuery<
  T extends { category: string; title: string; description: string },
>(items: T[], category: string, query: string): T[] {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );
  });
}
