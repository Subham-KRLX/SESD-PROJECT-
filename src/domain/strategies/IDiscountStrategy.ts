/**
 * Strategy for applying price adjustments to hardware acquisitions
 */
export interface IDiscountStrategy {
  calculateDiscount(totalPrice: number): number;
  getName(): string;
}

/**
 * Standard pricing with no adjustments
 */
export class DefaultDiscountStrategy implements IDiscountStrategy {
  calculateDiscount(totalPrice: number): number {
    return 0; 
  }

  getName(): string {
    return "Standard Listing Price";
  }
}

/**
 * Priority pricing adjustments for high-volume hardware deployments
 */
export class BulkDiscountStrategy implements IDiscountStrategy {
  constructor(private threshold: number, private percentage: number) {}

  calculateDiscount(totalPrice: number): number {
    if (totalPrice >= this.threshold) {
      return totalPrice * (this.percentage / 100);
    }
    return 0;
  }

  getName(): string {
    return `Bulk Acquisition Discount (${this.percentage}% reduction)`;
  }
}
