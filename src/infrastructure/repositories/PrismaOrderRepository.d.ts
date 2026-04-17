import { Order } from '../../domain/entities/Order.js';
import type { IOrderRepository } from '../../domain/repositories/IOrderRepository.js';
export declare class PrismaOrderRepository implements IOrderRepository {
    private mapToEntity;
    findById(id: string): Promise<Order | null>;
    save(order: Order): Promise<void>;
    listByCustomer(customerId: string): Promise<Order[]>;
    updateStatus(id: string, status: string): Promise<void>;
}
//# sourceMappingURL=PrismaOrderRepository.d.ts.map