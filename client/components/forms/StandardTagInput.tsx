import React, { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

interface StandardTagInputProps {
  value: string[];
  onChange: (newValues: string[]) => void;
  suggestions: string[];
  placeholder?: string;
  label?: string;
  type?: "skills" | "languages";
  disabled?: boolean;
}

export default function StandardTagInput({
  value = [],
  onChange,
  suggestions = [],
  placeholder,
  label,
  type = "skills",
  disabled = false,
}: StandardTagInputProps) {
  const { currentLanguage } = useLanguage();
  const [input, setInput] = useState("");

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      handleAddTag(input.trim());
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !value.includes(tag.trim())) {
      onChange([...value, tag.trim()]);
      setInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  // Filter suggestions to only show those not already selected
  const availableSuggestions = suggestions.filter(
    (suggestion) => !value.includes(suggestion),
  );

  const getPlaceholderText = () => {
    if (placeholder) return placeholder;

    const tagType =
      type === "skills"
        ? currentLanguage === "ru"
          ? "навык"
          : currentLanguage === "en"
            ? "skill"
            : "oskus"
        : currentLanguage === "ru"
          ? "язык"
          : currentLanguage === "en"
            ? "language"
            : "keel";

    return currentLanguage === "ru"
      ? `Добавить ${tagType} и нажать Enter`
      : currentLanguage === "en"
        ? `Type a ${tagType} and press Enter`
        : `Sisestage ${tagType} ja vajutage Enter`;
  };

  const getSuggestionsText = () => {
    return currentLanguage === "ru"
      ? "Предложения: "
      : currentLanguage === "en"
        ? "Suggestions: "
        : "Soovitused: ";
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyPress}
          placeholder={getPlaceholderText()}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300"
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
        {availableSuggestions.length > 0 && (
          <p className="text-xs text-gray-500">
            {getSuggestionsText()}
            {availableSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleAddTag(suggestion)}
                disabled={disabled}
                className="text-blue-600 hover:text-blue-800 underline mr-2 disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
