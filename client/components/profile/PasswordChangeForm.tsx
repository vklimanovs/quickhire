import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { useToast } from "../../hooks/use-toast";
import { AuthApi } from "../../lib/ApiClient";

interface PasswordChangeFormProps {
  isPasswordSet: boolean;
  onPasswordChanged?: () => void;
  className?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordChangeForm({
  isPasswordSet,
  onPasswordChanged,
  className = "",
}: PasswordChangeFormProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  // Password change handler
  const handlePasswordChange = async () => {
    setPasswordError("");

    // Validate required fields based on whether password is already set
    const requiredFields = isPasswordSet
      ? [
          passwordData.currentPassword,
          passwordData.newPassword,
          passwordData.confirmPassword,
        ]
      : [passwordData.newPassword, passwordData.confirmPassword];

    if (requiredFields.some((field) => !field)) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Заполните все поля"
            : currentLanguage === "en"
              ? "Fill all fields"
              : "Täitke kõik väljad",
        description:
          currentLanguage === "ru"
            ? "Все поля пароля обязательны для заполнения."
            : currentLanguage === "en"
              ? "All password fields are required."
              : "Kõik parooli väljad on kohustuslikud.",
        variant: "destructive",
      });
      return;
    }

    // Check password complexity requirements
    const { requirements } = getPasswordStrength(passwordData.newPassword);
    const unmetRequirements = requirements.filter((req) => !req.met);

    if (unmetRequirements.length > 0) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Пароль не соответствует требованиям"
            : currentLanguage === "en"
              ? "Password doesn't meet requirements"
              : "Parool ei vasta nõuetele",
        description:
          currentLanguage === "ru"
            ? "Пароль должен соответствовать всем требованиям безопасности."
            : currentLanguage === "en"
              ? "Password must meet all security requirements."
              : "Parool peab vastama kõigile turvanõuetele.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Пароли не совпадают"
            : currentLanguage === "en"
              ? "Passwords do not match"
              : "Paroolid ei ühti",
        description:
          currentLanguage === "ru"
            ? "Новый пароль и подтверждение должны совпадать."
            : currentLanguage === "en"
              ? "New password and confirmation must match."
              : "Uus parool ja kinnitus peavad ühtima.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await AuthApi.changePassword(
        isPasswordSet ? passwordData.currentPassword : "",
        passwordData.newPassword,
      );

      if (error) {
        if (
          error.toLowerCase().includes("incorrect password") ||
          error.toLowerCase().includes("неверный пароль") ||
          error.toLowerCase().includes("vale parool")
        ) {
          setPasswordError(
            currentLanguage === "ru"
              ? "Неверный текущий пароль. Пожалуйста, введите правильный пароль."
              : currentLanguage === "en"
                ? "Incorrect current password. Please enter the correct password."
                : "Vale praegune parool. Palun sisestage õige parool.",
          );
          return;
        }
        throw new Error(error);
      }

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError("");

      toast({
        title: isPasswordSet
          ? currentLanguage === "ru"
            ? "Пароль обновлён"
            : currentLanguage === "en"
              ? "Password updated"
              : "Parool uuendatud"
          : currentLanguage === "ru"
            ? "Пароль установлен"
            : currentLanguage === "en"
              ? "Password set"
              : "Parool määratud",
        description: isPasswordSet
          ? currentLanguage === "ru"
            ? "Ваш пароль был успешно обновлён."
            : currentLanguage === "en"
              ? "Your password has been successfully updated."
              : "Teie parool on edukalt uuendatud."
          : currentLanguage === "ru"
            ? "Ваш пароль был успешно установлен."
            : currentLanguage === "en"
              ? "Your password has been successfully set."
              : "Teie parool on edukalt määratud.",
        variant: "default",
      });

      // Call callback if provided
      if (onPasswordChanged) {
        onPasswordChanged();
      }
    } catch (err: any) {
      console.error("Failed to change password:", err);
      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка обновления пароля"
            : currentLanguage === "en"
              ? "Password Update Failed"
              : "Parooli värskendamine ebaõnnestus",
        description: err.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {isPasswordSet
          ? currentLanguage === "ru"
            ? "Изменить пароль"
            : currentLanguage === "en"
              ? "Change Password"
              : "Muuda parooli"
          : currentLanguage === "ru"
            ? "Установить пароль"
            : currentLanguage === "en"
              ? "Set Password"
              : "Määra parool"}
      </h3>

      <div className="max-w-md space-y-4">
        {isPasswordSet && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === "ru"
                ? "Текущий пароль"
                : currentLanguage === "en"
                  ? "Current Password"
                  : "Praegune parool"}
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPasswordSet
              ? currentLanguage === "ru"
                ? "Новый пароль"
                : currentLanguage === "en"
                  ? "New Password"
                  : "Uus parool"
              : currentLanguage === "ru"
                ? "Пароль"
                : currentLanguage === "en"
                  ? "Password"
                  : "Parool"}
          </label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />

          {/* Password Strength Indicator */}
          {passwordData.newPassword && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {currentLanguage === "ru"
                    ? "Сила пароля"
                    : currentLanguage === "en"
                      ? "Password Strength"
                      : "Parooli tugevus"}
                </span>
                <span className="text-sm text-gray-500">
                  {passwordStrength.strength}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength.strength < 40
                      ? "bg-red-500"
                      : passwordStrength.strength < 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{
                    width: `${passwordStrength.strength}%`,
                  }}
                ></div>
              </div>

              {/* Password Requirements */}
              <div className="mt-3 space-y-1">
                {passwordStrength.requirements.map((req, index) => (
                  <div
                    key={index}
                    className={`flex items-center text-xs ${
                      req.met ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {req.met ? (
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                    ) : (
                      <div className="h-3 w-3 mr-2 rounded-full border border-gray-300"></div>
                    )}
                    {req.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isPasswordSet
              ? currentLanguage === "ru"
                ? "Подтвердить новый пароль"
                : currentLanguage === "en"
                  ? "Confirm New Password"
                  : "Kinnita uut parooli"
              : currentLanguage === "ru"
                ? "Подтвердить пароль"
                : currentLanguage === "en"
                  ? "Confirm Password"
                  : "Kinnita parooli"}
          </label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        {/* Error Display */}
        {passwordError && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
            {passwordError}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePasswordChange}
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            {isUpdating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {currentLanguage === "ru"
                  ? "Обновление..."
                  : currentLanguage === "en"
                    ? "Updating..."
                    : "Uuendamine..."}
              </>
            ) : (
              <>
                {isPasswordSet
                  ? currentLanguage === "ru"
                    ? "Обновить пароль"
                    : currentLanguage === "en"
                      ? "Update Password"
                      : "Uuenda parooli"
                  : currentLanguage === "ru"
                    ? "Установить пароль"
                    : currentLanguage === "en"
                      ? "Set Password"
                      : "Määra parool"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
