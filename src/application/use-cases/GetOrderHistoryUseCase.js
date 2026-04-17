import { Order } from '../../domain/entities/Order.js';
export class GetOrderHistoryUseCase {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(customerId) {
        if (!customerId)
            throw new Error("Customer ID is required to fetch history.");
        const orders = await this.orderRepository.listByCustomer(customerId);
        // Sort by date descending
        return orders.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
    }
}
//# sourceMappingURL=GetOrderHistoryUseCase.js.map