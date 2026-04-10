import { User, TechCustomer, GadgetVendor } from '../../domain/entities/User.js';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { prisma } from '../database/client.js';
import { UserRole } from '@prisma/client';

export class PrismaUserRepository implements IUserRepository {
  private mapToEntity(dbUser: any): User {
    if (dbUser.role === UserRole.VENDOR) {
      return new GadgetVendor(
        dbUser.id,
        dbUser.fullName,
        dbUser.email,
        dbUser.passwordHash,
        dbUser.vendorProfile?.brandName || 'Unknown Brand',
        dbUser.vendorProfile?.isVerified || false
      );
    }
    return new TechCustomer(
      dbUser.id,
      dbUser.fullName,
      dbUser.email,
      dbUser.passwordHash
    );
  }

  async findById(id: string): Promise<User | null> {
    const dbUser = await prisma.user.findUnique({
      where: { id },
      include: { vendorProfile: true }
    });
    return dbUser ? this.mapToEntity(dbUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const dbUser = await prisma.user.findUnique({
      where: { email },
      include: { vendorProfile: true }
    });
    return dbUser ? this.mapToEntity(dbUser) : null;
  }

  async save(user: User): Promise<void> {
    const data: any = {
      id: user.id,
      fullName: user.name,
      email: user.email,
      passwordHash: (user as any).passwordHash, // Accessing protected for DB save
      role: user.role as UserRole
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
    } else {
      await prisma.user.upsert({
        where: { id: user.id },
        update: { fullName: data.fullName, email: data.email },
        create: data
      });
    }
  }

  async listVendors(): Promise<User[]> {
    const dbUsers = await prisma.user.findMany({
      where: { role: UserRole.VENDOR },
      include: { vendorProfile: true }
    });
    return dbUsers.map(this.mapToEntity);
  }
}
