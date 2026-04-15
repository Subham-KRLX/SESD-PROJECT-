import { Review } from '../entities/Review.js';

export interface IReviewRepository {
  save(review: Review): Promise<void>;
  findByGadget(gadgetId: string): Promise<Review[]>;
  findByCustomer(customerId: string): Promise<Review[]>;
}
