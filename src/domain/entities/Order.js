export class OrderItem {
    gadgetId;
    quantity;
    unitPrice;
    constructor(gadgetId, quantity, unitPrice) {
        this.gadgetId = gadgetId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
    getTotalPrice() {
        return this.quantity * this.unitPrice;
    }
}
export class Order {
    id;
    customerId;
    items;
    orderDate;
    _status = 'PENDING';
    constructor(id, customerId, items, orderDate = new Date()) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.orderDate = orderDate;
        if (items.length === 0)
            throw new Error("Orders must have at least one item.");
    }
    get status() {
        return this._status;
    }
    calculateTotal() {
        return this.items.reduce((acc, item) => acc + item.getTotalPrice(), 0);
    }
    updateStatus(newStatus) {
        // Basic status progression logic
        this._status = newStatus;
    }
}
//# sourceMappingURL=Order.js.map