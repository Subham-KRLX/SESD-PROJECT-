import { Order, OrderItem } from '../../domain/entities/Order.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import type { IOrderRepository } from '../../domain/repositories/IOrderRepository.js';
import crypto from 'crypto';

interface OrderItemInput {
  gadgetId: string;
  quantity: number;
}

export class PlaceOrderUseCase {
  constructor(
    private gadgetRepository: IGadgetRepository,
    private orderRepository: IOrderRepository
  ) {}

  async execute(customerId: string, itemsInput: OrderItemInput[]): Promise<Order> {
    const orderItems: OrderItem[] = [];

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

      gadget.stockQty -= item.quantity;
      await this.gadgetRepository.updateStock(gadget.id, gadget.stockQty);
    }

    const order = new Order(
      crypto.randomUUID(),
      customerId,
      orderItems
    );

    await this.orderRepository.save(order);
    return order;
  }
}
