// Authentication-related type definitions

export interface TokenData {
  token: string;
  expires: string;
}

export interface TokensResponse {
  access?: {
    token: string;
    expires: string;
  };
  refresh?: {
    token: string;
    expires: string;
  };
}

export interface RequestOptions<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  body?: T;
  tokenType?: "access" | "refresh";
  requiresAuth?: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}
