# TechSpark

TechSpark is a full-stack tech hardware marketplace built with a Clean Architecture backend and a modern React frontend. It models a premium catalog experience for high-end computing hardware, with authentication, cart checkout, order history, and dashboard analytics.

## Overview

The repository is split into two primary applications:

- `src/`: Backend domain, application, and infrastructure layers.
- `frontend/`: React single-page application built with Vite.

The backend exposes REST endpoints for authentication, gadget browsing, order placement, order history, reviews, and dashboard statistics. The frontend presents the marketplace UI, shopping cart, analytics dashboard, and acquisition history views.

## Architecture

The backend follows **Clean Architecture** principles with strong emphasis on Object-Oriented Design:

**OOP Core Entities** (polymorphism, inheritance, abstraction):
- `src/domain/entities`: Abstract `User` base class extended by `TechCustomer` and `GadgetVendor`; domain entities like `Gadget`, `Order`, `Review`, `Category`
- `src/domain/repositories`: Repository pattern interfaces for data access contracts
- `src/domain/strategies`: Strategy pattern for reusable domain algorithms

**Layered Architecture**:
- `src/application/use-cases`: Business workflows (registration, authentication, browsing, checkout, reviews, analytics) following the Use Case pattern
- `src/infrastructure`: Prisma ORM repository implementations, database client, seed utilities
- `src/index.ts`: Express application entry point and REST route definitions

See the [Class Diagram](docs/classDiagram.md) for detailed OOP structure and design patterns.

## Frontend

The frontend is a Vite-based React application with:

- animated landing and page transitions
- product catalog browsing
- cart drawer and checkout flow
- order history timeline
- technical dashboard views
- responsive premium UI styling

## Documentation

This is a **Software Engineering System Design (SESD)** project emphasizing Object-Oriented Programming (OOP) principles and comprehensive system documentation.

Design and modeling references are available in `docs/`:

- [System Architecture & Idea](docs/idea.md)
- [ER Diagram](docs/ErDiagram.md) – Data model relationships
- [Class Diagram](docs/classDiagram.md) – OOP class hierarchy and design patterns
- [Sequence Diagram](docs/sequenceDiagram.md) – Interaction flows and call sequences
- [Use Case Diagram](docs/useCaseDiagram.md) – Actor behaviors and system functionality

## Technology Stack

- **Backend**: Node.js, TypeScript, Express, Prisma
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, GSAP
- **Database**: PostgreSQL
- **Testing**: Jest, Supertest

## Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL database

## Installation

Install dependencies from the repository root and frontend folder:

```bash
npm install
cd frontend && npm install
cd ..
```

## Database Setup

The project uses PostgreSQL and can be run locally via Docker or a remote instance.

### Option 1: Docker PostgreSQL (Recommended for Local Development)

Start a local PostgreSQL container:

```bash
docker run -d --name techspark-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=techspark \
  -p 5432:5432 \
  postgres:16
```

Then update `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/techspark?schema=public"
```

### Option 2: Remote PostgreSQL

Set `DATABASE_URL` in `.env` to your remote PostgreSQL connection string.

### Apply Schema and Seed

Once your database is running, generate Prisma client and apply the schema:

```bash
npx prisma generate
npx prisma db push
```

Seed demo data (customer, vendor, products):

```bash
node prisma/seed.js
```

## Running the Project

### Quick Start (Both Services)

From the repository root, start both backend and frontend together:

```bash
npm run dev
```

Or start them separately:

Backend:

```bash
node --loader ts-node/esm src/index.ts
```

Frontend:

```bash
cd frontend && npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

### Demo Credentials

**Customer Account:**
- Email: `demo-user-123@techspark.com`
- Password: `demo12345`

**Vendor Account:**
- Email: `vendor@techspark.com`
- Password: `vendor12345`

## Convenience Scripts

```bash
npm run dev:backend
npm run dev:frontend
npm run seed
```

## Key Capabilities

- authentication and user registration
- gadget browsing and catalog display
- shopping cart management and checkout
- order creation and order history tracking
- review submission for purchased items
- dashboard analytics and sales summaries
- Prisma-backed persistence layer

## Notes

- **SESD Project**: Emphasizes software engineering best practices, OOP design principles, and comprehensive system documentation.
- **OOP-First Design**: Entity inheritance, repository pattern, strategy pattern, and use-case driven architecture.
- **Documented Design**: Complete UML diagrams (class, sequence, use case, ER) provided for reference.
- The UI is designed for local development and demo workflows.
- The repo includes detailed diagrams and documentation to help explain the structure and data flow of the application.
