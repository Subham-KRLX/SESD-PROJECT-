export abstract class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    protected passwordHash: string,
    public readonly role: 'CUSTOMER' | 'VENDOR' | 'ADMIN'
  ) {}

  abstract authenticate(password: string): boolean;
  
  updateProfile(name: string, email: string): void {
    this.name = name;
    this.email = email;
  }

  getRole(): string {
    return this.role;
  }
}

export class TechCustomer extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    passwordHash: string
  ) {
    super(id, name, email, passwordHash, 'CUSTOMER');
  }

  authenticate(password: string): boolean {
    return true; 
  }
}

export class GadgetVendor extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    public brandName: string,
    public isVerified: boolean = false
  ) {
    super(id, name, email, passwordHash, 'VENDOR');
  }

  authenticate(password: string): boolean {
    return true;
  }
}
