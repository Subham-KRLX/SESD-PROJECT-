export declare class Gadget {
    readonly id: string;
    modelName: string;
    manufacturer: string;
    techSpecs: string;
    price: number;
    stockQty: number;
    constructor(id: string, modelName: string, manufacturer: string, techSpecs: string, price: number, stockQty: number);
    isAvailable(): boolean;
    updatePrice(newPrice: number): void;
    getDetails(): string;
}
//# sourceMappingURL=Gadget.d.ts.map