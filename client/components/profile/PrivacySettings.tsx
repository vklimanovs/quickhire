import React from "react";
import { useLanguage } from "../../lib/LanguageContext";

interface PrivacySettingsProps {
  showPhoneNumber: boolean;
  showEmail: boolean;
  showSocials: boolean;
  onPhoneNumberVisibilityChange: (checked: boolean) => void;
  onEmailVisibilityChange: (checked: boolean) => void;
  onSocialsVisibilityChange: (checked: boolean) => void;
  className?: string;
}

export default function PrivacySettings({
  showPhoneNumber,
  showEmail,
  showSocials,
  onPhoneNumberVisibilityChange,
  onEmailVisibilityChange,
  onSocialsVisibilityChange,
  className = "",
}: PrivacySettingsProps) {
  const { currentLanguage } = useLanguage();

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {currentLanguage === "ru"
          ? "Настройки приватности"
          : currentLanguage === "en"
            ? "Privacy Settings"
            : "Privaatsuse seaded"}
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">
              {currentLanguage === "ru"
                ? "Показать номер телефона"
                : currentLanguage === "en"
                  ? "Show Phone Number"
                  : "Näita telefoninumbrit"}
            </h4>
            <p className="text-sm text-gray-600">
              {currentLanguage === "ru"
                ? "Разрешить другим пользователям видеть ваш номер телефона в профиле"
                : currentLanguage === "en"
                  ? "Allow other users to see your phone number in your profile"
                  : "Luba teistel kasutajatel näha teie telefoninumbrit teie profiilis"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showPhoneNumber}
              onChange={(e) => onPhoneNumberVisibilityChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">
              {currentLanguage === "ru"
                ? "Показать email адрес"
                : currentLanguage === "en"
                  ? "Show Email Address"
                  : "Näita e-posti aadressi"}
            </h4>
            <p className="text-sm text-gray-600">
              {currentLanguage === "ru"
                ? "Разрешить другим пользователям видеть ваш email адрес в профиле"
                : currentLanguage === "en"
                  ? "Allow other users to see your email address in your profile"
                  : "Luba teistel kasutajatel näha teie e-posti aadressi teie profiilis"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showEmail}
              onChange={(e) => onEmailVisibilityChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">
              {currentLanguage === "ru"
                ? "Показать социальные сети"
                : currentLanguage === "en"
                  ? "Show Social Links"
                  : "Näita sotsiaalmeedia linke"}
            </h4>
            <p className="text-sm text-gray-600">
              {currentLanguage === "ru"
                ? "Показать все социальные сети (Website, LinkedIn, GitHub и т.д.) в профиле"
                : currentLanguage === "en"
                  ? "Show all social links (Website, LinkedIn, GitHub, etc.) in your profile"
                  : "Näita kõiki sotsiaalmeedia linke (Veebileht, LinkedIn, GitHub jne) teie profiilis"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showSocials}
              onChange={(e) => onSocialsVisibilityChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
