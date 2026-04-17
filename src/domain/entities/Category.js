export class Category {
    id;
    name;
    description;
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
    validate() {
        return this.name.length > 0;
    }
}
//# sourceMappingURL=Category.js.map