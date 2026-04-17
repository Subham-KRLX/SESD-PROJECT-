import { Review } from '../../domain/entities/Review.js';
import { prisma } from '../database/client.js';
export class PrismaReviewRepository {
    mapToEntity(dbReview) {
        return new Review(dbReview.id, dbReview.customerId, dbReview.gadgetId, dbReview.performanceRating, dbReview.feedbackText, dbReview.createdAt);
    }
    async save(review) {
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
    async findByGadget(gadgetId) {
        const dbReviews = await prisma.review.findMany({
            where: { gadgetId }
        });
        return dbReviews.map(this.mapToEntity);
    }
    async findByCustomer(customerId) {
        const dbReviews = await prisma.review.findMany({
            where: { customerId }
        });
        return dbReviews.map(this.mapToEntity);
    }
}
//# sourceMappingURL=PrismaReviewRepository.js.map