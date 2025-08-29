import React from "react";
import { Link } from "react-router-dom";
import { X, Lock, MessageCircle, User, Star, Shield } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  intent?:
    | "view-profile"
    | "book-consultation"
    | "post-task"
    | "message"
    | "general"
    | "role-switch";
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  intent = "general",
}: SubscriptionModalProps) {
  const { currentLanguage, t } = useLanguage();

  if (!isOpen) return null;

  const getIntentSpecificContent = () => {
    switch (intent) {
      case "view-profile":
        return {
          subtitle:
            currentLanguage === "ru"
              ? "Подпишитесь, чтобы просматривать полные профили фрилансеров."
              : currentLanguage === "en"
                ? "Subscribe to view full freelancer profiles."
                : "Tellige, et vaadata täielikke vabakutseliste profiile.",
        };
      case "book-consultation":
        return {
          subtitle:
            currentLanguage === "ru"
              ? "Подпишитесь, чтобы бронировать консультации."
              : currentLanguage === "en"
                ? "Subscribe to book consultations."
                : "Tellige konsultatsioonide broneerimiseks.",
        };
      case "post-task":
        return {
          subtitle:
            currentLanguage === "ru"
              ? "Подпишитесь, чтобы размещать задачи."
              : currentLanguage === "en"
                ? "Subscribe to post tasks."
                : "Tellige ülesannete postitamiseks.",
        };
      case "message":
        return {
          subtitle:
            currentLanguage === "ru"
              ? "Подпишитесь, чтобы связываться с фрилансерами."
              : currentLanguage === "en"
                ? "Subscribe to contact freelancers."
                : "Tellige vabakutseliste kontakteerimiseks.",
        };
      case "role-switch":
        return {
          subtitle:
            currentLanguage === "ru"
              ? "Для доступа к функциям клиента требуется активная подписка."
              : currentLanguage === "en"
                ? "An active subscription is required to access client features."
                : "Kliendi funktsioonide kasutamiseks on vaja aktiivset tellimust.",
        };
      default:
        return {
          subtitle:
            currentLanguage === "ru"
              ? "Подпишитесь, чтобы связываться с фрилансерами, про��матривать профили в полном объеме, бронировать консультации и размещать задачи."
              : currentLanguage === "en"
                ? "Subscribe to contact freelancers, view profiles in full detail, book consultations, and post tasks."
                : "Tellige, et võtta ühendust vabakutseliste, vaadata täielikke profiile, broneerida konsultatsioone ja postitada ülesandeid.",
        };
    }
  };

  const content = getIntentSpecificContent();

  const benefits = [
    {
      icon: Shield,
      text:
        currentLanguage === "ru"
          ? "Размещайте задачи и получайте предложения"
          : currentLanguage === "en"
            ? "Post tasks and receive proposals"
            : "Postitage ülesandeid ja saage pakkumisi",
    },
    {
      icon: MessageCircle,
      text:
        currentLanguage === "ru"
          ? "Отправляйте сообщения фрилансерам напрямую"
          : currentLanguage === "en"
            ? "Message freelancers directly"
            : "Saatke sõnumeid vabakutselistele otse",
    },
    {
      icon: User,
      text:
        currentLanguage === "ru"
          ? "Просматривайте контактную информацию (если разрешено настройками приватности)"
          : currentLanguage === "en"
            ? "View contact info (if allowed by privacy)"
            : "Vaadake kontaktandmeid (kui privaatsusseaded lubavad)",
    },
    {
      icon: Star,
      text:
        currentLanguage === "ru"
          ? "Бронируйте консультации"
          : currentLanguage === "en"
            ? "Book consultations"
            : "Broneerige konsultatsioone",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {currentLanguage === "ru"
              ? "Разблокировать функции клиента"
              : currentLanguage === "en"
                ? "Unlock client features"
                : "Avage kliendi funktsioonid"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Icon illustration */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 text-center mb-6">{content.subtitle}</p>

          {/* Benefits */}
          <div className="space-y-4 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <benefit.icon className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-gray-900">
              {currentLanguage === "ru"
                ? "€10/месяц или €100/год"
                : currentLanguage === "en"
                  ? "€10/month or €100/year"
                  : "€10/kuus või €100/aastas"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 rounded-b-2xl space-y-3">
          <Link
            to={`/${currentLanguage}/pricing?plan=monthly${intent === "role-switch" ? "&source=role-switch" : "&source=gating"}`}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors"
            onClick={onClose}
          >
            {currentLanguage === "ru"
              ? "Перейти к ценам"
              : currentLanguage === "en"
                ? "Go to Pricing"
                : "Mine hinnakiri juurde"}
          </Link>

          <button
            onClick={onClose}
            className="w-full text-gray-500 hover:text-gray-700 py-2 text-center font-medium transition-colors"
          >
            {currentLanguage === "ru"
              ? "Отмена"
              : currentLanguage === "en"
                ? "Cancel"
                : "Tühista"}
          </button>
        </div>
      </div>
    </div>
  );
}
