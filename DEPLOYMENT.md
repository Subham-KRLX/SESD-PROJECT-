# Deployment Guide

TechSpark is designed to run on Render as a single web service. The Express backend serves the built React frontend from `frontend/dist`, so the deployment does not require Docker.

## Render Setup

1. Create a new **Web Service** in Render from this repository.
2. Leave the root directory empty so Render builds from the repository root.
3. Use these commands:

```bash
npm ci && npm run build
npm start
```

4. Add these environment variables in Render:

```bash
NODE_ENV=production
DATABASE_URL=
JWT_SECRET=
```

5. After the service is live, apply Prisma migrations:

```bash
npm run db:migrate:deploy
```

## Blueprint Option

If you prefer Render blueprint deployment, use [render.yaml](render.yaml).

## Notes

- The backend listens on `process.env.PORT`, which matches Render's injected port.
- The frontend build is produced during `npm run build` and served by the backend.
- Use the root `.env.example` for local development.