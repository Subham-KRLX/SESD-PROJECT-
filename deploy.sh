#!/bin/bash

# TechSpark Production Deployment Setup Script
# This script prepares the application for production deployment

set -e

echo "=========================================="
echo "TechSpark Production Deployment Setup"
echo "=========================================="
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Error: Node.js 20+ is required. Current version: $(node -v)"
    exit 1
fi
echo "✓ Node.js version check passed: $(node -v)"

# Install dependencies
echo ""
echo "Installing backend dependencies..."
npm ci

echo "Installing frontend dependencies..."
cd frontend && npm ci && cd ..
echo "✓ Dependencies installed"

# Build backend
echo ""
echo "Building backend..."
npm run build
echo "✓ Backend built successfully"

# Build frontend
echo ""
echo "Building frontend..."
cd frontend && npm run build && cd ..
echo "✓ Frontend built successfully"

# Check for .env.production
echo ""
if [ ! -f .env.production ]; then
    echo "⚠️  .env.production not found!"
    echo "Please copy .env.production.example to .env.production and update with your values:"
    echo "  cp .env.production.example .env.production"
    echo "  # Edit .env.production with production values"
    echo ""
    read -p "Continue without .env.production? (not recommended) [y/N] " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run database migrations
echo ""
echo "Running database migrations..."
npx prisma migrate deploy
echo "✓ Database migrations completed"

# Seed database (optional)
echo ""
read -p "Seed database with initial data? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run seed
    echo "✓ Database seeded"
fi

echo ""
echo "=========================================="
echo "✓ Deployment preparation complete!"
echo "=========================================="
echo ""
echo "To start the application:"
echo "  Option 1: Docker Compose"
echo "    docker-compose -f docker-compose.yml up -d"
echo ""
echo "  Option 2: Direct Node.js"
echo "    npm run dev:backend"
echo ""
echo "Application will be available at:"
echo "  Backend API: http://localhost:3000"
echo "  Health check: http://localhost:3000/health"
echo ""
