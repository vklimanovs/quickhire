import { AUTH_ENDPOINTS } from "./ApiConfig";
import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "access_token";
export const ACCESS_TOKEN_EXPIRES_KEY = "access_token_expires";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const REFRESH_TOKEN_EXPIRES_KEY = "refresh_token_expires";

type TokenLike =
  | string
  | {
      token: string;
      expires?: string | number | Date;
    };

type AnyTokens = {
  access?: TokenLike;
  refresh?: TokenLike;
  accessToken?: string;
  refreshToken?: string;
  access_token?: string;
  refresh_token?: string;
  tokens?: {
    access?: TokenLike;
    refresh?: TokenLike;
    accessToken?: string;
    refreshToken?: string;
  };
};

const decodeJwtPayload = (token: string): Record<string, any> | null => {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const normalizeExpiry = (
  expires: string | number | Date | undefined,
  token?: string,
): string | null => {
  if (expires instanceof Date) return expires.toISOString();

  if (typeof expires === "number") {
    const ms = expires < 10_000_000_000 ? expires * 1000 : expires;
    return new Date(ms).toISOString();
  }

  if (typeof expires === "string") {
    const numeric = Number(expires);
    if (!Number.isNaN(numeric)) return normalizeExpiry(numeric, token);
    const d = new Date(expires);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }

  if (token) {
    const payload = decodeJwtPayload(token);
    if (payload?.exp) return new Date(payload.exp * 1000).toISOString();
  }

  return null;
};

const extractTokenAndExpiry = (
  entry?: TokenLike | string,
): { token: string | null; expiresIso: string | null } => {
  if (!entry) return { token: null, expiresIso: null };
  if (typeof entry === "string") {
    return {
      token: entry,
      expiresIso: normalizeExpiry(undefined, entry),
    };
  }
  const token = entry.token ?? null;
  const expiresIso = normalizeExpiry(entry.expires, entry.token);
  return { token, expiresIso };
};

const pickTokens = (
  raw: AnyTokens | null | undefined,
): { access?: TokenLike; refresh?: TokenLike } => {
  if (!raw) return {};
  const flat: AnyTokens = { ...raw, ...(raw.tokens || {}) };
  const access =
    flat.access ?? flat.accessToken ?? flat.access_token ?? undefined;
  const refresh =
    flat.refresh ?? flat.refreshToken ?? flat.refresh_token ?? undefined;
  return { access, refresh };
};

export const storeTokens = (tokens: AnyTokens): void => {
  const { access, refresh } = pickTokens(tokens);

  const { token: accessStr, expiresIso: accessExp } =
    extractTokenAndExpiry(access);
  if (accessStr) {
    Cookies.set(ACCESS_TOKEN_KEY, accessStr, {
      secure: true,
      sameSite: "strict",
      expires: accessExp ? new Date(accessExp) : undefined,
    });
  }

  const { token: refreshStr, expiresIso: refreshExp } =
    extractTokenAndExpiry(refresh);
  if (refreshStr) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshStr, {
      secure: true,
      sameSite: "strict",
      expires: refreshExp ? new Date(refreshExp) : undefined,
    });
  }
};

export const clearTokens = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

const getTokenIfValid = (tokenKey: string): string | null => {
  const token = Cookies.get(tokenKey);
  return token;
};

export const getAccessToken = (): string | null =>
  getTokenIfValid(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null =>
  getTokenIfValid(REFRESH_TOKEN_KEY);

/** Ensure a valid access token (refresh once if needed). */
export const ensureAccessToken = async (): Promise<string | null> => {
  const current = getAccessToken();
  if (current) return current;
  const ok = await refreshTokens();
  if (!ok) return null;
  return getAccessToken();
};

/** Refresh using the refresh token — NOTE: no credentials: "include" (avoid CORS *) */
export const refreshTokens = async (): Promise<boolean> => {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const res = await fetch(AUTH_ENDPOINTS.REFRESH, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refresh}`,
        Accept: "application/json",
      },
      // DO NOT set credentials: "include" since server uses ACAO: *
    });
    if (!res.ok) return false;
    const json = await res.json();
    storeTokens(json);
    return true;
  } catch {
    return false;
  }
};

export const getAuthHeaders = (
  tokenType: "access" | "refresh",
  body?: unknown,
): Record<string, string> => {
  const token = tokenType === "access" ? getAccessToken() : getRefreshToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (!(body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};
