import React from "react";
import { Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

interface ContactInformationSectionProps {
  // Contact fields
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github?: string;

  // Change handlers
  onPhoneChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onLinkedinChange: (value: string) => void;
  onGithubChange?: (value: string) => void;

  // Styling
  className?: string;
  variant?: "provider" | "customer";
}

export default function ContactInformationSection({
  phone,
  location,
  website,
  linkedin,
  github = "",
  onPhoneChange,
  onLocationChange,
  onWebsiteChange,
  onLinkedinChange,
  onGithubChange,
  className = "",
  variant = "customer",
}: ContactInformationSectionProps) {
  const { currentLanguage } = useLanguage();

  return (
    <div
      className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-100 ${className}`}
    >
      <div className="flex items-center mb-6">
        <div className="bg-green-100 p-2 rounded-lg mr-3">
          <Phone className="h-5 w-5 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {currentLanguage === "ru"
            ? "Контактная информация"
            : currentLanguage === "en"
              ? "Contact Information"
              : "Kontaktandmed"}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
            <span>
              {currentLanguage === "ru"
                ? "Телефон"
                : currentLanguage === "en"
                  ? "Phone Number"
                  : "Telefoninumber"}
            </span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            placeholder="+372 XXXX XXXX"
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
            <span>
              {currentLanguage === "ru"
                ? "Местоположение"
                : currentLanguage === "en"
                  ? "Location"
                  : "Asukoht"}
            </span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            placeholder={
              currentLanguage === "ru"
                ? "Город, Страна"
                : currentLanguage === "en"
                  ? "City, Country"
                  : "Linn, riik"
            }
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Globe className="h-4 w-4 mr-3 flex-shrink-0" />
            <span>
              {currentLanguage === "ru"
                ? "Веб-сайт"
                : currentLanguage === "en"
                  ? "Website"
                  : "Veebileht"}
            </span>
          </label>
          <input
            type="url"
            value={website}
            onChange={(e) => onWebsiteChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Linkedin className="h-4 w-4 mr-3 flex-shrink-0" />
            <span>LinkedIn</span>
          </label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => onLinkedinChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        {/* GitHub - Provider only */}
        {variant === "provider" && onGithubChange && (
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Github className="h-4 w-4 mr-3 flex-shrink-0" />
              <span>GitHub</span>
            </label>
            <input
              type="url"
              value={github}
              onChange={(e) => onGithubChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              placeholder="https://github.com/yourusername"
            />
          </div>
        )}
      </div>
    </div>
  );
}
