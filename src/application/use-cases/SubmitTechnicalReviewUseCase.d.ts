import { Review } from '../../domain/entities/Review.js';
import type { IGadgetRepository } from '../../domain/repositories/IGadgetRepository.js';
import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import type { IReviewRepository } from '../../domain/repositories/IReviewRepository.js';
export declare class SubmitTechnicalReviewUseCase {
    private gadgetRepository;
    private userRepository;
    private reviewRepository;
    constructor(gadgetRepository: IGadgetRepository, userRepository: IUserRepository, reviewRepository: IReviewRepository);
    execute(customerId: string, gadgetId: string, rating: number, feedbackText: string): Promise<Review>;
}
//# sourceMappingURL=SubmitTechnicalReviewUseCase.d.ts.map