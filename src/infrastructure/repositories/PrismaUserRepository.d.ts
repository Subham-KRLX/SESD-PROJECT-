import { User } from '../../domain/entities/User.js';
import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
export declare class PrismaUserRepository implements IUserRepository {
    private mapToEntity;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    listVendors(): Promise<User[]>;
}
//# sourceMappingURL=PrismaUserRepository.d.ts.map