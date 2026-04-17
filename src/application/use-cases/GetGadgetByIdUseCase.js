import { Gadget } from '../../domain/entities/Gadget.js';
export class GetGadgetByIdUseCase {
    gadgetRepository;
    constructor(gadgetRepository) {
        this.gadgetRepository = gadgetRepository;
    }
    async execute(gadgetId) {
        const gadget = await this.gadgetRepository.findById(gadgetId);
        if (!gadget) {
            throw new Error(`Gadget with ID ${gadgetId} not found.`);
        }
        return gadget;
    }
}
//# sourceMappingURL=GetGadgetByIdUseCase.js.map