import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Users,
  Briefcase,
  Building,
} from "lucide-react";
import GoogleSignIn from "../components/GoogleSingIn";
import GoogleRoleSelectionModal from "../components/GoogleRoleSelectionModal";
import LanguageText from "../components/LanguageText";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Card from "../components/Card";

export default function SignUp() {
  const { currentLanguage, t } = useLanguage();
  const { signup, loginWithGoogle, isLoading, isAuthenticated, user } =
    useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAccountTypeSelector, setShowAccountTypeSelector] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    accountType: "client" as "freelance" | "client",
  });

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, requirements: [] };

    const requirements = [
      { met: password.length >= 8, text: "At least 8 characters" },
      { met: /[A-Z]/.test(password), text: "One uppercase letter" },
      { met: /[a-z]/.test(password), text: "One lowercase letter" },
      { met: /\d/.test(password), text: "One digit" },
      {
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        text: "One special character",
      },
    ];

    const metCount = requirements.filter((req) => req.met).length;
    const strength = (metCount / requirements.length) * 100;

    return { strength, requirements };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const accountTypeMap = { client: "customer", freelance: "provider" };
      const dashboardType =
        accountTypeMap[user.accountType as keyof typeof accountTypeMap] ||
        user.accountType;
      navigate(`/${currentLanguage}/dashboard/${dashboardType}`, {
        replace: true,
      });
    }
  }, [isAuthenticated, user, currentLanguage, navigate]);

  // Simple form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};

    // Company OR (First name + Last name) validation
    const hasCompany = formData.company.trim().length > 0;
    const hasName =
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0;

    if (!hasCompany && !hasName) {
      if (!formData.company.trim()) newErrors.company = t.auth.required;
      if (!formData.firstName.trim()) newErrors.firstName = t.auth.required;
      if (!formData.lastName.trim()) newErrors.lastName = t.auth.required;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = t.auth.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.auth.invalidEmail;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t.auth.required;
    } else {
      // Check password complexity requirements
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumbers = /\d/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      const hasMinLength = formData.password.length >= 8;

      if (
        !hasUpperCase ||
        !hasLowerCase ||
        !hasNumbers ||
        !hasSpecialChar ||
        !hasMinLength
      ) {
        newErrors.password =
          "Password should have at least one uppercase letter, one lowercase letter, one digit and one special character";
      }
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.passwordsDontMatch;
    }

    // If there are validation errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Map account types to backend types
      const accountTypeMap = { client: "customer", freelance: "provider" };
      const backendAccountType = accountTypeMap[formData.accountType];

      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        accountType: backendAccountType as "provider" | "customer",
      });
    } catch (error: any) {
      // Handle specific API errors
      if (error.message?.includes("already exists")) {
        setErrors({ email: "An account with this email already exists!" });
      } else {
        setErrors({ general: error.message || t.auth.signUpError });
      }
    }
  };

  const handleGoogleSignUp = async (accountType?: "freelance" | "client") => {
    if (!accountType) {
      setShowAccountTypeSelector(true);
      return;
    }

    try {
      // Map new account types to existing backend types for Google signup
      const accountTypeMap = { client: "customer", freelance: "provider" };
      const backendAccountType = accountTypeMap[accountType];
      await loginWithGoogle(backendAccountType as "provider" | "customer");
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : t.auth.signUpError,
      });
      setShowAccountTypeSelector(false);
    }
  };

  const getSEOTitle = () => {
    switch (currentLanguage) {
      case "en":
        return "Join QuickHire | Create Your Account";
      case "ru":
        return "Присоединиться к QuickHire | Создать аккаунт";
      default:
        return "Liitu QuickHire'ga | Loo oma konto";
    }
  };

  const getSEODescription = () => {
    switch (currentLanguage) {
      case "en":
        return "Create your QuickHire account to find freelancers or offer your services. Join Estonia's leading marketplace.";
      case "ru":
        return "Создайте аккаунт QuickHire для поиска фрилансеров или предложения своих услуг. Присоединяйтесь к ведущему маркетплейсу Эстонии.";
      default:
        return "Loo QuickHire konto freelancerite leidmiseks või oma teenuste pakkumiseks. Liitu Eesti juhtiva turuplatsiga.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={
          currentLanguage === "ru"
            ? "регистрация, создать аккаунт, присоединиться QuickHire"
            : currentLanguage === "en"
              ? "sign up, create account, join QuickHire"
              : "registreeru, loo konto, liitu QuickHire"
        }
        url={`https://quickhire.ee/${currentLanguage}/signup`}
      />
      <Navigation />

      <main className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.auth.signUpTitle}
            </h1>
            <p className="text-gray-600">{t.auth.signUpSubtitle}</p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow rounded-xl border border-gray-200 sm:px-10">
            {/* Google Sign Up */}
            <div className="mb-6 flex justify-center">
              <GoogleSignIn
                onSuccess={(userData) => {
                  console.log(
                    "Google Sign-In successful for returning user:",
                    userData,
                  );
                  // Returning user is already authenticated, redirect will happen automatically
                }}
                onNewUser={(userData) => {
                  console.log(
                    "Google Sign-In successful for new user:",
                    userData,
                  );
                  setGoogleUserData(userData);
                  setShowRoleSelection(true);
                }}
                onError={(error) => {
                  console.error("SignUp: Google Sign-In failed:", error);
                  setErrors({
                    general:
                      error instanceof Error
                        ? error.message
                        : t.auth.signUpError,
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

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <FormField
                  label={{
                    ru: t.auth.company,
                    en: t.auth.company,
                    et: t.auth.company,
                  }}
                  type="text"
                  value={formData.company}
                  onChange={(value) =>
                    setFormData({ ...formData, company: value })
                  }
                  placeholder={{
                    ru: t.auth.company,
                    en: t.auth.company,
                    et: t.auth.company,
                  }}
                  error={errors.company}
                  icon={<Building className="h-4 w-4 text-gray-400" />}
                />
              </div>

              {/* Name Fields - Required if no company */}
              {!formData.company.trim() && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FormField
                      label={{
                        ru: t.auth.firstName,
                        en: t.auth.firstName,
                        et: t.auth.firstName,
                      }}
                      type="text"
                      value={formData.firstName}
                      onChange={(value) =>
                        setFormData({ ...formData, firstName: value })
                      }
                      placeholder={{
                        ru: t.auth.firstName,
                        en: t.auth.firstName,
                        et: t.auth.firstName,
                      }}
                      error={errors.firstName}
                      required={!formData.company.trim()}
                      icon={<User className="h-4 w-4 text-gray-400" />}
                    />
                  </div>

                  <div>
                    <FormField
                      label={{
                        ru: t.auth.lastName,
                        en: t.auth.lastName,
                        et: t.auth.lastName,
                      }}
                      type="text"
                      value={formData.lastName}
                      onChange={(value) =>
                        setFormData({ ...formData, lastName: value })
                      }
                      placeholder={{
                        ru: t.auth.lastName,
                        en: t.auth.lastName,
                        et: t.auth.lastName,
                      }}
                      error={errors.lastName}
                      required={!formData.company.trim()}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <FormField
                  label={{
                    ru: t.auth.email,
                    en: t.auth.email,
                    et: t.auth.email,
                  }}
                  type="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                  placeholder={{
                    ru: t.auth.email,
                    en: t.auth.email,
                    et: t.auth.email,
                  }}
                  error={errors.email}
                  required
                  icon={<Mail className="h-4 w-4 text-gray-400" />}
                />
              </div>

              {/* Password Field */}
              <div>
                <FormField
                  label={{
                    ru: t.auth.password,
                    en: t.auth.password,
                    et: t.auth.password,
                  }}
                  type="password"
                  value={formData.password}
                  onChange={(value) =>
                    setFormData({ ...formData, password: value })
                  }
                  placeholder={{
                    ru: t.auth.password,
                    en: t.auth.password,
                    et: t.auth.password,
                  }}
                  error={errors.password}
                  required
                  icon={<Lock className="h-4 w-4 text-gray-400" />}
                />

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.strength === 100
                              ? "bg-green-500"
                              : passwordStrength.strength >= 80
                                ? "bg-yellow-500"
                                : passwordStrength.strength >= 60
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {passwordStrength.strength === 100
                          ? "Strong"
                          : passwordStrength.strength >= 80
                            ? "Good"
                            : passwordStrength.strength >= 60
                              ? "Fair"
                              : "Weak"}
                      </span>
                    </div>

                    {/* Password Requirements */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {passwordStrength.requirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              req.met ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                          <span
                            className={`text-xs ${
                              req.met ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <FormField
                  label={{
                    ru: t.auth.confirmPassword,
                    en: t.auth.confirmPassword,
                    et: t.auth.confirmPassword,
                  }}
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(value) =>
                    setFormData({ ...formData, confirmPassword: value })
                  }
                  placeholder={{
                    ru: t.auth.confirmPassword,
                    en: t.auth.confirmPassword,
                    et: t.auth.confirmPassword,
                  }}
                  error={errors.confirmPassword}
                  required
                  icon={<Lock className="h-4 w-4 text-gray-400" />}
                />
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.auth.accountType}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, accountType: "client" })
                    }
                    className={`p-3 border-2 rounded-lg text-left transition-colors ${
                      formData.accountType === "client"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Users className="h-5 w-5 text-blue-600 mb-1" />
                    <div className="font-medium text-gray-900 text-sm">
                      {currentLanguage === "ru"
                        ? "Клиент"
                        : currentLanguage === "en"
                          ? "Client"
                          : "Klient"}
                    </div>
                    <div className="text-xs text-gray-600">
                      {currentLanguage === "ru"
                        ? "Ищу услуги"
                        : currentLanguage === "en"
                          ? "Looking for services"
                          : "Otsin teenuseid"}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, accountType: "freelance" })
                    }
                    className={`p-3 border-2 rounded-lg text-left transition-colors ${
                      formData.accountType === "freelance"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Briefcase className="h-5 w-5 text-blue-600 mb-1" />
                    <div className="font-medium text-gray-900 text-sm">
                      {currentLanguage === "ru"
                        ? "Фрилансер"
                        : currentLanguage === "en"
                          ? "Freelancer"
                          : "Freelancer"}
                    </div>
                    <div className="text-xs text-gray-600">
                      {currentLanguage === "ru"
                        ? "Предлагаю услуги"
                        : currentLanguage === "en"
                          ? "Offering services"
                          : "Pakun teenuseid"}
                    </div>
                  </button>
                </div>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-medium mb-1">
                    {errors.general}
                  </p>
                  <details className="text-xs text-gray-600">
                    <summary className="cursor-pointer hover:text-gray-800">
                      {currentLanguage === "ru"
                        ? "Техническая информация"
                        : currentLanguage === "en"
                          ? "Technical details"
                          : "Tehnilised detailid"}
                    </summary>
                    <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono">
                      <p>
                        <strong>API Endpoint:</strong>{" "}
                        http://easysy:9000/auth/v1/account
                      </p>
                      <p>
                        <strong>Method:</strong> POST
                      </p>
                      <p>
                        <strong>Time:</strong> {new Date().toISOString()}
                      </p>
                      <p>
                        <strong>Debug:</strong> Check browser console for
                        detailed logs
                      </p>
                    </div>
                  </details>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors mt-6"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {t.auth.createAccount}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.auth.alreadyHaveAccount}{" "}
                <Link
                  to={`/${currentLanguage}/login`}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {t.nav.login}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Account Type Selector Modal */}
      {showAccountTypeSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card padding="md" className="max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentLanguage === "ru"
                ? "Выберите тип аккаунта"
                : currentLanguage === "en"
                  ? "Select Account Type"
                  : "Valige konto tüüp"}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {currentLanguage === "ru"
                ? "Как вы хотите зарегистрироваться?"
                : currentLanguage === "en"
                  ? "How would you like to sign up?"
                  : "Kuidas soovite registreeruda?"}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleGoogleSignUp("client")}
                className="w-full p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
              >
                <div className="font-medium text-gray-900">
                  {currentLanguage === "ru"
                    ? "Клиент"
                    : currentLanguage === "en"
                      ? "Client"
                      : "Klient"}
                </div>
                <div className="text-sm text-gray-600">
                  {currentLanguage === "ru"
                    ? "Ищу услуг�� и консультации"
                    : currentLanguage === "en"
                      ? "Looking for services and consultations"
                      : "Otsin teenuseid ja konsultatsioone"}
                </div>
              </button>

              <button
                onClick={() => handleGoogleSignUp("freelance")}
                className="w-full p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors text-left"
              >
                <div className="font-medium text-gray-900">
                  {currentLanguage === "ru"
                    ? "Фрилансер"
                    : currentLanguage === "en"
                      ? "Freelancer"
                      : "Freelancer"}
                </div>
                <div className="text-sm text-gray-600">
                  {currentLanguage === "ru"
                    ? "Предлагаю услуги и консультации"
                    : currentLanguage === "en"
                      ? "Offering services and consultations"
                      : "Pakun teenuseid ja konsultatsioone"}
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowAccountTypeSelector(false)}
              className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {currentLanguage === "ru"
                ? "Отмена"
                : currentLanguage === "en"
                  ? "Cancel"
                  : "Tühista"}
            </button>
          </Card>
        </div>
      )}

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
