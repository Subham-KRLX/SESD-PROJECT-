process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION DETECTED:', err);
  process.exit(1);
});

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from './infrastructure/database/client.js';
import { PlaceOrderUseCase } from './application/use-cases/PlaceOrderUseCase.js';
import { SubmitTechnicalReviewUseCase } from './application/use-cases/SubmitTechnicalReviewUseCase.js';

import { RegisterUserUseCase } from './application/use-cases/RegisterUserUseCase.js';
import { AuthenticateUserUseCase } from './application/use-cases/AuthenticateUserUseCase.js';
import { BrowseGadgetsUseCase } from './application/use-cases/BrowseGadgetsUseCase.js';
import { GetOrderHistoryUseCase } from './application/use-cases/GetOrderHistoryUseCase.js';
import { GetDashboardStatsUseCase } from './application/use-cases/GetDashboardStatsUseCase.js';
import { GetGadgetByIdUseCase } from './application/use-cases/GetGadgetByIdUseCase.js';

import { PrismaUserRepository } from './infrastructure/repositories/PrismaUserRepository.js';
import { PrismaGadgetRepository } from './infrastructure/repositories/PrismaGadgetRepository.js';
import { PrismaOrderRepository } from './infrastructure/repositories/PrismaOrderRepository.js';
import { PrismaReviewRepository } from './infrastructure/repositories/PrismaReviewRepository.js';

import { CreateGadgetUseCase } from './application/use-cases/CreateGadgetUseCase.js';
import { UpdateGadgetInventoryUseCase } from './application/use-cases/UpdateGadgetInventoryUseCase.js';
import { ManageCategoriesUseCase } from './application/use-cases/ManageCategoriesUseCase.js';

import {
  RegisterUserSchema,
  LoginSchema,
  CreateGadgetSchema,
  PlaceOrderSchema,
  SubmitReviewSchema,
  CreateCategorySchema,
} from './shared/validators.js';
import {
  authMiddleware,
  requireRole,
  type AuthRequest,
} from './shared/middleware.js';
import { validateRequest, errorHandler } from './shared/errors.js';

const app = express();
console.log('--- Step 1: Express app initialized ---');
const PORT = process.env.PORT || 3000;

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('--- Step 2: Paths resolved ---');

app.use(cors());
app.use(express.json());
console.log('--- Step 3: Middleware configured ---');

// Serve static assets from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'TechSpark API is running with Clean Architecture' });
});

// Connect the data pipes for hardware entities
const userRepository = new PrismaUserRepository();
const gadgetRepository = new PrismaGadgetRepository();
const orderRepository = new PrismaOrderRepository();
console.log('--- Step 4: Repositories initialized ---');
const reviewRepository = new PrismaReviewRepository();
const categoryRepository = {
  async save(c: any) { await (prisma as any).category.create({ data: c }); },
  async update(c: any) { await (prisma as any).category.update({ where: { id: c.id }, data: c }); },
  async delete(id: string) { await (prisma as any).category.delete({ where: { id } }); }
};

// Prepare hardware logic modules (use cases)
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const browseGadgetsUseCase = new BrowseGadgetsUseCase(gadgetRepository);
const placeOrderUseCase = new PlaceOrderUseCase(gadgetRepository, orderRepository);
const submitReviewUseCase = new SubmitTechnicalReviewUseCase(gadgetRepository, userRepository, reviewRepository);
const getOrderHistoryUseCase = new GetOrderHistoryUseCase(orderRepository);
const getDashboardStatsUseCase = new GetDashboardStatsUseCase();
const getGadgetByIdUseCase = new GetGadgetByIdUseCase(gadgetRepository);
const createGadgetUseCase = new CreateGadgetUseCase(gadgetRepository);
const updateInventoryUseCase = new UpdateGadgetInventoryUseCase(gadgetRepository);
const manageCategoriesUseCase = new ManageCategoriesUseCase(categoryRepository);

// Uplink endpoints for user authentication
app.post('/api/auth/register', validateRequest(RegisterUserSchema), async (req, res, next) => {
  try {
    await registerUserUseCase.execute(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    next(error);
  }
});

app.post('/api/auth/login', validateRequest(LoginSchema), async (req, res, next) => {
  try {
    const result = await authenticateUserUseCase.execute(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error: any) {
    next(error);
  }
});

// Endpoints for browsing and managing hardware assets
app.get('/api/gadgets', async (req, res, next) => {
  try {
    const gadgets = await browseGadgetsUseCase.execute(req.query);
    res.status(200).json(gadgets);
  } catch (error: any) {
    next(error);
  }
});

app.get('/api/gadgets/:id', async (req, res, next) => {
  try {
    const gadget = await getGadgetByIdUseCase.execute(req.params.id);
    res.status(200).json(gadget);
  } catch (error: any) {
    next(error);
  }
});

app.post('/api/gadgets', authMiddleware, requireRole('VENDOR', 'ADMIN'), validateRequest(CreateGadgetSchema), async (req, res, next) => {
  try {
    const gadget = await createGadgetUseCase.execute(req.body);
    res.status(201).json(gadget);
  } catch (error: any) {
    next(error);
  }
});

app.put('/api/gadgets/:id', authMiddleware, requireRole('VENDOR', 'ADMIN'), validateRequest(CreateGadgetSchema), async (req, res, next) => {
  try {
    const gadget = await updateInventoryUseCase.execute({ gadgetId: req.params.id, ...req.body });
    res.status(200).json(gadget);
  } catch (error: any) {
    next(error);
  }
});

// Processing hardware acquisition workflows
app.post('/api/orders', authMiddleware, validateRequest(PlaceOrderSchema), async (req, res, next) => {
  try {
    const order = await placeOrderUseCase.execute(req.body.customerId, req.body.items);
    res.status(201).json(order);
  } catch (error: any) {
    next(error);
  }
});

app.get('/api/orders/history/:customerId', authMiddleware, async (req, res, next) => {
  try {
    const customerId = Array.isArray(req.params.customerId) ? req.params.customerId[0] : req.params.customerId;
    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }
    const history = await getOrderHistoryUseCase.execute(customerId);
    res.status(200).json(history);
  } catch (error: any) {
    next(error);
  }
});

// Admin mission control for system stats and categories
app.get('/api/admin/dashboard-stats', authMiddleware, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const stats = await getDashboardStatsUseCase.execute();
    res.status(200).json(stats);
  } catch (error: any) {
    next(error);
  }
});

app.post('/api/admin/categories', authMiddleware, requireRole('ADMIN'), validateRequest(CreateCategorySchema), async (req, res, next) => {
  try {
    const id = await manageCategoriesUseCase.create(req.body.name, req.body.description);
    res.status(201).json({ id });
  } catch (error: any) {
    next(error);
  }
});

// Global catch-all for React SPA routing (excluding API routes)
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handler middleware (must be last)
app.use(errorHandler);

console.log('--- Step 5: Routes ready, attempting to listen on port', PORT, '---');
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
