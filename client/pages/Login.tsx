import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import GoogleSignIn from "../components/authentication/GoogleSingIn";
import GoogleRoleSelectionModal from "../components/authentication/GoogleRoleSelectionModal";
import LanguageText from "../components/common/LanguageText";
import FormField from "../components/forms/FormField";
import CustomButton from "../components/forms/Button";
import Modal from "../components/modals/Modal";

export default function Login() {
  const { currentLanguage, t } = useLanguage();
  const { login, loginWithGoogle, isLoading, isAuthenticated, user } =
    useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAccountTypeSelector, setShowAccountTypeSelector] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${currentLanguage}/dashboard/${user.accountType}`, {
        replace: true,
      });
    }
  }, [isAuthenticated, user, currentLanguage, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "E-mail on kohustuslik";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Vale e-maili formaat";
    }

    if (!formData.password) {
      newErrors.password = "Parool on kohustuslik";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password, rememberMe);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Login failed",
      });
    }
  };

  const handleGoogleLogin = async (accountType?: "provider" | "customer") => {
    if (!accountType) {
      setShowAccountTypeSelector(true);
      return;
    }

    try {
      // Get the idToken from Google API
      // This is now handled by the GoogleSignIn component
      // We just need to process the account type selection here
      await loginWithGoogle(accountType);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Google login failed",
      });
      setShowAccountTypeSelector(false);
    }
  };

  const getSEOTitle = () => {
    switch (currentLanguage) {
      case "en":
        return "Login to QuickHire | Access Your Account";
      case "ru":
        return "Войти в QuickHire | Доступ к аккаунту";
      default:
        return "Logi sisse QuickHire'sse | Juurdepääs kontole";
    }
  };

  const getSEODescription = () => {
    switch (currentLanguage) {
      case "en":
        return "Login to your QuickHire account to access services, manage projects, and connect with professionals.";
      case "ru":
        return "Войдите в ��вой а��каунт QuickHire для доступа к услугам, управления проектами и связи с профессионалами.";
      default:
        return "Logi sisse oma QuickHire kontole, et pääseda teenustele juurde, hallata projekte ja ühenduda spetsialistidega.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={
          currentLanguage === "ru"
            ? "войти, авторизация, аккаунт QuickHire"
            : currentLanguage === "en"
              ? "login, sign in, QuickHire account"
              : "sisselogimine, autoriseerimine, QuickHire konto"
        }
        url={`https://quickhire.ee/${currentLanguage}/login`}
      />
      <Navigation />

      <main className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <LanguageText
                ru="Добро пожаловать обратно"
                en="Welcome back"
                et="Tere tulemast tagasi"
              />
            </h1>
            <p className="text-gray-600">
              <LanguageText
                ru="Войдите в свой аккаунт"
                en="Sign in to your account"
                et="Logi sisse oma kontole"
              />
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg rounded-xl border border-gray-200 sm:px-10">
            {/* Google Login */}
            <div className="w-full mb-6 flex justify-center">
              <GoogleSignIn
                onSuccess={(userData) => {
                  console.log(
                    "Login: Google Sign-In successful for returning user:",
                    userData,
                  );
                  // Returning user is already authenticated, redirect will happen automatically
                }}
                onNewUser={(userData) => {
                  console.log(
                    "Login: Google Sign-In successful for new user:",
                    userData,
                  );
                  setGoogleUserData(userData);
                  setShowRoleSelection(true);
                }}
                onError={(error) => {
                  console.error("Login: Google Sign-In failed:", error);
                  setErrors({
                    general:
                      error instanceof Error
                        ? error.message
                        : "Google login failed",
                  });
                }}
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  <LanguageText ru="или" en="or" et="või" />
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <FormField
                label={{
                  ru: "E-mail",
                  en: "Email",
                  et: "E-mail",
                }}
                type="email"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder={{
                  ru: "ваш@email.com",
                  en: "your@email.com",
                  et: "sinu@email.com",
                }}
                error={errors.email}
                required
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />

              {/* Password */}
              <FormField
                label={{
                  ru: "Пароль",
                  en: "Password",
                  et: "Parool",
                }}
                type="password"
                value={formData.password}
                onChange={(value) =>
                  setFormData({ ...formData, password: value })
                }
                placeholder={{
                  ru: "Введите пароль",
                  en: "Enter your password",
                  et: "Sisesta parool",
                }}
                error={errors.password}
                required
                icon={<Lock className="h-4 w-4 text-gray-400" />}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    <LanguageText
                      ru="Запомнить меня"
                      en="Remember me"
                      et="Jäta mind meelde"
                    />
                  </span>
                </label>

                <Link
                  to={`/${currentLanguage}/forgot-password`}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  <LanguageText
                    ru="Забыли пароль?"
                    en="Forgot password?"
                    et="Unustasid parooli?"
                  />
                </Link>
              </div>

              {/* Submit Button */}
              <CustomButton
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                text={{
                  ru: "Войти",
                  en: "Sign in",
                  et: "Logi sisse",
                }}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                className="w-full"
              />
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <LanguageText
                  ru="Нет аккаунта?"
                  en="Don't have an account?"
                  et="Pole kontot?"
                />{" "}
                <Link
                  to={`/${currentLanguage}/signup`}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  <LanguageText
                    ru="Зарегистрироваться"
                    en="Sign up"
                    et="Registreeru"
                  />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Account Type Selector Modal */}
      <Modal
        isOpen={showAccountTypeSelector}
        onClose={() => setShowAccountTypeSelector(false)}
        title={{
          ru: "Выберите тип аккаунта",
          en: "Select Account Type",
          et: "Valige konto tüüp",
        }}
        size="md"
      >
        <p className="text-sm text-gray-600 mb-6">
          <LanguageText
            ru="Кем вы хотите войти?"
            en="How would you like to sign in?"
            et="Kuidas soovite sisse logida?"
          />
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleGoogleLogin("customer")}
            className="w-full p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
          >
            <div className="font-medium text-gray-900">
              <LanguageText ru="Клиент" en="Customer" et="Klient" />
            </div>
            <div className="text-sm text-gray-600">
              <LanguageText
                ru="Ищу услуги и консультации"
                en="Looking for services and consultations"
                et="Otsin teenuseid ja konsultatsioone"
              />
            </div>
          </button>

          <button
            onClick={() => handleGoogleLogin("provider")}
            className="w-full p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors text-left"
          >
            <div className="font-medium text-gray-900">
              <LanguageText
                ru="Поставщик услуг"
                en="Service Provider"
                et="Teenuse pakkuja"
              />
            </div>
            <div className="text-sm text-gray-600">
              <LanguageText
                ru="Предоставляю услуги и консультации"
                en="I provide services and consultations"
                et="Pakun teenuseid ja konsultatsioone"
              />
            </div>
          </button>
        </div>
      </Modal>

      {/* Google Role Selection Modal */}
      {showRoleSelection && googleUserData && (
        <GoogleRoleSelectionModal
          isOpen={showRoleSelection}
          onClose={() => setShowRoleSelection(false)}
          userData={googleUserData}
        />
      )}
    </div>
  );
}
