import { Order } from '../entities/Order.js';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
  saveAtomic(order: Order, stockUpdates: { gadgetId: string; quantity: number }[]): Promise<void>;
  listByCustomer(customerId: string): Promise<Order[]>;
  updateStatus(id: string, status: string): Promise<void>;
}
