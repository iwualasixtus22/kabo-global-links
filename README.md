# Kabo Global Links

Premium service-linking and coordination platform built with Next.js, Prisma, and PostgreSQL.

## Features
- ✨ **Premium Landing Page**: Built with modern typography and glassmorphism.
- 📝 **Service Requests**: Multi-category booking form for customers.
- 🔐 **Admin Dashboard**: Live management of all incoming service requests at `/admin`.
- 🛠️ **Full-Stack Integrated**: Next.js 16+, Prisma ORM, and PostgreSQL support.

## Getting Started

### Local Development
1. Install dependencies: `npm install`
2. Set up your `.env` with `DATABASE_URL`.
3. Generate Prisma client: `npx prisma generate`
4. Run dev server: `npm run dev`

### Production Deployment (Render)
1. Link your GitHub repo to Render.
2. Environment Variables:
   - `DATABASE_URL`: Your production PG connection string.
3. Build Command: `npm run build`
4. Start Command: `npm run start`

## Technologies Used
- Next.js (App Router)
- TypeScript
- Prisma ORM
- Google Fonts (Outfit & Plus Jakarta Sans)
