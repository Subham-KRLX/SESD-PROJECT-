import { Order, OrderItem } from '../../domain/entities/Order.js';
import { prisma } from '../database/client.js';
import { OrderStatus as PrismaOrderStatus } from '@prisma/client';
export class PrismaOrderRepository {
    mapToEntity(dbOrder) {
        const items = dbOrder.items.map((item) => new OrderItem(item.gadgetId, item.quantity, Number(item.unitPriceAtPurchase)));
        const order = new Order(dbOrder.id, dbOrder.customerId, items, dbOrder.orderDate);
        order.updateStatus(dbOrder.status);
        return order;
    }
    async findById(id) {
        const dbOrder = await prisma.order.findUnique({
            where: { id },
            include: { items: true }
        });
        return dbOrder ? this.mapToEntity(dbOrder) : null;
    }
    async save(order) {
        await prisma.$transaction(async (tx) => {
            // 1. Create the Order
            await tx.order.create({
                data: {
                    id: order.id,
                    customerId: order.customerId,
                    totalPrice: order.calculateTotal(),
                    status: order.status,
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
            // 2. Decrement stock for each item
            for (const item of order.items) {
                await tx.gadget.update({
                    where: { id: item.gadgetId },
                    data: { stockCount: { decrement: item.quantity } }
                });
            }
        });
    }
    async listByCustomer(customerId) {
        const dbOrders = await prisma.order.findMany({
            where: { customerId },
            include: { items: true }
        });
        return dbOrders.map(this.mapToEntity);
    }
    async updateStatus(id, status) {
        await prisma.order.update({
            where: { id },
            data: { status: status }
        });
    }
}
//# sourceMappingURL=PrismaOrderRepository.js.map