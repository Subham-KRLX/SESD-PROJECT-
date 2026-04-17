import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import { Gadget } from '../../domain/entities/Gadget.js';

export class GetGadgetByIdUseCase {
  constructor(private gadgetRepository: IGadgetRepository) {}

  async execute(gadgetId: string): Promise<Gadget> {
    const gadget = await this.gadgetRepository.findById(gadgetId);
    if (!gadget) {
      throw new Error(`Gadget with ID ${gadgetId} not found.`);
    }
    return gadget;
  }
}
