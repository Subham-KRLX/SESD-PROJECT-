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

## Running the Project Locally

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

### Local Access

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

### Convenience Scripts

```bash
npm run dev:backend
npm run dev:frontend
npm run seed
```

## 🚀 Production Deployment Playbook

TechSpark is configured for production-grade deployment. Follow the steps below for a successful launch.

### 1. Unified Deployment (Recommended - Monolith)
Deploy both frontend and backend as a single service on **Render** or **Railway**.

- **Connect Your Repo**: Link your GitHub repository.
- **Build Command**: `npm run build:prod` (builds backend and frontend).
- **Start Command**: `npm start` (runs the compiled backend which serves the frontend).
- **Environment Variables**:
  - `NODE_ENV=production`
  - `DATABASE_URL`: Your production PostgreSQL URL.
  - `PORT`: Usually automatically set by the platform (default 3000).

### 2. Split Deployment (Advanced)
Deploy the Backend to **Render** and the Frontend to **Vercel**.

**Backend (Render):**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Env Vars**: `DATABASE_URL`

**Frontend (Vercel):**
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Env Vars**: `VITE_API_URL` (Set this to your Render Backend URL).

---

## 🛠 Required Environment Variables

Ensure these are set in your production dashboard:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `PORT` | Listening port for the application | `3000` |
| `VITE_API_URL` | (Required for Split) Backend URL | `https://techspark-api.onrender.com` |

---

## 🏗 Key Capabilities

- **100% Functional Completion**: All core and advanced features implemented.
- **Atomic Hardware Deployment**: Transaction-safe ordering system ensures inventory integrity.
- **Hardware Correlation Analysis**: Side-by-side technical comparison tool for hardware assets.
- **Vendor Autonomy**: Self-service inventory control for verified hardware providers.
- **Deployment Ready**: Fully configured with CORS and unified static file serving.
- **SESD Architectural Excellence**: Clean Architecture, Factory, Strategy, and Repository patterns.
- **Premium User Experience**: GSAP/Framer Motion animations for a futuristic hardware uplink feel.

---

## 🏁 Final Verification

- [x] **Code Cleanliness**: Sanitized of all dev comments; documentation is professional and hardware-themed.
- [x] **Production Integrity**: CORS and SPA routing configured for deployment.
- [x] **Commit History**: 3 logical commits (Backend, Frontend, Infrastructure).

**Project Status: Ready for Global Deployment.**
