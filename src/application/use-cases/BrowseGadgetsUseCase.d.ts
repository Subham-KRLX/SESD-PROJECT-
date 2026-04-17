import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import { Gadget } from '../../domain/entities/Gadget.js';
export declare class BrowseGadgetsUseCase {
    private gadgetRepository;
    constructor(gadgetRepository: IGadgetRepository);
    execute(filters: {
        searchTerm?: string;
        minPrice?: number;
        maxPrice?: number;
        inStockOnly?: boolean;
    }): Promise<Gadget[]>;
}
//# sourceMappingURL=BrowseGadgetsUseCase.d.ts.map