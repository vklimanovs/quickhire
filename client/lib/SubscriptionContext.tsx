/** @refresh reset */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext";

export type SubscriptionPlan = "customer_monthly" | "customer_annual" | null;

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan;
  hasActiveSubscription: boolean;
  isLoading: boolean;
  subscribe: (plan: Exclude<SubscriptionPlan, null>) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  canPostTasks: boolean;
  canMessageProviders: boolean;
  canBookConsultations: boolean;
  isClientSubscribed: boolean;
  isSubscriptionModalOpen: boolean;
  subscriptionModalIntent:
    | "view-profile"
    | "book-consultation"
    | "post-task"
    | "message"
    | "general"
    | "role-switch";
  openSubscriptionModal: (
    intent?:
      | "view-profile"
      | "book-consultation"
      | "post-task"
      | "message"
      | "general"
      | "role-switch",
  ) => void;
  closeSubscriptionModal: () => void;
  getSubscriptionDetails: () => {
    planName: string;
    price: string;
    billingCycle: string;
  } | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export function useSubscription() {
  try {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
      // Return safe defaults instead of throwing
      console.warn(
        "useSubscription: SubscriptionProvider not found, returning defaults",
      );
      return {
        currentPlan: null,
        hasActiveSubscription: false,
        isLoading: false,
        canPostTasks: true, // Allow posting tasks by default
        canMessageProviders: true, // Allow messaging by default
        canBookConsultations: true, // Allow booking consultations by default
        isClientSubscribed: true, // Allow by default
        isSubscriptionModalOpen: false,
        subscriptionModalIntent: "general" as const,
        openSubscriptionModal: () => {},
        closeSubscriptionModal: () => {},
        subscribe: async () => {
          throw new Error("Subscription context not available");
        },
        cancelSubscription: async () => {
          throw new Error("Subscription context not available");
        },
        getSubscriptionDetails: () => null,
      };
    }
    return context;
  } catch (error) {
    console.warn(
      "useSubscription: Error accessing context, returning defaults",
    );
    return {
      currentPlan: null,
      hasActiveSubscription: false,
      isLoading: false,
      canPostTasks: true,
      canMessageProviders: true,
      canBookConsultations: true,
      isClientSubscribed: true,
      isSubscriptionModalOpen: false,
      subscriptionModalIntent: "general" as const,
      openSubscriptionModal: () => {},
      closeSubscriptionModal: () => {},
      subscribe: async () => {
        throw new Error("Subscription context not available");
      },
      cancelSubscription: async () => {
        throw new Error("Subscription context not available");
      },
      getSubscriptionDetails: () => null,
    };
  }
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Modal state
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionModalIntent, setSubscriptionModalIntent] = useState<
    | "view-profile"
    | "book-consultation"
    | "post-task"
    | "message"
    | "general"
    | "role-switch"
  >("general");

  // Access contexts safely
  const authContext = useAuth();
  const languageContext = useLanguage();

  const user = authContext?.user;
  const currentLanguage = languageContext?.currentLanguage || "en";

  // Single source of truth for role checks
  const isFreelance = user?.roles?.isFreelance === true;
  const isClient = user?.roles?.isClient === true;
  const isClientSubscribed =
    isClient && user?.subscription?.status === "active";

  // Only customers need subscriptions
  const isCustomer = user?.accountType === "customer";

  // Initialize subscription state
  useEffect(() => {
    let isMounted = true;

    // Only run if we haven't initialized yet to prevent multiple runs
    if (isInitialized) return;

    const loadSubscription = async () => {
      try {
        if (user && isClient) {
          // Load client subscription from localStorage or use user's subscription
          if (user.subscription?.plan) {
            setCurrentPlan(user.subscription.plan as SubscriptionPlan);
          } else {
            const storedSubscription = localStorage.getItem(
              `subscription_${user.id}`,
            );
            if (storedSubscription && isMounted) {
              try {
                const subscriptionData = JSON.parse(storedSubscription);
                setCurrentPlan(subscriptionData.plan);
              } catch (error) {
                console.error("Error parsing subscription data:", error);
                setCurrentPlan(null);
              }
            }
          }
        } else {
          // Freelance-only users don't need subscriptions
          setCurrentPlan(null);
        }
      } catch (error) {
        console.error("Error loading subscription:", error);
        setCurrentPlan(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsInitialized(true);
        }
      }
    };

    loadSubscription();

    return () => {
      isMounted = false;
    };
  }, [user?.id, isClient, isInitialized]);

  const hasActiveSubscription =
    isClient && user?.subscription?.status === "active";
  const canPostTasks = !isClient || hasActiveSubscription;
  const canMessageProviders = !isClient || hasActiveSubscription;
  const canBookConsultations = !isClient || hasActiveSubscription;
  // Use the computed isClientSubscribed value

  // Modal functions
  const openSubscriptionModal = (
    intent:
      | "view-profile"
      | "book-consultation"
      | "post-task"
      | "message"
      | "general"
      | "role-switch" = "general",
  ) => {
    setSubscriptionModalIntent(intent);
    setIsSubscriptionModalOpen(true);
  };

  const closeSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
    setSubscriptionModalIntent("general");
  };

  const subscribe = async (
    plan: Exclude<SubscriptionPlan, null>,
  ): Promise<void> => {
    if (!user || !isClient) {
      throw new Error("Only clients can subscribe");
    }

    if (!user.isEmailVerified) {
      throw new Error("Email verification required before subscribing");
    }

    setIsLoading(true);

    try {
      // Mock API call - in real app, this would be an actual API call
      const response = await mockApiCall("/api/customer/subscribe", {
        method: "POST",
        body: JSON.stringify({
          customerId: user.id,
          plan: plan,
        }),
      });

      if (response.success) {
        // Store subscription data
        const subscriptionData = {
          plan: plan,
          subscribedAt: new Date().toISOString(),
          status: "active",
        };

        localStorage.setItem(
          `subscription_${user.id}`,
          JSON.stringify(subscriptionData),
        );
        setCurrentPlan(plan);

        console.log(`Successfully subscribed to ${plan}`);
      } else {
        throw new Error(response.error || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async (): Promise<void> => {
    if (!user || !isClient) {
      throw new Error("Only clients can cancel subscriptions");
    }

    setIsLoading(true);

    try {
      // Mock API call - in real app, this would be an actual API call
      const response = await mockApiCall("/api/customer/cancel", {
        method: "POST",
        body: JSON.stringify({
          customerId: user.id,
        }),
      });

      if (response.success) {
        // Remove subscription data
        localStorage.removeItem(`subscription_${user.id}`);
        setCurrentPlan(null);

        console.log("Successfully cancelled subscription");
      } else {
        throw new Error(response.error || "Cancellation failed");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getSubscriptionDetails = () => {
    if (!currentPlan) return null;

    const details = {
      customer_monthly: {
        planName:
          currentLanguage === "ru"
            ? "Клиент (Месячно)"
            : currentLanguage === "en"
              ? "Customer (Monthly)"
              : "Klient (Kuine)",
        price: "€10",
        billingCycle:
          currentLanguage === "ru"
            ? "в месяц"
            : currentLanguage === "en"
              ? "per month"
              : "kuus",
      },
      customer_annual: {
        planName:
          currentLanguage === "ru"
            ? "Клиент (Годовой)"
            : currentLanguage === "en"
              ? "Customer (Annual)"
              : "Klient (Aastane)",
        price: "€100",
        billingCycle:
          currentLanguage === "ru"
            ? "в год"
            : currentLanguage === "en"
              ? "per year"
              : "aastas",
      },
    };

    return details[currentPlan];
  };

  const value: SubscriptionContextType = {
    currentPlan,
    hasActiveSubscription,
    isLoading,
    subscribe,
    cancelSubscription,
    canPostTasks,
    canMessageProviders,
    canBookConsultations,
    isClientSubscribed,
    isSubscriptionModalOpen,
    subscriptionModalIntent,
    openSubscriptionModal,
    closeSubscriptionModal,
    getSubscriptionDetails,
  };

  try {
    return (
      <SubscriptionContext.Provider value={value}>
        {children}
      </SubscriptionContext.Provider>
    );
  } catch (error) {
    console.error("SubscriptionProvider render error:", error);
    // Return children without context as fallback
    return <>{children}</>;
  }
};

// Mock API function for demo
async function mockApiCall(url: string, options: any): Promise<any> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock successful responses
  if (url.includes("/subscribe")) {
    return { success: true, message: "Subscription successful" };
  }

  if (url.includes("/cancel")) {
    return { success: true, message: "Cancellation successful" };
  }

  return { success: false, error: "Unknown endpoint" };
}
