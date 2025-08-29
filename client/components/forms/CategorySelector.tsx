import React, { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { ChevronDown } from "lucide-react";

interface CategorySelectorProps {
  primaryCategory: string;
  secondaryCategories: string[];
  onPrimaryCategoryChange: (category: string) => void;
  onSecondaryCategoriesChange: (categories: string[]) => void;
  skills?: string[];
  className?: string;
}

const CATEGORIES = [
  "Development & IT",
  "Design & Creative",
  "AI Services",
  "Sales & Marketing",
  "Writing & Translation",
  "Admin & Support",
  "Finance & Accounting",
  "Legal",
  "HR & Training",
  "Engineering & Architecture",
  "Other Services",
  "Consultations",
];

export default function CategorySelector({
  primaryCategory,
  secondaryCategories,
  onPrimaryCategoryChange,
  onSecondaryCategoriesChange,
  skills = [],
  className = "",
}: CategorySelectorProps) {
  const { t } = useLanguage();
  const [showPrimaryDropdown, setShowPrimaryDropdown] = useState(false);
  const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(false);

  // Remove skill-based category suggestions as per requirements

  const handleSecondaryToggle = (category: string) => {
    if (secondaryCategories.includes(category)) {
      onSecondaryCategoriesChange(
        secondaryCategories.filter((c) => c !== category),
      );
    } else if (secondaryCategories.length < 2) {
      onSecondaryCategoriesChange([...secondaryCategories, category]);
    }
  };

  const availableSecondaryCategories = CATEGORIES.filter(
    (cat) => cat !== primaryCategory,
  );

  return (
    <div className={className}>
      {/* Primary Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.categorySelection.primaryCategory}{" "}
          <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <button
            onClick={() => setShowPrimaryDropdown(!showPrimaryDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left flex items-center justify-between"
          >
            <span
              className={primaryCategory ? "text-gray-900" : "text-gray-500"}
            >
              {primaryCategory || t.categorySelection.selectPrimaryCategory}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {showPrimaryDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onPrimaryCategoryChange(category);
                    setShowPrimaryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${
                    category === primaryCategory
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Secondary Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.categorySelection.secondaryCategories}
          <span className="text-gray-500 text-xs ml-2">
            ({t.categorySelection.upToTwoSecondary})
          </span>
        </label>

        <div className="relative">
          <button
            onClick={() => setShowSecondaryDropdown(!showSecondaryDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left flex items-center justify-between"
          >
            <span
              className={
                secondaryCategories.length > 0
                  ? "text-gray-900"
                  : "text-gray-500"
              }
            >
              {secondaryCategories.length > 0
                ? secondaryCategories.join(", ")
                : t.categorySelection.selectSecondaryCategories}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {showSecondaryDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
              {availableSecondaryCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSecondaryToggle(category)}
                  disabled={
                    !secondaryCategories.includes(category) &&
                    secondaryCategories.length >= 2
                  }
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    secondaryCategories.includes(category)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={secondaryCategories.includes(category)}
                      onChange={() => {}}
                      className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    {category}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
