import { Order, OrderItem } from '../../domain/entities/Order.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import type { IOrderRepository } from '../../domain/repositories/IOrderRepository.js';
import crypto from 'crypto';

interface OrderItemInput {
  gadgetId: string;
  quantity: number;
}

/**
 * Manages the atomic acquisition of hardware assets from the catalog
 */
export class PlaceOrderUseCase {
  constructor(
    private gadgetRepository: IGadgetRepository,
    private orderRepository: IOrderRepository
  ) {}

  async execute(customerId: string, itemsInput: OrderItemInput[]): Promise<Order> {
    const orderItems: OrderItem[] = [];
    const stockUpdates: { gadgetId: string; quantity: number }[] = [];

    // Verify stock availability for every component in the request
    for (const item of itemsInput) {
      const gadget = await this.gadgetRepository.findById(item.gadgetId);
      if (!gadget) throw new Error("Gadget not found: " + item.gadgetId);
      if (gadget.stockQty < item.quantity) {
        throw new Error("Insufficient stock for gadget: " + gadget.modelName);
      }

      const orderItem = new OrderItem(
        gadget.id,
        item.quantity,
        gadget.price
      );
      orderItems.push(orderItem);
      stockUpdates.push({ gadgetId: gadget.id, quantity: item.quantity });
    }

    const order = new Order(
      crypto.randomUUID(),
      customerId,
      orderItems
    );

    // Finalize the transaction: stock is only deducted if order creation succeeds
    await this.orderRepository.saveAtomic(order, stockUpdates);
    return order;
  }
}
