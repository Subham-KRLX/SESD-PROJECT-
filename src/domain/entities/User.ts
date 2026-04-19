import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Base identity for anyone accessing the TechSpark network
 */
export abstract class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    protected passwordHash: string,
    public readonly role: 'CUSTOMER' | 'VENDOR' | 'ADMIN'
  ) {}

  abstract authenticate(password: string): boolean;

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
  
  updateProfile(name: string, email: string): void {
    this.name = name;
    this.email = email;
  }

  getRole(): string {
    return this.role;
  }
}

/**
 * Standard hardware enthusiast and customer
 */
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
    return this.passwordHash === hashPassword(password);
  }
}

/**
 * Professional vendor responsible for listing hardware assets
 */
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
    return this.passwordHash === hashPassword(password);
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      brandName: this.brandName,
      isVerified: this.isVerified,
    };
  }
}
/**
 * System administrator with full control over the hardware grid
 */
export class SystemAdmin extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    public accessLevel: number = 1
  ) {
    super(id, name, email, passwordHash, 'ADMIN');
  }

  authenticate(password: string): boolean {
    return this.passwordHash === hashPassword(password);
  }

  verifyVendor(vendor: GadgetVendor): void {
    vendor.isVerified = true;
  }
}
