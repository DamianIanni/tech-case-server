/**
 * Centralized error codes for the medical CRM backend
 * These codes provide machine-readable error identifiers for frontend handling
 */
export enum AppErrorCode {
  // Generic errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // Authentication errors
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  AUTH_EMAIL_IN_USE = 'AUTH_EMAIL_IN_USE',
  AUTH_USER_NOT_FOUND = 'AUTH_USER_NOT_FOUND',
  AUTH_PASSWORD_REQUIRED = 'AUTH_PASSWORD_REQUIRED',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_SESSION_INVALID = 'AUTH_SESSION_INVALID',
  AUTH_ACCESS_DENIED = 'AUTH_ACCESS_DENIED',

  // Password reset errors
  PASSWORD_RESET_TOKEN_INVALID = 'PASSWORD_RESET_TOKEN_INVALID',
  PASSWORD_RESET_TOKEN_EXPIRED = 'PASSWORD_RESET_TOKEN_EXPIRED',

  // Center related errors
  CENTER_NOT_FOUND = 'CENTER_NOT_FOUND',
  CENTER_USER_NOT_MEMBER = 'CENTER_USER_NOT_MEMBER',
  CENTER_INSUFFICIENT_PERMISSIONS = 'CENTER_INSUFFICIENT_PERMISSIONS',
  CENTER_USER_ALREADY_EXISTS = 'CENTER_USER_ALREADY_EXISTS',
  CENTER_USER_NOT_EXISTS = 'CENTER_USER_NOT_EXISTS',
  CENTER_NO_ASSOCIATION = 'CENTER_NO_ASSOCIATION',

  // Patient related errors
  PATIENT_NOT_FOUND = 'PATIENT_NOT_FOUND',
  PATIENT_EMAIL_DUPLICATE = 'PATIENT_EMAIL_DUPLICATE',
  PATIENT_NOT_IN_CENTER = 'PATIENT_NOT_IN_CENTER',
  PATIENT_ACCESS_DENIED = 'PATIENT_ACCESS_DENIED',

  // User related errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_INVALID_ROLE = 'USER_INVALID_ROLE',
  USER_INSUFFICIENT_PRIVILEGES = 'USER_INSUFFICIENT_PRIVILEGES',

  // Account related errors
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',
  ACCOUNT_UPDATE_FAILED = 'ACCOUNT_UPDATE_FAILED',

  // Note related errors
  NOTE_NOT_FOUND = 'NOTE_NOT_FOUND',
  NOTE_ACCESS_DENIED = 'NOTE_ACCESS_DENIED',

  // Validation specific errors
  EMAIL_REQUIRED = 'EMAIL_REQUIRED',
  EMAIL_INVALID = 'EMAIL_INVALID',
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  REQUIRED_FIELD_MISSING = 'REQUIRED_FIELD_MISSING',

  // Role and permission errors
  ROLE_INVALID = 'ROLE_INVALID',
  ROLE_INSUFFICIENT = 'ROLE_INSUFFICIENT',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

/**
 * Error messages mapped to error codes for consistent messaging
 */
export const ErrorMessages: Record<AppErrorCode, string> = {
  [AppErrorCode.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred',
  [AppErrorCode.VALIDATION_FAILED]: 'Validation failed',
  [AppErrorCode.RESOURCE_NOT_FOUND]: 'Resource not found',
  [AppErrorCode.UNAUTHORIZED]: 'Unauthorized access',
  [AppErrorCode.FORBIDDEN]: 'Access forbidden',

  // Authentication
  [AppErrorCode.AUTH_INVALID_CREDENTIALS]: 'Invalid credentials',
  [AppErrorCode.AUTH_EMAIL_IN_USE]: 'Email already in use',
  [AppErrorCode.AUTH_USER_NOT_FOUND]: 'User not found with the provided email',
  [AppErrorCode.AUTH_PASSWORD_REQUIRED]: 'Password is required',
  [AppErrorCode.AUTH_TOKEN_INVALID]: 'Invalid token',
  [AppErrorCode.AUTH_TOKEN_EXPIRED]: 'Token has expired',
  [AppErrorCode.AUTH_SESSION_INVALID]: 'Invalid session',
  [AppErrorCode.AUTH_ACCESS_DENIED]: 'Access denied. Authentication required',

  // Password reset
  [AppErrorCode.PASSWORD_RESET_TOKEN_INVALID]: 'Invalid or expired password reset token',
  [AppErrorCode.PASSWORD_RESET_TOKEN_EXPIRED]: 'Password reset token has expired',

  // Center
  [AppErrorCode.CENTER_NOT_FOUND]: 'Center not found',
  [AppErrorCode.CENTER_USER_NOT_MEMBER]: 'User is not a member of this center',
  [AppErrorCode.CENTER_INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions for this center',
  [AppErrorCode.CENTER_USER_ALREADY_EXISTS]: 'User already exists in center',
  [AppErrorCode.CENTER_USER_NOT_EXISTS]: 'User does not exist in center',
  [AppErrorCode.CENTER_NO_ASSOCIATION]: 'No center associated with your account',

  // Patient
  [AppErrorCode.PATIENT_NOT_FOUND]: 'Patient not found',
  [AppErrorCode.PATIENT_EMAIL_DUPLICATE]: 'A patient with this email already exists in your center',
  [AppErrorCode.PATIENT_NOT_IN_CENTER]: 'Patient not found in your center',
  [AppErrorCode.PATIENT_ACCESS_DENIED]: 'Access denied for this patient',

  // User
  [AppErrorCode.USER_NOT_FOUND]: 'User not found',
  [AppErrorCode.USER_ALREADY_EXISTS]: 'User already exists',
  [AppErrorCode.USER_INVALID_ROLE]: 'Invalid user role',
  [AppErrorCode.USER_INSUFFICIENT_PRIVILEGES]: 'Insufficient privileges',

  // Account
  [AppErrorCode.ACCOUNT_NOT_FOUND]: 'Account not found',
  [AppErrorCode.ACCOUNT_UPDATE_FAILED]: 'Failed to update account',

  // Note
  [AppErrorCode.NOTE_NOT_FOUND]: 'Note not found',
  [AppErrorCode.NOTE_ACCESS_DENIED]: 'Access denied for this note',

  // Validation
  [AppErrorCode.EMAIL_REQUIRED]: 'Email is required',
  [AppErrorCode.EMAIL_INVALID]: 'Invalid email format',
  [AppErrorCode.PASSWORD_TOO_SHORT]: 'Password must be at least 6 characters',
  [AppErrorCode.REQUIRED_FIELD_MISSING]: 'Required field is missing',

  // Role and permission
  [AppErrorCode.ROLE_INVALID]: 'Invalid role',
  [AppErrorCode.ROLE_INSUFFICIENT]: 'Insufficient role privileges',
  [AppErrorCode.PERMISSION_DENIED]: 'Permission denied',
};
