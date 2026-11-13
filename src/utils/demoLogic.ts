export type CrmStage = 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won';

export interface CrmDeal {
  id: string;
  title: string;
  company: string;
  value: number;
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
    Proposal: 0,
    Negotiation: 0,
    'Closed Won': 0,
  };

  let totalPipeline = 0;
  let weightedForecast = 0;
  let closedWonCount = 0;

  for (const deal of deals) {
    stageTotals[deal.stage] += deal.value;
    if (deal.stage === 'Closed Won') {
      closedWonCount += 1;
      weightedForecast += deal.value;
    } else {
      totalPipeline += deal.value;
      weightedForecast += Math.round(deal.value * (deal.probability / 100));
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
    Proposal: 50,
    Negotiation: 75,
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
  unitCost: number;
  supplier: string;
}

export function getStockHealth(stock: number, reorderPoint: number): StockHealth {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= reorderPoint) return 'Low Stock';
  return 'Healthy';
}

export function summarizeInventory(items: InventorySku[]): {
  totalUnits: number;
  totalValue: number;
  lowStockItems: InventorySku[];
  outOfStockCount: number;
} {
  let totalUnits = 0;
  let totalValue = 0;
  let outOfStockCount = 0;
  const lowStockItems: InventorySku[] = [];

  for (const item of items) {
    totalUnits += item.stock;
    totalValue += item.stock * item.unitCost;
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
    totalValue: Math.round(totalValue * 100) / 100,
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
  const subtotal = Math.round(rawSubtotal * 100) / 100;
  const safeTax = Math.max(0, taxRatePercent);
  const taxAmount = Math.round(subtotal * (safeTax / 100) * 100) / 100;
  const total = Math.round((subtotal + taxAmount) * 100) / 100;
  return { subtotal, taxAmount, total };
}

export interface CartEntry {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function calculateRestaurantCartTotals(
  entries: CartEntry[],
  orderType: 'pickup' | 'delivery',
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
  const subtotal = Math.round(rawSubtotal * 100) / 100;
  const tax = Math.round(subtotal * 0.085 * 100) / 100;
  const deliveryFee = orderType === 'delivery' && subtotal > 0 && subtotal < 65 ? 5.5 : 0;
  const total = Math.round((subtotal + tax + deliveryFee) * 100) / 100;
  return { itemCount, subtotal, tax, deliveryFee, total };
}

export function calculateArchitectureEstimate(params: {
  areaSqFt: number;
  projectType: 'Residential' | 'Commercial' | 'Hospitality';
  tier: 'Concept' | 'Full Design' | 'Turnkey';
}): {
  estimatedBudgetLow: number;
  estimatedBudgetHigh: number;
  timelineWeeks: number;
} {
  const safeArea = Math.max(500, Math.min(50000, params.areaSqFt));
  const baseRate =
    params.projectType === 'Residential' ? 320 : params.projectType === 'Commercial' ? 280 : 390;
  const tierMultiplier =
    params.tier === 'Concept' ? 0.08 : params.tier === 'Full Design' ? 0.14 : 0.22;

  const constructionBase = safeArea * baseRate;
  const feeMid = constructionBase * tierMultiplier;
  const estimatedBudgetLow = Math.round((feeMid * 0.9) / 500) * 500;
  const estimatedBudgetHigh = Math.round((feeMid * 1.15) / 500) * 500;
  const timelineWeeks =
    Math.round(safeArea / 1200) +
    (params.tier === 'Concept' ? 4 : params.tier === 'Full Design' ? 10 : 18);

  return { estimatedBudgetLow, estimatedBudgetHigh, timelineWeeks };
}

export function calculateFreightQuote(params: {
  weightKg: number;
  distanceKm: number;
  priority: 'Standard' | 'Express' | 'Cold Chain';
}): {
  estimatedCost: number;
  transitDays: number;
} {
  const safeWeight = Math.max(10, params.weightKg);
  const safeDistance = Math.max(50, params.distanceKm);
  const ratePerKgKm =
    params.priority === 'Standard' ? 0.0022 : params.priority === 'Express' ? 0.0038 : 0.0045;
  const baseHandling = params.priority === 'Standard' ? 95 : params.priority === 'Express' ? 165 : 220;
  const estimatedCost = Math.round((baseHandling + safeWeight * safeDistance * ratePerKgKm) * 100) / 100;
  const speedKmPerDay =
    params.priority === 'Express' ? 950 : params.priority === 'Cold Chain' ? 750 : 520;
  const transitDays = Math.max(1, Math.ceil(safeDistance / speedKmPerDay));
  return { estimatedCost, transitDays };
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
