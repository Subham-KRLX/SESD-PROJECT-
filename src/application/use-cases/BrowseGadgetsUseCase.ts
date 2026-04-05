import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import { Gadget } from '../../domain/entities/Gadget.js';

export class BrowseGadgetsUseCase {
  constructor(private gadgetRepository: IGadgetRepository) {}

  async execute(filters: { searchTerm?: string; minPrice?: number; maxPrice?: number; inStockOnly?: boolean }): Promise<Gadget[]> {
    const gadgets = await this.gadgetRepository.findAll();
    
    return gadgets.filter(gadget => {
      let matches = true;
      if (filters.searchTerm) {
        matches = matches && (gadget.modelName.toLowerCase().includes(filters.searchTerm.toLowerCase()) || gadget.manufacturer.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      }
      if (filters.minPrice !== undefined) {
        matches = matches && gadget.price >= filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        matches = matches && gadget.price <= filters.maxPrice;
      }
      if (filters.inStockOnly) {
        matches = matches && gadget.isAvailable();
      }
      return matches;
    });
  }
}
