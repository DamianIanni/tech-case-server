import { AppErrorCode, ErrorMessages } from '../../constants/errorCodes';

/**
 * Custom API Error class that includes error codes for better error handling
 */
export class ApiError extends Error {
  public statusCode: number;
  public code: AppErrorCode;
  public details?: any;

  constructor(
    statusCode: number,
    message?: string,
    code?: AppErrorCode,
    details?: any
  ) {
    // If no message provided, use the default message for the error code
    const errorMessage = message || (code ? ErrorMessages[code] : 'An error occurred');
    
    super(errorMessage);
    
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code || AppErrorCode.INTERNAL_SERVER_ERROR;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, ApiError);
  }

  /**
   * Create a 400 Bad Request error
   */
  static badRequest(message?: string, code?: AppErrorCode, details?: any): ApiError {
    return new ApiError(400, message, code || AppErrorCode.VALIDATION_FAILED, details);
  }

  /**
   * Create a 401 Unauthorized error
   */
  static unauthorized(message?: string, code?: AppErrorCode, details?: any): ApiError {
    return new ApiError(401, message, code || AppErrorCode.UNAUTHORIZED, details);
  }

  /**
   * Create a 403 Forbidden error
   */
  static forbidden(message?: string, code?: AppErrorCode, details?: any): ApiError {
    return new ApiError(403, message, code || AppErrorCode.FORBIDDEN, details);
  }

  /**
   * Create a 404 Not Found error
   */
  static notFound(message?: string, code?: AppErrorCode, details?: any): ApiError {
    return new ApiError(404, message, code || AppErrorCode.RESOURCE_NOT_FOUND, details);
  }

  /**
   * Create a 409 Conflict error
   */
  static conflict(message?: string, code?: AppErrorCode, details?: any): ApiError {
    return new ApiError(409, message, code, details);
  }

  /**
   * Create a 422 Unprocessable Entity error
   */
  static unprocessableEntity(message?: string, code?: AppErrorCode, details?: any): ApiError {
    return new ApiError(422, message, code || AppErrorCode.VALIDATION_FAILED, details);
  }

  /**
   * Create a 500 Internal Server Error
   */
  static internal(message?: string, code?: AppErrorCode, details?: any): ApiError {
    return new ApiError(500, message, code || AppErrorCode.INTERNAL_SERVER_ERROR, details);
  }
}
