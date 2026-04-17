import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
export declare class RegisterUserUseCase {
    private userRepository;
    constructor(userRepository: IUserRepository);
    execute(data: {
        name: string;
        email: string;
        passwordHash: string;
        role: 'CUSTOMER' | 'VENDOR';
        brandName?: string;
    }): Promise<void>;
}
//# sourceMappingURL=RegisterUserUseCase.d.ts.map