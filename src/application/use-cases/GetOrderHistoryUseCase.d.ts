import type { IOrderRepository } from '../../domain/repositories/IOrderRepository.js';
import { Order } from '../../domain/entities/Order.js';
export declare class GetOrderHistoryUseCase {
    private orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(customerId: string): Promise<Order[]>;
}
//# sourceMappingURL=GetOrderHistoryUseCase.d.ts.map