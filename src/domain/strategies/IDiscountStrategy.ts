export interface IDiscountStrategy {
  calculateDiscount(totalPrice: number): number;
  getName(): string;
}

export class DefaultDiscountStrategy implements IDiscountStrategy {
  calculateDiscount(totalPrice: number): number {
    return 0; // No discount by default
  }

  getName(): string {
    return "Default (No Discount)";
  }
}

export class BulkDiscountStrategy implements IDiscountStrategy {
  constructor(private threshold: number, private percentage: number) {}

  calculateDiscount(totalPrice: number): number {
    if (totalPrice >= this.threshold) {
      return totalPrice * (this.percentage / 100);
    }
    return 0;
  }

  getName(): string {
    return `Bulk Discount (${this.percentage}% off for high value orders)`;
  }
}
