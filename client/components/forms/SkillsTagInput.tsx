import { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { useDebouncedSearch } from "../../hooks/useDebounce";
import { useLanguage } from "../../lib/LanguageContext";

export interface Skill {
  name: string;
  isCustom: boolean;
}

// Utility functions for backward compatibility
export const skillsToStrings = (skills: Skill[]): string[] => {
  return skills.map((skill) => skill.name);
};

export const stringsToSkills = (skillNames: string[]): Skill[] => {
  return skillNames.map((name) => ({ name, isCustom: false }));
};

interface SkillsTagInputProps {
  selectedSkills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  availableSkills: string[];
  placeholder?: string;
  className?: string;
  chipStyle?: "minimal" | "branded" | "glassy";
}

export default function SkillsTagInput({
  selectedSkills,
  onSkillsChange,
  availableSkills,
  placeholder = "Search and add skills (e.g., JavaScript, TypeScript)",
  className = "",
  chipStyle = "minimal",
}: SkillsTagInputProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { searchInput, setSearchInput, debouncedSearchTerm } =
    useDebouncedSearch("", 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on search term and exclude already selected skills
  const filteredSuggestions = availableSkills
    .filter(
      (skill) =>
        skill.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
        !selectedSkills.some((selected) => selected.name === skill),
    )
    .slice(0, 10); // Limit to 10 suggestions

  const addSkill = (skillName: string, isCustom: boolean = false) => {
    if (!selectedSkills.some((skill) => skill.name === skillName)) {
      onSkillsChange([...selectedSkills, { name: skillName, isCustom }]);
    }
    setSearchInput("");
    setIsOpen(false);
  };

  const addCustomSkill = () => {
    const trimmedInput = debouncedSearchTerm.trim();
    if (
      trimmedInput &&
      !selectedSkills.some(
        (skill) => skill.name.toLowerCase() === trimmedInput.toLowerCase(),
      )
    ) {
      addSkill(trimmedInput, true);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(
      selectedSkills.filter((skill) => skill.name !== skillToRemove),
    );
  };

  // Modern chip style variations
  const getChipStyles = (skill: Skill) => {
    const baseStyles =
      "inline-flex items-center rounded-full text-sm font-medium transition-all duration-200 group";

    switch (chipStyle) {
      case "minimal":
        return skill.isCustom
          ? `${baseStyles} px-3 py-1.5 bg-gray-50 text-gray-700 border border-dashed border-gray-300 hover:bg-gray-100 hover:border-gray-400 shadow-sm`
          : `${baseStyles} px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300 shadow-sm`;

      case "branded":
        return skill.isCustom
          ? `${baseStyles} px-3 py-1.5 bg-amber-50 text-amber-800 border border-dashed border-amber-200 hover:bg-amber-100 hover:border-amber-300 shadow-sm`
          : `${baseStyles} px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 shadow-sm`;

      case "glassy":
        return skill.isCustom
          ? `${baseStyles} px-3 py-1.5 bg-white/60 text-gray-800 border border-dashed border-gray-200 hover:bg-white/80 hover:border-gray-300 backdrop-blur-sm shadow-md`
          : `${baseStyles} px-3 py-1.5 bg-white/70 text-gray-800 border border-gray-200/50 hover:bg-white/90 hover:border-gray-300 backdrop-blur-sm shadow-md`;

      default:
        return baseStyles;
    }
  };

  const getCloseButtonStyles = (skill: Skill) => {
    const baseStyles =
      "ml-2 rounded-full p-0.5 transition-all duration-200 hover:scale-110";

    switch (chipStyle) {
      case "minimal":
        return skill.isCustom
          ? `${baseStyles} text-gray-500 hover:text-gray-700 hover:bg-gray-200`
          : `${baseStyles} text-gray-500 hover:text-gray-700 hover:bg-gray-300`;

      case "branded":
        return skill.isCustom
          ? `${baseStyles} text-amber-600 hover:text-amber-800 hover:bg-amber-200`
          : `${baseStyles} text-blue-600 hover:text-blue-800 hover:bg-blue-200`;

      case "glassy":
        return `${baseStyles} text-gray-600 hover:text-gray-800 hover:bg-gray-200/50`;

      default:
        return baseStyles;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setIsOpen(value.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        // Add first suggestion if available
        addSkill(filteredSuggestions[0], false);
      } else if (debouncedSearchTerm.trim()) {
        // Add as custom skill if no suggestions found
        addCustomSkill();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchInput("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Modern Skills Chips */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mb-4">
          {selectedSkills.map((skill) => (
            <span
              key={skill.name}
              className={getChipStyles(skill)}
              title={
                skill.isCustom
                  ? "Custom skill - added by you"
                  : "Predefined skill"
              }
            >
              <span className="select-none leading-none">{skill.name}</span>
              <button
                onClick={() => removeSkill(skill.name)}
                className={getCloseButtonStyles(skill)}
                aria-label={`Remove ${skill.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(searchInput.length > 0)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <Plus className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      {/* Dropdown Suggestions */}
      {isOpen &&
        (filteredSuggestions.length > 0 || debouncedSearchTerm.trim()) && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {/* Predefined skill suggestions */}
            {filteredSuggestions.map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill, false)}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
              >
                <Plus className="h-3 w-3 mr-2 text-blue-400" />
                {skill}
              </button>
            ))}

            {/* Custom skill option */}
            {debouncedSearchTerm.trim() &&
              filteredSuggestions.length === 0 &&
              !selectedSkills.some(
                (skill) =>
                  skill.name.toLowerCase() ===
                  debouncedSearchTerm.toLowerCase(),
              ) && (
                <button
                  onClick={addCustomSkill}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center border-t border-gray-100"
                >
                  <Plus className="h-3 w-3 mr-2 text-gray-400" />
                  <span className="text-gray-600">{t.common.addCustom}: </span>
                  <span className="font-medium ml-1">
                    "{debouncedSearchTerm}"
                  </span>
                  <span className="ml-1 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    {t.common.customSkillLabel}
                  </span>
                </button>
              )}

            {/* Show custom option even when there are suggestions */}
            {debouncedSearchTerm.trim() &&
              filteredSuggestions.length > 0 &&
              !filteredSuggestions.some(
                (skill) =>
                  skill.toLowerCase() === debouncedSearchTerm.toLowerCase(),
              ) &&
              !selectedSkills.some(
                (skill) =>
                  skill.name.toLowerCase() ===
                  debouncedSearchTerm.toLowerCase(),
              ) && (
                <button
                  onClick={addCustomSkill}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center border-t border-gray-100"
                >
                  <Plus className="h-3 w-3 mr-2 text-gray-400" />
                  <span className="text-gray-600">{t.common.addCustom}: </span>
                  <span className="font-medium ml-1">
                    "{debouncedSearchTerm}"
                  </span>
                  <span className="ml-1 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    {t.common.customSkillLabel}
                  </span>
                </button>
              )}

            {/* No suggestions and no input */}
            {debouncedSearchTerm.trim() === "" &&
              filteredSuggestions.length === 0 && (
                <div className="px-4 py-2.5 text-sm text-gray-500">
                  {t.common.startTyping}
                </div>
              )}
          </div>
        )}
    </div>
  );
}
