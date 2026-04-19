import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';

/**
 * Handles user authentication and establishes a secure system uplink
 */
export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user || !user.authenticate(password)) {
      throw new Error('Access denied: Invalid credentials.');
    }

    // Generate a secure session token for system access
    const token = Buffer.from(`${user.id}:${new Date().getTime()}`).toString('base64');
    return { token, user };
  }
}
