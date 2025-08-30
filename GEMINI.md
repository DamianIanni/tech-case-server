# GEMINI Project Context: medical-crm-backend

## Project Overview

This project is a TypeScript-based backend for a medical CRM application. It uses a Node.js and Express.js runtime environment, with a PostgreSQL database for data storage. The architecture is modular, with a clear separation of concerns between routes, controllers, services, and database interactions.

Key technologies used:

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Testing:** Jest

## Building and Running

### Prerequisites

- Node.js
- npm or yarn
- A running PostgreSQL instance

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=your_frontend_url
API_PREFIX=/api/v1
```

### Running the application

- **Development mode (with hot-reloading):**

  ```bash
  npm run dev
  ```

- **Production mode:**

  ```bash
  npm run build
  npm run start
  ```

### Testing

To run the test suite:

```bash
npm run test:all
```

## Development Conventions

- **TypeScript:** The project is written in TypeScript with strict mode enabled.
- **Modular Architecture:** The code is organized into modules for different features (e.g., auth, users, centers, patients). Each module has its own routes, controllers, services, and database queries.
- **Error Handling:** A centralized error handling middleware is used to catch and process errors.
- **Validation:** Zod is used for validating incoming request bodies and parameters.
- **Authentication:** Routes are protected using a JWT-based authentication middleware.
- **Database:** The project uses the `pg` library to interact with the PostgreSQL database.
- **Linting and Formatting:** TODO: Add linting and formatting commands (e.g., ESLint, Prettier).
