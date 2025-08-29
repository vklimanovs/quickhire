import React from "react";
import { User, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import PhotoUpload from "./PhotoUpload";
import LanguageAutocomplete from "../forms/LanguageAutocomplete";
import { LanguageSkill } from "../../Types";

interface BasicInformationSectionProps {
  // Photo handling
  currentPhoto: string;
  onPhotoChange: (photoData: string) => void;

  // Personal details
  firstName: string;
  lastName: string;
  company: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onCompanyChange: (value: string) => void;

  // Email handling
  email: string;
  onEmailChange: (value: string) => void;
  isEmailVerified?: boolean;
  hasEmailChanged?: boolean;
  isUpdatingEmail?: boolean;
  onUpdateEmail?: () => void;
  onResendVerification?: () => void;

  // Bio and languages
  bio: string;
  languages: LanguageSkill[];
  onBioChange: (value: string) => void;
  onLanguagesChange: (languages: LanguageSkill[]) => void;

  // Additional fields for provider
  headline?: string;
  onHeadlineChange?: (value: string) => void;
  location?: string;
  onLocationChange?: (value: string) => void;

  // Styling
  className?: string;
  variant?: "provider" | "customer";
}

export default function BasicInformationSection({
  currentPhoto,
  onPhotoChange,
  firstName,
  lastName,
  company,
  onFirstNameChange,
  onLastNameChange,
  onCompanyChange,
  email,
  onEmailChange,
  isEmailVerified = false,
  hasEmailChanged = false,
  isUpdatingEmail = false,
  onUpdateEmail,
  onResendVerification,
  bio,
  languages,
  onBioChange,
  onLanguagesChange,
  headline,
  onHeadlineChange,
  location,
  onLocationChange,
  className = "",
  variant = "customer",
}: BasicInformationSectionProps) {
  const { currentLanguage } = useLanguage();

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = isValidEmail(email);
  const canUpdateEmail = hasEmailChanged && isEmailValid && onUpdateEmail;

  return (
    <div
      className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100 ${className}`}
    >
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {currentLanguage === "ru"
            ? "Основная информация"
            : currentLanguage === "en"
              ? "Basic Information"
              : "Põhiinfo"}
        </h3>
      </div>

      {/* Photo Upload */}
      <PhotoUpload
        currentPhoto={currentPhoto}
        onPhotoChange={onPhotoChange}
        size="md"
        className="mb-6"
      />

      {/* Personal Details */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === "ru"
                ? "Имя"
                : currentLanguage === "en"
                  ? "First Name"
                  : "Eesnimi"}
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === "ru"
                ? "Фамилия"
                : currentLanguage === "en"
                  ? "Last Name"
                  : "Perekonnanimi"}
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {currentLanguage === "ru"
              ? "Компания (необязательно)"
              : currentLanguage === "en"
                ? "Company (optional)"
                : "Ettevõte (valikuline)"}
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
      </div>

      {/* Professional Title - Provider only */}
      {variant === "provider" && onHeadlineChange && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {currentLanguage === "ru"
              ? "Профессия"
              : currentLanguage === "en"
                ? "Professional Title"
                : "Kutsealane tiitel"}
          </label>
          <input
            type="text"
            value={headline || ""}
            onChange={(e) => onHeadlineChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            placeholder={
              currentLanguage === "ru"
                ? "Например: Senior Frontend Developer"
                : currentLanguage === "en"
                  ? "e.g., Senior Frontend Developer"
                  : "nt Senior Frontend Developer"
            }
          />
        </div>
      )}

      {/* Email Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {currentLanguage === "ru"
            ? "E-mail"
            : currentLanguage === "en"
              ? "Email"
              : "E-mail"}
        </label>
        <div className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className={`w-full pr-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                isEmailValid
                  ? "border-gray-300"
                  : "border-red-300 focus:ring-red-500"
              }`}
              placeholder={
                currentLanguage === "ru"
                  ? "ваш@email.com"
                  : currentLanguage === "en"
                    ? "your@email.com"
                    : "sinu@email.com"
              }
            />
            {/* Email verification status */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isEmailVerified ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {currentLanguage === "ru"
                    ? "Подтверждён"
                    : currentLanguage === "en"
                      ? "Verified"
                      : "Kinnitatud"}
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {currentLanguage === "ru"
                    ? "Не подтверждён"
                    : currentLanguage === "en"
                      ? "Not verified"
                      : "Kinnitamata"}
                </span>
              )}
            </div>
          </div>

          {/* Email validation feedback */}
          {email && !isEmailValid && (
            <p className="text-sm text-red-600">
              {currentLanguage === "ru"
                ? "Пожалуйста, введите корректный email адрес"
                : currentLanguage === "en"
                  ? "Please enter a valid email address"
                  : "Palun sisestage korrektne e-posti aadress"}
            </p>
          )}

          {/* Update Email button */}
          {canUpdateEmail && (
            <button
              onClick={onUpdateEmail}
              disabled={isUpdatingEmail}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isUpdatingEmail ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {currentLanguage === "ru"
                    ? "Обновляется..."
                    : currentLanguage === "en"
                      ? "Updating..."
                      : "Uuendatakse..."}
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  {currentLanguage === "ru"
                    ? "Обновить Email"
                    : currentLanguage === "en"
                      ? "Update Email"
                      : "Uuenda E-mail"}
                </>
              )}
            </button>
          )}

          {/* Resend verification button for unverified emails */}
          {!isEmailVerified && onResendVerification && (
            <button
              onClick={onResendVerification}
              className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              {currentLanguage === "ru"
                ? "Отправить подтверждение"
                : currentLanguage === "en"
                  ? "Resend Verification"
                  : "Saada kinnitus"}
            </button>
          )}

          {/* Email change info */}
          {hasEmailChanged && (
            <p className="text-xs text-gray-500">
              {currentLanguage === "ru"
                ? "Изменения email требуют верификации"
                : currentLanguage === "en"
                  ? "Email changes require verification"
                  : "E-maili muudatused vajavad kinnitamist"}
            </p>
          )}
        </div>
      </div>

      {/* Location - Provider only */}
      {variant === "provider" && onLocationChange && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {currentLanguage === "ru"
              ? "Местоположение"
              : currentLanguage === "en"
                ? "Location"
                : "Asukoht"}
          </label>
          <input
            type="text"
            value={location || ""}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            placeholder={
              currentLanguage === "ru"
                ? "Город, Страна"
                : currentLanguage === "en"
                  ? "City, Country"
                  : "Linn, riik"
            }
          />
        </div>
      )}

      {/* About Me */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {currentLanguage === "ru"
            ? "О себе"
            : currentLanguage === "en"
              ? "About Me"
              : "Minust"}
        </label>
        <textarea
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
          placeholder={
            currentLanguage === "ru"
              ? "Расскажите о себе или своей компании..."
              : currentLanguage === "en"
                ? "Tell us about yourself or your company..."
                : "Rääkige endast või oma ettevõttest..."
          }
        />
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {currentLanguage === "ru"
            ? "Владею языками"
            : currentLanguage === "en"
              ? "Languages Spoken"
              : "Valdab keeli"}
        </label>
        <LanguageAutocomplete
          value={languages}
          onChange={onLanguagesChange}
          placeholder={
            currentLanguage === "ru"
              ? "Поиск и добавление языков..."
              : currentLanguage === "en"
                ? "Search and add languages..."
                : "Otsi ja lisa keeli..."
          }
        />
      </div>
    </div>
  );
}
