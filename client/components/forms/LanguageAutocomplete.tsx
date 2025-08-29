import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Plus } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { LanguageSkill } from "../../Types";
import {
  LANGUAGES,
  searchLanguages,
  getLocalizedLanguageName,
} from "../../data/languages";
import Card from "./Card";

interface LanguageAutocompleteProps {
  value: LanguageSkill[];
  onChange: (languages: LanguageSkill[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function LanguageAutocomplete({
  value = [],
  onChange,
  placeholder,
  className = "",
  disabled = false,
}: LanguageAutocompleteProps) {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showLevelDropdown, setShowLevelDropdown] = useState<string | null>(
    null,
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get filtered language options
  const filteredLanguages = searchQuery
    ? searchLanguages(searchQuery, currentLanguage as "et" | "en" | "ru")
    : LANGUAGES;

  // Remove already selected languages from suggestions
  const availableLanguages = filteredLanguages.filter(
    (lang) => !value.some((selected) => selected.code === lang.code),
  );

  // Language skill levels
  const skillLevels: Array<{
    key: LanguageSkill["level"];
    label: { et: string; en: string; ru: string };
  }> = [
    {
      key: "native",
      label: {
        et: "Emakeel",
        en: "Native",
        ru: "Родной",
      },
    },
    {
      key: "fluent",
      label: {
        et: "Sujuv",
        en: "Fluent",
        ru: "Свободно",
      },
    },
    {
      key: "conversational",
      label: {
        et: "Vestlustase",
        en: "Conversational",
        ru: "Разговорный",
      },
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowLevelDropdown(null);
      }
    };

    if (isOpen || showLevelDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, showLevelDropdown]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) =>
            prev < availableLanguages.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          event.preventDefault();
          if (activeIndex >= 0 && activeIndex < availableLanguages.length) {
            handleLanguageSelect(availableLanguages[activeIndex]);
          } else if (searchQuery && !availableLanguages.length) {
            handleCustomLanguageAdd();
          }
          break;
        case "Escape":
          setIsOpen(false);
          setActiveIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, activeIndex, availableLanguages, searchQuery]);

  const handleLanguageSelect = (language: any) => {
    const newLanguage: LanguageSkill = {
      code: language.code,
      level: "conversational", // Default level
      name: getLocalizedLanguageName(
        language.code,
        currentLanguage as "et" | "en" | "ru",
      ),
    };

    onChange([...value, newLanguage]);
    setSearchQuery("");
    setIsOpen(false);
    setActiveIndex(-1);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCustomLanguageAdd = () => {
    if (!searchQuery.trim()) return;

    const customLanguage: LanguageSkill = {
      code: searchQuery.toLowerCase().replace(/\s+/g, ""),
      level: "conversational",
      name: searchQuery.trim(),
    };

    onChange([...value, customLanguage]);
    setSearchQuery("");
    setIsOpen(false);
    setActiveIndex(-1);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLanguageRemove = (codeToRemove: string) => {
    onChange(value.filter((lang) => lang.code !== codeToRemove));
  };

  const handleLevelChange = (
    code: string,
    newLevel: LanguageSkill["level"],
  ) => {
    onChange(
      value.map((lang) =>
        lang.code === code ? { ...lang, level: newLevel } : lang,
      ),
    );
    setShowLevelDropdown(null);
  };

  const getLevelLabel = (level: LanguageSkill["level"]) => {
    const levelConfig = skillLevels.find((l) => l.key === level);
    return levelConfig
      ? levelConfig.label[currentLanguage as "et" | "en" | "ru"]
      : level;
  };

  const getLevelColor = (level: LanguageSkill["level"]) => {
    switch (level) {
      case "native":
        return "bg-green-100 text-green-800";
      case "fluent":
        return "bg-blue-100 text-blue-800";
      case "conversational":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Selected Language Chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((language) => (
            <div
              key={language.code}
              className="flex items-center bg-white border border-gray-300 rounded-lg px-2 py-1 text-xs"
            >
              <span className="font-medium mr-1.5 text-xs leading-none">
                {language.name ||
                  (language.code
                    ? getLocalizedLanguageName(
                        language.code,
                        currentLanguage as "et" | "en" | "ru",
                      )
                    : "Unknown")}
              </span>

              {/* Level Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setShowLevelDropdown(
                      showLevelDropdown === language.code
                        ? null
                        : language.code,
                    )
                  }
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLevelColor(language.level)} hover:opacity-80 transition-opacity`}
                  disabled={disabled}
                >
                  <span className="text-xs leading-none">
                    {getLevelLabel(language.level)}
                  </span>
                  <ChevronDown className="h-2.5 w-2.5 ml-1" />
                </button>

                {showLevelDropdown === language.code && (
                  <Card
                    border
                    shadow="lg"
                    className="absolute top-full left-0 mt-1 z-50 min-w-[120px]"
                  >
                    {skillLevels.map((level) => (
                      <button
                        key={level.key}
                        type="button"
                        onClick={() =>
                          handleLevelChange(language.code, level.key)
                        }
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                          language.level === level.key
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {level.label[currentLanguage as "et" | "en" | "ru"]}
                      </button>
                    ))}
                  </Card>
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleLanguageRemove(language.code)}
                className="ml-1.5 p-0.5 text-gray-400 hover:text-gray-600 rounded flex items-center justify-center"
                disabled={disabled}
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={
            placeholder ||
            (currentLanguage === "ru"
              ? "Поиск языков..."
              : currentLanguage === "en"
                ? "Search languages..."
                : "Otsi keeli...")
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          disabled={disabled}
        />

        {/* Dropdown */}
        {isOpen && (
          <Card
            border
            shadow="lg"
            className="absolute top-full left-0 right-0 mt-1 z-40 max-h-60 overflow-y-auto"
          >
            {availableLanguages.length > 0 ? (
              availableLanguages.map((language, index) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageSelect(language)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${
                    index === activeIndex ? "bg-blue-50" : ""
                  } ${index === 0 ? "rounded-t-lg" : ""} ${
                    index === availableLanguages.length - 1
                      ? "rounded-b-lg"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {language.name[currentLanguage as "et" | "en" | "ru"]}
                    </span>
                    <span className="text-xs text-gray-500">
                      {language.nativeName}
                    </span>
                  </div>
                </button>
              ))
            ) : searchQuery ? (
              <button
                type="button"
                onClick={handleCustomLanguageAdd}
                className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors rounded-lg"
              >
                <div className="flex items-center">
                  <Plus className="h-4 w-4 text-blue-600 mr-2" />
                  <span>
                    {currentLanguage === "ru"
                      ? `Добавить "${searchQuery}"`
                      : currentLanguage === "en"
                        ? `Add "${searchQuery}"`
                        : `Lisa "${searchQuery}"`}
                  </span>
                </div>
              </button>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 rounded-lg">
                {currentLanguage === "ru"
                  ? "Языки не найдены"
                  : currentLanguage === "en"
                    ? "No languages found"
                    : "Keeli ei leitud"}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
