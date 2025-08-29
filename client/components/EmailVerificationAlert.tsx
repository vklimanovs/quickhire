import React, { useState, useEffect } from "react";
import { AlertCircle, Mail } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { Button } from "./ui/button";

interface EmailVerificationAlertProps {
  emailVerified: boolean;
  email: string;
  className?: string;
  showActions?: boolean;
}

export function EmailVerificationAlert({
  emailVerified,
  email,
  className = "",
  showActions = false,
}: EmailVerificationAlertProps) {
  const { currentLanguage } = useLanguage();
  const { resendVerificationEmail, isLoading } = useAuth();
  const [resendCooldown, setResendCooldown] = useState(0);

  // Handle cooldown countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  if (emailVerified) {
    return null;
  }

  const getContent = () => {
    switch (currentLanguage) {
      case "ru":
        return {
          title: "Подтвердите ваш email",
          message:
            "Пожалуйста, подтвердите вашу учетную запись, чтобы разблокировать все функции.",
          emailText: `Email: ${email}`,
          resendButton: "Отправить повторно",
          resendCooldown: "Повторить через",
          restrictions: "Ваш аккаунт ограничен до подтверждения email.",
        };
      case "et":
        return {
          title: "Kinnitage oma e-mail",
          message: "Palun kinnitage oma konto, et avada kõik funktsioonid.",
          emailText: `E-mail: ${email}`,
          resendButton: "Saada uuesti",
          resendCooldown: "Saada uuesti",
          restrictions: "Teie konto on piiratud kuni e-maili kinnitamiseni.",
        };
      default:
        return {
          title: "Verify your email",
          message: "Please verify your account to unlock all features.",
          emailText: `Email: ${email}`,
          resendButton: "Resend",
          resendCooldown: "Resend in",
          restrictions: "Your account is limited until email verification.",
        };
    }
  };

  const content = getContent();

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;

    try {
      await resendVerificationEmail();
      // Start 10-second cooldown
      setResendCooldown(10);
    } catch (error) {
      console.error("Failed to resend verification email:", error);
      // Don't start cooldown on error
    }
  };

  const isResendDisabled = isLoading || resendCooldown > 0;

  return (
    <div
      className={`border border-yellow-200 bg-yellow-50 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-1">
            👉 {content.message}
          </h3>
          <p className="text-sm text-yellow-700 mb-2">{content.emailText}</p>
          <p className="text-xs text-yellow-600 mb-3">{content.restrictions}</p>

          {showActions && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleResendVerification}
                disabled={isResendDisabled}
                size="sm"
                variant="outline"
                className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="h-4 w-4 mr-1" />
                {resendCooldown > 0
                  ? `${content.resendCooldown} ${resendCooldown}s`
                  : content.resendButton}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
