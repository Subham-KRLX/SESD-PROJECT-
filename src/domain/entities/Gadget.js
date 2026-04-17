export class Gadget {
    id;
    modelName;
    manufacturer;
    techSpecs;
    price;
    stockQty;
    constructor(id, modelName, manufacturer, techSpecs, price, stockQty) {
        this.id = id;
        this.modelName = modelName;
        this.manufacturer = manufacturer;
        this.techSpecs = techSpecs;
        this.price = price;
        this.stockQty = stockQty;
    }
    isAvailable() {
        return this.stockQty > 0;
    }
    updatePrice(newPrice) {
        if (newPrice < 0)
            throw new Error("Price cannot be negative");
        this.price = newPrice;
    }
    getDetails() {
        return `${this.manufacturer} ${this.modelName} - $${this.price}`;
    }
}
//# sourceMappingURL=Gadget.js.map