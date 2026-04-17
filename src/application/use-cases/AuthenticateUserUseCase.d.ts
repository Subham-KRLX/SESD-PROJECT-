import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { User } from '../../domain/entities/User.js';
export declare class AuthenticateUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(email: string, passwordHash: string): Promise<{
        token: string;
        user: User;
    }>;
}
//# sourceMappingURL=AuthenticateUserUseCase.d.ts.map