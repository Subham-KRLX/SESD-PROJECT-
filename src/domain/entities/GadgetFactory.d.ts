import { Gadget } from './Gadget.js';
export declare class GadgetFactory {
    static createGPU(model: string, manufacturer: string, price: number, stock: number, specs: string): Gadget;
    static createCPU(model: string, manufacturer: string, price: number, stock: number, specs: string): Gadget;
    static createIoT(model: string, manufacturer: string, price: number, stock: number, specs: string): Gadget;
}
//# sourceMappingURL=GadgetFactory.d.ts.map