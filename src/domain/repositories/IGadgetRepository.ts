import { Gadget } from '../entities/Gadget.js';

export interface IGadgetRepository {
  findById(id: string): Promise<Gadget | null>;
  save(gadget: Gadget, vendorId?: string): Promise<void>;
  update(gadget: Gadget): Promise<void>;
  listByCategory(categoryId: string): Promise<Gadget[]>;
  updateStock(id: string, qty: number): Promise<void>;
  findAll(): Promise<Gadget[]>;
}
