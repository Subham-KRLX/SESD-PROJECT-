import { prisma } from '../../infrastructure/database/client.js';
export class GetDashboardStatsUseCase {
    async execute() {
        // We can use Prisma directly for aggregation or define methods in repositories.
        // For a dashboard, direct aggregation is often cleaner if multiple entities are involved.
        const [orderCount, revenueResult, customerCount, gadgetCount, lowStockCount] = await Promise.all([
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
            })
        ]);
        return {
            totalOrders: orderCount,
            totalRevenue: Number(revenueResult._sum.totalPrice || 0),
            totalCustomers: customerCount,
            totalGadgets: gadgetCount,
            lowStockItems: lowStockCount
        };
    }
}
//# sourceMappingURL=GetDashboardStatsUseCase.js.map