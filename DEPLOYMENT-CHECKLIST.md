# TechSpark Deployment Checklist

Use this checklist to ensure your TechSpark application is production-ready.

## ✅ Pre-Deployment

### Code Quality
- [ ] Run `npm run validate` - all checks pass
- [ ] Run `npm run test` - all tests passing
- [ ] Run `npm run test:coverage` - coverage > 50%
- [ ] No console warnings/errors
- [ ] No TODO/FIXME comments in production code
- [ ] Code review completed
- [ ] All branches merged to main

### Documentation
- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Database schema documented
- [ ] Architecture decisions recorded

### Security
- [ ] No hardcoded secrets in code
- [ ] .env.production created and configured
- [ ] Database password is strong (16+ chars, mixed case, numbers, symbols)
- [ ] JWT_SECRET is strong and random
- [ ] CORS_ORIGIN configured correctly
- [ ] SSL/TLS certificates ready
- [ ] No vulnerable dependencies (npm audit clean)
- [ ] Rate limiting enabled
- [ ] Input validation enabled

### Database
- [ ] Database created on production server
- [ ] Database backups configured
- [ ] Backup retention policy defined
- [ ] Database user with limited permissions created
- [ ] Connection pooling configured
- [ ] Indexes created for frequently queried fields
- [ ] Prisma schema verified

### Infrastructure
- [ ] Production server provisioned
- [ ] Firewall rules configured
  - [ ] Port 80 (HTTP) open
  - [ ] Port 443 (HTTPS) open
  - [ ] SSH port restricted to known IPs
  - [ ] Database port restricted to app server only
- [ ] Reverse proxy (Nginx) configured
- [ ] SSL certificate installed and valid
- [ ] Auto-renewal configured (Let's Encrypt)
- [ ] Disk space available (at least 20GB free)
- [ ] RAM available (minimum 2GB)
- [ ] CPU adequate for expected load

### Monitoring & Logging
- [ ] Error tracking service configured (Sentry, etc.)
- [ ] Logging service configured
- [ ] Health check endpoint configured
- [ ] Uptime monitoring configured
- [ ] Alert rules configured
- [ ] Log rotation configured
- [ ] Performance monitoring enabled

### Backups
- [ ] Database backup script created
- [ ] Backups tested and restorable
- [ ] Backup retention policy set
- [ ] Backup storage secured
- [ ] Disaster recovery plan documented

## 🚀 Deployment Day

### Pre-Deployment Preparation
- [ ] Notify team about deployment window
- [ ] Set up maintenance mode (optional)
- [ ] Test deployment process on staging first
- [ ] Prepare rollback plan
- [ ] Have database backup

### Build & Deployment
- [ ] Run `npm run build:prod` successfully
- [ ] Build Docker image if using Docker
- [ ] Push to registry
- [ ] Set environment variables on server
- [ ] Deploy backend application
- [ ] Deploy frontend application
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Seed initial data if needed: `npm run seed`

### Post-Deployment Verification

#### Basic Checks
- [ ] Application started without errors
- [ ] No errors in application logs
- [ ] Health check endpoint responds: `curl https://api.techspark.com/health`
- [ ] Frontend loads: `https://techspark.com`
- [ ] Database connectivity verified
- [ ] Environment variables loaded correctly

#### Functional Testing
- [ ] User registration works
- [ ] User login works
- [ ] Browse gadgets page loads
- [ ] Product details page loads
- [ ] Add to cart functionality works
- [ ] Order placement works
- [ ] Order history displays correctly
- [ ] Dashboard loads for admin users

#### Performance Testing
- [ ] Page load times acceptable
- [ ] No N+1 queries in logs
- [ ] Database response times normal
- [ ] Memory usage stable
- [ ] CPU usage normal

#### Security Testing
- [ ] HTTPS enforces on all pages
- [ ] Security headers present
- [ ] CORS headers correct
- [ ] Authentication required for protected endpoints
- [ ] Authorization working correctly
- [ ] Rate limiting functional

#### API Testing
- [ ] GET /health returns 200
- [ ] GET /api/gadgets returns data
- [ ] POST /api/auth/register works
- [ ] POST /api/auth/login returns token
- [ ] Protected endpoints require auth

## 📊 Post-Deployment Monitoring

### First Hour
- [ ] Monitor error tracking service
- [ ] Monitor application logs
- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Monitor database performance
- [ ] Check uptime monitoring service
- [ ] Review monitoring dashboards

### First Day
- [ ] Error count stable and expected
- [ ] No performance degradation
- [ ] Database backup completed
- [ ] User feedback positive
- [ ] No unusual log patterns

### First Week
- [ ] All metrics healthy
- [ ] No critical issues found
- [ ] Incidents resolved quickly if any
- [ ] Team confident with deployment
- [ ] Rollback plan no longer needed

## 🔄 Rollback Plan

If deployment fails:

1. **Assess the issue**
   - Check error logs
   - Check database migration status
   - Check application status

2. **Rollback if necessary**
   ```bash
   # Revert to previous version
   git revert <commit-hash>
   npm run build:prod
   npx prisma migrate resolve --rolled-back <migration-name>
   # Restart application
   ```

3. **Communicate**
   - Notify team
   - Update status page
   - Prepare incident report

## 📋 Sign-Off

- [ ] Deployment Manager: _____________ Date: _______
- [ ] DevOps/Infrastructure: _____________ Date: _______
- [ ] QA: _____________ Date: _______
- [ ] Product: _____________ Date: _______

## 📞 Emergency Contacts

- DevOps Lead: [Contact Info]
- Database Admin: [Contact Info]
- On-Call Engineer: [Contact Info]

## 📝 Notes

```
[Space for deployment notes, issues, and decisions]
```

---

**Last Deployment**: _____________
**Version**: _____________
**Deployed By**: _____________
**Date**: _____________
