// client/lib/GoogleAuth.ts
// Handles Google authentication

import { AUTH_ENDPOINTS } from "./ApiConfig";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "923742670068-5rtjnhb87r74bp67hm6ei7a2d7ghpvcf.apps.googleusercontent.com";

const DEBUG = !!import.meta.env.DEV;

// Google types are defined in vite-env.d.ts

/**
 * Signs the user out from Google
 */
export function signOutFromGoogle() {
  try {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
      if (DEBUG) console.log("[GSI] Google auto sign-in disabled.");
    }
  } catch (error) {
    console.error("Error signing out from Google:", error);
  }
}

/**
 * Sends the ID token to your backend for verification and user creation/login.
 * @param idToken - The JWT received from Google.
 * @returns The user data from your backend.
 */
export async function authenticateWithBackend(idToken: string): Promise<any> {
  if (DEBUG)
    console.log(
      "[Auth→Backend] Sending id_token to",
      AUTH_ENDPOINTS.GOOGLE_AUTH,
    );

  try {
    const response = await fetch(AUTH_ENDPOINTS.GOOGLE_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (DEBUG)
        console.warn("[Auth→Backend] Direct API call failed:", errorText);
      // Fallback to proxy if direct call fails
      return authenticateWithProxy(idToken);
    }

    return await response.json();
  } catch (e) {
    if (DEBUG)
      console.warn(
        "[Auth→Backend] Direct API call threw error, falling back to proxy:",
        e,
      );
    return authenticateWithProxy(idToken);
  }
}

async function authenticateWithProxy(idToken: string): Promise<any> {
  if (DEBUG) console.log("[Auth→Backend] Attempting fallback proxy request");
  const response = await fetch(AUTH_ENDPOINTS.GOOGLE_AUTH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Auth→Backend] Proxy request failed:", errorText);
    throw new Error(errorText);
  }

  return await response.json();
}
