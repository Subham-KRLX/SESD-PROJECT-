import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials.');
    }

    if (!user.authenticate(password)) {
      throw new Error('Invalid credentials.');
    }

    // Create a mock token
    const token = Buffer.from(`${user.id}:${new Date().getTime()}`).toString('base64');
    return { token, user };
  }
}
