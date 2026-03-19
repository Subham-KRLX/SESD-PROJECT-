import express from 'express';
import { PlaceOrderUseCase } from './application/use-cases/PlaceOrderUseCase.js';
import { SubmitTechnicalReviewUseCase } from './application/use-cases/SubmitTechnicalReviewUseCase.js';
import { BulkDiscountStrategy } from './domain/strategies/IDiscountStrategy.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'TechSpark API is running with Clean Architecture' });
});

// Demo endpoint to show pricing logic
app.get('/demo/pricing', (req, res) => {
  const strategy = new BulkDiscountStrategy(1000, 15);
  const total = 1200;
  const discount = strategy.calculateDiscount(total);
  res.json({
    basePrice: total,
    discount,
    finalPrice: total - discount,
    strategy: strategy.getName()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
