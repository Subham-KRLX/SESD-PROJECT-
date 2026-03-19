export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';

export class OrderItem {
  constructor(
    public readonly gadgetId: string,
    public quantity: number,
    public unitPrice: number
  ) {}

  getTotalPrice(): number {
    return this.quantity * this.unitPrice;
  }
}

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
    // Basic status progression logic
    this._status = newStatus;
  }
}
