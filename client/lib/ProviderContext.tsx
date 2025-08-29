import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import { AuthApi } from "./ApiClient";
import { LanguageSkill } from "../Types";

export interface Provider {
  id: string;
  name: string;
  photo: string;
  memberSince: string;
  phone: string;
  headline: string;
  location: string;
  bio: string;
  status: "available" | "busy" | "inactive";
  availability: { state: "available" | "busy" | "inactive" };
  rating: number;
  reviewCount: number;
  completedTasks: number;
  consultationsDelivered: number;
  languages: string[];
  languageSkills: LanguageSkill[];
  skills: string[];
  website?: string;
  linkedin?: string;
  availableForConsultations: boolean;
  company?: string;
}

export interface ProviderStats {
  totalTasks: number;
  consultations: number;
  rating: number;
  reviews: number;
  tasksInProgress: number;
  upcomingConsultations: number;
  pendingProposals: number;
}

export interface ProviderActivity {
  id: number;
  type:
    | "task_completed"
    | "consultation_delivered"
    | "review_received"
    | "status_changed";
  title: string;
  time: string;
  amount?: string;
  status?: string;
}

interface ProviderContextType {
  provider: Provider | null;
  stats: ProviderStats | null;
  recentActivity: ProviderActivity[];
  updateProvider: (updates: Partial<Provider>) => void;
  updateProviderStatus: (status: Provider["status"]) => void;
  refreshProviderData: () => Promise<void>;
  isLoading: boolean;
}

const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined,
);

export function ProviderProvider({ children }: { children: React.ReactNode }) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const [provider, setProvider] = useState<Provider | null>(null);
  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<ProviderActivity[]>([]);

  // Request deduplication - prevent multiple simultaneous API calls
  const requestInProgress = useRef(false);
  const lastRequestKey = useRef<string>("");

  // Stable toast function reference
  const showErrorToast = useCallback(
    (message: string) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
    [toast],
  );

  // Function to load provider data from the backend API
  const loadProviderData = useCallback(async () => {
    // Only load data for authenticated provider users
    if (!isAuthenticated || !user || user.accountType !== "provider") {
      setProvider(null);
      setStats(null);
      setRecentActivity([]);
      setIsLoading(false);
      // Reset request tracking when user changes
      requestInProgress.current = false;
      lastRequestKey.current = "";
      return;
    }

    // Create a unique key for this request
    const requestKey = `provider_${user.id}_${user.accountType}_${user.isEmailVerified}`;

    // Prevent duplicate requests - also check if we already have data
    if (
      requestInProgress.current ||
      lastRequestKey.current === requestKey ||
      (provider && stats)
    ) {
      console.log(
        `🚫 ProviderContext: Blocked duplicate request for ${requestKey}`,
        requestInProgress.current
          ? "(request in progress)"
          : lastRequestKey.current === requestKey
            ? "(same request key)"
            : "(data already loaded)",
      );
      return;
    }

    console.log(`✅ ProviderContext: Starting request for ${requestKey}`);
    requestInProgress.current = true;
    lastRequestKey.current = requestKey;

    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.getAccountInfo();

      if (error || !data) {
        throw new Error(error || "Failed to fetch provider data from API");
      }

      // Map the API response from /auth/v1/account to our Provider interface
      const providerData: Provider = {
        id: user.id,
        name:
          `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
          user.firstName,
        photo:
          data.avatarUrl ||
          data.profileImage ||
          "https://avatar.vercel.sh/provider.png?size=150",
        memberSince: data.createdAt
          ? new Date(data.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            })
          : "",
        phone: data.phoneNumbers?.[0] || "",
        // --- Fields below are not in /account and will be empty until their API endpoints are integrated ---
        headline: data.headline || "",
        location: data.location || "",
        bio: data.bio || "",
        status: "available", // Default value
        availability: { state: "available" },
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        completedTasks: 0,
        consultationsDelivered: 0,
        languages: data.languages || [],
        languageSkills: data.languageSkills || [],
        skills: data.skills || [],
        website: data.website,
        linkedin: data.linkedin,
        availableForConsultations: true, // Default value
        company: data.company,
      };
      setProvider(providerData);

      // Stats and activity will be empty until their API endpoints are integrated
      setStats({
        totalTasks: 0,
        consultations: 0,
        rating: 0,
        reviews: 0,
        tasksInProgress: 0,
        upcomingConsultations: 0,
        pendingProposals: 0,
      });
      setRecentActivity([]);

      console.log("ProviderContext: Data loaded from API", {
        emailVerified: data.emailVerified,
      });
    } catch (err) {
      console.error("Failed to load provider data:", err);
      showErrorToast("Could not load your profile data.");
      setProvider(null);
      setStats(null);
      setRecentActivity([]);
    } finally {
      setIsLoading(false);
      requestInProgress.current = false;
    }
  }, [isAuthenticated, user, showErrorToast, provider, stats]);

  // Load provider data when auth state changes
  useEffect(() => {
    // Early return if user is not a provider - don't make API calls
    if (!isAuthenticated || !user || user.accountType !== "provider") {
      setIsLoading(false);
      return;
    }

    loadProviderData();

    // Cleanup function to reset request tracking when user changes
    return () => {
      requestInProgress.current = false;
      lastRequestKey.current = "";
    };
  }, [loadProviderData]);

  // Remove the redundant event listener that was causing duplicate API calls
  // The loadProviderData function already handles user data changes through the useCallback dependency

  // The functions below are now placeholders. In a real app, they would make API calls.
  const updateProviderStatus = useCallback(
    (status: Provider["status"]) => {
      if (!provider) return;
      const updatedProvider = {
        ...provider,
        status,
        availability: { state: status },
      };
      setProvider(updatedProvider);
      toast({
        title: "Status Updated",
        description: `Your status is now ${status}.`,
      });
    },
    [provider, toast],
  );

  const updateProvider = useCallback(
    (updates: Partial<Provider>) => {
      if (!provider) return;
      setProvider((prev) => (prev ? { ...prev, ...updates } : null));
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated.",
      });
    },
    [provider, toast],
  );

  return (
    <ProviderContext.Provider
      value={{
        provider,
        stats,
        recentActivity,
        updateProvider,
        updateProviderStatus,
        refreshProviderData: loadProviderData,
        isLoading,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error("useProvider must be used within a ProviderProvider");
  }
  return context;
}
