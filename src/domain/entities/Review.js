export class Review {
    id;
    customerId;
    gadgetId;
    performanceRating;
    feedbackText;
    createdAt;
    constructor(id, customerId, gadgetId, performanceRating, feedbackText, createdAt = new Date()) {
        this.id = id;
        this.customerId = customerId;
        this.gadgetId = gadgetId;
        this.performanceRating = performanceRating;
        this.feedbackText = feedbackText;
        this.createdAt = createdAt;
        if (performanceRating < 1 || performanceRating > 5) {
            throw new Error("Performance rating must be between 1 and 5");
        }
    }
    isHighPerformance() {
        return this.performanceRating >= 4;
    }
}
//# sourceMappingURL=Review.js.map