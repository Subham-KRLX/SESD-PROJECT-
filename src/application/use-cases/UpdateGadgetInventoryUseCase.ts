import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import type { Gadget } from '../../domain/entities/Gadget.js';

interface UpdateInventoryInput {
  gadgetId: string;
  stockQty?: number;
  price?: number;
}

export class UpdateGadgetInventoryUseCase {
  constructor(private gadgetRepository: IGadgetRepository) {}

  async execute(input: UpdateInventoryInput): Promise<Gadget> {
    const gadget = await this.gadgetRepository.findById(input.gadgetId);
    if (!gadget) throw new Error("Hardware not found in global inventory");

    if (input.stockQty !== undefined) {
      gadget.stockQty = input.stockQty;
    }

    if (input.price !== undefined) {
      gadget.updatePrice(input.price);
    }

    await this.gadgetRepository.update(gadget);
    return gadget;
  }
}
