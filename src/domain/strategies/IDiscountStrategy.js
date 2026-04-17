export class DefaultDiscountStrategy {
    calculateDiscount(totalPrice) {
        return 0; // No discount by default
    }
    getName() {
        return "Default (No Discount)";
    }
}
export class BulkDiscountStrategy {
    threshold;
    percentage;
    constructor(threshold, percentage) {
        this.threshold = threshold;
        this.percentage = percentage;
    }
    calculateDiscount(totalPrice) {
        if (totalPrice >= this.threshold) {
            return totalPrice * (this.percentage / 100);
        }
        return 0;
    }
    getName() {
        return `Bulk Discount (${this.percentage}% off for high value orders)`;
    }
}
//# sourceMappingURL=IDiscountStrategy.js.map