import { Order, OrderItem } from '../../domain/entities/Order.js';
import crypto from 'crypto';
export class PlaceOrderUseCase {
    gadgetRepository;
    orderRepository;
    constructor(gadgetRepository, orderRepository) {
        this.gadgetRepository = gadgetRepository;
        this.orderRepository = orderRepository;
    }
    async execute(customerId, itemsInput) {
        const orderItems = [];
        for (const item of itemsInput) {
            const gadget = await this.gadgetRepository.findById(item.gadgetId);
            if (!gadget)
                throw new Error("Gadget not found: " + item.gadgetId);
            if (gadget.stockQty < item.quantity) {
                throw new Error("Insufficient stock for gadget: " + gadget.modelName);
            }
            const orderItem = new OrderItem(gadget.id, item.quantity, gadget.price);
            orderItems.push(orderItem);
            gadget.stockQty -= item.quantity;
            await this.gadgetRepository.updateStock(gadget.id, gadget.stockQty);
        }
        const order = new Order(crypto.randomUUID(), customerId, orderItems);
        await this.orderRepository.save(order);
        return order;
    }
}
//# sourceMappingURL=PlaceOrderUseCase.js.map