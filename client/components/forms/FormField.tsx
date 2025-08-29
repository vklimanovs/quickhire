import React from "react";
import LanguageText from "../common/LanguageText";

interface FormFieldProps {
  label: {
    ru: string;
    en: string;
    et: string;
  };
  type?: "text" | "email" | "password" | "tel" | "url" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: {
    ru: string;
    en: string;
    et: string;
  };
  error?: string | React.ReactElement;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  rows?: number;
  icon?: React.ReactNode;
}

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  rows = 4,
  icon,
}: FormFieldProps) {
  const inputId = `field-${label.en.toLowerCase().replace(/\s+/g, "-")}`;

  const baseInputClasses = `w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
    icon ? "pl-10 pr-3" : "px-3"
  }`;
  const inputClasses = `${baseInputClasses} ${
    error
      ? "border-red-300 bg-red-50"
      : disabled || readOnly
        ? "border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
        : "border-gray-300 bg-white hover:border-gray-400"
  } ${className}`;

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            placeholder ? getLanguageText(placeholder, "en") : undefined
          }
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          className={inputClasses}
        />
      );
    }

    return (
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          placeholder ? getLanguageText(placeholder, "en") : undefined
        }
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
      />
    );
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        <LanguageText ru={label.ru} en={label.en} et={label.et} />
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        {renderInput()}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Utility function for cases where you can't use the component
export const getLanguageText = (
  texts: { ru: string; en: string; et: string },
  currentLanguage: string,
): string => {
  switch (currentLanguage) {
    case "ru":
      return texts.ru;
    case "et":
      return texts.et;
    case "en":
    default:
      return texts.en;
  }
};
