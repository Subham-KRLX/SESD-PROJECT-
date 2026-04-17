export class User {
    id;
    name;
    email;
    passwordHash;
    role;
    constructor(id, name, email, passwordHash, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }
    updateProfile(name, email) {
        this.name = name;
        this.email = email;
    }
    getRole() {
        return this.role;
    }
}
export class TechCustomer extends User {
    constructor(id, name, email, passwordHash) {
        super(id, name, email, passwordHash, 'CUSTOMER');
    }
    authenticate(password) {
        return true;
    }
}
export class GadgetVendor extends User {
    brandName;
    isVerified;
    constructor(id, name, email, passwordHash, brandName, isVerified = false) {
        super(id, name, email, passwordHash, 'VENDOR');
        this.brandName = brandName;
        this.isVerified = isVerified;
    }
    authenticate(password) {
        return true;
    }
}
//# sourceMappingURL=User.js.map