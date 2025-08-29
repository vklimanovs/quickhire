# Error Handling System

This document describes the centralized error handling system implemented in the QuickHire application.

## Overview

The error handling system provides:

- **Centralized error management** across the application
- **Consistent error types and codes** for different scenarios
- **Automatic error categorization** (validation, authentication, network, etc.)
- **User-friendly error messages** with toast notifications
- **Form validation integration** with real-time feedback
- **Type-safe error handling** with TypeScript

## Architecture

### 1. Error Types (`client/lib/errorHandling.ts`)

```typescript
export enum ErrorType {
  VALIDATION = "VALIDATION",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NETWORK = "NETWORK",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
}
```

### 2. Error Codes (`client/lib/errorHandling.ts`)

```typescript
export enum ErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",

  // Validation errors
  PASSWORD_TOO_WEAK = "PASSWORD_TOO_WEAK",
  INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",

  // Network errors
  NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
  NETWORK_UNREACHABLE = "NETWORK_UNREACHABLE",
}
```

### 3. Validation System (`client/lib/validation.ts`)

```typescript
export const validationRules = {
  required: (fieldName: string): ValidationRule => ({
    test: (value: any) =>
      value !== null &&
      value !== undefined &&
      value.toString().trim().length > 0,
    message: `${fieldName} is required`,
    code: ErrorCode.REQUIRED_FIELD_MISSING,
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
};
```

### 4. Form Hook (`client/hooks/useForm.ts`)

```typescript
export function useForm<T extends Record<string, any>>(
  config: FormConfig<T>,
): [FormState<T>, FormActions<T>];
```

## Usage Examples

### 1. Basic Error Handling

```typescript
import { handleApiError, showErrorToast } from "../lib/errorHandling";

try {
  const response = await apiCall();
  // Handle success
} catch (error) {
  const appError = handleApiError(error, "component-name");
  showErrorToast(appError);
}
```

### 2. Form Validation

```typescript
import { useForm, validationSchemas } from "../hooks/useForm";

const [formState, formActions] = useForm({
  initialValues: { email: "", password: "" },
  validationSchema: validationSchemas.login,
  onSubmit: async (values) => {
    // Form submission logic
  },
  onError: (error) => {
    showErrorToast(error);
  },
});
```

### 3. Custom Validation Rules

```typescript
import { validationRules, Validator } from "../lib/validation";

const customRule = validationRules.custom(
  (value) => value.length >= 10,
  "Must be at least 10 characters long",
  ErrorCode.REQUIRED_FIELD_MISSING,
);

const result = Validator.validateField("test", "fieldName", [customRule]);
```

## Error Messages

### Password Requirements

- **Message**: "Password should have at least one uppercase letter, one lowercase letter, one digit and one special character"
- **Triggered when**: Password doesn't meet complexity requirements

### Email Already Exists

- **Message**: "An account with this email already exists"
- **Triggered when**: User tries to sign up with existing email

### Invalid Credentials

- **Message**: "Invalid credentials. Please check your email and password"
- **Triggered when**: Login fails due to wrong credentials

## Best Practices

1. **Always use the error handling system** instead of console.log or alert
2. **Provide context** when calling handleApiError (component/function name)
3. **Use predefined validation schemas** when possible
4. **Show user-friendly messages** instead of technical error details
5. **Log errors for debugging** using the built-in logging system

## Integration Points

- **AuthContext**: Handles authentication errors
- **SignUp/Login forms**: Use validation and error display
- **API calls**: Automatic error categorization
- **Toast notifications**: User-friendly error display
- **Form validation**: Real-time field validation

## Future Enhancements

- [ ] Internationalization support for error messages
- [ ] Error reporting to external services
- [ ] Retry mechanisms for network errors
- [ ] Error analytics and monitoring
- [ ] Custom error boundaries for React components
