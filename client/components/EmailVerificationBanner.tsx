import React from "react";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

interface EmailVerificationBannerProps {
  emailVerified: boolean;
  email: string;
}

export function EmailVerificationBanner({
  emailVerified,
  email,
}: EmailVerificationBannerProps) {
  const { currentLanguage } = useLanguage();

  if (emailVerified) {
    return null;
  }

  const getMessage = () => {
    switch (currentLanguage) {
      case "ru":
        return `Email не подтвержден: ${email}`;
      case "en":
        return `Email not verified: ${email}`;
      case "et":
        return `E-mail pole kinnitatud: ${email}`;
      default:
        return `Email not verified: ${email}`;
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm font-medium">{getMessage()}</span>
    </div>
  );
}
