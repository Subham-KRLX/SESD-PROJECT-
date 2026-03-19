import { Order, OrderItem } from '../../domain/entities/Order';
import { IGadgetRepository } from '../../domain/repositories/IGadgetRepository';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { v4 as uuidv4 } from 'uuid';

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

      // Decrement stock in domain entity (in-memory)
      gadget.stockQty -= item.quantity;
      await this.gadgetRepository.updateStock(gadget.id, gadget.stockQty);
    }

    const order = new Order(
      uuidv4(),
      customerId,
      orderItems
    );

    await this.orderRepository.save(order);
    return order;
  }
}
