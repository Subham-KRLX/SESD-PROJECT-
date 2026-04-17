import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('--- SYSTEM INITIALIZATION: HARDWARE SEEDING ---');
    // 1. Create Categories
    const gpuCat = await prisma.category.upsert({
        where: { name: 'Graphics Processing Units' },
        update: {},
        create: { name: 'Graphics Processing Units', description: 'Deep learning and high-end rendering hardware.' }
    });
    const cpuCat = await prisma.category.upsert({
        where: { name: 'Processors' },
        update: {},
        create: { name: 'Processors', description: 'Multi-core computing engines.' }
    });
    // 2. Create a Vendor
    const vendorUser = await prisma.user.upsert({
        where: { email: 'vendor@quantumtech.com' },
        update: {},
        create: {
            email: 'vendor@quantumtech.com',
            fullName: 'QuantumTech Logistics',
            passwordHash: 'hashed_password_here', // In a real app, use bcrypt
            role: 'VENDOR'
        }
    });
    const vendor = await prisma.vendor.upsert({
        where: { userId: vendorUser.id },
        update: {},
        create: {
            userId: vendorUser.id,
            brandName: 'QuantumTech Platinum',
            isVerified: true,
            techNiche: 'High-performance computing'
        }
    });
    // 3. Create Gadgets
    const gadgets = [
        {
            modelName: 'RTX 5090 Prototype',
            technicalSpecs: '32GB GDDR7, Blackwell Architecture, 600W TDP',
            price: 2499,
            stockCount: 5,
            categoryId: gpuCat.id,
            vendorId: vendor.id
        },
        {
            modelName: 'Ryzen 9 9950X',
            technicalSpecs: '16 Cores, 32 Threads, 5.8GHz Boost, Zen 5',
            price: 699,
            stockCount: 15,
            categoryId: cpuCat.id,
            vendorId: vendor.id
        },
        {
            modelName: 'Threadripper 7995WX',
            technicalSpecs: '96 Cores, 192 Threads, workstation grade',
            price: 9999,
            stockCount: 2,
            categoryId: cpuCat.id,
            vendorId: vendor.id
        }
    ];
    for (const g of gadgets) {
        await prisma.gadget.create({
            data: g
        });
    }
    // 4. Create a Demo Customer & Orders for Dashboard Stats
    const customer = await prisma.user.upsert({
        where: { email: 'demo-user-123@techspark.com' },
        update: { id: 'demo-user-123' }, // Force ID for demo consistency
        create: {
            id: 'demo-user-123',
            email: 'demo-user-123@techspark.com',
            fullName: 'Hardware Enthusiast',
            passwordHash: 'hashed_password',
            role: 'CUSTOMER'
        }
    });
    // Create some orders
    const allGadgets = await prisma.gadget.findMany();
    await prisma.order.create({
        data: {
            customerId: customer.id,
            totalPrice: 3198,
            status: 'DELIVERED',
            items: {
                create: [
                    { gadgetId: allGadgets[0]?.id || '', quantity: 1, unitPriceAtPurchase: 2499 },
                    { gadgetId: allGadgets[1]?.id || '', quantity: 1, unitPriceAtPurchase: 699 }
                ]
            }
        }
    });
    console.log('--- SEEDING COMPLETE: GRID IS LIVE ---');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map