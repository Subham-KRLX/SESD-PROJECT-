import { randomUUID } from 'crypto';
import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { TechCustomer, GadgetVendor, hashPassword } from '../../domain/entities/User.js';

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: { name: string; email: string; password: string; role: 'CUSTOMER' | 'VENDOR', brandName?: string }): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const userId = randomUUID();
    const passwordHash = hashPassword(data.password);
    
    let newUser;
    if (data.role === 'VENDOR') {
      if (!data.brandName) throw new Error('Vendor must provide a brand name.');
      newUser = new GadgetVendor(userId, data.name, data.email, passwordHash, data.brandName);
    } else {
      newUser = new TechCustomer(userId, data.name, data.email, passwordHash);
    }

    await this.userRepository.save(newUser);
  }
}
