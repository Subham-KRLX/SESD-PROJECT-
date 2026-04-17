export class Gadget {
  constructor(
    public readonly id: string,
    public modelName: string,
    public manufacturer: string,
    public techSpecs: string,
    public price: number,
    public stockQty: number
  ) {}

  isAvailable(): boolean {
    return this.stockQty > 0;
  }

  updatePrice(newPrice: number): void {
    if (newPrice < 0) throw new Error("Price cannot be negative");
    this.price = newPrice;
  }

  getDetails(): string {
    return `${this.manufacturer} ${this.modelName} - $${this.price}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.modelName,
      manufacturer: this.manufacturer,
      techSpecs: this.techSpecs,
      price: this.price,
      stockQty: this.stockQty,
      image: `https://source.unsplash.com/featured/800x600?computer,hardware&sig=${this.id}`,
      category: this.techSpecs,
    };
  }
}
