import React, { useState, useEffect } from "react";
import { AlertCircle, Mail } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/AuthContext";
import CustomButton from "../forms/Button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

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
    <Alert
      className={`border-amber-300/60 bg-amber-50 text-amber-900 dark:bg-amber-950/20 dark:text-amber-100 dark:border-amber-800 rounded-xl ${className}`}
    >
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <div className="flex flex-col gap-2">
        <AlertTitle className="text-amber-900 dark:text-amber-100">
          {content.title}
        </AlertTitle>
        <AlertDescription>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {content.message}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            {content.emailText}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            {content.restrictions}
          </p>
        </AlertDescription>
        {showActions && (
          <div className="mt-2 flex items-center gap-2">
            <CustomButton
              onClick={handleResendVerification}
              disabled={isResendDisabled}
              size="sm"
              variant="outline"
              className="border-amber-300 text-amber-800 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-amber-900/40"
            >
              <Mail className="h-4 w-4" />
              {resendCooldown > 0
                ? `${content.resendCooldown} ${resendCooldown}s`
                : content.resendButton}
            </CustomButton>
            {resendCooldown > 0 && (
              <span className="text-xs text-amber-600 dark:text-amber-400">
                {content.resendCooldown} {resendCooldown}s
              </span>
            )}
          </div>
        )}
      </div>
    </Alert>
  );
}
