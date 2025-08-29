import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { AuthApi } from "../lib/ApiClient";
import LanguageText from "../components/LanguageText";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Card from "../components/Card";

export default function ForgotPassword() {
  const { currentLanguage, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | React.ReactElement>("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(
        <LanguageText
          ru="Email обязателен"
          en="Email is required"
          et="E-mail on kohustuslik"
        />,
      );
      return;
    }

    if (!validateEmail(email)) {
      setError(
        <LanguageText
          ru="Неверный формат email"
          en="Invalid email format"
          et="Vale e-maili formaat"
        />,
      );
      return;
    }

    setIsLoading(true);

    try {
      // Call the actual forgot password API
      const { error } = await AuthApi.forgotPassword(email, "email");

      if (error) {
        setError(error);
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        <LanguageText
          ru="Ошибка сброса пароля"
          en="Error resetting password"
          et="Viga parooli lähtestamisel"
        />,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={
          <LanguageText
            ru="Забыли пароль"
            en="Forgot Password"
            et="Unustatud parool"
          />
        }
        description={
          <LanguageText
            ru="Введите ваш email адрес и мы отправим вам ссылку для сброса пароля"
            en="Enter your email address and we'll send you a password reset link"
            et="Sisesta oma e-maili aadress ja me saadame sulle parooli lähtestamise lingi"
          />
        }
      />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <Card shadow="lg" padding="lg">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      <LanguageText
                        ru="Забыли пароль"
                        en="Forgot Password"
                        et="Unustatud parool"
                      />
                    </h1>
                    <p className="text-gray-600">
                      <LanguageText
                        ru="Введите ваш email адрес и мы отправим вам ссылку для сброса пароля"
                        en="Enter your email address and we'll send you a password reset link"
                        et="Sisesta oma e-maili aadress ja me saadame sulle parooli lähtestamise lingi"
                      />
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField
                      label={{
                        ru: "Email адрес",
                        en: "Email address",
                        et: "E-maili aadress",
                      }}
                      type="email"
                      value={email}
                      onChange={(value) => setEmail(value)}
                      placeholder={{
                        ru: "Email адрес",
                        en: "Email address",
                        et: "E-maili aadress",
                      }}
                      error={error}
                      required
                      icon={<Mail className="h-5 w-5 text-gray-400" />}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      loading={isLoading}
                      text={{
                        ru: "Отправить ссылку сброса",
                        en: "Send Reset Link",
                        et: "Saada lähtestamise link",
                      }}
                      icon={<ArrowRight className="h-4 w-4" />}
                      iconPosition="right"
                      className="w-full"
                    />
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      <LanguageText
                        ru="Вспомнили пароль?"
                        en="Remember your password?"
                        et="Mäletad parooli?"
                      />{" "}
                      <Link
                        to={`/${currentLanguage}/login`}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        <LanguageText ru="Войти" en="Sign In" et="Logi sisse" />
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    <LanguageText
                      ru="Email отправлен!"
                      en="Email Sent!"
                      et="E-mail saadetud!"
                    />
                  </h1>

                  <p className="text-gray-600 mb-8">
                    <LanguageText
                      ru="Проверьте вашу почту для получения инструкций по сбросу пароля."
                      en="Check your inbox for password reset instructions."
                      et="Kontrollime oma postkasti parooli lähtestamise juhiste saamiseks."
                    />
                  </p>

                  <Link
                    to={`/${currentLanguage}/login`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <LanguageText
                      ru="Вернуться на страницу входа"
                      en="Back to Login"
                      et="Tagasi sisselogimise lehele"
                    />
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
