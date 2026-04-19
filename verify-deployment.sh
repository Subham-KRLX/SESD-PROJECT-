#!/bin/bash

# Final verification script for TechSpark deployment readiness

echo "════════════════════════════════════════════════════════════"
echo "   TechSpark - Production Deployment Verification Report"
echo "════════════════════════════════════════════════════════════"
echo ""

PASS=0
FAIL=0

check() {
    if [ $? -eq 0 ]; then
        echo "✓ $1"
        ((PASS++))
    else
        echo "✗ $1"
        ((FAIL++))
    fi
}

echo "Checking Prerequisites..."
echo ""

# Node.js
node --version > /dev/null 2>&1
check "Node.js installed"

# npm
npm --version > /dev/null 2>&1
check "npm installed"

# Git
git --version > /dev/null 2>&1
check "Git installed"

# Docker
docker --version > /dev/null 2>&1
check "Docker installed"

echo ""
echo "Checking Project Structure..."
echo ""

# Backend files
test -f package.json
check "package.json exists"

test -f tsconfig.json
check "tsconfig.json exists"

test -d src
check "src/ directory exists"

test -f Dockerfile
check "Dockerfile exists"

test -f docker-compose.yml
check "docker-compose.yml exists"

# Frontend files
test -d frontend
check "frontend/ directory exists"

test -f frontend/package.json
check "frontend/package.json exists"

# Prisma files
test -f prisma/schema.prisma
check "prisma/schema.prisma exists"

# Documentation
test -f README.md
check "README.md exists"

test -f DEPLOYMENT.md
check "DEPLOYMENT.md exists"

test -f DEPLOYMENT-CHECKLIST.md
check "DEPLOYMENT-CHECKLIST.md exists"

test -f DEPLOYMENT-READY.md
check "DEPLOYMENT-READY.md exists"

echo ""
echo "Checking Build Artifacts..."
echo ""

# Backend build
test -d dist
check "Backend dist/ folder exists"

test -f dist/index.js
check "Backend compiled (dist/index.js exists)"

# Frontend build
test -d frontend/dist
check "Frontend dist/ folder exists"

test -f frontend/dist/index.html
check "Frontend built (dist/index.html exists)"

echo ""
echo "Checking Security Files..."
echo ""

# Environment files
test -f .env
check ".env file exists"

test -f .env.production.example
check ".env.production.example exists"

# .gitignore has sensitive files
grep -q ".env" .gitignore 2>/dev/null
check ".env in .gitignore"

echo ""
echo "Checking Dependencies..."
echo ""

# Backend dependencies
grep -q '"express"' package.json
check "Express.js dependency exists"

grep -q '"@prisma/client"' package.json
check "Prisma dependency exists"

grep -q '"zod"' package.json
check "Zod validation exists"

grep -q '"jsonwebtoken"' package.json
check "JWT library exists"

grep -q '"bcrypt"' package.json
check "Bcrypt library exists"

# Frontend dependencies
grep -q '"react"' frontend/package.json
check "React dependency exists"

grep -q '"vite"' frontend/package.json
check "Vite build tool exists"

echo ""
echo "Checking Configuration..."
echo ""

# Jest config
test -f jest.config.js
check "Jest configuration exists"

# GitHub Actions
test -f .github/workflows/ci-cd.yml
check "GitHub Actions workflow configured"

# Docker ignore
test -f .dockerignore
check ".dockerignore configured"

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Summary:"
echo "  ✓ Passed: $PASS"
echo "  ✗ Failed: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "✅ All checks passed! Project is ready for deployment."
    echo ""
    echo "Next steps:"
    echo "  1. Review DEPLOYMENT-READY.md"
    echo "  2. Configure .env.production"
    echo "  3. Run: bash quick-start.sh"
    echo ""
    exit 0
else
    echo "⚠️  Some checks failed. Please review the issues above."
    exit 1
fi
