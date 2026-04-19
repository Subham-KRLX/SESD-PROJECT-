# TechSpark

A production-ready full-stack tech hardware marketplace built with **Clean Architecture**, **React**, **Express**, and **PostgreSQL**.

## Quick Start

```bash
# Backend setup
npm install
npm run db:migrate
npm run dev:backend

# Frontend setup (new terminal)
cd frontend && npm install && npm run dev
```

**Backend:** http://localhost:3000 | **Frontend:** http://localhost:5173

## Features

✅ User authentication (JWT + bcrypt)  
✅ Product catalog & shopping cart  
✅ Order placement & history  
✅ Hardware comparison tool  
✅ Dashboard analytics  
✅ Role-based access control  

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js, Express, TypeScript, PostgreSQL, Prisma |
| **Frontend** | React 19, Vite, Tailwind, Framer Motion |
| **DevOps** | Docker, Nginx |
| **Security** | JWT, Bcrypt, Zod validation |

## Project Structure

```
SESD-PROJECT-/
├── src/                 # Backend (Clean Architecture)
│   ├── domain/         # OOP entities, repositories
│   ├── application/    # Use cases (business logic)
│   └── infrastructure/ # Database implementations
├── frontend/           # React SPA
├── docs/              # SESD diagrams & design docs
├── Dockerfile         # Production image
└── docker-compose.yml # Development environment
```

## API Endpoints

```
POST   /api/auth/register      # Register user
POST   /api/auth/login         # Login & JWT token
GET    /api/gadgets            # Browse products
GET    /api/orders/history/:id # Order history (protected)
POST   /api/orders             # Place order (protected)
GET    /health                 # Health check
```

## Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your database URL and JWT secret
```

## Deploy with Docker

```bash
docker-compose up -d
```

## Documentation

- [System Architecture](docs/idea.md)
- [Database Schema](docs/ErDiagram.md)
- [OOP Design Patterns](docs/classDiagram.md)
- [Interaction Flows](docs/sequenceDiagram.md)
- [Deployment Guide](DEPLOYMENT.md)

## Testing

```bash
npm run test              # Run tests
npm run test:coverage     # With coverage report
```

## License

MIT
