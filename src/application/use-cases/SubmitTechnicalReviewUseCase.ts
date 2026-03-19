import { Review } from '../../domain/entities/Review';
import { IGadgetRepository } from '../../domain/repositories/IGadgetRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { v4 as uuidv4 } from 'uuid';

export class SubmitTechnicalReviewUseCase {
  constructor(
    private gadgetRepository: IGadgetRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(customerId: string, gadgetId: string, rating: number, feedback: string): Promise<Review> {
    const customer = await this.userRepository.findById(customerId);
    if (!customer) throw new Error("Customer not found.");
    if (customer.role !== 'CUSTOMER') throw new Error("Only customers can submit reviews.");

    const gadget = await this.gadgetRepository.findById(gadgetId);
    if (!gadget) throw new Error("Gadget not found.");

    const review = new Review(
      uuidv4(),
      customerId,
      gadgetId,
      rating,
      feedback
    );

    // In a real app, save via IReviewRepository (skipping for brevity)
    return review;
  }
}
