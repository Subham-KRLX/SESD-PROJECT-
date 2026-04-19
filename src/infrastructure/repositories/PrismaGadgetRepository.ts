import { Gadget } from '../../domain/entities/Gadget.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import { prisma } from '../database/client.js';
import { Prisma } from '@prisma/client';

export class PrismaGadgetRepository implements IGadgetRepository {
  private mapToEntity(dbGadget: any): Gadget {
    return new Gadget(
      dbGadget.id,
      dbGadget.modelName,
      dbGadget.vendor?.brandName || 'TechSpark Brand',
      dbGadget.technicalSpecs,
      Number(dbGadget.price),
      dbGadget.stockCount
    );
  }

  // Maps database records to our technical Gadget entity
  private mapToEntityV2(dbGadget: any): Gadget {
    return new Gadget(
      dbGadget.id,
      dbGadget.modelName,
      dbGadget.vendor?.brandName || 'Unknown',
      dbGadget.technicalSpecs,
      Number(dbGadget.price),
      dbGadget.stockCount
    );
  }

  async findById(id: string): Promise<Gadget | null> {
    const dbGadget = await prisma.gadget.findUnique({
      where: { id },
      include: { vendor: true }
    });
    return dbGadget ? this.mapToEntityV2(dbGadget) : null;
  }

  async save(gadget: Gadget, vendorId?: string): Promise<void> {
    // Categorize based on technical specification prefixes
    const categoryName = gadget.techSpecs.startsWith('CPU:') ? 'Processors' : 
                        gadget.techSpecs.startsWith('GPU:') ? 'Graphics Cards' : 
                        gadget.techSpecs.startsWith('IoT:') ? 'Smart Hardware' : 'General Tech';

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName }
    });

    let finalVendorId = vendorId;
    if (!finalVendorId) {
      const defaultVendor = await prisma.vendor.findFirst();
      finalVendorId = defaultVendor?.id;
    }

    if (!finalVendorId) throw new Error("No vendor associated with listing");

    await prisma.gadget.create({
      data: {
        id: gadget.id,
        modelName: gadget.modelName,
        technicalSpecs: gadget.techSpecs,
        price: gadget.price,
        stockCount: gadget.stockQty,
        vendorId: finalVendorId,
        categoryId: category.id
      }
    });
  }

  async update(gadget: Gadget): Promise<void> {
    await prisma.gadget.update({
      where: { id: gadget.id },
      data: {
        modelName: gadget.modelName,
        technicalSpecs: gadget.techSpecs,
        price: gadget.price,
        stockCount: gadget.stockQty
      }
    });
  }


  async listByCategory(categoryId: string): Promise<Gadget[]> {
    const dbGadgets = await prisma.gadget.findMany({
      where: { categoryId },
      include: { vendor: true }
    });
    return dbGadgets.map(this.mapToEntityV2);
  }

  async updateStock(id: string, qty: number): Promise<void> {
    await prisma.gadget.update({
      where: { id },
      data: { stockCount: { decrement: qty } }
    });
  }

  async findAll(): Promise<Gadget[]> {
    const dbGadgets = await prisma.gadget.findMany({
      include: { vendor: true }
    });
    return dbGadgets.map(this.mapToEntityV2);
  }
}
