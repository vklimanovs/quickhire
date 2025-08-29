import { toast } from "../hooks/use-toast";

// Error types for different scenarios
export enum ErrorType {
  VALIDATION = "VALIDATION",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NETWORK = "NETWORK",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
}

// Error codes for specific error scenarios
export enum ErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  TOKEN_INVALID = "TOKEN_INVALID",

  // Validation errors
  PASSWORD_TOO_WEAK = "PASSWORD_TOO_WEAK",
  INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",
  REQUIRED_FIELD_MISSING = "REQUIRED_FIELD_MISSING",
  PASSWORDS_DONT_MATCH = "PASSWORDS_DONT_MATCH",

  // Network errors
  NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
  NETWORK_UNREACHABLE = "NETWORK_UNREACHABLE",

  // Server errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  // Generic error
  UNKNOWN = "UNKNOWN",
}

// Error interface
export interface AppError {
  type: ErrorType;
  code: ErrorCode;
  message: string;
  details?: string;
  field?: string;
  timestamp: Date;
}

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Create a new error
  createError(
    type: ErrorType,
    code: ErrorCode,
    message: string,
    details?: string,
    field?: string,
  ): AppError {
    return {
      type,
      code,
      message,
      details,
      field,
      timestamp: new Date(),
    };
  }

  // Handle API errors
  handleApiError(error: any, context?: string): AppError {
    console.error(`API Error in ${context || "unknown context"}:`, error);

    // Handle different types of API errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          return this.handleBadRequest(data, context);
        case 401:
          return this.handleUnauthorized(data, context);
        case 403:
          return this.handleForbidden(data, context);
        case 404:
          return this.handleNotFound(data, context);
        case 409:
          return this.handleConflict(data, context);
        case 422:
          return this.handleValidationError(data, context);
        case 429:
          return this.createError(
            ErrorType.NETWORK,
            ErrorCode.RATE_LIMIT_EXCEEDED,
            "Too many requests. Please try again later.",
            context,
          );
        case 500:
          return this.createError(
            ErrorType.SERVER,
            ErrorCode.INTERNAL_SERVER_ERROR,
            "Internal server error. Please try again later.",
            context,
          );
        case 503:
          return this.createError(
            ErrorType.SERVER,
            ErrorCode.SERVICE_UNAVAILABLE,
            "Service temporarily unavailable. Please try again later.",
            context,
          );
        default:
          return this.createError(
            ErrorType.SERVER,
            ErrorCode.UNKNOWN,
            data?.message || `Server error (${status})`,
            context,
          );
      }
    } else if (error.request) {
      // Network error
      return this.createError(
        ErrorType.NETWORK,
        ErrorCode.NETWORK_UNREACHABLE,
        "Network error. Please check your connection and try again.",
        context,
      );
    } else {
      // Other error
      return this.createError(
        ErrorType.UNKNOWN,
        ErrorCode.UNKNOWN,
        error.message || "An unexpected error occurred.",
        context,
      );
    }
  }

  // Handle specific error types
  private handleBadRequest(data: any, context?: string): AppError {
    if (data?.code === "EMAIL_ALREADY_EXISTS") {
      return this.createError(
        ErrorType.AUTHENTICATION,
        ErrorCode.EMAIL_ALREADY_EXISTS,
        "An account with this email already exists.",
        context,
        "email",
      );
    }

    if (data?.code === "PASSWORD_TOO_WEAK") {
      return this.createError(
        ErrorType.VALIDATION,
        ErrorCode.PASSWORD_TOO_WEAK,
        "Password should have at least one uppercase letter, one lowercase letter, one digit and one special character.",
        context,
        "password",
      );
    }

    return this.createError(
      ErrorType.VALIDATION,
      ErrorCode.REQUIRED_FIELD_MISSING,
      data?.message || "Invalid request data.",
      context,
    );
  }

  private handleUnauthorized(data: any, context?: string): AppError {
    return this.createError(
      ErrorType.AUTHENTICATION,
      ErrorCode.INVALID_CREDENTIALS,
      data?.message ||
        "Invalid credentials. Please check your email and password.",
      context,
    );
  }

  private handleForbidden(data: any, context?: string): AppError {
    return this.createError(
      ErrorType.AUTHORIZATION,
      ErrorCode.UNKNOWN,
      data?.message ||
        "Access denied. You don't have permission to perform this action.",
      context,
    );
  }

  private handleNotFound(data: any, context?: string): AppError {
    return this.createError(
      ErrorType.AUTHENTICATION,
      ErrorCode.ACCOUNT_NOT_FOUND,
      data?.message || "Account not found.",
      context,
    );
  }

  private handleConflict(data: any, context?: string): AppError {
    if (data?.code === "EMAIL_ALREADY_EXISTS") {
      return this.createError(
        ErrorType.AUTHENTICATION,
        ErrorCode.EMAIL_ALREADY_EXISTS,
        "An account with this email already exists.",
        context,
        "email",
      );
    }

    return this.createError(
      ErrorType.VALIDATION,
      ErrorCode.UNKNOWN,
      data?.message || "Conflict with existing data.",
      context,
    );
  }

  private handleValidationError(data: any, context?: string): AppError {
    if (data?.errors && Array.isArray(data.errors)) {
      // Handle field-specific validation errors
      const firstError = data.errors[0];
      return this.createError(
        ErrorType.VALIDATION,
        ErrorCode.REQUIRED_FIELD_MISSING,
        firstError.message || "Validation error.",
        context,
        firstError.field,
      );
    }

    return this.createError(
      ErrorType.VALIDATION,
      ErrorCode.REQUIRED_FIELD_MISSING,
      data?.message || "Validation error.",
      context,
    );
  }

  // Show error toast
  showError(error: AppError): void {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  }

  // Show success toast
  showSuccess(message: string): void {
    toast({
      title: "Success",
      description: message,
      variant: "default",
    });
  }

  // Log error for debugging
  logError(error: AppError, context?: string): void {
    console.error(`[${context || "App"}] Error:`, {
      type: error.type,
      code: error.code,
      message: error.message,
      details: error.details,
      field: error.field,
      timestamp: error.timestamp,
    });
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Utility functions
export const createAppError = (
  type: ErrorType,
  code: ErrorCode,
  message: string,
  details?: string,
  field?: string,
): AppError => errorHandler.createError(type, code, message, details, field);

export const handleApiError = (error: any, context?: string): AppError =>
  errorHandler.handleApiError(error, context);

export const showErrorToast = (error: AppError): void =>
  errorHandler.showError(error);

export const showSuccessToast = (message: string): void =>
  errorHandler.showSuccess(message);
