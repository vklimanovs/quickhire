import React from "react";
import { Shield, Lock } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { useSubscription } from "../lib/SubscriptionContext";

interface SubscriptionGateProps {
  feature: "task_posting" | "messaging" | "consultation" | "browse_providers";
  children: React.ReactNode;
  canAccess: boolean;
  className?: string;
}

export default function SubscriptionGate({
  feature,
  children,
  canAccess,
  className = "",
}: SubscriptionGateProps) {
  const { currentLanguage } = useLanguage();
  const { openSubscriptionModal } = useSubscription();

  const handleSubscriptionClick = () => {
    // Map SubscriptionGate features to subscription modal intents
    const intentMap = {
      task_posting: "post-task",
      messaging: "message",
      consultation: "book-consultation",
      browse_providers: "view-profile",
    } as const;

    openSubscriptionModal(intentMap[feature] || "general");
  };

  if (canAccess) {
    return <>{children}</>;
  }

  const getFeatureText = () => {
    if (feature === "task_posting") {
      return {
        title:
          currentLanguage === "ru"
            ? "Подписка нужна для публикации задач"
            : currentLanguage === "en"
              ? "Subscription required to post tasks"
              : "Ülesannete postitamiseks on vaja tellimust",
        description:
          currentLanguage === "ru"
            ? "Получите доступ к публикации задач с активной подпиской"
            : currentLanguage === "en"
              ? "Get access to task posting with an active subscription"
              : "Saage juurdepääs ülesannete postitamisele aktiivse tellimusega",
      };
    } else if (feature === "messaging") {
      return {
        title:
          currentLanguage === "ru"
            ? "Подписка нужна для отправки сообщений"
            : currentLanguage === "en"
              ? "Subscription required to message providers"
              : "Teenusepakkujatele sõnumite saatmiseks on vaja tellimust",
        description:
          currentLanguage === "ru"
            ? "Общайтесь с поставщиками с активной подпиской"
            : currentLanguage === "en"
              ? "Message providers with an active subscription"
              : "Suhelge teenusepakkujatega aktiivse tellimusega",
      };
    } else if (feature === "consultation") {
      return {
        title:
          currentLanguage === "ru"
            ? "Подписка нужна для бронирования консультаций"
            : currentLanguage === "en"
              ? "Subscription required to book consultations"
              : "Konsultatsioonide broneerimiseks on vaja tellimust",
        description:
          currentLanguage === "ru"
            ? "Получите доступ к экспертным советам с активной подпиской"
            : currentLanguage === "en"
              ? "Get access to expert advice with an active subscription"
              : "Saage juurdepääs ekspertnõuannetele aktiivse tellimusega",
      };
    } else {
      return {
        title:
          currentLanguage === "ru"
            ? "Подписка нужна для просмотра профилей"
            : currentLanguage === "en"
              ? "Subscription required to browse providers"
              : "Teenusepakkujate sirvimiseks on vaja tellimust",
        description:
          currentLanguage === "ru"
            ? "Находите таланты с активной подпиской"
            : currentLanguage === "en"
              ? "Find talent with an active subscription"
              : "Leidke talente aktiivse tellimusega",
      };
    }
  };

  const featureText = getFeatureText();

  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${className}`}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Lock className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            {featureText.title}
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            {featureText.description}
          </p>
          <button
            onClick={handleSubscriptionClick}
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
          >
            <Shield className="h-3 w-3 mr-1" />
            {currentLanguage === "ru"
              ? "Выбрать план"
              : currentLanguage === "en"
                ? "Choose Plan"
                : "Valige plaan"}
          </button>
        </div>
      </div>
    </div>
  );
}
