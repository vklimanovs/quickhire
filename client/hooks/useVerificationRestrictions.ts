import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";

export interface VerificationRestrictions {
  canProposeToTasks: boolean;
  canAddServices: boolean;
  canAddConsultations: boolean;
  canAddProjects: boolean;
  canReceiveMessages: boolean;
  canSubscribe: boolean;
  canSendMessages: boolean;
  isRestricted: boolean;
  restrictionMessage: string;
}

export function useVerificationRestrictions(): VerificationRestrictions {
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();

  const isEmailVerified = user?.isEmailVerified ?? false;
  const isRestricted = !isEmailVerified;

  const getRestrictionMessage = () => {
    switch (currentLanguage) {
      case "ru":
        return "Подтвердите email чтобы получить доступ к этой функции.";
      case "et":
        return "Kinnitage e-mail, et saada juurdepääs sellele funktsioonile.";
      default:
        return "Please verify your email to access this feature.";
    }
  };

  return {
    canProposeToTasks: isEmailVerified,
    canAddServices: isEmailVerified,
    canAddConsultations: isEmailVerified,
    canAddProjects: isEmailVerified,
    canReceiveMessages: isEmailVerified,
    canSubscribe: isEmailVerified,
    canSendMessages: isEmailVerified,
    isRestricted,
    restrictionMessage: getRestrictionMessage(),
  };
}
