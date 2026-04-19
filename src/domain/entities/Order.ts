export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';

/**
 * A specific hardware asset within an acquisition request
 */
export class OrderItem {
  constructor(
    public readonly gadgetId: string,
    public quantity: number,
    public unitPrice: number
  ) {}

  getTotalPrice(): number {
    return this.quantity * this.unitPrice;
  }

  toJSON() {
    return {
      gadgetId: this.gadgetId,
      quantity: this.quantity,
      priceAtPurchase: this.unitPrice,
      totalPrice: this.getTotalPrice(),
    };
  }
}

/**
 * Orchestrates the acquisition and deployment of hardware assets
 */
export class Order {
  private _status: OrderStatus = 'PENDING';

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly orderDate: Date = new Date()
  ) {
    if (items.length === 0) throw new Error("Orders must have at least one item.");
  }

  get status(): OrderStatus {
    return this._status;
  }

  calculateTotal(): number {
    return this.items.reduce((acc, item) => acc + item.getTotalPrice(), 0);
  }

  updateStatus(newStatus: OrderStatus): void {
    // Progress the hardware through the deployment pipeline
    this._status = newStatus;
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      status: this.status,
      createdAt: this.orderDate.toISOString(),
      totalAmount: this.calculateTotal(),
      items: this.items,
    };
  }
}
