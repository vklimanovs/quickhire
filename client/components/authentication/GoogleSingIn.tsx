import React, { useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { AUTH_ENDPOINTS } from "../../lib/ApiConfig";
import { useAuth } from "../../lib/AuthContext";

/**
 * FUTURE BACKEND STRUCTURE (when backend adds role fields):
 *
 * The /auth/v1/account endpoint should return:
 * {
 *   "firstName": "Vladislavs",
 *   "lastName": "Kļimanovs",
 *   "email": "vladislavs@gmail.com",
 *   "emailVerified": true,
 *   "hasSelectedRole": true,           // ← NEW: Has user chosen freelance/client?
 *   "selectedRole": "freelance",       // ← NEW: Which role did they choose?
 *   "availableRoles": ["freelance", "client"], // ← NEW: What roles can they access?
 *   "canSwitchRoles": true,            // ← NEW: Can they change roles later?
 *   "roleSwitchCooldown": null        // ← NEW: Any cooldown for role switching?
 * }
 *
 * This allows:
 * 1. Users to have multiple roles but one active role
 * 2. Role switching without re-authentication
 * 3. Backend to control role permissions and switching rules
 * 4. Consistent role state across all auth methods
 */

interface GoogleSignInProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onNewUser?: (userData: any) => void; // For new users who need role selection
}

export default function GoogleSignIn({
  onSuccess,
  onError,
  onNewUser,
}: GoogleSignInProps) {
  const { currentLanguage } = useLanguage();
  const { authenticateWithGoogleData } = useAuth();

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Google Sign-In
      if (window.google) {
        console.log("Google script loaded, initializing...");

        const clientId =
          import.meta.env.VITE_GOOGLE_CLIENT_ID ||
          "923742670068-5rtjnhb87r74bp67hm6ei7a2d7ghpvcf.apps.googleusercontent.com";

        console.log("Using client ID:", clientId);

        (window.google.accounts.id as any).initialize({
          client_id: clientId,
          callback: handleGoogleCredential,
        });

        // Render the sign-in button
        (window.google.accounts.id as any).renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "continue_with",
            width: 300,
          },
        );
      }
    };

    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleGoogleCredential = async (response: any) => {
    try {
      console.log("=== FRONTEND GOOGLE AUTH DEBUG ===");
      console.log("Full Google response:", response);
      console.log(
        "Google credential:",
        response.credential
          ? response.credential.substring(0, 100) + "..."
          : "NO CREDENTIAL",
      );
      console.log(
        "Credential length:",
        response.credential ? response.credential.length : 0,
      );

      // Send the ID token to your backend
      const requestBody = { idToken: response.credential };
      console.log("Sending to backend:", requestBody);
      console.log("Request URL:", AUTH_ENDPOINTS.GOOGLE_AUTH);
      console.log("Request method: POST");
      console.log("Request headers:", {
        "Content-Type": "application/json",
      });

      const res = await fetch(AUTH_ENDPOINTS.GOOGLE_AUTH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", res.status);
      console.log(
        "Response headers:",
        Object.fromEntries(res.headers.entries()),
      );

      const responseText = await res.text();
      console.log("Raw response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed response data:", data);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        data = { error: responseText };
      }

      if (res.ok) {
        console.log("Backend response (success):", data);

        // Now check if user already exists by calling /account endpoint
        try {
          const accountRes = await fetch(`${AUTH_ENDPOINTS.ACCOUNT_INFO}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access}`,
              Accept: "application/json",
            },
          });

          if (accountRes.ok) {
            // User exists - check if they've selected a role
            const accountData = await accountRes.json();
            console.log("Existing user found:", accountData);

            // FUTURE: Backend will provide these fields
            // For now, we'll use localStorage as fallback
            const backendHasSelectedRole = accountData.hasSelectedRole; // Future backend field
            const backendSelectedRole = accountData.selectedRole; // Future backend field
            const backendAvailableRoles = accountData.availableRoles; // Future backend field

            // Current localStorage fallback
            const storedType = localStorage.getItem("selected_account_type");
            const localStorageHasSelectedRole =
              storedType &&
              (storedType === "provider" || storedType === "customer");

            // Determine if user has selected a role (backend takes priority, localStorage as fallback)
            const hasSelectedRole =
              backendHasSelectedRole ?? localStorageHasSelectedRole;
            const selectedRole = backendSelectedRole ?? storedType;

            console.log("Role selection status:", {
              backendHasSelectedRole,
              backendSelectedRole,
              backendAvailableRoles,
              localStorageHasSelectedRole,
              storedType,
              hasSelectedRole,
              selectedRole,
            });

            if (!hasSelectedRole) {
              // User exists but hasn't chosen role - show role selection
              console.log(
                "User exists but no role selected, showing role selection",
              );
              if (onNewUser) {
                onNewUser(data);
              }
              return;
            }

            // User exists AND has chosen role - auto-login
            console.log(
              "User exists and has role, auto-login as:",
              selectedRole,
            );

            // Convert stored role to internal role format
            let userRole: "freelance" | "client" = "client";
            if (selectedRole === "provider") {
              userRole = "freelance";
            } else if (selectedRole === "customer") {
              userRole = "client";
            }

            // Merge Google data with account data
            const completeUserData = {
              ...data,
              ...accountData,
              email: accountData.email || data.email,
              firstName: accountData.firstName || data.firstName,
              lastName: accountData.lastName || data.lastName,
              emailVerified: accountData.emailVerified || data.emailVerified,
              // Future: Include role information from backend
              hasSelectedRole: backendHasSelectedRole ?? hasSelectedRole,
              selectedRole: backendSelectedRole ?? selectedRole,
              availableRoles: backendAvailableRoles || ["freelance", "client"], // Default fallback
            };

            // Authenticate the existing user
            authenticateWithGoogleData(completeUserData, userRole);

            if (onSuccess) {
              onSuccess(completeUserData);
            }
          } else {
            // User doesn't exist - show role selection for new user
            console.log(
              "New user detected (account endpoint returned error), showing role selection",
            );
            if (onNewUser) {
              onNewUser(data);
            }
          }
        } catch (accountError) {
          console.error("Error checking account:", accountError);
          // If account check fails, treat as new user
          console.log("Account check failed, treating as new user");
          if (onNewUser) {
            onNewUser(data);
          }
        }
      } else {
        console.error("Backend error response:", data);
        console.error("Response status:", res.status);
        console.error("Response URL:", res.url);
        if (onError) {
          onError(data);
        } else {
          alert("Login failed: " + (data.error || "Unknown error"));
        }
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
      if (onError) {
        onError(error);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div>
      <div id="google-signin-button"></div>
      <noscript>
        <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
          {currentLanguage === "ru"
            ? "Включите JavaScript для входа через Google"
            : currentLanguage === "en"
              ? "Enable JavaScript to sign in with Google"
              : "Lubage JavaScript Google'iga sisselogimiseks"}
        </p>
      </noscript>
    </div>
  );
}
