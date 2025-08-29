import React from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/AuthContext";
import { X, Users, Briefcase } from "lucide-react";
import CustomCard from "../forms/Card";

interface RoleSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  targetRole: "freelance" | "client";
  onSwitch: () => void;
}

export default function RoleSwitchModal({
  isOpen,
  onClose,
  title,
  description,
  targetRole,
  onSwitch,
}: RoleSwitchModalProps) {
  const { currentLanguage } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <CustomCard shadow="lg" padding="none" className="max-w-md w-full mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            {targetRole === "freelance" ? (
              <Briefcase className="h-6 w-6 text-blue-600 mr-2" />
            ) : (
              <Users className="h-6 w-6 text-green-600 mr-2" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">{description}</p>

          {/* Role Benefits */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              {targetRole === "freelance"
                ? currentLanguage === "ru"
                  ? "Возможности фрилансера:"
                  : currentLanguage === "en"
                    ? "Freelance benefits:"
                    : "Vabakutselise eelised:"
                : currentLanguage === "ru"
                  ? "Возможности клиента:"
                  : currentLanguage === "en"
                    ? "Client benefits:"
                    : "Kliendi eelised:"}
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {targetRole === "freelance" ? (
                <>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Просматривать все открытые задачи"
                      : currentLanguage === "en"
                        ? "Browse all open tasks"
                        : "Sirvi kõiki avatud ülesandeid"}
                  </li>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Отправлять предложения к задачам"
                      : currentLanguage === "en"
                        ? "Submit proposals to tasks"
                        : "Esita pakkumisi ülesannetele"}
                  </li>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Предлагать услуги и консультации"
                      : currentLanguage === "en"
                        ? "Offer services & consultations"
                        : "Paku teenuseid ja konsultatsioone"}
                  </li>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Появляться в поиске поставщиков"
                      : currentLanguage === "en"
                        ? "Appear in provider searches"
                        : "Ilmu teenusepakkujate otsingutes"}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Публиковать неограниченное количество задач"
                      : currentLanguage === "en"
                        ? "Post unlimited tasks"
                        : "Postita piiramatul hulgal ülesandeid"}
                  </li>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Просматривать и связываться с фрилансерами"
                      : currentLanguage === "en"
                        ? "Browse & contact freelancers"
                        : "Sirvi ja kontakti vabakutselisi"}
                  </li>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Управлять предложениями и выбирать фрилансеров"
                      : currentLanguage === "en"
                        ? "Manage proposals & choose freelancers"
                        : "Halda pakkumisi ja vali vabakutselisi"}
                  </li>
                  <li>
                    •{" "}
                    {currentLanguage === "ru"
                      ? "Бронировать консультации"
                      : currentLanguage === "en"
                        ? "Book consultations"
                        : "Broneeri konsultatsioone"}
                  </li>
                </>
              )}
            </ul>
            {targetRole === "client" && (
              <p className="text-sm font-medium text-blue-600 mt-2">
                {currentLanguage === "ru"
                  ? "Требуется подписка: €10/мес или €100/год"
                  : currentLanguage === "en"
                    ? "Subscription required: €10/month or €100/year"
                    : "Tellimus vajalik: €10/kuus või €100/aastas"}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              {currentLanguage === "ru"
                ? "Отмена"
                : currentLanguage === "en"
                  ? "Cancel"
                  : "Tühista"}
            </button>
            <button
              onClick={onSwitch}
              className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                targetRole === "freelance"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {targetRole === "freelance"
                ? currentLanguage === "ru"
                  ? "Переключиться на Фрилансера"
                  : currentLanguage === "en"
                    ? "Switch to Freelance"
                    : "Lülitu vabakutseliseks"
                : currentLanguage === "ru"
                  ? "Переключиться на Клиента"
                  : currentLanguage === "en"
                    ? "Switch to Client"
                    : "Lülitu kliendiks"}
            </button>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
