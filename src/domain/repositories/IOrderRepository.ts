import { Order } from '../entities/Order';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
  listByCustomer(customerId: string): Promise<Order[]>;
  updateStatus(id: string, status: string): Promise<void>;
}
