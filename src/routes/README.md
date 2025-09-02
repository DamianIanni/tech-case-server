# API Documentation with Swagger

This project uses Swagger for API documentation. The documentation is automatically generated from JSDoc comments in the code.

## Accessing the Swagger Documentation

The Swagger UI is available at:

```bash
http://localhost:<PORT>/api/docs
```

Where:

- `<PORT>` is the port your server is running on (default is 4000 as configured in env.ts)
- `/api` is the API_PREFIX from your environment configuration

For example, with default settings, the Swagger UI would be accessible at:

```bash
http://localhost:4000/api/docs
```

## How to Use Swagger UI

1. Navigate to the URL above in your browser
2. You'll see the Swagger UI interface with all available endpoints
3. Endpoints are grouped by tags (Auth, Account, Center, etc.)
4. Click on any endpoint to expand it and see details
5. You can try out endpoints directly from the UI by clicking "Try it out"
6. For authenticated endpoints, you'll need to click the "Authorize" button and provide your JWT token

## Adding Documentation

To add documentation for new endpoints:

1. Use JSDoc comments with `@swagger` tags
2. Follow the OpenAPI 3.0 specification
3. Place documentation in `.swagger.ts` files in the appropriate route directory

## Example

```typescript
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       200:
 *         description: Login successful
 */
```
