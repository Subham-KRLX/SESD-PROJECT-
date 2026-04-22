import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/domain/entities/User.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding TechSpark database...');

  // 1. Create Categories
  const gpu = await prisma.category.upsert({
    where: { name: 'Graphics Cards' },
    update: {},
    create: { name: 'Graphics Cards', description: 'High-performance GPUs for gaming and AI' }
  });

  const cpu = await prisma.category.upsert({
    where: { name: 'Processors' },
    update: {},
    create: { name: 'Processors', description: 'Powerful CPUs for computing' }
  });

  // 2. Create Vendor
  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@techspark.com' },
    update: {},
    create: {
      fullName: 'Quantum Hardware',
      email: 'vendor@techspark.com',
      passwordHash: await hashPassword('vendor12345'),
      role: 'VENDOR',
      vendorProfile: {
        create: {
          brandName: 'QuantumTech',
          isVerified: true,
          techNiche: 'High-end PC Components'
        }
      }
    }
  });

  const vendor = await prisma.vendor.findUnique({ where: { userId: vendorUser.id } });

  if (!vendor) throw new Error('Vendor not found');

  // 3. Create Gadgets
  const gadgets = [
    {
      modelName: 'RTX 5090 Prototype',
      technicalSpecs: '32GB GDDR7, Next-Gen Blackwell Architecture, 600W TDP',
      price: 2499.99,
      stockCount: 5,
      categoryId: gpu.id,
      vendorId: vendor.id
    },
    {
      modelName: 'Ryzen 9 9950X',
      technicalSpecs: '16 Cores, 32 Threads, 5.8GHz Boost, Zen 5 Architecture',
      price: 699.00,
      stockCount: 15,
      categoryId: cpu.id,
      vendorId: vendor.id
    },
    {
      modelName: 'Threadripper 7995WX',
      technicalSpecs: '96 Cores, 192 Threads, 384MB L3 Cache',
      price: 4999.00,
      stockCount: 2,
      categoryId: cpu.id,
      vendorId: vendor.id
    }
  ];

  for (const g of gadgets) {
    await prisma.gadget.create({
      data: g
    });
  }

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
