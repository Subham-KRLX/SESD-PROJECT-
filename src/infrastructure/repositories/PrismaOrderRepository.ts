import { Order, OrderItem, type OrderStatus as EntityOrderStatus } from '../../domain/entities/Order.js';
import type { IOrderRepository } from '../../domain/repositories/IOrderRepository.js';
import { prisma } from '../database/client.js';

type PrismaOrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';

/**
 * Manages the persistence and transactional safety of hardware acquisitions
 */
export class PrismaOrderRepository implements IOrderRepository {
  private mapToEntity(dbOrder: any): Order {
    const items = dbOrder.items.map((item: any) => 
      new OrderItem(item.gadgetId, item.quantity, Number(item.unitPriceAtPurchase))
    );
    const order = new Order(dbOrder.id, dbOrder.customerId, items, dbOrder.orderDate);
    order.updateStatus(dbOrder.status as EntityOrderStatus);
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    const dbOrder = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    return dbOrder ? this.mapToEntity(dbOrder) : null;
  }

  async save(order: Order): Promise<void> {
    const stockUpdates = order.items.map(item => ({
      gadgetId: item.gadgetId,
      quantity: item.quantity
    }));
    await this.saveAtomic(order, stockUpdates);
  }

  async saveAtomic(order: Order, stockUpdates: { gadgetId: string; quantity: number }[]): Promise<void> {
    await prisma.$transaction(async (tx: any) => {
      await tx.order.create({
        data: {
          id: order.id,
          customerId: order.customerId,
          totalPrice: order.calculateTotal(),
          status: (order.status as string).toUpperCase() as PrismaOrderStatus,
          orderDate: order.orderDate,
          items: {
            create: order.items.map(item => ({
              gadgetId: item.gadgetId,
              quantity: item.quantity,
              unitPriceAtPurchase: item.unitPrice
            }))
          }
        }
      });

      for (const update of stockUpdates) {
        await tx.gadget.update({
          where: { id: update.gadgetId },
          data: { stockCount: { decrement: update.quantity } }
        });
      }
    });
  }

  async listByCustomer(customerId: string): Promise<Order[]> {
    const dbOrders = await prisma.order.findMany({
      where: { customerId },
      include: { items: true }
    });
    return dbOrders.map(this.mapToEntity);
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { status: status as PrismaOrderStatus }
    });
  }
}
