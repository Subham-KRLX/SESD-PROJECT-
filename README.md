# TechSpark - Premium Tech Gadget Marketplace

## Overview
**TechSpark** is a high-performance, full-stack e-commerce platform tailored for tech enthusiasts, professionals, and hardware collectors. It focuses on high-end computing components, IoT devices, and specialized peripherals.

## Project Status
This project is currently in the **Initial Coding Phase (10%)**. The foundational structure, core domain entities, and database schema have been established.

## Architecture
The project follows **Clean Architecture** principles:
- `src/domain`: Core business logic and entities (User, Gadget).
- `src/infrastructure`: Frameworks and drivers (Prisma, Express).
- `src/index.ts`: Application entry point.

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

## Features (In Progress)
- [x] Project Initialization
- [x] Core Domain Entities (User, Gadget)
- [x] Database Schema Definition
- [x] Health Check Endpoint
- [ ] Authentication & RBAC
- [ ] Product Discovery & Filtering
- [ ] Order Management
- [ ] Technical Reviews
