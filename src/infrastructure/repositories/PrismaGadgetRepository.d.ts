import { Gadget } from '../../domain/entities/Gadget.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
export declare class PrismaGadgetRepository implements IGadgetRepository {
    private mapToEntity;
    private mapToEntityV2;
    findById(id: string): Promise<Gadget | null>;
    save(gadget: Gadget): Promise<void>;
    listByCategory(categoryId: string): Promise<Gadget[]>;
    updateStock(id: string, qty: number): Promise<void>;
    findAll(): Promise<Gadget[]>;
}
//# sourceMappingURL=PrismaGadgetRepository.d.ts.map