export declare abstract class User {
    readonly id: string;
    name: string;
    email: string;
    protected passwordHash: string;
    readonly role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
    constructor(id: string, name: string, email: string, passwordHash: string, role: 'CUSTOMER' | 'VENDOR' | 'ADMIN');
    abstract authenticate(password: string): boolean;
    updateProfile(name: string, email: string): void;
    getRole(): string;
}
export declare class TechCustomer extends User {
    constructor(id: string, name: string, email: string, passwordHash: string);
    authenticate(password: string): boolean;
}
export declare class GadgetVendor extends User {
    brandName: string;
    isVerified: boolean;
    constructor(id: string, name: string, email: string, passwordHash: string, brandName: string, isVerified?: boolean);
    authenticate(password: string): boolean;
}
//# sourceMappingURL=User.d.ts.map