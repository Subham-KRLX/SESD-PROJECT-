import { prisma } from '../../infrastructure/database/client.js';

export interface DashboardSalesPoint {
  month: string;
  sales: number;
  units: number;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalGadgets: number;
  lowStockItems: number;
  topProduct: string;
  salesHistory: DashboardSalesPoint[];
}

export class GetDashboardStatsUseCase {
  async execute(): Promise<DashboardStats> {
    const [
      orderCount,
      revenueResult,
      customerCount,
      gadgetCount,
      lowStockCount,
      orders
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          totalPrice: true
        }
      }),
      prisma.user.count({
        where: { role: 'CUSTOMER' }
      }),
      prisma.gadget.count(),
      prisma.gadget.count({
        where: { stockCount: { lt: 5 } }
      }),
      prisma.order.findMany({
        include: {
          items: {
            include: {
              gadget: true
            }
          }
        }
      })
    ]);

    const salesBuckets = new Map<string, { month: string; sales: number; units: number }>();
    const productTotals = new Map<string, { name: string; units: number }>();

    for (const order of orders) {
      const monthKey = `${order.orderDate.getFullYear()}-${String(order.orderDate.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = order.orderDate.toLocaleDateString('en-US', { month: 'short' });

      if (!salesBuckets.has(monthKey)) {
        salesBuckets.set(monthKey, { month: monthLabel, sales: 0, units: 0 });
      }

      const bucket = salesBuckets.get(monthKey)!;

      for (const item of order.items) {
        const lineTotal = Number(item.unitPriceAtPurchase) * item.quantity;
        bucket.sales += lineTotal;
        bucket.units += item.quantity;

        const productName = item.gadget?.modelName || 'Unknown Gadget';
        const current = productTotals.get(item.gadgetId) || { name: productName, units: 0 };
        current.units += item.quantity;
        productTotals.set(item.gadgetId, current);
      }
    }

    const salesHistory = Array.from(salesBuckets.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([, bucket]) => ({
        month: bucket.month,
        sales: Number(bucket.sales.toFixed(2)),
        units: bucket.units,
      }));

    const topProduct = Array.from(productTotals.values()).sort((left, right) => right.units - left.units)[0]?.name || 'N/A';

    return {
      totalOrders: orderCount,
      totalRevenue: Number(revenueResult._sum.totalPrice || 0),
      totalCustomers: customerCount,
      totalGadgets: gadgetCount,
      lowStockItems: lowStockCount,
      topProduct,
      salesHistory
    };
  }
}
