# TechSpark Deployment Guide

This guide covers deploying TechSpark to various environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [Database Migrations](#database-migrations)
- [Monitoring & Health Checks](#monitoring--health-checks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- **Node.js**: v20.19+ or v22.12+
- **npm**: v10.5.1+
- **Docker**: v20+ (for containerized deployment)
- **PostgreSQL**: v14+ (can be containerized)
- **Git**: for version control

## Local Development

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd SESD-PROJECT-
```

2. **Install dependencies**
```bash
npm install
cd frontend && npm install && cd ..
```

3. **Configure environment**
```bash
cp .env .env.local
# Edit .env.local with your local database settings
```

4. **Setup database**
```bash
npx prisma migrate dev
npm run seed
```

5. **Start development servers**
```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/health

## Docker Deployment

### Using Docker Compose

**Advantages**: Single command to run entire stack, isolation, reproducible environment

### Quick Start

1. **Configure environment**
```bash
cp .env.production.example .env.production
# Edit .env.production with your production values
```

2. **Start services**
```bash
docker-compose up -d
```

3. **Check status**
```bash
docker-compose ps
docker-compose logs backend
```

4. **Run migrations**
```bash
docker-compose exec backend npx prisma migrate deploy
```

5. **Seed database** (optional)
```bash
docker-compose exec backend npm run seed
```

### Stopping Services

```bash
docker-compose down
# With volume cleanup:
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
```

## Production Deployment

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] No console warnings/errors
- [ ] Environment variables configured
- [ ] Database backup in place
- [ ] SSL certificates ready
- [ ] Monitoring setup
- [ ] Error tracking configured
- [ ] Backups configured

### Deployment Methods

#### Method 1: Docker to VPS/Cloud Server

1. **Build Docker image**
```bash
docker build -t techspark:latest .
```

2. **Push to registry**
```bash
docker tag techspark:latest your-registry/techspark:latest
docker push your-registry/techspark:latest
```

3. **Deploy on server**
```bash
ssh user@your-server
docker pull your-registry/techspark:latest
docker-compose -f docker-compose.prod.yml up -d
```

#### Method 2: Direct Node.js Deployment

1. **Prepare server**
```bash
ssh user@your-server
cd /opt/techspark
git clone <repo> .
npm ci --production
```

2. **Build application**
```bash
npm run build
cd frontend && npm run build && cd ..
```

3. **Setup systemd service**
```bash
sudo tee /etc/systemd/system/techspark.service > /dev/null <<EOF
[Unit]
Description=TechSpark API Server
After=network.target

[Service]
Type=simple
User=techspark
WorkingDirectory=/opt/techspark
Environment="NODE_ENV=production"
EnvironmentFile=/opt/techspark/.env.production
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable techspark
sudo systemctl start techspark
```

4. **Setup Nginx reverse proxy**
```bash
sudo tee /etc/nginx/sites-available/techspark > /dev/null <<EOF
server {
    listen 80;
    server_name api.techspark.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/techspark /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Setup SSL (Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.techspark.com
```

## Environment Variables

### Required (Production)

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=your-secure-random-secret
CORS_ORIGIN=https://techspark.com
```

### Optional

```bash
# Monitoring
LOG_LEVEL=info
SENTRY_DSN=
APM_ENABLED=false

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# AWS S3 (for file uploads)
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

## Database Migrations

### Development
```bash
npx prisma migrate dev --name your_migration_name
```

### Production
```bash
npx prisma migrate deploy
```

### Rollback (development only)
```bash
npx prisma migrate resolve --rolled-back migration_name
```

## Monitoring & Health Checks

### Health Check Endpoint

```bash
curl http://localhost:3000/health
# Response: {"status":"TechSpark API is running with Clean Architecture"}
```

### Docker Health Check

Docker containers include built-in health checks:
```bash
docker ps
# Shows "healthy" status for backend container
```

### Logs Monitoring

```bash
# systemd
sudo journalctl -u techspark -f

# Docker
docker-compose logs -f backend
```

## Security Best Practices

1. **Never commit secrets**
   - Use .env.production which is .gitignored
   - Manage secrets with your deployment platform

2. **Database security**
   - Use strong passwords
   - Restrict database access by IP
   - Enable SSL for database connections
   - Regular backups

3. **API security**
   - Enable CORS properly
   - Use HTTPS only
   - Rate limiting enabled
   - Request validation enabled

4. **Updates**
   - Keep Node.js updated
   - Regular npm audit
   - Security patches immediately

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Test connection
psql postgresql://user:password@host:5432/db

# Check Prisma schema
npx prisma db push
```

### Permission Denied (Docker)
```bash
# Fix Docker socket permissions
sudo chmod 666 /var/run/docker.sock
```

### Out of Memory
```bash
# Increase Node.js memory
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

### Slow Queries
```bash
# Enable Prisma query logging
DATABASE_LOGGING=true npm start

# Check database indexes
npx prisma db execute --stdin < analyze.sql
```

## Support

For issues or questions:
- Check application logs
- Review error tracking service (Sentry)
- Check database connections
- Verify environment variables
- Check system resources (CPU, RAM, disk)
