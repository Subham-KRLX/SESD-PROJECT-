import { randomUUID } from 'crypto';
import { TechCustomer, GadgetVendor } from '../../domain/entities/User.js';
export class RegisterUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }
        const userId = randomUUID();
        let newUser;
        if (data.role === 'VENDOR') {
            if (!data.brandName)
                throw new Error('Vendor must provide a brand name.');
            newUser = new GadgetVendor(userId, data.name, data.email, data.passwordHash, data.brandName);
        }
        else {
            newUser = new TechCustomer(userId, data.name, data.email, data.passwordHash);
        }
        await this.userRepository.save(newUser);
    }
}
//# sourceMappingURL=RegisterUserUseCase.js.map