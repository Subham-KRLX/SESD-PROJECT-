import { Review } from '../../domain/entities/Review.js';
import type { IReviewRepository } from '../../domain/repositories/IReviewRepository.js';
import { prisma } from '../database/client.js';

export class PrismaReviewRepository implements IReviewRepository {
  private mapToEntity(dbReview: any): Review {
    return new Review(
      dbReview.id,
      dbReview.customerId,
      dbReview.gadgetId,
      dbReview.performanceRating,
      dbReview.feedbackText,
      dbReview.createdAt
    );
  }

  async save(review: Review): Promise<void> {
    await prisma.review.create({
      data: {
        id: review.id,
        customerId: review.customerId,
        gadgetId: review.gadgetId,
        performanceRating: review.performanceRating,
        feedbackText: review.feedbackText
      }
    });
  }

  async findByGadget(gadgetId: string): Promise<Review[]> {
    const dbReviews = await prisma.review.findMany({
      where: { gadgetId }
    });
    return dbReviews.map(this.mapToEntity);
  }

  async findByCustomer(customerId: string): Promise<Review[]> {
    const dbReviews = await prisma.review.findMany({
      where: { customerId }
    });
    return dbReviews.map(this.mapToEntity);
  }
}
