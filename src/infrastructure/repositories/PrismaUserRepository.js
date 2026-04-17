import { User, TechCustomer, GadgetVendor } from '../../domain/entities/User.js';
import { prisma } from '../database/client.js';
import { UserRole } from '@prisma/client';
export class PrismaUserRepository {
    mapToEntity(dbUser) {
        if (dbUser.role === UserRole.VENDOR) {
            return new GadgetVendor(dbUser.id, dbUser.fullName, dbUser.email, dbUser.passwordHash, dbUser.vendorProfile?.brandName || 'Unknown Brand', dbUser.vendorProfile?.isVerified || false);
        }
        return new TechCustomer(dbUser.id, dbUser.fullName, dbUser.email, dbUser.passwordHash);
    }
    async findById(id) {
        const dbUser = await prisma.user.findUnique({
            where: { id },
            include: { vendorProfile: true }
        });
        return dbUser ? this.mapToEntity(dbUser) : null;
    }
    async findByEmail(email) {
        const dbUser = await prisma.user.findUnique({
            where: { email },
            include: { vendorProfile: true }
        });
        return dbUser ? this.mapToEntity(dbUser) : null;
    }
    async save(user) {
        const data = {
            id: user.id,
            fullName: user.name,
            email: user.email,
            passwordHash: user.passwordHash, // Accessing protected for DB save
            role: user.role
        };
        if (user instanceof GadgetVendor) {
            await prisma.user.upsert({
                where: { id: user.id },
                update: {
                    fullName: data.fullName,
                    email: data.email,
                    vendorProfile: {
                        upsert: {
                            create: { brandName: user.brandName, isVerified: user.isVerified },
                            update: { brandName: user.brandName, isVerified: user.isVerified }
                        }
                    }
                },
                create: {
                    ...data,
                    vendorProfile: {
                        create: { brandName: user.brandName, isVerified: user.isVerified }
                    }
                }
            });
        }
        else {
            await prisma.user.upsert({
                where: { id: user.id },
                update: { fullName: data.fullName, email: data.email },
                create: data
            });
        }
    }
    async listVendors() {
        const dbUsers = await prisma.user.findMany({
            where: { role: UserRole.VENDOR },
            include: { vendorProfile: true }
        });
        return dbUsers.map(this.mapToEntity);
    }
}
//# sourceMappingURL=PrismaUserRepository.js.map