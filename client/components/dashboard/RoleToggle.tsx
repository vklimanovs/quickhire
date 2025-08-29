import React, { useState } from "react";
import { Loader } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/AuthContext";
import { useSubscription } from "../../lib/SubscriptionContext";
import { useToast } from "../../hooks/use-toast";

export default function RoleToggle() {
  const { t } = useLanguage();
  const { user, switchRole, addProviderRole, isLoading } = useAuth();
  const { openSubscriptionModal } = useSubscription();
  const { toast } = useToast();
  const [switchingTo, setSwitchingTo] = useState<
    "provider" | "customer" | null
  >(null);

  // Defensive check: if user is not available, render nothing.
  if (!user) {
    return null;
  }

  const currentRole = user.accountType;
  const hasClientRole = user.roles?.isClient ?? true;
  const hasFreelanceRole = user.roles?.isFreelance ?? true;
  const hasActiveSubscription = user.subscription?.status === "active";

  const handleRoleChange = async (role: "freelance" | "client") => {
    if (role === (currentRole === "provider" ? "freelance" : "client")) return; // Already active

    setSwitchingTo(role === "freelance" ? "provider" : "customer");

    try {
      if (role === "client") {
        // Switching to Client - always allow role switch
        await switchRole("customer");

        // Show appropriate message based on subscription status
        if (!hasActiveSubscription) {
          toast({
            title: "Role switched to Client",
            description:
              "You can now access the client dashboard. Subscribe to use client features like posting tasks and booking consultations.",
            variant: "default",
          });
        } else {
          toast({
            title: "Role switched to Client",
            description:
              "You can now access the client dashboard and all client features.",
            variant: "default",
          });
        }
      } else {
        // Switching to Freelance - always allow role switch
        await switchRole("provider");
        toast({
          title: "Role switched to Freelancer",
          description:
            "You can now access the freelancer dashboard and offer your services.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Role switch failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSwitchingTo(null);
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent,
    role: "freelance" | "client",
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRoleChange(role);
    }
  };

  const isFreelanceActive = currentRole === "provider";
  const isClientActive = currentRole === "customer";
  const isFreelanceSwitching = switchingTo === "provider";
  const isClientSwitching = switchingTo === "customer";

  return (
    <>
      <div
        className="flex bg-gray-100 rounded-lg p-1 max-[360px]:flex-col max-[360px]:w-full"
        role="tablist"
        aria-label="Role selector"
      >
        {/* Freelance Button */}
        <button
          role="tab"
          aria-selected={isFreelanceActive}
          tabIndex={isFreelanceActive ? 0 : -1}
          onClick={() => handleRoleChange("freelance")}
          onKeyDown={(e) => handleKeyPress(e, "freelance")}
          disabled={isLoading || switchingTo !== null}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 max-[360px]:mb-1
            ${
              isFreelanceActive
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }
          `}
        >
          <span className="flex items-center justify-center gap-1.5">
            {isFreelanceSwitching && (
              <Loader className="h-3 w-3 animate-spin" />
            )}
            {t.roleToggle.freelance}
          </span>
        </button>

        {/* Client Button */}
        <button
          role="tab"
          aria-selected={isClientActive}
          tabIndex={isClientActive ? 0 : -1}
          onClick={() => handleRoleChange("client")}
          onKeyDown={(e) => handleKeyPress(e, "client")}
          disabled={isLoading || switchingTo !== null}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50
            ${
              isClientActive
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }
          `}
        >
          <span className="flex items-center justify-center gap-1.5">
            {isClientSwitching && <Loader className="h-3 w-3 animate-spin" />}
            {t.roleToggle.client}
          </span>
        </button>
      </div>
    </>
  );
}
