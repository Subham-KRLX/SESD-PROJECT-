export declare class Review {
    readonly id: string;
    readonly customerId: string;
    readonly gadgetId: string;
    performanceRating: number;
    feedbackText: string;
    readonly createdAt: Date;
    constructor(id: string, customerId: string, gadgetId: string, performanceRating: number, feedbackText: string, createdAt?: Date);
    isHighPerformance(): boolean;
}
//# sourceMappingURL=Review.d.ts.map