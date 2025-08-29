import {
  ensureAccessToken,
  getRefreshToken,
  getAuthHeaders as buildAuthHeaders,
  refreshTokens,
} from "./TokenManager";
import { API_BASE_URL, AUTH_ENDPOINTS } from "./ApiConfig";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface RequestOptions<TRequest> {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string; // must be a PATH from AUTH_ENDPOINTS (not a full URL)
  body?: TRequest | FormData;
  tokenType?: "access" | "refresh";
  requiresAuth?: boolean;
  headers?: Record<string, string>;
  credentials?: "include" | "omit";
}

const buildUrl = (endpoint: string): string =>
  /^https?:\/\//i.test(endpoint) ? endpoint : `${API_BASE_URL}${endpoint}`;

const readJsonSafe = async (res: Response): Promise<any | null> => {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const createHeaders = (
  tokenType: "access" | "refresh" | undefined,
  body?: unknown,
  extra?: Record<string, string>,
): HeadersInit => {
  const base = tokenType
    ? buildAuthHeaders(tokenType, body)
    : { Accept: "application/json" };
  if (body instanceof FormData) {
    const { ["Content-Type"]: _drop, ...withoutContentType } = base as Record<
      string,
      string
    >;
    return { ...withoutContentType, ...(extra || {}) };
  }
  return { ...base, ...(extra || {}) };
};

async function apiRequest<TRequest, TResponse>(
  options: RequestOptions<TRequest>,
): Promise<ApiResponse<TResponse>> {
  const {
    method,
    endpoint,
    body,
    tokenType = "access",
    requiresAuth = true,
    headers: extraHeaders,
  } = options;

  // Ensure tokens (once) before request
  if (requiresAuth) {
    if (tokenType === "access") {
      const token = await ensureAccessToken();
      if (!token) {
        return {
          data: null,
          error: "Authentication required. Please log in again.",
          status: 401,
        };
      }
    } else if (tokenType === "refresh") {
      const hasRefresh = getRefreshToken();
      if (!hasRefresh) {
        return {
          data: null,
          error: "Session expired. Please log in again.",
          status: 401,
        };
      }
    }
  }

  const url = buildUrl(endpoint);
  const headers = createHeaders(
    requiresAuth ? tokenType : undefined,
    body,
    extraHeaders,
  );

  const make = () =>
    fetch(url, {
      method,
      headers,
      body:
        body instanceof FormData
          ? body
          : body
            ? JSON.stringify(body)
            : undefined,
    });

  let res: Response;
  try {
    res = await make();
  } catch (e: any) {
    return {
      data: null,
      error: `Request failed: ${e?.message || e}`,
      status: 0,
    };
  }

  // One 401 retry path for access-token requests
  if (requiresAuth && tokenType === "access" && res.status === 401) {
    const refreshed = await refreshTokens();
    if (!refreshed) {
      return {
        data: null,
        error: "Authentication required. Please log in again.",
        status: 401,
      };
    }
    try {
      res = await fetch(url, {
        method,
        headers: createHeaders("access", body, extraHeaders),
        body:
          body instanceof FormData
            ? body
            : body
              ? JSON.stringify(body)
              : undefined,
      });
    } catch (e: any) {
      return {
        data: null,
        error: `Request failed: ${e?.message || e}`,
        status: 0,
      };
    }
  }

  if (res.status === 204) return { data: null, error: null, status: 204 };

  const payload = await readJsonSafe(res);
  if (!res.ok) {
    let errorText = `HTTP error ${res.status}`;

    // Handle different error response formats
    if (payload) {
      if (typeof payload === "string") {
        // Handle string error responses like "account with this email already exist"
        errorText = payload;
      } else if (payload.error) {
        errorText = payload.error;
      } else if (payload.message) {
        errorText = payload.message;
      }
    }

    return { data: null, error: errorText, status: res.status };
  }
  return { data: payload as TResponse, error: null, status: res.status };
}

/** Auth API surface */
const authApi = {
  login: (email: string, password: string) =>
    apiRequest<any, any>({
      method: "POST",
      endpoint: AUTH_ENDPOINTS.LOGIN,
      body: { email, password },
      requiresAuth: false,
    }),

  signup: (userData: any) =>
    apiRequest<any, any>({
      method: "POST",
      endpoint: AUTH_ENDPOINTS.SIGNUP,
      body: userData,
      requiresAuth: false,
    }),

  logout: () =>
    apiRequest<null, any>({
      method: "GET",
      endpoint: AUTH_ENDPOINTS.LOGOUT,
      tokenType: "refresh",
      requiresAuth: true,
    }),

  deleteAccount: (password: string) =>
    apiRequest<{ password: string }, any>({
      method: "DELETE",
      endpoint: AUTH_ENDPOINTS.DELETE_ACCOUNT,
      body: { password },
      tokenType: "refresh",
      requiresAuth: true,
    }),

  getAccountInfo: () =>
    apiRequest<null, any>({
      method: "GET",
      endpoint: AUTH_ENDPOINTS.ACCOUNT_INFO,
      tokenType: "access",
      requiresAuth: true,
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest<{ currentPassword: string; newPassword: string }, any>({
      method: "PUT",
      endpoint: AUTH_ENDPOINTS.CHANGE_PASSWORD,
      body: { currentPassword, newPassword },
      tokenType: "access",
      requiresAuth: true,
    }),

  forgotPassword: (email: string, type: "email" | "otp") =>
    apiRequest<{ email: string; type: string }, any>({
      method: "GET",
      endpoint: `${AUTH_ENDPOINTS.FORGOT_PASSWORD}?email=${encodeURIComponent(email)}&type=${type}`,
      requiresAuth: false,
    }),

  loginWithGoogle: (idToken: string) =>
    apiRequest<{ idToken: string }, any>({
      method: "POST",
      endpoint: AUTH_ENDPOINTS.GOOGLE_AUTH,
      body: { idToken },
      requiresAuth: false,
    }),

  updateEmail: (newEmail: string) =>
    apiRequest<{ email: string }, any>({
      method: "PUT",
      endpoint: AUTH_ENDPOINTS.UPDATE_EMAIL,
      body: { email: newEmail },
      tokenType: "access",
      requiresAuth: true,
    }),

  updateProfilePhoto: (photoData: string) =>
    apiRequest<{ photo: string }, any>({
      method: "PUT",
      endpoint: AUTH_ENDPOINTS.UPDATE_PROFILE_PHOTO,
      body: { photo: photoData },
      tokenType: "access",
      requiresAuth: true,
    }),
};

export const AuthApi = {
  login: (email: string, password: string) => authApi.login(email, password),
  signup: (userData: any) => authApi.signup(userData),
  logout: () => authApi.logout(),
  deleteAccount: (password: string) => authApi.deleteAccount(password),
  getAccountInfo: () => authApi.getAccountInfo(),
  changePassword: (current: string, newPass: string) =>
    authApi.changePassword(current, newPass),
  forgotPassword: (email: string, type: "email" | "otp") =>
    authApi.forgotPassword(email, type),
  loginWithGoogle: (idToken: string) => authApi.loginWithGoogle(idToken),
  updateEmail: (newEmail: string) => authApi.updateEmail(newEmail),
  updateProfilePhoto: (photoData: string) =>
    authApi.updateProfilePhoto(photoData),
};
