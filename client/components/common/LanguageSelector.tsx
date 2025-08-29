import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { Search, X, Plus } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  placeholder?: string;
}

const commonLanguages = [
  "English",
  "Estonian",
  "Russian",
  "German",
  "Finnish",
  "Latvian",
  "Lithuanian",
  "French",
  "Spanish",
  "Italian",
  "Portuguese",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Polish",
  "Czech",
  "Hungarian",
  "Romanian",
  "Bulgarian",
  "Croatian",
  "Serbian",
  "Slovenian",
  "Slovak",
  "Ukrainian",
  "Turkish",
  "Arabic",
  "Hebrew",
  "Mandarin",
  "Japanese",
  "Korean",
  "Hindi",
  "Thai",
  "Vietnamese",
  "Malay",
];

export default function LanguageSelector({
  selectedLanguages,
  onLanguagesChange,
  placeholder,
}: LanguageSelectorProps) {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredLanguages = commonLanguages.filter(
    (lang) =>
      lang.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedLanguages.includes(lang),
  );

  const handleAddLanguage = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      onLanguagesChange([...selectedLanguages, language]);
    }
    setSearchTerm("");
    setCustomLanguage("");
    setIsOpen(false);
  };

  const handleRemoveLanguage = (language: string) => {
    onLanguagesChange(selectedLanguages.filter((lang) => lang !== language));
  };

  const handleAddCustomLanguage = () => {
    if (
      customLanguage.trim() &&
      !selectedLanguages.includes(customLanguage.trim())
    ) {
      handleAddLanguage(customLanguage.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (customLanguage.trim()) {
        handleAddCustomLanguage();
      } else if (filteredLanguages.length > 0) {
        handleAddLanguage(filteredLanguages[0]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
      setCustomLanguage("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setCustomLanguage("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {currentLanguage === "ru"
          ? "Владею языками"
          : currentLanguage === "en"
            ? "Languages Spoken"
            : "Valdab keeli"}
      </label>

      {/* Selected Languages */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedLanguages.map((language) => (
          <span
            key={language}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
          >
            {language}
            <button
              onClick={() => handleRemoveLanguage(language)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm || customLanguage}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            setCustomLanguage(value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ||
            (currentLanguage === "ru"
              ? "Поиск языков или добавить новый..."
              : currentLanguage === "en"
                ? "Search languages or add new..."
                : "Otsi keeli või lisa uus...")
          }
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* Add Custom Language Option */}
          {customLanguage.trim() &&
            !commonLanguages.some(
              (lang) => lang.toLowerCase() === customLanguage.toLowerCase(),
            ) && (
              <button
                onClick={handleAddCustomLanguage}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-100 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-blue-600 font-medium">
                  {currentLanguage === "ru"
                    ? `Добавить "${customLanguage}"`
                    : currentLanguage === "en"
                      ? `Add "${customLanguage}"`
                      : `Lisa "${customLanguage}"`}
                </span>
              </button>
            )}

          {/* Language Suggestions */}
          {filteredLanguages.length > 0 ? (
            filteredLanguages.slice(0, 10).map((language) => (
              <button
                key={language}
                onClick={() => handleAddLanguage(language)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                {language}
              </button>
            ))
          ) : searchTerm && !customLanguage.trim() ? (
            <div className="px-4 py-2 text-gray-500 text-sm">
              {currentLanguage === "ru"
                ? "Язык не найден"
                : currentLanguage === "en"
                  ? "No languages found"
                  : "Keeli ei leitud"}
            </div>
          ) : null}

          {/* Popular Languages */}
          {!searchTerm && !customLanguage && (
            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                {currentLanguage === "ru"
                  ? "Популярные языки"
                  : currentLanguage === "en"
                    ? "Popular Languages"
                    : "Populaarsed keeled"}
              </div>
              {commonLanguages
                .slice(0, 8)
                .filter((lang) => !selectedLanguages.includes(lang))
                .map((language) => (
                  <button
                    key={language}
                    onClick={() => handleAddLanguage(language)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    {language}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
