import { Order } from '../../domain/entities/Order.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import type { IOrderRepository } from '../../domain/repositories/IOrderRepository.js';
interface OrderItemInput {
    gadgetId: string;
    quantity: number;
}
export declare class PlaceOrderUseCase {
    private gadgetRepository;
    private orderRepository;
    constructor(gadgetRepository: IGadgetRepository, orderRepository: IOrderRepository);
    execute(customerId: string, itemsInput: OrderItemInput[]): Promise<Order>;
}
export {};
//# sourceMappingURL=PlaceOrderUseCase.d.ts.map