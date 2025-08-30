# Error Codes System

This document explains the comprehensive error code system implemented in the medical CRM backend.

## Overview

The error codes system provides machine-readable error identifiers that enable consistent error handling across the application and better frontend integration.

## Error Response Format

All API errors now follow this standardized format:

```json
{
  "status": "error",
  "error": {
    "message": "Human-readable error message",
    "code": "MACHINE_READABLE_ERROR_CODE",
    "details": {} // Optional additional details
  }
}
```

## Available Error Codes

### Generic Errors

- `INTERNAL_SERVER_ERROR` - An unexpected error occurred
- `VALIDATION_FAILED` - Validation failed
- `RESOURCE_NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Unauthorized access
- `FORBIDDEN` - Access forbidden

### Authentication Errors

- `AUTH_INVALID_CREDENTIALS` - Invalid credentials
- `AUTH_EMAIL_IN_USE` - Email already in use
- `AUTH_USER_NOT_FOUND` - User not found with the provided email
- `AUTH_PASSWORD_REQUIRED` - Password is required
- `AUTH_TOKEN_INVALID` - Invalid token
- `AUTH_TOKEN_EXPIRED` - Token has expired
- `AUTH_SESSION_INVALID` - Invalid session
- `AUTH_ACCESS_DENIED` - Access denied. Authentication required

### Password Reset Errors

- `PASSWORD_RESET_TOKEN_INVALID` - Invalid or expired password reset token
- `PASSWORD_RESET_TOKEN_EXPIRED` - Password reset token has expired

### Center Related Errors

- `CENTER_NOT_FOUND` - Center not found
- `CENTER_USER_NOT_MEMBER` - User is not a member of this center
- `CENTER_INSUFFICIENT_PERMISSIONS` - Insufficient permissions for this center
- `CENTER_USER_ALREADY_EXISTS` - User already exists in center
- `CENTER_USER_NOT_EXISTS` - User does not exist in center
- `CENTER_NO_ASSOCIATION` - No center associated with your account

### Patient Related Errors

- `PATIENT_NOT_FOUND` - Patient not found
- `PATIENT_EMAIL_DUPLICATE` - A patient with this email already exists in your center
- `PATIENT_NOT_IN_CENTER` - Patient not found in your center
- `PATIENT_ACCESS_DENIED` - Access denied for this patient

### User Related Errors

- `USER_NOT_FOUND` - User not found
- `USER_ALREADY_EXISTS` - User already exists
- `USER_INVALID_ROLE` - Invalid user role
- `USER_INSUFFICIENT_PRIVILEGES` - Insufficient privileges

### Account Related Errors

- `ACCOUNT_NOT_FOUND` - Account not found
- `ACCOUNT_UPDATE_FAILED` - Failed to update account

### Note Related Errors

- `NOTE_NOT_FOUND` - Note not found
- `NOTE_ACCESS_DENIED` - Access denied for this note

### Validation Specific Errors

- `EMAIL_REQUIRED` - Email is required
- `EMAIL_INVALID` - Invalid email format
- `PASSWORD_TOO_SHORT` - Password must be at least 6 characters
- `REQUIRED_FIELD_MISSING` - Required field is missing

### Role and Permission Errors

- `ROLE_INVALID` - Invalid role
- `ROLE_INSUFFICIENT` - Insufficient role privileges
- `PERMISSION_DENIED` - Permission denied

## How to Use

### In Services (Throwing Errors)

```typescript
import { ApiError } from "../utils/errors/ApiError";
import { AppErrorCode } from "../constants/errorCodes";

// Throw a specific error with code
throw ApiError.conflict(undefined, AppErrorCode.PATIENT_EMAIL_DUPLICATE);

// Or use constructor for custom scenarios
throw new ApiError(
  400,
  "Custom message",
  AppErrorCode.VALIDATION_FAILED,
  additionalDetails
);

// Use static methods for common scenarios
throw ApiError.notFound(); // 404 with RESOURCE_NOT_FOUND code
throw ApiError.unauthorized(); // 401 with UNAUTHORIZED code
throw ApiError.forbidden(); // 403 with FORBIDDEN code
```

### In Middleware (Direct Response)

```typescript
import { sendError } from "../handler/responseHandler";
import { AppErrorCode } from "../constants/errorCodes";

// Send error with specific code
return sendError(res, "Patient not found", 404, AppErrorCode.PATIENT_NOT_FOUND);

// With additional details
return sendError(
  res,
  "Validation failed",
  400,
  AppErrorCode.VALIDATION_FAILED,
  validationErrors
);
```

### Error Handling Middleware

The global error handler automatically detects `ApiError` instances and includes the error codes in the response:

```typescript
// This will automatically be caught and formatted properly
throw ApiError.badRequest("Invalid input", AppErrorCode.VALIDATION_FAILED);

// Results in:
{
  "status": "error",
  "error": {
    "message": "Invalid input",
    "code": "VALIDATION_FAILED"
  }
}
```

## Frontend Integration

Frontend applications can now handle errors consistently:

```typescript
// Frontend error handling example
const handleApiError = (error) => {
  switch (error.code) {
    case "AUTH_INVALID_CREDENTIALS":
      showToast("Invalid email or password");
      break;
    case "PATIENT_EMAIL_DUPLICATE":
      showFormError("email", "A patient with this email already exists");
      break;
    case "AUTH_SESSION_INVALID":
      redirectToLogin();
      break;
    default:
      showToast("An unexpected error occurred");
  }
};
```

## Benefits

1. **Consistency**: All errors follow the same format across the entire API
2. **Machine Readable**: Frontend can handle specific error scenarios programmatically
3. **Internationalization**: Frontend can show localized messages based on error codes
4. **Better UX**: Users get specific, actionable error messages
5. **Debugging**: Developers can easily identify and track specific error scenarios
6. **API Evolution**: Error codes provide stability as error messages can change without breaking frontend logic

## Adding New Error Codes

1. Add the error code to `AppErrorCode` enum in `src/constants/errorCodes.ts`
2. Add the corresponding message to `ErrorMessages` object
3. Use the error code in your services or middleware
4. Update this documentation

Example:

```typescript
// In errorCodes.ts
export enum AppErrorCode {
  // ... existing codes
  NEW_BUSINESS_ERROR = "NEW_BUSINESS_ERROR",
}

export const ErrorMessages: Record<AppErrorCode, string> = {
  // ... existing messages
  [AppErrorCode.NEW_BUSINESS_ERROR]: "This is a new business error",
};

// In your service
throw ApiError.badRequest(undefined, AppErrorCode.NEW_BUSINESS_ERROR);
```
