/** @refresh reset */
/**
 * FUTURE BACKEND ROLE MANAGEMENT:
 *
 * When backend adds role fields to /auth/v1/account, this context will:
 *
 * 1. Use backend as source of truth for:
 *    - hasSelectedRole: boolean
 *    - selectedRole: "freelance" | "client" | null
 *    - availableRoles: string[]
 *    - canSwitchRoles: boolean
 *    - roleSwitchCooldown: string | null
 *
 * 2. Handle role switching via backend API:
 *    - POST /auth/v1/account/switch-role { role: "freelance" | "client" }
 *    - Backend validates permissions and updates active role
 *    - Frontend refreshes user data to get updated role state
 *
 * 3. Maintain backward compatibility with current localStorage approach
 *    - localStorage.selected_account_type as fallback
 *    - Gradual migration to backend-driven role management
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { signOutFromGoogle } from "./GoogleAuth";
import { storeTokens, clearTokens } from "./TokenManager";
import { AuthApi } from "./ApiClient";
import { AUTH_ENDPOINTS } from "./ApiConfig";
import { User } from "../Types";
import { useToast } from "../hooks/use-toast";
import Cookies from "js-cookie";
import {
  errorHandler,
  handleApiError,
  showErrorToast,
  showSuccessToast,
} from "./errorHandling";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  loginWithGoogle: (
    accountType?: "provider" | "customer",
    idToken?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  verifyEmail: (key: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  switchRole: (role: "provider" | "customer") => Promise<void>;
  addProviderRole: () => Promise<void>;
  addClientRole: () => Promise<void>;
  hasRole: (role: "provider" | "customer") => boolean;
  updateUser: (userData: Partial<User>) => void;
  refreshUserData: () => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  updateProfilePhoto: (photoData: string) => Promise<void>;
  setCurrentProfilePhoto: (photoData: string) => void;
  getAuthHeaders: () => Record<string, string>;
  authenticateWithGoogleData: (
    userData: any,
    role: "freelance" | "client",
  ) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();

  // Initialize user data from API instead of localStorage
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Check if we have tokens (user is logged in)
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");

        if (accessToken && refreshToken) {
          // User has tokens, fetch fresh data from API
          await refreshUserData();
        }
      } catch (error) {
        console.error("Failed to initialize user data:", error);
        // Clear invalid tokens
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Remove the custom event dispatch that was causing redundant API calls
  // useEffect(() => {
  //   if (user) {
  //     // Dispatch a custom event when user data changes
  //     const event = new CustomEvent("userDataChanged", { detail: user });
  //     window.dispatchEvent(event);
  //   }
  // }, [user?.isEmailVerified, user?.email, user?.firstName, user?.lastName]);

  const goToDashboard = (accountType: "provider" | "customer") =>
    navigate(`/${currentLanguage}/dashboard/${accountType}`);

  const getAuthHeaders = (): Record<string, string> => {
    const accessToken = Cookies.get("access_token");
    return accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" };
  };

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.login(email, password);
      if (error || !data) {
        const appError = handleApiError(
          {
            response: {
              status: 401,
              data: { message: error || "Login failed" },
            },
          },
          "login",
        );
        showErrorToast(appError);
        throw new Error(appError.message);
      }

      storeTokens(data);

      const u: User = {
        id: data.id || "",
        email: data.email || email,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        accountType: "customer",
        roles: {
          isFreelance: true, // Allow both roles for switching
          isClient: true, // Allow both roles for switching
        },
        isEmailVerified: data.emailVerified || false,
        isPasswordSet: data.isPasswordSet ?? true, // Login means password is set
        profileImage: data.profileImage || data.avatarUrl || data.photo || "",
      };

      // Set account type based on available roles
      if (u.roles.isFreelance && !u.roles.isClient) {
        u.accountType = "provider";
      } else if (u.roles.isClient && !u.roles.isFreelance) {
        u.accountType = "customer";
      } else if (u.roles.isClient && u.roles.isFreelance) {
        // Both roles - check if there's a stored preference
        const storedType = localStorage.getItem("selected_account_type");
        u.accountType = (storedType as "provider" | "customer") || "customer";
      }

      if (data.createdAt) {
        localStorage.setItem(
          "user_profile_data",
          JSON.stringify({
            createdAt: data.createdAt,
            updatedAt: data.updatedAt || data.createdAt,
          }),
        );
      }

      setUser(u);
      // Don't store user in localStorage - API is source of truth
      if (rememberMe) localStorage.setItem("quickhire_remember", "true");
      else localStorage.removeItem("quickhire_remember");

      showSuccessToast("Login successful!");
      goToDashboard(u.accountType);
    } catch (error) {
      // Error is already handled above
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.signup(userData);
      if (error || !data) {
        // Check if it's an email already exists error
        if (error?.includes("already exists") || error?.includes("email")) {
          throw new Error("An account with this email already exists!");
        }
        throw new Error(error || "Signup failed");
      }

      storeTokens(data);

      const u: User = {
        id: data.id || "",
        email: data.email || userData.email,
        firstName: data.firstName || userData.firstName,
        lastName: data.lastName || userData.lastName,
        accountType: userData.accountType || "customer",
        roles: {
          isFreelance: true, // Always allow freelance role for switching
          isClient: true, // Always allow client role for switching
        },
        isEmailVerified: data.emailVerified || false,
        isPasswordSet: data.isPasswordSet ?? true, // Signup means password is set
        profileImage: data.profileImage || data.avatarUrl || data.photo || "",
      };

      if (data.createdAt) {
        localStorage.setItem(
          "user_profile_data",
          JSON.stringify({
            createdAt: data.createdAt,
            updatedAt: data.updatedAt || data.createdAt,
          }),
        );
      }

      setUser(u);
      // Don't store user in localStorage - API is source of truth
      localStorage.setItem("selected_account_type", u.accountType);

      showSuccessToast("Account created successfully!");
      goToDashboard(u.accountType);
    } catch (error: any) {
      // Re-throw the error so the component can handle it
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (
    accountType?: "provider" | "customer",
    idToken?: string,
  ) => {
    setIsLoading(true);
    try {
      const token = idToken ?? localStorage.getItem("google_id_token");
      if (!token) throw new Error("No Google ID token found");

      const { data, error } = await AuthApi.loginWithGoogle(token);
      if (error || !data) throw new Error(error || "Google login failed");

      storeTokens(data);

      // Set roles based on account type choice
      const roles = {
        isFreelance: true, // Always allow freelance role for switching
        isClient: true, // Always allow client role for switching
      };

      // If no specific account type chosen, default to client
      const defaultAccountType =
        accountType || (data.roles?.isFreelance ? "provider" : "customer");

      const u: User = {
        id: data.id || "",
        email: data.email || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        accountType: defaultAccountType,
        roles,
        isEmailVerified: data.emailVerified ?? true,
        isPasswordSet: data.isPasswordSet ?? false, // Google login may not have password
        profileImage: data.profileImage || data.avatarUrl || data.photo || "",
      };

      if (data.createdAt) {
        localStorage.setItem(
          "user_profile_data",
          JSON.stringify({
            createdAt: data.createdAt,
            updatedAt: data.updatedAt ?? data.createdAt,
          }),
        );
      }

      setUser(u);
      // Don't store user in localStorage - API is source of truth
      localStorage.setItem("selected_account_type", u.accountType);

      goToDashboard(u.accountType);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (key: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${AUTH_ENDPOINTS.VERIFY_EMAIL}?key=${key}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());

      // After verification, refresh user data from API to get the latest info
      await refreshUserData();

      if (user) {
        goToDashboard(user.accountType);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    if (!user) throw new Error("User not authenticated");
    setIsLoading(true);
    try {
      const res = await fetch(AUTH_ENDPOINTS.RESEND_VERIFICATION, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());

      // Show success toast instead of alert
      const successMessage =
        currentLanguage === "ru"
          ? "Ссылка для подтверждения отправлена. Проверьте вашу почту."
          : currentLanguage === "en"
            ? "Verification link sent. Check your inbox."
            : "Kinnitamise link saadetud. Kontrollige oma e-postkasti.";

      toast({
        title: "Success",
        description: successMessage,
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to resend verification email:", error);

      // Show error toast
      const errorMessage =
        currentLanguage === "ru"
          ? "Не удалось отправить ссылку для подтверждения. Попробуйте снова."
          : currentLanguage === "en"
            ? "Could not send verification link. Try again."
            : "Kinnitamise linki ei saanud saata. Proovige uuesti.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const performClientSideLogout = () => {
    setUser(null);
    clearTokens();
    // Remove all localStorage items except essential preferences
    localStorage.removeItem("quickhire_remember");
    localStorage.removeItem("user_profile_data");
    localStorage.removeItem("customer_profile");
    localStorage.removeItem("provider_profile");
    localStorage.removeItem("google_id_token");
    localStorage.removeItem("selected_account_type");
    navigate(`/${currentLanguage}/`);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthApi.logout();
    } finally {
      signOutFromGoogle();
      performClientSideLogout();
      setIsLoading(false);
    }
  };

  const switchRole = async (role: "provider" | "customer") => {
    if (!user) return;

    // FUTURE: Backend will handle role switching and permissions
    // For now, automatically grant roles as needed and update local state
    const updated = {
      ...user,
      accountType: role,
      roles: {
        ...user.roles,
        // Grant the role if they don't have it
        isFreelance: role === "provider" ? true : user.roles.isFreelance,
        isClient: role === "customer" ? true : user.roles.isClient,
      },
    };
    setUser(updated);

    // Store role preference in localStorage (will be replaced by backend)
    localStorage.setItem("selected_account_type", role);

    // FUTURE: Call backend to update active role
    // try {
    //   await AuthApi.updateActiveRole(role);
    //   console.log(`Role switched to ${role} on backend`);
    // } catch (error) {
    //   console.error(`Failed to update role on backend:`, error);
    //   // Could revert local change if backend fails
    // }

    goToDashboard(role);
  };

  const addProviderRole = async () => {
    if (!user) return;
    const updated = {
      ...user,
      roles: { ...user.roles, isFreelance: true },
      accountType: "provider" as const,
    };
    setUser(updated);
    // Don't store user in localStorage - API is source of truth
    localStorage.setItem("selected_account_type", "provider");
    localStorage.setItem("require_profile_completion", "true");
    goToDashboard("provider");
  };

  const addClientRole = async () => {
    if (!user) return;
    const updated = {
      ...user,
      roles: { ...user.roles, isClient: true },
    };
    setUser(updated);
    // Don't store user in localStorage - API is source of truth
  };

  const hasRole = (role: "provider" | "customer") =>
    !!user &&
    (role === "provider" ? user.roles.isFreelance : user.roles.isClient);

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...userData };
    setUser(updated);
    // Don't store user in localStorage - API is source of truth
  };

  // Function to refresh user data from API - this is now the single source of truth
  const refreshUserData = async () => {
    try {
      const { data, error } = await AuthApi.getAccountInfo();
      if (error || !data) {
        console.error("Failed to refresh user data:", error);
        return;
      }

      // Create user object from API response
      const apiUser: User = {
        id: data.id || "",
        email: data.email || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        accountType: user?.accountType || "customer", // Preserve current account type if available
        roles: {
          isFreelance: data.roles?.isFreelance || false,
          isClient: data.roles?.isClient || false,
        },
        isEmailVerified: data.emailVerified || false,
        isPasswordSet: data.isPasswordSet ?? false, // If missing, treat as false
        profileImage: data.profileImage || data.avatarUrl || data.photo || "",
      };

      // Set account type based on available roles if not already set
      if (
        !apiUser.accountType ||
        (apiUser.roles.isFreelance && apiUser.roles.isClient)
      ) {
        const storedType = localStorage.getItem("selected_account_type");
        apiUser.accountType =
          (storedType as "provider" | "customer") || "customer";
      } else if (apiUser.roles.isFreelance && !apiUser.roles.isClient) {
        apiUser.accountType = "provider";
      } else if (apiUser.roles.isClient && !apiUser.roles.isFreelance) {
        apiUser.accountType = "customer";
      }

      setUser(apiUser);
      console.log("User data refreshed from API", apiUser);
    } catch (err) {
      console.error("Error refreshing user data:", err);
    }
  };

  // Function to update user email and trigger verification
  const updateEmail = async (newEmail: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.updateEmail(newEmail);
      if (error) {
        throw new Error(error);
      }

      // Update user with new email but mark as unverified
      const updatedUser: User = {
        ...user,
        email: newEmail,
        isEmailVerified: false, // New email needs verification
      };

      setUser(updatedUser);
      // Don't store user in localStorage - API is source of truth

      console.log("Email updated successfully, verification required");
    } catch (err) {
      console.error("Error updating email:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithGoogleData = (
    userData: any,
    role: "freelance" | "client",
  ) => {
    // Map roles to dashboard types
    const accountTypeMap = { client: "customer", freelance: "provider" };
    const dashboardType = accountTypeMap[role];

    // Create user object
    const u: User = {
      id: (() => {
        // (unchanged) extract id from JWT if you need it
        try {
          const base64Url = userData.access.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join(""),
          );
          const payload = JSON.parse(jsonPayload);
          return payload.id || "temp_id";
        } catch {
          return "temp_id";
        }
      })(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      accountType: dashboardType as "customer" | "provider",
      roles: {
        isFreelance: role === "freelance",
        isClient: role === "client",
      },
      isEmailVerified: userData.emailVerified ?? true,
      isPasswordSet: userData.isPasswordSet ?? false, // Google auth may not have password
      profileImage: userData.avatarUrl || "",
    };

    // ✅ DO THIS: write via TokenManager so *_expires keys are set
    // works whether access/refresh are strings OR { token, expires }
    storeTokens({
      access: userData.access,
      refresh: userData.refresh,
    });

    // Keep your preference key
    localStorage.setItem("selected_account_type", dashboardType);

    // Update state - don't cache user in localStorage
    setUser(u);

    console.log("AuthContext: User authenticated successfully:", u);
  };

  const updateProfilePhoto = async (photoData: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.updateProfilePhoto(photoData);
      if (error) {
        throw new Error(error);
      }

      // Update user with new profile photo
      const updatedUser: User = {
        ...user,
        profileImage: photoData,
      };

      setUser(updatedUser);
      // Don't store user in localStorage - API is source of truth

      console.log("Profile photo updated successfully");
    } catch (err) {
      console.error("Error updating profile photo:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrentProfilePhoto = (photoData: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    const updatedUser = { ...user, profileImage: photoData };
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    loginWithGoogle,
    logout,
    deleteAccount: async (password: string) => {
      setIsLoading(true);
      try {
        const { error } = await AuthApi.deleteAccount(password);
        if (error) throw new Error(error);
        signOutFromGoogle();
        performClientSideLogout();
      } finally {
        setIsLoading(false);
      }
    },
    verifyEmail,
    resendVerificationEmail,
    switchRole,
    addProviderRole,
    addClientRole,
    hasRole,
    updateUser,
    refreshUserData,
    updateEmail,
    updateProfilePhoto,
    setCurrentProfilePhoto,
    getAuthHeaders,
    authenticateWithGoogleData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
