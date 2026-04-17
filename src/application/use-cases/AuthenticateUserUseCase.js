import { User } from '../../domain/entities/User.js';
export class AuthenticateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, passwordHash) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials.');
        }
        // In a real scenario, use bcrypt to compare
        if (!user.authenticate(passwordHash)) {
            throw new Error('Invalid credentials.');
        }
        // Create a mock token
        const token = Buffer.from(`${user.id}:${new Date().getTime()}`).toString('base64');
        return { token, user };
    }
}
//# sourceMappingURL=AuthenticateUserUseCase.js.map