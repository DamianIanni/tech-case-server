# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development Workflow
```bash
npm run dev          # Start development server with hot reload using tsx watch
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production build
npm test             # Run in test environment
npm run test:all     # Run all Jest tests
```

### Single Test Execution
```bash
npx jest __tests__/middlewares/authMiddleware.test.ts
npx jest --testPathPattern=authMiddleware
```

## Architecture Overview

This is a **medical CRM backend** built with Express.js and TypeScript, serving a PostgreSQL database. The application uses JWT authentication with cookie-based sessions and implements role-based access control for medical centers.

### Key Architectural Patterns

**Multi-tenant Medical Center Architecture:**
- Users belong to medical centers with hierarchical roles
- Patients are scoped to specific centers
- Authorization middleware enforces center-based access control
- Complex patient-center relationships handled through helper functions

**Layered Architecture:**
```
src/
├── routes/          # API endpoint definitions (auth → center selection → protected routes)
├── controllers/     # Request handlers organized by domain
├── middlewares/     # Auth, validation, and access control layers
├── db/             # Database queries and connection pooling
├── config/         # Environment validation with Zod schemas
└── @types/         # Custom TypeScript definitions
```

**Authentication Flow:**
1. `/auth` routes handle login/register (no auth required)
2. `authMiddleware` validates JWT tokens for protected routes
3. `/center-selection` allows choosing active medical center
4. Center-scoped routes require additional center authorization

### Database Pattern
- Uses PostgreSQL with connection pooling (`pg` library)
- Raw SQL queries organized in `db/` directory by domain
- Helper functions in `db/helpers/` handle complex cross-center patient logic
- Environment-based connection configuration with Zod validation

### Testing Strategy
- Jest configuration targets `__tests__/` directory
- Middleware tests use `node-mocks-http` for request/response mocking
- Tests organized by layer (middlewares, controllers, etc.)

## Environment Configuration

The app uses Node.js v20+ native `process.loadEnvFile()` with environment-specific files:
- `.env.development` - Development environment
- `.env.test` - Test environment  
- `.env.production` - Production environment

Required environment variables are validated using Zod schemas in `src/config/env.ts`.

## Key Middleware Chain

1. `cookieParser` - Parse JWT from cookies
2. `cors` - Handle cross-origin requests
3. `loggerMiddleware` (dev only) - Request logging
4. `authMiddleware` - JWT validation
5. Center-specific authorization middlewares:
   - `checkUserInCenter` - Verify user belongs to center
   - `authAdminInCenter` - Admin role validation
   - `requireMinRole` - Role hierarchy enforcement
   - `patientInCenter` - Patient-center relationship validation

## Development Notes

- Uses `tsx` for development with hot reload instead of `ts-node`
- TypeScript with strict mode and CommonJS modules
- Custom type definitions in `src/@types/express/index.d.ts`
- Cookie-based JWT authentication with CORS credentials support
