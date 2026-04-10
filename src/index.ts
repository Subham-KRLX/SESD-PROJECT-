import express from 'express';
import { PlaceOrderUseCase } from './application/use-cases/PlaceOrderUseCase.js';
import { SubmitTechnicalReviewUseCase } from './application/use-cases/SubmitTechnicalReviewUseCase.js';
import { BulkDiscountStrategy } from './domain/strategies/IDiscountStrategy.js';
import { RegisterUserUseCase } from './application/use-cases/RegisterUserUseCase.js';
import { AuthenticateUserUseCase } from './application/use-cases/AuthenticateUserUseCase.js';
import { BrowseGadgetsUseCase } from './application/use-cases/BrowseGadgetsUseCase.js';

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

import { PrismaUserRepository } from './infrastructure/repositories/PrismaUserRepository.js';
import { PrismaGadgetRepository } from './infrastructure/repositories/PrismaGadgetRepository.js';

const userRepository = new PrismaUserRepository();
const gadgetRepository = new PrismaGadgetRepository();

const registerUserUseCase = new RegisterUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const browseGadgetsUseCase = new BrowseGadgetsUseCase(gadgetRepository);

app.post('/api/auth/register', async (req, res) => {
  try {
    await registerUserUseCase.execute(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    // Note: This will fail in this demo because mockUserRepository returns null
    const result = await authenticateUserUseCase.execute(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

app.get('/api/gadgets', async (req, res) => {
  try {
    const gadgets = await browseGadgetsUseCase.execute(req.query);
    res.status(200).json(gadgets);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch gadgets' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
