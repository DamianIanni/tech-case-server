# Medical CRM Backend API

> **A production-ready TypeScript REST API showcasing enterprise-level backend development expertise**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI_3.0-85EA2D.svg)](https://swagger.io/)

A sophisticated medical center management system demonstrating **advanced backend development skills** for modern healthcare applications. Built with enterprise-grade architecture patterns and industry best practices.

## 🎯 Technical Expertise Demonstrated

### **Architecture & Design Patterns**

- **Clean Architecture**: Layered separation (controllers → services → database)
- **Dependency Injection**: Modular middleware and service composition
- **Multi-tenant SaaS**: Center-based data isolation with cross-tenant user access
- **RESTful API Design**: Resource-based endpoints following HTTP semantics

### **Security & Authentication**

- **JWT Implementation**: Stateless authentication with role-based access control
- **Password Security**: bcrypt hashing with salt rounds
- **RBAC System**: Hierarchical permissions (`admin` > `manager` > `employee`)
- **Secure Password Reset**: Time-limited tokens with cryptographic validation

### **Data Management**

- **Relational Database Design**: Normalized schema with foreign key constraints
- **Transaction Management**: ACID compliance with rollback capabilities
- **Bulk Operations**: Optimized batch inserts for performance
- **Data Seeding**: Automated test data generation with Faker.js

### **Code Quality & Testing**

- **Type Safety**: 100% TypeScript with strict compiler settings
- **Runtime Validation**: Zod schemas for request/response validation
- **Comprehensive Testing**: Jest unit tests for middleware and controllers
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### **Developer Experience**

- **Interactive Documentation**: Swagger UI with live API testing
- **Hot Reloading**: Development server with automatic TypeScript compilation
- **Environment Management**: Multi-environment configuration (dev/test/prod)
- **Professional Tooling**: ESLint, Prettier, and TypeScript strict mode

## 🏗 System Architecture

```text
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────────┐
│   Client App    │    │   Express API    │    │   PostgreSQL         │
│                 │    │                  │    │                      │
│ React + Next.js │◄──►│ ┌──────────────┐ │◄──►│ ┌──────────────────┐ │
│  Frontend       │    │ │ Controllers  │ │    │ │   Tables         │ │
│                 │    │ └──────────────┘ │    │ │ • users          │ │
└─────────────────┘    │ ┌──────────────┐ │    │ │ • centers        │ │
                       │ │ Middlewares  │ │    │ │ • patients       │ │
┌─────────────────┐    │ └──────────────┘ │    │ │ • notes          │ │
│   Swagger UI    │◄──►│ ┌──────────────┐ │    │ │ • user_centers   │ │
│   /api/docs     │    │ │   Services   │ │    │ │ • patient_centers│ │
└─────────────────┘    │ └──────────────┘ │    │ │-─────────────────│ │
                       └──────────────────┘    └──────────────────────┘
```

## 🚀 Core Features

### **Multi-Tenant Medical Centers**

- Create and manage multiple medical facilities
- Role-based staff management within each center
- Cross-center user access with inherited permissions

### **Advanced Authentication System**

- JWT-based stateless authentication
- Secure password reset with email tokens
- Role hierarchy: Admin → Manager → Employee
- Session management with HTTP-only cookies

### **Patient & Medical Records**

- Complete patient lifecycle management
- Medical notes with timestamps and associations
- HIPAA-compliant data structure design

### **Production-Ready Features**

- Comprehensive input validation with Zod
- Centralized error handling and logging
- Environment-based configuration
- Interactive API documentation
- Automated testing suite

## 🛠 Technology Stack

| Layer              | Technology          | Justification                       |
| ------------------ | ------------------- | ----------------------------------- |
| **Runtime**        | Node.js 20+         | Latest LTS with native .env support |
| **Language**       | TypeScript 5.8      | Type safety and enhanced DX         |
| **Framework**      | Express 5.1         | Mature, performant web framework    |
| **Database**       | PostgreSQL 13+      | ACID compliance, complex queries    |
| **Authentication** | JWT + bcrypt        | Industry-standard secure auth       |
| **Validation**     | Zod 4.0             | Runtime type checking               |
| **Documentation**  | Swagger/OpenAPI 3.0 | Interactive API docs                |
| **Testing**        | Jest 30+            | Comprehensive test coverage         |
| **DevTools**       | tsx, cross-env      | Development efficiency              |

## 🚀 Live Demo & Documentation

**🔗 Interactive API Documentation**: Access the full Swagger UI at `http://localhost:4000/api/docs`

### Demo Credentials

The seeded database includes ready-to-use accounts for testing:

| Role         | Email               | Password      | Permissions        |
| ------------ | ------------------- | ------------- | ------------------ |
| **Admin**    | `demo@admin.com`    | `password123` | Full system access |
| **Manager**  | `demo@manager.com`  | `password123` | Center management  |
| **Employee** | `demo@employee.com` | `password123` | Patient records    |

## ⚡ Quick Start

### Prerequisites

- **Node.js 20+** (uses native `process.loadEnvFile`)
- **PostgreSQL 13+**
- **Docker & Docker Compose** (optional, for containerized setup)

### Installation & Setup (Local)

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cat > .env.development << EOF
NODE_ENV=example_development
PORT=4000
DATABASE_URL=Example
JWT_SECRET=Example
JWT_TEMP_SECRET=Example
JWT_RESET_SECRET=Example
JWT_EXPIRES_IN=1h
JWT_TEMP_EXPIRES_IN=5m
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
API_PREFIX=/api
EOF

# 3. Setup database and seed data
npm run seed:dev

# 4. Start development server
npm run dev
```

### Docker Setup

```bash
# 1. Create .env file with your configuration
cat > .env << EOF
NODE_ENV=development
PORT=4000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
JWT_TEMP_SECRET=your_temp_secret
JWT_RESET_SECRET=your_reset_secret
JWT_EXPIRES_IN=1h
JWT_TEMP_EXPIRES_IN=5m
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
API_PREFIX=/api
EOF

# 2. Build and start the Docker container
docker-compose up --build

# 3. For running in detached mode (background)
docker-compose up -d

# 4. To stop the containers
docker-compose down
```

> **Note**: When using Docker, the application will be available at `http://localhost:4000`. Make sure your database connection string in the .env file is properly configured to connect to your PostgreSQL instance.

### Access Points

- **API Base**: `http://localhost:4000/api`
- **Swagger Docs**: `http://localhost:4000/api/docs`
- **Test Login**: Use demo credentials above

## 📋 API Overview

### Authentication Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/logout` - Session termination
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password/:token` - Password reset confirmation

### Center Management

- `POST /create-center` - Create new medical center
- `GET /center-selection` - Available centers for user
- `GET /center/center-actions/all-centers` - List all centers
- `PATCH /center/center-actions/:center_id` - Update center
- `DELETE /center/center-actions/:center_id` - Delete center

### User Management

- `GET /center/users` - List center staff
- `POST /center/users` - Add new staff member
- `PATCH /center/users/:user_id` - Update staff details
- `DELETE /center/users/:user_id` - Remove staff member

### Patient Records

- `GET /center/patients` - List all patients
- `POST /center/patients` - Add new patient
- `GET /center/patients/:patient_id` - Patient details
- `PATCH /center/patients/:patient_id` - Update patient
- `DELETE /center/patients/:patient_id` - Remove patient

### Medical Notes

- `GET /center/patients/:patient_id/notes` - Patient notes
- `POST /center/patients/:patient_id/notes` - Add note
- `DELETE /center/patients/:patient_id/notes/:note_id` - Delete note

## 🏗 Project Architecture

```text
src/
├── app.ts                    # Express application setup
├── index.ts                  # Application entry point
├── config/
│   ├── database.ts          # PostgreSQL connection pool
│   └── env.ts               # Environment validation with Zod
├── controllers/             # Request handlers
│   ├── auth/               # Authentication logic
│   ├── account/            # User account management
│   ├── center/             # Medical center operations
│   ├── patients/           # Patient record management
│   ├── notes/              # Medical notes handling
│   └── users/              # Staff user management
├── services/               # Business logic layer
├── middlewares/            # Express middleware
│   ├── auth/              # Authentication & authorization
│   ├── validateSchema.ts  # Zod validation middleware
│   └── logger.ts          # Request logging
├── validations/           # Zod schemas
├── db/
│   └── seed.ts           # Database seeding with demo data
└── routes/               # API route definitions
    ├── swagger.ts        # Swagger configuration
    └── **/*.swagger.ts   # OpenAPI documentation
```

## 🧪 Development Scripts

```bash
npm run dev        # Development server with hot reload
npm run build      # TypeScript compilation
npm run start      # Production server
npm run seed:dev   # Seed database with demo data
npm run test:all   # Run Jest test suite
```

## 🔐 Security Features

- **JWT Authentication**: Stateless tokens with configurable expiration
- **Password Hashing**: bcrypt with salt rounds for secure storage
- **Role-Based Access**: Hierarchical permissions system
- **Input Validation**: Zod schemas prevent injection attacks
- **CORS Protection**: Configurable origin restrictions
- **Error Sanitization**: No sensitive data in error responses

## 📊 Performance Optimizations

- **Bulk Database Operations**: Efficient batch inserts for seeding
- **Connection Pooling**: PostgreSQL connection management
- **Middleware Optimization**: Conditional middleware loading
- **TypeScript Compilation**: Optimized build process

## 🎯 Professional Development Practices

- **Type Safety**: Strict TypeScript configuration
- **Code Organization**: Modular architecture with clear separation
- **Documentation**: Comprehensive Swagger/OpenAPI specs
- **Testing**: Unit tests for critical business logic
- **Environment Management**: Multi-environment configuration
- **Error Handling**: Centralized error management
- **Logging**: Structured logging for debugging and monitoring

## 📈 Scalability Considerations

- **Multi-tenant Architecture**: Isolated data per medical center
- **Stateless Authentication**: Horizontal scaling capability
- **Database Indexing**: Optimized queries for large datasets
- **Modular Design**: Easy feature extension and maintenance

---

## About This Project

Built with ❤️ using modern Node.js technologies. This project demonstrates production-ready backend development skills suitable for enterprise healthcare applications.

## Related Projects

- **Frontend Repository**: [https://github.com/DamianIanni/crm-medical-app](https://github.com/DamianIanni/crm-medical-app) - The React frontend application for this medical CRM system
