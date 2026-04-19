import { GadgetFactory } from '../../domain/entities/GadgetFactory.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import type { Gadget } from '../../domain/entities/Gadget.js';

interface CreateGadgetInput {
  modelName: string;
  manufacturer: string;
  price: number;
  stockQty: number;
  techSpecs: string;
  type: 'CPU' | 'GPU' | 'IoT';
  vendorId: string;
}

/** 
 * Handles listing new hardware into the global catalog 
 */
export class CreateGadgetUseCase {
  constructor(private gadgetRepository: IGadgetRepository) {}

  async execute(input: CreateGadgetInput): Promise<Gadget> {
    let gadget;

    // Use the factory to assemble the correct hardware type
    switch (input.type) {
      case 'CPU':
        gadget = GadgetFactory.createCPU(input.modelName, input.manufacturer, input.price, input.stockQty, input.techSpecs);
        break;
      case 'GPU':
        gadget = GadgetFactory.createGPU(input.modelName, input.manufacturer, input.price, input.stockQty, input.techSpecs);
        break;
      case 'IoT':
        gadget = GadgetFactory.createIoT(input.modelName, input.manufacturer, input.price, input.stockQty, input.techSpecs);
        break;
      default:
        throw new Error("Invalid hardware type");
    }

    // Persist the asset and link it to the vendor's profile
    await this.gadgetRepository.save(gadget, input.vendorId);
    return gadget;
  }
}
