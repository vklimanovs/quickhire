export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://easysy:9000";

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/v1/login`,
  SIGNUP: `${API_BASE_URL}/auth/v1/account`,
  LOGOUT: `${API_BASE_URL}/auth/v1/logout`,
  DELETE_ACCOUNT: `${API_BASE_URL}/auth/v1/account`,
  ACCOUNT_INFO: `${API_BASE_URL}/auth/v1/account`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/v1/change_password`,
  GOOGLE_AUTH: `${API_BASE_URL}/auth/v1/google`,
  REFRESH: `${API_BASE_URL}/auth/v1/refresh`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/v1/verify_email`,
  RESEND_VERIFICATION: `${API_BASE_URL}/auth/v1/confirm_email`,
  UPDATE_EMAIL: `${API_BASE_URL}/auth/v1/email`,
  UPDATE_PHONE_NUMBER: `${API_BASE_URL}/auth/v1/phone_number`,
  SORT_PHONE_NUMBERS: `${API_BASE_URL}/auth/v1/phone_numbers`,
  VERIFY_PHONE_NUMBER: `${API_BASE_URL}/auth/v1/verify_phone_number`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/v1/forgot_password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/v1/reset_password`,
  UPDATE_PROFILE_PHOTO: `${API_BASE_URL}/auth/v1/profile/photo`,
} as const;
