import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static assets from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'TechSpark API is running with Clean Architecture' });
});

// Connect the data pipes for hardware entities
const userRepository = new PrismaUserRepository();
const gadgetRepository = new PrismaGadgetRepository();
const orderRepository = new PrismaOrderRepository();
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
    const result = await authenticateUserUseCase.execute(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Endpoints for browsing and managing hardware assets
app.get('/api/gadgets', async (req, res) => {
  try {
    const gadgets = await browseGadgetsUseCase.execute(req.query);
    res.status(200).json(gadgets);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch gadgets' });
  }
});

app.get('/api/gadgets/:id', async (req, res) => {
  try {
    const gadget = await getGadgetByIdUseCase.execute(req.params.id);
    res.status(200).json(gadget);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

app.post('/api/gadgets', async (req, res) => {
  try {
    const gadget = await createGadgetUseCase.execute(req.body);
    res.status(201).json(gadget);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/gadgets/:id', async (req, res) => {
  try {
    const gadget = await updateInventoryUseCase.execute({ gadgetId: req.params.id, ...req.body });
    res.status(200).json(gadget);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Processing hardware acquisition workflows
app.post('/api/orders', async (req, res) => {
  try {
    const order = await placeOrderUseCase.execute(req.body.customerId, req.body.items);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/orders/history/:customerId', async (req, res) => {
  try {
    const history = await getOrderHistoryUseCase.execute(req.params.customerId);
    res.status(200).json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin mission control for system stats and categories
app.get('/api/admin/dashboard-stats', async (req, res) => {
  try {
    const stats = await getDashboardStatsUseCase.execute();
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

app.post('/api/admin/categories', async (req, res) => {
  try {
    const id = await manageCategoriesUseCase.create(req.body.name, req.body.description);
    res.status(201).json({ id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Global catch-all for React SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
