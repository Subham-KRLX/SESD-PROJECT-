export class Review {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly gadgetId: string,
    public performanceRating: number,
    public feedbackText: string,
    public readonly createdAt: Date = new Date()
  ) {
    if (performanceRating < 1 || performanceRating > 5) {
      throw new Error("Performance rating must be between 1 and 5");
    }
  }

  isHighPerformance(): boolean {
    return this.performanceRating >= 4;
  }
}
