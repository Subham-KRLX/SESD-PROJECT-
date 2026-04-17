export interface IDiscountStrategy {
    calculateDiscount(totalPrice: number): number;
    getName(): string;
}
export declare class DefaultDiscountStrategy implements IDiscountStrategy {
    calculateDiscount(totalPrice: number): number;
    getName(): string;
}
export declare class BulkDiscountStrategy implements IDiscountStrategy {
    private threshold;
    private percentage;
    constructor(threshold: number, percentage: number);
    calculateDiscount(totalPrice: number): number;
    getName(): string;
}
//# sourceMappingURL=IDiscountStrategy.d.ts.map