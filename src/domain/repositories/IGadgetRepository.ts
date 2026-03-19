import { Gadget } from '../entities/Gadget';

export interface IGadgetRepository {
  findById(id: string): Promise<Gadget | null>;
  save(gadget: Gadget): Promise<void>;
  listByCategory(categoryId: string): Promise<Gadget[]>;
  updateStock(id: string, qty: number): Promise<void>;
}
