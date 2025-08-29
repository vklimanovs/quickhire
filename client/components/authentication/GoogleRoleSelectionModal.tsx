import React from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase, CheckCircle } from "lucide-react";
import CustomCard from "../forms/Card";

interface GoogleRoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
    access: string;
    refresh: string;
    emailVerified?: boolean;
  };
}

export default function GoogleRoleSelectionModal({
  isOpen,
  onClose,
  userData,
}: GoogleRoleSelectionModalProps) {
  const { currentLanguage, t } = useLanguage();
  const { loginWithGoogle, authenticateWithGoogleData } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRoleSelection = async (role: "freelance" | "client") => {
    try {
      // Use the AuthContext function to properly authenticate the user
      authenticateWithGoogleData(userData, role);

      // Close modal first
      onClose();

      // Map roles to dashboard types
      const accountTypeMap = { client: "customer", freelance: "provider" };
      const dashboardType = accountTypeMap[role];

      // Navigate to appropriate dashboard with language prefix
      navigate(`/${currentLanguage}/dashboard/${dashboardType}`, {
        replace: true,
      });

      // No need for page reload since AuthContext is now properly updated
      console.log("Google Sign-In completed successfully!");
    } catch (error) {
      console.error("Error setting up user role:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <CustomCard shadow="lg" padding="none" className="max-w-2xl w-full mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              {currentLanguage === "ru"
                ? "Добро пожаловать в QuickHire!"
                : currentLanguage === "en"
                  ? "Welcome to QuickHire!"
                  : "Tere tulemast QuickHire'i!"}
            </h2>
          </div>
        </div>

        <div className="p-6">
          {/* User Info */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              {userData.avatarUrl ? (
                <img
                  src={userData.avatarUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-4 border-blue-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {userData.firstName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {userData.firstName} {userData.lastName}
            </h3>
            <p className="text-gray-600">{userData.email}</p>
          </div>

          <p className="text-gray-600 mb-6 text-center">
            {currentLanguage === "ru"
              ? "Выберите, как вы хотите использовать QuickHire:"
              : currentLanguage === "en"
                ? "Choose how you want to use QuickHire:"
                : "Vali, kuidas soovid QuickHire'i kasutada:"}
          </p>

          {/* Role Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Freelance Option */}
            <div
              className="border-2 border-blue-200 rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
              onClick={() => handleRoleSelection("freelance")}
            >
              <div className="flex items-center mb-3">
                <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900">
                  {currentLanguage === "ru"
                    ? "Фрилансер"
                    : currentLanguage === "en"
                      ? "Freelancer"
                      : "Vabakutseline"}
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {currentLanguage === "ru"
                  ? "Предлагаю услуги и консультации"
                  : currentLanguage === "en"
                    ? "I offer services and consultations"
                    : "Pakun teenuseid ja konsultatsioone"}
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  •{" "}
                  {currentLanguage === "ru"
                    ? "Просматривать задачи"
                    : currentLanguage === "en"
                      ? "Browse tasks"
                      : "Sirvi ülesandeid"}
                </li>
                <li>
                  •{" "}
                  {currentLanguage === "ru"
                    ? "Отправлять предложения"
                    : currentLanguage === "en"
                      ? "Submit proposals"
                      : "Esita pakkumisi"}
                </li>
                <li>
                  •{" "}
                  {currentLanguage === "ru"
                    ? "Предлагать услуги"
                    : currentLanguage === "en"
                      ? "Offer services"
                      : "Paku teenuseid"}
                </li>
              </ul>
            </div>

            {/* Client Option */}
            <div
              className="border-2 border-green-200 rounded-lg p-4 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all"
              onClick={() => handleRoleSelection("client")}
            >
              <div className="flex items-center mb-3">
                <Users className="h-8 w-8 text-green-600 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900">
                  {currentLanguage === "ru"
                    ? "Клиент"
                    : currentLanguage === "en"
                      ? "Client"
                      : "Klient"}
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {currentLanguage === "ru"
                  ? "Ищу услуги и консультации"
                  : currentLanguage === "en"
                    ? "I need services and consultations"
                    : "Vajan teenuseid ja konsultatsioone"}
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  •{" "}
                  {currentLanguage === "ru"
                    ? "Публиковать задачи"
                    : currentLanguage === "en"
                      ? "Post tasks"
                      : "Postita ülesandeid"}
                </li>
                <li>
                  •{" "}
                  {currentLanguage === "ru"
                    ? "Находить фрилансеров"
                    : currentLanguage === "en"
                      ? "Find freelancers"
                      : "Leia vabakutselisi"}
                </li>
                <li>
                  •{" "}
                  {currentLanguage === "ru"
                    ? "Бронировать консультации"
                    : currentLanguage === "en"
                      ? "Book consultations"
                      : "Broneeri konsultatsioone"}
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            {currentLanguage === "ru"
              ? "Вы можете изменить роль в любое время в настройках профиля"
              : currentLanguage === "en"
                ? "You can change your role anytime in profile settings"
                : "Saad rolli muuta igal ajal profiili seadetes"}
          </p>
        </div>
      </CustomCard>
    </div>
  );
}
