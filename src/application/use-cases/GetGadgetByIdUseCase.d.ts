import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import { Gadget } from '../../domain/entities/Gadget.js';
export declare class GetGadgetByIdUseCase {
    private gadgetRepository;
    constructor(gadgetRepository: IGadgetRepository);
    execute(gadgetId: string): Promise<Gadget>;
}
//# sourceMappingURL=GetGadgetByIdUseCase.d.ts.map