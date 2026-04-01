# TechSpark - Premium Tech Gadget Marketplace

## Overview 
**TechSpark** is a high-performance, full-stack e-commerce platform tailored for tech enthusiasts, professionals, and hardware collectors. It focuses on high-end computing components, IoT devices, and specialized peripherals.

## Project Status
This project is currently in the **Development Phase (40%)**. The core domain logic, repositories, and complex use cases have been implemented using Clean Architecture.

## Architecture
The project follows strict **Clean Architecture** principles:
- `src/domain/entities`: Core business logic and entities (User, Gadget, Order, Review, Category).
- `src/domain/repositories`: Persistence abstractions (Interfaces).
- `src/domain/strategies`: Encapsulated algorithms (e.g., Discount strategies).
- `src/domain/entities/GadgetFactory.ts`: Factory pattern for hardware creation.
- `src/application/use-cases`: Orchestration of business logic (Place Order, Submit Review).
- `src/infrastructure`: Frameworks and drivers (Prisma, Express).
- `src/index.ts`: Application entry point and demonstration routes.

## Documentation
Detailed system design and business requirements are located in the `docs/` folder:
- [System Architecture & Idea](docs/idea.md)
- [ER Diagram](docs/ErDiagram.md)
- [Class Diagram](docs/classDiagram.md)
- [Sequence Diagram](docs/sequenceDiagram.md)
- [Use Case Diagram](docs/useCaseDiagram.md)

## Technology Stack
- **Backend**: Node.js, TypeScript, Express, Prisma (ORM).
- **Database**: PostgreSQL (Relational Data).
- **Verification**: Jest (Unit Testing), Prisma Validate.

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the development server:
```bash
npm run dev
```

### Verification
To validate the Prisma schema:
```bash
npx prisma validate
```

## Features
- [x] Project Initialization
- [x] Core Domain Entities (User, Gadget, Order, Review)
- [x] Database Schema Definition (Prisma)
- [x] Health Check Endpoint
- [x] Repository Pattern (Interfaces)
- [x] Strategy Pattern for Pricing/Discounts
- [x] Factory Pattern for Gadget Creation
- [x] Order Management Use Case (Stock decrement with transaction logic)
- [x] Technical Review System Use Case
- [ ] Authentication & RBAC (Next Step)
- [ ] Product Discovery & Filtering
- [ ] Technical Reviews API Integration
- [ ] Technical Hardware Dashboard
