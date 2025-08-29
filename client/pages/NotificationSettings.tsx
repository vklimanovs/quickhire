import React from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useNotifications } from "../lib/NotificationContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { Bell, Mail, Smartphone, Settings } from "lucide-react";

export default function NotificationSettings() {
  const { currentLanguage, t } = useLanguage();
  const { preferences, updatePreferences } = useNotifications();

  const handleEmailToggle = (key: keyof typeof preferences.email) => {
    updatePreferences({
      ...preferences,
      email: {
        ...preferences.email,
        [key]: !preferences.email[key],
      },
    });
  };

  const handleInAppToggle = (key: keyof typeof preferences.inApp) => {
    updatePreferences({
      ...preferences,
      inApp: {
        ...preferences.inApp,
        [key]: !preferences.inApp[key],
      },
    });
  };

  const getLabel = (key: string) => {
    switch (key) {
      case "tasks":
        return currentLanguage === "ru"
          ? "Задачи"
          : currentLanguage === "en"
            ? "Tasks"
            : "Ülesanded";
      case "messages":
        return currentLanguage === "ru"
          ? "Сообщения"
          : currentLanguage === "en"
            ? "Messages"
            : "Sõnumid";
      case "reviews":
        return currentLanguage === "ru"
          ? "Отзывы"
          : currentLanguage === "en"
            ? "Reviews"
            : "Arvustused";
      case "marketing":
        return currentLanguage === "ru"
          ? "Маркетинг"
          : currentLanguage === "en"
            ? "Marketing"
            : "Turundus";
      default:
        return key;
    }
  };

  const getDescription = (key: string) => {
    switch (key) {
      case "tasks":
        return currentLanguage === "ru"
          ? "Уведомления о новых задачах и обновлениях"
          : currentLanguage === "en"
            ? "Notifications about new tasks and updates"
            : "Teavitused uutest ülesannetest ja uuendustest";
      case "messages":
        return currentLanguage === "ru"
          ? "Уведомления о новых сообщениях от других пользователей"
          : currentLanguage === "en"
            ? "Notifications about new messages from other users"
            : "Teavitused teiste kasutajate uutest sõnumitest";
      case "reviews":
        return currentLanguage === "ru"
          ? "Уведомления о новых отзывах и оценках"
          : currentLanguage === "en"
            ? "Notifications about new reviews and ratings"
            : "Teavitused uutest arvustustest ja hinnangutest";
      case "marketing":
        return currentLanguage === "ru"
          ? "Маркетинговые уведомления и предложения"
          : currentLanguage === "en"
            ? "Marketing notifications and offers"
            : "Turundusteavitused ja pakkumised";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${
          currentLanguage === "ru"
            ? "Настройки уведомлений"
            : currentLanguage === "en"
              ? "Notification Settings"
              : "Teavituste seaded"
        } | QuickHire`}
        description={
          currentLanguage === "ru"
            ? "Управляйте настройками уведомлений"
            : currentLanguage === "en"
              ? "Manage your notification preferences"
              : "Hallake oma teavituste eelistusi"
        }
        url={`https://quickhire.ee/${currentLanguage}/settings/notifications`}
      />

      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-gray-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentLanguage === "ru"
                    ? "Настройки уведомлений"
                    : currentLanguage === "en"
                      ? "Notification Settings"
                      : "Teavituste seaded"}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {currentLanguage === "ru"
                    ? "Управляйте тем, как и когда вы получаете уведомления"
                    : currentLanguage === "en"
                      ? "Manage how and when you receive notifications"
                      : "Hallake, kuidas ja millal te teavitusi saate"}
                </p>
              </div>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="px-6 py-6">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                {currentLanguage === "ru"
                  ? "Email уведомления"
                  : currentLanguage === "en"
                    ? "Email Notifications"
                    : "E-posti teavitused"}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {currentLanguage === "ru"
                ? "Получайте важные обновления на ваш email (максимум 1 в минуту на тему)"
                : currentLanguage === "en"
                  ? "Receive important updates to your email (max 1 per minute per thread)"
                  : "Saage olulised uuendused oma e-postile (maksimaalselt 1 minutis teema kohta)"}
            </p>

            <div className="space-y-4">
              {Object.entries(preferences.email).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900">
                        {getLabel(key)}
                      </h3>
                      {(key === "newMessage" ||
                        key === "bookingStatusChange") && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {currentLanguage === "ru"
                            ? "Рекомендуется"
                            : currentLanguage === "en"
                              ? "Recommended"
                              : "Soovitatav"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {getDescription(key)}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() =>
                        handleEmailToggle(key as keyof typeof preferences.email)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* In-App Notifications */}
          <div className="border-t border-gray-200 px-6 py-6">
            <div className="flex items-center mb-4">
              <Smartphone className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                {currentLanguage === "ru"
                  ? "Уведомления в приложении"
                  : currentLanguage === "en"
                    ? "In-App Notifications"
                    : "Rakenduse sisesed teavitused"}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {currentLanguage === "ru"
                ? "Получайте мгновенные уведомления в браузере и в колокольчике уведомлений"
                : currentLanguage === "en"
                  ? "Receive instant notifications in browser and notification bell"
                  : "Saage kohesed teavitused brauseris ja teavituste kellas"}
            </p>

            <div className="space-y-4">
              {Object.entries(preferences.inApp).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900">
                        {getLabel(key)}
                      </h3>
                      {(key === "newMessage" ||
                        key === "bookingStatusChange") && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          {currentLanguage === "ru"
                            ? "Рекомендуется"
                            : currentLanguage === "en"
                              ? "Recommended"
                              : "Soovitatav"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {getDescription(key)}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() =>
                        handleInAppToggle(key as keyof typeof preferences.inApp)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-start">
              <Bell className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">
                  {currentLanguage === "ru"
                    ? "О уведомлениях"
                    : currentLanguage === "en"
                      ? "About Notifications"
                      : "Teavituste kohta"}
                </p>
                <p>
                  {currentLanguage === "ru"
                    ? "Email уведомления ограничены 1 в минуту на беседу для предотвращения спама. Уведомления в приложении отображаются мгновенно."
                    : currentLanguage === "en"
                      ? "Email notifications are throttled to 1 per minute per conversation to prevent spam. In-app notifications appear instantly."
                      : "E-posti teavitused on piiratud 1-ga minutis vestluse kohta rämpsposti vältimiseks. Rakenduse sisesed teavitused ilmuvad koheselt."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
