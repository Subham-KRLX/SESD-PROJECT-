import type { IOrderRepository } from '../../domain/repositories/IOrderRepository.js';
import { Order } from '../../domain/entities/Order.js';

export class GetOrderHistoryUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(customerId: string): Promise<Order[]> {
    if (!customerId) throw new Error("Customer ID is required to fetch history.");
    
    const orders = await this.orderRepository.listByCustomer(customerId);
    
    // Prioritize recent acquisitions first
    return orders.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
  }
}
