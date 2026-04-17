import { Review } from '../../domain/entities/Review.js';
import crypto from 'crypto';
export class SubmitTechnicalReviewUseCase {
    gadgetRepository;
    userRepository;
    reviewRepository;
    constructor(gadgetRepository, userRepository, reviewRepository) {
        this.gadgetRepository = gadgetRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }
    async execute(customerId, gadgetId, rating, feedbackText) {
        const customer = await this.userRepository.findById(customerId);
        if (!customer)
            throw new Error("Customer not found.");
        if (customer.role !== 'CUSTOMER')
            throw new Error("Only customers can submit reviews.");
        const gadget = await this.gadgetRepository.findById(gadgetId);
        if (!gadget)
            throw new Error("Gadget not found.");
        const review = new Review(crypto.randomUUID(), customerId, gadgetId, rating, feedbackText);
        await this.reviewRepository.save(review);
        return review;
    }
}
//# sourceMappingURL=SubmitTechnicalReviewUseCase.js.map