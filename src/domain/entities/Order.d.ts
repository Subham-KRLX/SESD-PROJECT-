export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
export declare class OrderItem {
    readonly gadgetId: string;
    quantity: number;
    unitPrice: number;
    constructor(gadgetId: string, quantity: number, unitPrice: number);
    getTotalPrice(): number;
}
export declare class Order {
    readonly id: string;
    readonly customerId: string;
    readonly items: OrderItem[];
    readonly orderDate: Date;
    private _status;
    constructor(id: string, customerId: string, items: OrderItem[], orderDate?: Date);
    get status(): OrderStatus;
    calculateTotal(): number;
    updateStatus(newStatus: OrderStatus): void;
}
//# sourceMappingURL=Order.d.ts.map