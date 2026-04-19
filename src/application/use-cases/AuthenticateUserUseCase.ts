import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';
import { generateToken } from '../../shared/middleware.js';

/**
 * Handles user authentication and establishes a secure system uplink
 */
export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user || !(await user.authenticate(password))) {
      throw new Error('Access denied: Invalid credentials.');
    }

    // Generate a secure JWT token for system access
    const token = generateToken(user.id, user.getRole());
    return { token, user };
  }
}
