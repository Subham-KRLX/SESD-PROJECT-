#!/bin/bash

# This script sets up the required environment files for TechSpark

echo "Setting up environment files for TechSpark deployment..."

# Create .env.production if it doesn't exist
if [ ! -f .env.production ]; then
    cat > .env.production << 'EOF'
# Production Database Configuration
DATABASE_URL=postgresql://user:password@db-host:5432/techspark_prod?schema=public

# Server Configuration
PORT=3000
NODE_ENV=production

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=change-this-to-a-secure-random-string-in-production

# Frontend Configuration
VITE_API_URL=https://api.techspark.com

# Logging
LOG_LEVEL=info

# CORS Configuration
CORS_ORIGIN=https://techspark.com,https://www.techspark.com

# Database Pooling
DATABASE_POOL_MIN=5
DATABASE_POOL_MAX=20

# Session Configuration
SESSION_TIMEOUT=86400

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration (optional)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

# AWS S3 Configuration (optional, for file uploads)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=techspark-uploads
EOF
    echo "✓ Created .env.production"
else
    echo "✓ .env.production already exists"
fi

# Create .env.development if it doesn't exist
if [ ! -f .env.development ]; then
    cat > .env.development << 'EOF'
# Development Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techspark_dev?schema=public

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (fine for development)
JWT_SECRET=dev-secret-key-not-secure

# Frontend Configuration
VITE_API_URL=http://localhost:3000

# Logging
LOG_LEVEL=debug

# Database Pooling
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
EOF
    echo "✓ Created .env.development"
else
    echo "✓ .env.development already exists"
fi

# Create frontend .env.example if it doesn't exist
if [ ! -f frontend/.env.example ]; then
    cat > frontend/.env.example << 'EOF'
# Frontend API Configuration
VITE_API_URL=http://localhost:3000

# Analytics (optional)
VITE_ANALYTICS_ID=

# Feature Flags
VITE_ENABLE_BETA_FEATURES=false
EOF
    echo "✓ Created frontend/.env.example"
else
    echo "✓ frontend/.env.example already exists"
fi

echo "Environment setup complete!"
