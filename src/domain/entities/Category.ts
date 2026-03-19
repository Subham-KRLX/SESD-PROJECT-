export class Category {
  constructor(
    public readonly id: string,
    public name: string,
    public description?: string
  ) {}

  validate(): boolean {
    return this.name.length > 0;
  }
}
