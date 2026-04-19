import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
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

  abstract authenticate(password: string): Promise<boolean>;

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

  async authenticate(password: string): Promise<boolean> {
    return verifyPassword(password, this.passwordHash);
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

  async authenticate(password: string): Promise<boolean> {
    return verifyPassword(password, this.passwordHash);
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

  async authenticate(password: string): Promise<boolean> {
    return verifyPassword(password, this.passwordHash);
  }

  verifyVendor(vendor: GadgetVendor): void {
    vendor.isVerified = true;
  }
}
