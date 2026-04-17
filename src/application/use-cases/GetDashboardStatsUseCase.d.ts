export interface DashboardStats {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    totalGadgets: number;
    lowStockItems: number;
}
export declare class GetDashboardStatsUseCase {
    execute(): Promise<DashboardStats>;
}
//# sourceMappingURL=GetDashboardStatsUseCase.d.ts.map