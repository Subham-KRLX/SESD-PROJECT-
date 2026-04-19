import { Gadget } from './Gadget.js';
import crypto from 'crypto';

/**
 * Factory for assembling and stamping new hardware component instances
 */
export class GadgetFactory {
  static createGPU(model: string, manufacturer: string, price: number, stock: number, specs: string): Gadget {
    return new Gadget(
      crypto.randomUUID(),
      model,
      manufacturer,
      `GPU:${specs}`,
      price,
      stock
    );
  }

  static createCPU(model: string, manufacturer: string, price: number, stock: number, specs: string): Gadget {
    return new Gadget(
      crypto.randomUUID(),
      model,
      manufacturer,
      `CPU:${specs}`,
      price,
      stock
    );
  }

  static createIoT(model: string, manufacturer: string, price: number, stock: number, specs: string): Gadget {
    return new Gadget(
      crypto.randomUUID(),
      model,
      manufacturer,
      `IoT:${specs}`,
      price,
      stock
    );
  }
}
