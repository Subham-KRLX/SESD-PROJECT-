#!/bin/bash
set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         TechSpark - Quick Start Deployment Guide           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker from https://www.docker.com/"
    exit 1
fi
echo -e "${GREEN}✓${NC} Docker is installed"

# Check if docker-compose is available
if ! docker compose version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not available${NC}"
    echo "Please ensure Docker Compose is installed"
    exit 1
fi
echo -e "${GREEN}✓${NC} Docker Compose is available"

# Create .env.production if it doesn't exist
if [ ! -f .env.production ]; then
    echo ""
    echo -e "${YELLOW}Setting up production environment...${NC}"
    
    cp .env.production.example .env.production
    
    # Generate secure JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Update .env.production with generated secret
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env.production
    else
        sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env.production
    fi
    
    echo -e "${GREEN}✓${NC} Created .env.production with secure JWT_SECRET"
    echo -e "${YELLOW}⚠ Edit .env.production to set:${NC}"
    echo "  - DATABASE_URL (if not using default)"
    echo "  - CORS_ORIGIN (your domain)"
    echo "  - Other production settings"
else
    echo -e "${GREEN}✓${NC} .env.production already exists"
fi

# Build Docker image
echo ""
echo -e "${BLUE}Building Docker image...${NC}"
docker compose build

# Start services
echo ""
echo -e "${BLUE}Starting services...${NC}"
docker compose up -d

# Wait for database to be ready
echo ""
echo -e "${BLUE}Waiting for database to be ready...${NC}"
sleep 5

# Run migrations
echo ""
echo -e "${BLUE}Running database migrations...${NC}"
docker compose exec -T backend npx prisma migrate deploy

# Seed database
echo ""
read -p "Seed database with sample data? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker compose exec -T backend npm run seed
    echo -e "${GREEN}✓${NC} Database seeded"
fi

# Show status
echo ""
echo -e "${BLUE}Checking service status...${NC}"
docker compose ps

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║            🎉 TechSpark is Ready! 🎉                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Services are running:${NC}"
echo "  Backend API:  http://localhost:3000"
echo "  Health Check: http://localhost:3000/health"
echo "  Database:     postgres://localhost:5432"
echo ""
echo -e "${YELLOW}Available Commands:${NC}"
echo "  View logs:    docker compose logs -f"
echo "  Stop:         docker compose down"
echo "  Restart:      docker compose restart"
echo "  Shell:        docker compose exec backend sh"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "  1. Test API: curl http://localhost:3000/health"
echo "  2. Register user: POST /api/auth/register"
echo "  3. Read DEPLOYMENT.md for more options"
echo ""
