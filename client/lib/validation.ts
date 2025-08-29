import { ErrorType, ErrorCode, createAppError } from "./errorHandling";

// Validation rules interface
export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
  code: ErrorCode;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
    code: ErrorCode;
  }>;
}

// Common validation rules
export const validationRules = {
  required: (fieldName: string): ValidationRule => ({
    test: (value: any) =>
      value !== null &&
      value !== undefined &&
      value.toString().trim().length > 0,
    message: `${fieldName} is required`,
    code: ErrorCode.REQUIRED_FIELD_MISSING,
  }),

  email: (): ValidationRule => ({
    test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Please enter a valid email address",
    code: ErrorCode.INVALID_EMAIL_FORMAT,
  }),

  password: (): ValidationRule => ({
    test: (value: string) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasMinLength = value.length >= 8;

      return (
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar &&
        hasMinLength
      );
    },
    message:
      "Password should have at least one uppercase letter, one lowercase letter, one digit and one special character",
    code: ErrorCode.PASSWORD_TOO_WEAK,
  }),

  minLength: (min: number): ValidationRule => ({
    test: (value: string) => value.length >= min,
    message: `Must be at least ${min} characters long`,
    code: ErrorCode.REQUIRED_FIELD_MISSING,
  }),

  maxLength: (max: number): ValidationRule => ({
    test: (value: string) => value.length <= max,
    message: `Must be no more than ${max} characters long`,
    code: ErrorCode.REQUIRED_FIELD_MISSING,
  }),

  matches: (pattern: RegExp, message: string): ValidationRule => ({
    test: (value: string) => pattern.test(value),
    message,
    code: ErrorCode.REQUIRED_FIELD_MISSING,
  }),

  custom: (
    test: (value: any) => boolean,
    message: string,
    code: ErrorCode = ErrorCode.REQUIRED_FIELD_MISSING,
  ): ValidationRule => ({
    test,
    message,
    code,
  }),
};

// Validation functions
export class Validator {
  // Validate a single field
  static validateField(
    value: any,
    fieldName: string,
    rules: ValidationRule[],
  ): Array<{ field: string; message: string; code: ErrorCode }> {
    const errors: Array<{ field: string; message: string; code: ErrorCode }> =
      [];

    for (const rule of rules) {
      if (!rule.test(value)) {
        errors.push({
          field: fieldName,
          message: rule.message,
          code: rule.code,
        });
      }
    }

    return errors;
  }

  // Validate multiple fields
  static validateFields(
    fields: Record<string, { value: any; rules: ValidationRule[] }>,
  ): ValidationResult {
    const errors: Array<{ field: string; message: string; code: ErrorCode }> =
      [];

    for (const [fieldName, { value, rules }] of Object.entries(fields)) {
      const fieldErrors = this.validateField(value, fieldName, rules);
      errors.push(...fieldErrors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Validate form data with predefined rules
  static validateForm(
    formData: Record<string, any>,
    validationSchema: Record<string, ValidationRule[]>,
  ): ValidationResult {
    const errors: Array<{ field: string; message: string; code: ErrorCode }> =
      [];

    for (const [fieldName, rules] of Object.entries(validationSchema)) {
      const value = formData[fieldName];
      const fieldErrors = this.validateField(value, fieldName, rules);
      errors.push(...fieldErrors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Convert validation result to form errors object
  static toFormErrors(
    validationResult: ValidationResult,
  ): Record<string, string> {
    const formErrors: Record<string, string> = {};

    validationResult.errors.forEach((error) => {
      formErrors[error.field] = error.message;
    });

    return formErrors;
  }
}

// Predefined validation schemas
export const validationSchemas = {
  // Sign up form validation
  signUp: {
    firstName: [validationRules.required("First name")],
    lastName: [validationRules.required("Last name")],
    email: [validationRules.required("Email"), validationRules.email()],
    password: [
      validationRules.required("Password"),
      validationRules.password(),
    ],
    confirmPassword: [validationRules.required("Confirm password")],
    company: [], // Optional
    accountType: [validationRules.required("Account type")],
    general: [], // For general form errors
  },

  // Login form validation
  login: {
    email: [validationRules.required("Email"), validationRules.email()],
    password: [validationRules.required("Password")],
  },

  // Profile form validation
  profile: {
    firstName: [validationRules.required("First name")],
    lastName: [validationRules.required("Last name")],
    email: [validationRules.required("Email"), validationRules.email()],
  },

  // Password change validation
  passwordChange: {
    currentPassword: [validationRules.required("Current password")],
    newPassword: [
      validationRules.required("New password"),
      validationRules.password(),
    ],
    confirmPassword: [validationRules.required("Confirm password")],
  },
};

// Utility functions for common validations
export const validatePassword = (password: string): boolean => {
  return validationRules.password().test(password);
};

export const validateEmail = (email: string): boolean => {
  return validationRules.email().test(email);
};

export const validateRequired = (value: any): boolean => {
  return validationRules.required("Field").test(value);
};
