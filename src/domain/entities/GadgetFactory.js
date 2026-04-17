import { Gadget } from './Gadget.js';
import crypto from 'crypto';
export class GadgetFactory {
    static createGPU(model, manufacturer, price, stock, specs) {
        return new Gadget(crypto.randomUUID(), model, manufacturer, `GPU:${specs}`, price, stock);
    }
    static createCPU(model, manufacturer, price, stock, specs) {
        return new Gadget(crypto.randomUUID(), model, manufacturer, `CPU:${specs}`, price, stock);
    }
    static createIoT(model, manufacturer, price, stock, specs) {
        return new Gadget(crypto.randomUUID(), model, manufacturer, `IoT:${specs}`, price, stock);
    }
}
//# sourceMappingURL=GadgetFactory.js.map