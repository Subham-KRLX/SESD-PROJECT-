import { Review } from '../../domain/entities/Review.js';
import type { IReviewRepository } from '../../domain/repositories/IReviewRepository.js';
export declare class PrismaReviewRepository implements IReviewRepository {
    private mapToEntity;
    save(review: Review): Promise<void>;
    findByGadget(gadgetId: string): Promise<Review[]>;
    findByCustomer(customerId: string): Promise<Review[]>;
}
//# sourceMappingURL=PrismaReviewRepository.d.ts.map