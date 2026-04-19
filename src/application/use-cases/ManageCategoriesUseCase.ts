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
    await this.categoryRepository.save({ id, name, description });
    return id;
  }

  async update(id: string, name: string, description?: string): Promise<void> {
    await this.categoryRepository.update({ id, name, description });
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
