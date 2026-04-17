# TechSpark - Premium Tech Gadget Marketplace

## Overview 
**TechSpark** is a high-performance, full-stack e-commerce platform tailored for tech enthusiasts, professionals, and hardware collectors. It focuses on high-end computing components, IoT devices, and specialized peripherals.

## Project Status
This project is currently **90% Complete** and heavily features a premium modern UI alongside a robust Clean Architecture backend.
- **Backend (90% Complete)**: Full persistence layer, complex use cases (Order Management, Reviews), and API routes are wired and functioning.
- **Frontend (90% Complete)**: Premium UI/UX featuring a Technical Hardware Dashboard, interactive Cart system, Order History tracking, and 3D/GSAP landing page animations.

The core domain logic, repositories, and complex use cases have been implemented using Clean Architecture. The frontend React application is fully integrated with these business use cases.

## Architecture
The project follows strict **Clean Architecture** principles:
- `src/domain/entities`: Core business logic and entities (User, Gadget, Order, Review, Category).
- `src/domain/repositories`: Persistence abstractions (Interfaces).
- `src/domain/strategies`: Encapsulated algorithms (e.g., Discount strategies).
- `src/domain/entities/GadgetFactory.ts`: Factory pattern for hardware creation.
- `src/application/use-cases`: Orchestration of business logic (Place Order, Submit Review, Analytics).
- `src/infrastructure`: Frameworks and drivers (Prisma database client, Express server).
- `src/index.ts`: Application entry point and API routes.
- `frontend/`: Integrated React Single Page Application utilizing Vite, Tailwind CSS, and Framer Motion.

## Documentation
Detailed system design and business requirements are located in the `docs/` folder:
- [System Architecture & Idea](docs/idea.md)
- [ER Diagram](docs/ErDiagram.md)
- [Class Diagram](docs/classDiagram.md)
- [Sequence Diagram](docs/sequenceDiagram.md)
- [Use Case Diagram](docs/useCaseDiagram.md)

## Technology Stack
- **Backend**: Node.js, TypeScript, Express, Prisma (ORM).
- **Frontend**: React.js, Vite, Tailwind CSS v4, Framer Motion, GSAP.
- **Database**: PostgreSQL (Relational Data).
- **Verification**: Jest (Unit Testing), Prisma Validate.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- PostgreSQL database (or modify Prisma schema for SQLite if testing locally without Docker)

### Installation
1. Clone the repository.
2. Install dependencies for the backend and frontend:
   ```bash
   npm install
   cd frontend && npm install
   cd ..
   ```

### Database Setup
1. Setup your `.env` file with `DATABASE_URL`.
2. Generate Prisma client and push the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
3. **Seed the Database**: Populate the system with premium hardware and sample data.
   ```bash
   npx ts-node --esm src/infrastructure/database/seed.ts
   ```

### Running the Application
You will need to run the backend and frontend concurrently. 
**Backend**:
```bash
npx ts-node --esm src/index.ts
```
**Frontend**:
```bash
cd frontend
npm run dev
```

## Features
- [x] Project Initialization & Architecture setup
- [x] Core Domain Entities (User, Gadget, Order, Review)
- [x] Database Schema Definition (Prisma)
- [x] Repository Pattern (Interfaces)
- [x] Factory & Strategy Patterns
- [x] Order Management Use Case (Stock decrement, validation)
- [x] Core Frontend UI (Home, Browse, Login)
- [x] **New**: Cart System (State Management, Order Placement)
- [x] **New**: Technical Hardware Dashboard (Analytics & Alerts)
- [x] **New**: Order History & Acquisition Tracking
- [x] **New**: Quick View Hardware Modals
- [x] **New**: Database Seeding utility for instant demoing
