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

export interface Customer {
  id: string;
  name: string;
  email: string;
  photo: string;
  company: string;
  phone: string;
  memberSince: string;
  totalTasksPosted: number;
  totalConsultationsBooked: number;
  totalSpent: number;
  location?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  languages?: LanguageSkill[];
}

export interface CustomerStats {
  totalTasksPosted: number;
  totalConsultationsBooked: number;
  totalSpent: number;
  activeTasks: number;
  upcomingConsultations: number;
  completedTasks: number;
}

export interface CustomerActivity {
  id: number;
  type: "task_posted" | "consultation_booked" | "payment_made" | "review_given";
  title: string;
  provider?: string;
  time: string;
  amount?: string;
  status?: string;
}

interface CustomerContextType {
  customer: Customer | null;
  stats: CustomerStats | null;
  recentActivity: CustomerActivity[];
  updateCustomer: (updates: Partial<Customer>) => void;
  refreshCustomerData: () => Promise<void>;
  isLoading: boolean;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined,
);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<CustomerActivity[]>([]);

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

  // Function to load customer data from the backend API
  const loadCustomerData = useCallback(async () => {
    // Only load data for authenticated customer users
    if (!isAuthenticated || !user || user.accountType !== "customer") {
      setCustomer(null);
      setStats(null);
      setRecentActivity([]);
      setIsLoading(false);
      // Reset request tracking when user changes
      requestInProgress.current = false;
      lastRequestKey.current = "";
      return;
    }

    // Create a unique key for this request
    const requestKey = `customer_${user.id}_${user.accountType}_${user.isEmailVerified}`;

    // Prevent duplicate requests
    if (requestInProgress.current || lastRequestKey.current === requestKey) {
      console.log(
        `🚫 CustomerContext: Blocked duplicate request for ${requestKey}`,
      );
      return;
    }

    console.log(`✅ CustomerContext: Starting request for ${requestKey}`);
    requestInProgress.current = true;
    lastRequestKey.current = requestKey;

    setIsLoading(true);
    try {
      const { data, error } = await AuthApi.getAccountInfo();

      if (error || !data) {
        throw new Error(error || "Failed to fetch customer data from API");
      }

      // Map the API response from /auth/v1/account to our Customer interface
      const customerData: Customer = {
        id: user.id,
        name:
          `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
          user.firstName,
        email: data.email || user.email,
        photo:
          data.avatarUrl ||
          data.profileImage ||
          "https://avatar.vercel.sh/customer.png?size=150",
        company: data.company || "",
        phone: data.phoneNumbers?.[0] || "",
        memberSince: data.createdAt
          ? new Date(data.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            })
          : "",
        // --- Fields below are not in /account and will be empty until their API endpoints are integrated ---
        totalTasksPosted: 0,
        totalConsultationsBooked: 0,
        totalSpent: 0,
        location: data.location || "",
        bio: data.bio || "",
        website: data.website,
        linkedin: data.linkedin,
        languages: data.languageSkills || data.languages || [],
      };
      setCustomer(customerData);

      // Stats and activity will be empty until their API endpoints are integrated
      setStats({
        totalTasksPosted: 0,
        totalConsultationsBooked: 0,
        totalSpent: 0,
        activeTasks: 0,
        upcomingConsultations: 0,
        completedTasks: 0,
      });
      setRecentActivity([]);

      console.log("CustomerContext: Data loaded from API", {
        emailVerified: data.emailVerified,
      });
    } catch (err) {
      console.error("Failed to load customer data:", err);
      showErrorToast("Could not load your profile data.");
      setCustomer(null);
      setStats(null);
      setRecentActivity([]);
    } finally {
      setIsLoading(false);
      requestInProgress.current = false;
    }
  }, [isAuthenticated, user, showErrorToast]);

  // Load customer data when auth state changes
  useEffect(() => {
    // Early return if user is not a customer - don't make API calls
    if (!isAuthenticated || !user || user.accountType !== "customer") {
      setIsLoading(false);
      return;
    }

    loadCustomerData();

    // Cleanup function to reset request tracking when user changes
    return () => {
      requestInProgress.current = false;
      lastRequestKey.current = "";
    };
  }, [loadCustomerData]);

  // Listen for user data changes from AuthContext
  useEffect(() => {
    const handleUserDataChange = () => {
      if (user && user.accountType === "customer") {
        console.log(
          "CustomerContext: User data changed, refreshing customer data",
        );
        loadCustomerData();
      }
    };

    window.addEventListener("userDataChanged", handleUserDataChange);
    return () => {
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, [user, loadCustomerData]);

  const updateCustomer = useCallback(
    (updates: Partial<Customer>) => {
      if (!customer) return;
      setCustomer((prev) => (prev ? { ...prev, ...updates } : null));
      toast({
        title: "Profile Saved",
        description: "Your profile has been updated.",
      });
    },
    [customer, toast],
  );

  return (
    <CustomerContext.Provider
      value={{
        customer,
        stats,
        recentActivity,
        updateCustomer,
        refreshCustomerData: loadCustomerData,
        isLoading,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
