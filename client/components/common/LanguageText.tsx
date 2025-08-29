import React from "react";
import { useLanguage } from "../../lib/LanguageContext";

interface LanguageTextProps {
  ru: string;
  en: string;
  et: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function LanguageText({
  ru,
  en,
  et,
  className = "",
  as: Component = "span",
}: LanguageTextProps) {
  const { currentLanguage } = useLanguage();

  const getText = () => {
    switch (currentLanguage) {
      case "ru":
        return ru;
      case "et":
        return et;
      case "en":
      default:
        return en;
    }
  };

  return React.createElement(Component, { className }, getText());
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
