import React, { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { SKILL_SUGGESTIONS } from "../data/suggestions";
import Card from "./Card";

interface SkillsAutocompleteProps {
  value: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function SkillsAutocomplete({
  value = [],
  onChange,
  placeholder,
  className = "",
  disabled = false,
}: SkillsAutocompleteProps) {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get filtered skill options (case-insensitive, limited to 5-7 items)
  const getFilteredSkills = (query: string) => {
    if (!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();

    // First, separate exact matches and partial matches
    const exactMatches: string[] = [];
    const partialMatches: string[] = [];

    SKILL_SUGGESTIONS.forEach((skill) => {
      if (value.includes(skill)) return; // Skip already selected

      const lowercaseSkill = skill.toLowerCase();
      if (lowercaseSkill.startsWith(lowercaseQuery)) {
        exactMatches.push(skill);
      } else if (lowercaseSkill.includes(lowercaseQuery)) {
        partialMatches.push(skill);
      }
    });

    // Combine exact matches first, then partial matches, limit to 7 total
    return [...exactMatches, ...partialMatches].slice(0, 7);
  };

  const filteredSkills = getFilteredSkills(searchQuery);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) =>
            prev < filteredSkills.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          event.preventDefault();
          if (activeIndex >= 0 && activeIndex < filteredSkills.length) {
            handleSkillSelect(filteredSkills[activeIndex]);
          } else if (searchQuery.trim() && !filteredSkills.length) {
            handleCustomSkillAdd();
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
  }, [isOpen, activeIndex, filteredSkills, searchQuery]);

  const handleSkillSelect = (skill: string) => {
    onChange([...value, skill]);
    setSearchQuery("");
    setIsOpen(false);
    setActiveIndex(-1);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCustomSkillAdd = () => {
    const trimmedSkill = searchQuery.trim();
    if (!trimmedSkill || value.includes(trimmedSkill)) return;

    onChange([...value, trimmedSkill]);
    setSearchQuery("");
    setIsOpen(false);
    setActiveIndex(-1);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Selected Skills Chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((skill, index) => {
            const isCustomSkill = !SKILL_SUGGESTIONS.includes(skill);
            return (
              <div
                key={index}
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  isCustomSkill
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <span className="text-xs leading-none">{skill}</span>
                {isCustomSkill && (
                  <span className="ml-1 text-purple-600 text-xs font-normal">
                    (Custom)
                  </span>
                )}

                {/* Remove Button */}
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className={`ml-1.5 p-0.5 rounded flex items-center justify-center ${
                      isCustomSkill
                        ? "text-purple-600 hover:text-purple-800"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            );
          })}
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
              ? "Поиск навыков..."
              : currentLanguage === "en"
                ? "Search skills..."
                : "Otsi oskuseid...")
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
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill, index) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillSelect(skill)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${
                    index === activeIndex ? "bg-blue-50" : ""
                  } ${index === 0 ? "rounded-t-lg" : ""} ${
                    index === filteredSkills.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  <span className="font-medium text-gray-900">{skill}</span>
                </button>
              ))
            ) : searchQuery.trim() ? (
              <button
                type="button"
                onClick={handleCustomSkillAdd}
                className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors rounded-lg"
              >
                <div className="flex items-center">
                  <Plus className="h-4 w-4 text-blue-600 mr-2" />
                  <span>
                    {currentLanguage === "ru"
                      ? `Добавить "${searchQuery.trim()}"`
                      : currentLanguage === "en"
                        ? `Add "${searchQuery.trim()}"`
                        : `Lisa "${searchQuery.trim()}"`}
                  </span>
                </div>
              </button>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 rounded-lg">
                {currentLanguage === "ru"
                  ? "Начните вводить для поиска навыков"
                  : currentLanguage === "en"
                    ? "Start typing to search skills"
                    : "Alustage sisestamist oskuste otsimiseks"}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
