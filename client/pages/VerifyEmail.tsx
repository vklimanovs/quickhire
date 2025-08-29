import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { Mail, RefreshCw, CheckCircle } from "lucide-react";
import LanguageText from "../components/LanguageText";
import Button from "../components/Button";
import Card from "../components/Card";

export default function VerifyEmail() {
  const { currentLanguage } = useLanguage();
  const { verifyEmail, resendVerificationEmail, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  // Handle cooldown countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail(email);
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      await resendVerificationEmail();
      // Start 10-second cooldown
      setResendCooldown(10);
    } catch (error) {
      console.error("Failed to resend email:", error);
      // Don't start cooldown on error
    } finally {
      setIsResending(false);
    }
  };

  const isResendDisabled = isResending || resendCooldown > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={
          <LanguageText
            ru="Подтвердите ваш email | QuickHire.ee"
            en="Verify Your Email | QuickHire.ee"
            et="Kinnita oma e-mail | QuickHire.ee"
          />
        }
        description={
          <LanguageText
            ru="Подтвердите ваш email адрес для завершения настройки аккаунта QuickHire."
            en="Verify your email address to complete your QuickHire account setup."
            et="Kinnita oma e-maili aadress QuickHire konto seadistamise lõpetamiseks."
          />
        }
        keywords={
          currentLanguage === "ru"
            ? "подтверждение email, верификация, QuickHire"
            : currentLanguage === "en"
              ? "email verification, account verification, QuickHire"
              : "e-maili kinnitamine, konto kinnitamine, QuickHire"
        }
        url={`https://quickhire.ee/${currentLanguage}/verify-email`}
      />
      <Navigation />

      <main className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <LanguageText
                ru="Подтвердите ваш email"
                en="Verify your email"
                et="Kinnita oma e-mail"
              />
            </h1>
            <p className="text-gray-600 mb-4">
              <LanguageText
                ru="Мы отправили письмо с подтверждением на"
                en="We've sent a confirmation email to"
                et="Saatsime kinnituskirja aadressile"
              />
            </p>
            <p className="font-medium text-gray-900 mb-6">{email}</p>
            <p className="text-sm text-gray-600">
              <LanguageText
                ru="Нажмите на ссылку в письме, чтобы подтвердить ваш аккаунт."
                en="Click the link in the email to verify your account."
                et="Klõpsa e-kirjas olevale lingile, et oma konto kinnitada."
              />
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow rounded-xl border border-gray-200 sm:px-10">
            {/* Mock verification button (simulates clicking email link) */}
            <div className="mb-6">
              <Button
                onClick={handleVerifyEmail}
                disabled={isLoading}
                loading={isLoading}
                text={{
                  ru: "Я подтвердил email",
                  en: "I've verified my email",
                  et: "Olen e-maili kinnitanud",
                }}
                icon={<CheckCircle className="h-4 w-4" />}
                iconPosition="left"
                variant="success"
                className="w-full"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                <LanguageText
                  ru="Не получили письмо?"
                  en="Didn't receive the email?"
                  et="Ei saanud e-kirja?"
                />
              </p>

              <button
                onClick={handleResendEmail}
                disabled={isResendDisabled}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                {resendCooldown > 0 ? (
                  `${(
                    <LanguageText
                      ru="Повторить через"
                      en="Resend in"
                      et="Saada uuesti"
                    />
                  )} ${resendCooldown}s`
                ) : (
                  <LanguageText
                    ru="Отправить повторно"
                    en="Resend email"
                    et="Saada uuesti"
                  />
                )}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <LanguageText
                    ru="Хотите использовать другой email?"
                    en="Want to use a different email?"
                    et="Soovid kasutada teist e-maili?"
                  />{" "}
                  <Link
                    to={`/${currentLanguage}/signup`}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    <LanguageText
                      ru="Создать новый аккаунт"
                      en="Create new account"
                      et="Loo uus konto"
                    />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
