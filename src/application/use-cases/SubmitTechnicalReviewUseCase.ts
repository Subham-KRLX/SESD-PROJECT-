import { Review } from '../../domain/entities/Review.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import crypto from 'crypto';

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
      crypto.randomUUID(),
      customerId,
      gadgetId,
      rating,
      feedback
    );

    return review;
  }
}
