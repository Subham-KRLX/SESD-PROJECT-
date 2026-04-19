import crypto from 'crypto';

interface CategoryRepository {
  save(category: { id: string; name: string; description?: string }): Promise<void>;
  update(category: { id: string; name: string; description?: string }): Promise<void>;
  delete(id: string): Promise<void>;
}

export class ManageCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(name: string, description?: string): Promise<string> {
    const id = crypto.randomUUID();
    const categoryData: { id: string; name: string; description?: string } = { id, name };
    if (description !== undefined) {
      categoryData.description = description;
    }
    await this.categoryRepository.save(categoryData);
    return id;
  }

  async update(id: string, name: string, description?: string): Promise<void> {
    const categoryData: { id: string; name: string; description?: string } = { id, name };
    if (description !== undefined) {
      categoryData.description = description;
    }
    await this.categoryRepository.update(categoryData);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
