/** @refresh reset */
import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

interface UseGateOptions {
  onSuccess?: () => void;
  actionName?: string;
}

export function useGate(options: UseGateOptions = {}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const checkAccess = (): boolean => {
    return (
      user?.accountType === "customer" &&
      user?.subscription?.status === "active"
    );
  };

  const executeWithGate = (action: () => void) => {
    // If not logged in, redirect to login first
    if (!user) {
      localStorage.setItem(
        "pendingAction",
        JSON.stringify({
          type: "gate",
          actionName: options.actionName,
          timestamp: Date.now(),
        }),
      );
      navigate(`/${currentLanguage}/login`);
      return;
    }

    // If logged in but no access, show gate modal
    if (checkAccess()) {
      action();
    } else {
      setPendingAction(() => action);
      setIsGateOpen(true);
    }
  };

  const handleGateSuccess = () => {
    setIsGateOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    if (options.onSuccess) {
      options.onSuccess();
    }
  };

  const handleGateClose = () => {
    setIsGateOpen(false);
    setPendingAction(null);
  };

  return {
    isGateOpen,
    executeWithGate,
    handleGateSuccess,
    handleGateClose,
    hasAccess: checkAccess(),
    actionName: options.actionName,
  };
}
